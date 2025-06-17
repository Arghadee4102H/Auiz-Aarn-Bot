// script.js

// --- IMPORTANT: PASTE YOUR FIREBASE CONFIGURATION HERE ---
// You get this from the Firebase Console -> Project Settings -> General -> Your apps -> Web app
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Telegram Web App object
const tg = window.Telegram.WebApp;

// --- GLOBAL STATE ---
let currentUser = null;
let userData = {};
let quizInterval;
let timerInterval;

// --- DOM ELEMENTS ---
const loader = document.getElementById('loader');
const appContainer = document.getElementById('app-container');
const pages = document.querySelectorAll('.page');
const navButtons = document.querySelectorAll('.nav-btn');

// --- INITIALIZATION ---
window.addEventListener('DOMContentLoaded', () => {
    tg.ready();
    tg.expand(); // Expand the web app to full screen

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        currentUser = tg.initDataUnsafe.user;
        loadOrCreateUser(currentUser);
    } else {
        // For testing in a regular browser
        // currentUser = { id: 12345, username: 'testuser', first_name: 'Test' };
        // loadOrCreateUser(currentUser);
        loader.innerHTML = '<p>Error: Please open this app within Telegram.</p>';
    }

    setupEventListeners();
});

async function loadOrCreateUser(user) {
    const userRef = db.collection('users').doc(String(user.id));
    const doc = await userRef.get();

    if (!doc.exists) {
        // Create new user
        const today = new Date().toISOString().split('T')[0];
        const newUser = {
            telegram_user_id: user.id,
            telegram_username: user.username || `user${user.id}`,
            first_name: user.first_name,
            total_points: 0,
            energy: 5,
            daily_quiz_limit: 15,
            referral_code: `A${user.username || user.id}${Math.floor(1000 + Math.random() * 9000)}`,
            total_referrals: 0,
            referred_by: null,
            last_login_date: today,
            last_quiz_date: today,
            daily_ad_quiz_watched: 0,
            daily_ad_energy_watched: 0,
            last_channel_join_bonus_date: null,
            first_850_withdrawal_used: false,
            played_question_indices: []
        };
        await userRef.set(newUser);
        userData = newUser;
        await logTransaction('system', 0, 'Welcome Bonus');
    } else {
        // Load existing user
        userData = doc.data();
        // Reset daily limits if it's a new day
        const today = new Date().toISOString().split('T')[0];
        if (userData.last_login_date !== today) {
            await userRef.update({
                last_login_date: today,
                energy: 5, // Reset energy
                daily_quiz_limit: 15, // Reset quiz limit
                daily_ad_quiz_watched: 0,
                daily_ad_energy_watched: 0,
                // Do not reset last_channel_join_bonus_date here
            });
            // Refetch the updated data
            const updatedDoc = await userRef.get();
            userData = updatedDoc.data();
        }
    }
    
    // Once data is loaded, hide loader and show app
    loader.style.display = 'none';
    appContainer.style.display = 'flex';
    updateAllUI();
    fetchHistory();
}

function updateAllUI() {
    // Profile
    document.getElementById('profile-username').innerText = userData.first_name;
    document.getElementById('profile-userid').innerText = `ID: ${userData.telegram_user_id}`;
    document.getElementById('profile-points').innerText = userData.total_points;
    document.getElementById('profile-referrals').innerText = userData.total_referrals;
    document.getElementById('profile-energy').innerText = `${userData.energy} / 5+`;
    document.getElementById('profile-quiz-limit').innerText = `${userData.daily_quiz_limit} / 15+`;
    document.getElementById('profile-referral-code').innerText = userData.referral_code;

    // Referral
    document.getElementById('referral-code-text').innerText = userData.referral_code;
    
    // Premium/Tasks
    document.getElementById('ad-quiz-limit-tracker').innerText = `Ads watched today: ${userData.daily_ad_quiz_watched}/15`;
    document.getElementById('ad-energy-limit-tracker').innerText = `Ads watched today: ${userData.daily_ad_energy_watched}/20`;
}

// --- NAVIGATION ---
function setupEventListeners() {
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            showPage(targetId);
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Add other event listeners
    document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
    document.getElementById('join-channel-btn').addEventListener('click', joinChannelTask);
    document.getElementById('watch-ad-quiz-btn').addEventListener('click', () => watchAdFor('quiz'));
    document.getElementById('watch-ad-energy-btn').addEventListener('click', () => watchAdFor('energy'));
    document.getElementById('copy-referral-btn').addEventListener('click', copyReferralCode);
    document.getElementById('share-referral-btn').addEventListener('click', shareReferralLink);
    document.getElementById('submit-referral-btn').addEventListener('click', submitReferralCode);
    
    document.querySelectorAll('.withdraw-option-btn').forEach(btn => {
        btn.addEventListener('click', selectWithdrawOption);
    });
    document.getElementById('submit-withdrawal-btn').addEventListener('click', submitWithdrawal);
}

function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    const newPage = document.getElementById(pageId);
    if (newPage) {
        newPage.classList.add('active');
        if(pageId === 'history-section') fetchHistory(); // Refresh history on view
    }
}

// --- QUIZ LOGIC ---
function startQuiz() {
    if (userData.daily_quiz_limit <= 0) {
        alert("You've reached your daily quiz limit! Watch an ad in the Premium section for more.");
        return;
    }
    if (userData.energy <= 0) {
        alert("You're out of energy! Answer correctly or watch an ad to get more.");
        return;
    }

    document.getElementById('quiz-main-view').style.display = 'none';
    document.getElementById('quiz-game-view').style.display = 'block';
    loadNextQuestion();
}

function loadNextQuestion() {
    if (userData.daily_quiz_limit <= 0) {
        endQuiz("You've used all your quizzes for today!");
        return;
    }
    
    // Find a question that hasn't been played
    let availableQuestions = quizData.map((_, index) => index)
        .filter(index => !userData.played_question_indices.includes(index));

    if (availableQuestions.length === 0) {
        // Reset if all questions have been seen
        userData.played_question_indices = [];
        availableQuestions = quizData.map((_, index) => index);
        db.collection('users').doc(String(currentUser.id)).update({ played_question_indices: [] });
    }

    const randomIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    const question = quizData[randomIndex];
    userData.played_question_indices.push(randomIndex);
    
    document.getElementById('quiz-question').innerText = question.question;
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.innerText = option;
        button.onclick = () => handleAnswer(button, option, question.correctAnswer);
        optionsContainer.appendChild(button);
    });

    startTimer();
}

function startTimer() {
    let timeLeft = 10;
    const timerBar = document.getElementById('quiz-timer-bar');
    timerBar.style.transition = 'none';
    timerBar.style.width = '100%';
    
    // Force reflow
    void timerBar.offsetWidth; 

    timerBar.style.transition = `width ${timeLeft}s linear`;
    timerBar.style.width = '0%';
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            handleAnswer(null, null, quizData.find(q => q.question === document.getElementById('quiz-question').innerText).correctAnswer);
        }
    }, 1000);
}

async function handleAnswer(selectedButton, selectedAnswer, correctAnswer) {
    clearInterval(timerInterval);
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.add('disabled'));

    let pointsEarned = 0;
    const feedbackEl = document.getElementById('quiz-feedback');
    
    if (selectedAnswer === correctAnswer) {
        pointsEarned = 5;
        if (selectedButton) selectedButton.classList.add('correct');
        feedbackEl.innerText = `Congratulations! You win ${pointsEarned} points.`;
        feedbackEl.style.color = 'var(--glow-green)';
    } else {
        pointsEarned = 1;
        if (selectedButton) selectedButton.classList.add('incorrect');
        feedbackEl.innerText = `Oops! The correct answer was "${correctAnswer}". You win ${pointsEarned} point.`;
        feedbackEl.style.color = 'var(--glow-red)';
        // Highlight correct answer
        document.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.innerText === correctAnswer) btn.classList.add('correct');
        });
        
        // Decrease energy
        userData.energy = Math.max(0, userData.energy - 1);
        await db.collection('users').doc(String(currentUser.id)).update({ energy: userData.energy });
    }

    // Update user data
    userData.total_points += pointsEarned;
    userData.daily_quiz_limit -= 1;
    await db.collection('users').doc(String(currentUser.id)).update({
        total_points: firebase.firestore.FieldValue.increment(pointsEarned),
        daily_quiz_limit: firebase.firestore.FieldValue.increment(-1),
        played_question_indices: userData.played_question_indices
    });
    
    await logTransaction('quiz', pointsEarned, document.getElementById('quiz-question').innerText.substring(0, 30) + '...');

    updateAllUI();

    setTimeout(() => {
        feedbackEl.innerText = '';
        if (userData.energy > 0 && userData.daily_quiz_limit > 0) {
            loadNextQuestion();
        } else {
            let reason = userData.energy <= 0 ? "You're out of energy!" : "You've finished your daily quizzes!";
            endQuiz(reason);
        }
    }, 2500);
}

function endQuiz(message) {
    alert(message);
    document.getElementById('quiz-main-view').style.display = 'block';
    document.getElementById('quiz-game-view').style.display = 'none';
}

// --- PREMIUM / TASKS LOGIC ---
async function joinChannelTask() {
    const today = new Date().toISOString().split('T')[0];
    if (userData.last_channel_join_bonus_date === today) {
        alert("You have already claimed this bonus today.");
        return;
    }
    
    // Open the channel link
    tg.openTelegramLink("https://t.me/AGuttuGhosh");
    
    // Reward the user
    const pointsEarned = 5;
    userData.total_points += pointsEarned;
    userData.last_channel_join_bonus_date = today;
    
    await db.collection('users').doc(String(currentUser.id)).update({
        total_points: firebase.firestore.FieldValue.increment(pointsEarned),
        last_channel_join_bonus_date: today
    });
    
    await logTransaction('task', pointsEarned, 'Joined Telegram Channel');
    
    alert(`Thank you! ${pointsEarned} points have been added.`);
    updateAllUI();
}

function watchAdFor(type) {
    if (type === 'quiz' && userData.daily_ad_quiz_watched >= 15) {
        alert("You have reached the daily limit for extra quiz ads.");
        return;
    }
    if (type === 'energy' && userData.daily_ad_energy_watched >= 20) {
        alert("You have reached the daily limit for extra energy ads.");
        return;
    }

    // This is where you call the Monetag Rewarded Interstitial
    if (typeof show_9405037 === 'function') {
        show_9405037().then(async () => {
            // This code runs AFTER the user watches the ad.
            alert('Ad finished! You have received your reward.');
            
            const userRef = db.collection('users').doc(String(currentUser.id));
            
            if (type === 'quiz') {
                await userRef.update({
                    daily_quiz_limit: firebase.firestore.FieldValue.increment(1),
                    daily_ad_quiz_watched: firebase.firestore.FieldValue.increment(1)
                });
                userData.daily_quiz_limit += 1;
                userData.daily_ad_quiz_watched += 1;
                await logTransaction('ad_reward', 0, '+1 Quiz Limit');
            } else if (type === 'energy') {
                await userRef.update({
                    energy: firebase.firestore.FieldValue.increment(1),
                    daily_ad_energy_watched: firebase.firestore.FieldValue.increment(1)
                });
                userData.energy += 1;
                userData.daily_ad_energy_watched += 1;
                 await logTransaction('ad_reward', 0, '+1 Energy');
            }
            updateAllUI();
        }).catch(error => {
            console.error('Ad display error:', error);
            alert('Could not show ad at this moment. Please try again later.');
        });
    } else {
        alert("Ad service is not available. Please try again later.");
    }
}


// --- REFERRAL LOGIC ---
function copyReferralCode() {
    navigator.clipboard.writeText(userData.referral_code).then(() => {
        alert("Referral code copied!");
    }).catch(err => {
        alert("Failed to copy code.");
    });
}

function shareReferralLink() {
    const text = `Join Auiz Aarn Bot, play quizzes, and earn rewards! Use my code ${userData.referral_code} to get a starter bonus.`;
    const url = `http://t.me/AuizAarnBot/Play`;
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
}

async function submitReferralCode() {
    const input = document.getElementById('submit-referral-input');
    const code = input.value.trim();

    if (!code) {
        alert("Please enter a code.");
        return;
    }
    if (code === userData.referral_code) {
        alert("You cannot use your own referral code.");
        return;
    }
    if (userData.referred_by) {
        alert("You have already used a referral code.");
        return;
    }

    const referralQuery = await db.collection('users').where('referral_code', '==', code).limit(1).get();

    if (referralQuery.empty) {
        alert("Invalid referral code.");
        return;
    }
    
    const referrerDoc = referralQuery.docs[0];
    const referrerId = referrerDoc.id;
    const referrerRef = db.collection('users').doc(referrerId);
    const currentUserRef = db.collection('users').doc(String(currentUser.id));

    // Use a transaction to ensure both users are updated correctly
    await db.runTransaction(async (transaction) => {
        // Update referrer: +10 points, +1 referral
        transaction.update(referrerRef, {
            total_points: firebase.firestore.FieldValue.increment(10),
            total_referrals: firebase.firestore.FieldValue.increment(1)
        });
        
        // Update current user: +5 points, set referred_by
        transaction.update(currentUserRef, {
            total_points: firebase.firestore.FieldValue.increment(5),
            referred_by: referrerId
        });
    });

    // Log transactions
    await logTransaction('referral_bonus', 5, `Used code from ${referrerDoc.data().first_name}`);
    // We can't easily log for the other user here, but it could be done with a cloud function.

    // Update local data
    userData.total_points += 5;
    userData.referred_by = referrerId;

    alert("Success! You and your referrer have received points.");
    updateAllUI();
    input.disabled = true;
    document.getElementById('submit-referral-btn').disabled = true;
}

// --- HISTORY LOGIC ---
async function fetchHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '<div class="spinner"></div>';

    const historyQuery = await db.collection('transactions')
        .where('user_id', '==', String(currentUser.id))
        .orderBy('timestamp', 'desc')
        .limit(50)
        .get();

    if (historyQuery.empty) {
        historyList.innerHTML = '<p>No transaction history found.</p>';
        return;
    }

    historyList.innerHTML = '';
    historyQuery.forEach(doc => {
        const item = doc.data();
        const date = item.timestamp.toDate().toLocaleString();
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'history-item';
        
        let pointsClass = '';
        let pointsSign = '';
        if (item.points > 0) {
            pointsClass = 'positive';
            pointsSign = '+';
        } else if (item.points < 0) {
            pointsClass = 'negative';
        }
        
        let detailsHtml = `<div class="details">
                            <span class="type">${item.description}</span>
                            <span class="date">${date}</span>
                           </div>`;
        if(item.type === 'withdrawal') {
            detailsHtml = `<div class="details">
                            <span class="type">Withdrawal Request</span>
                            <span class="date">${date}</span>
                            <span class="status-${item.status.toLowerCase()}">Status: ${item.status}</span>
                           </div>`;
        }
        
        itemDiv.innerHTML = `
            ${detailsHtml}
            <span class="points ${pointsClass}">${pointsSign}${item.points}</span>
        `;
        historyList.appendChild(itemDiv);
    });
}

async function logTransaction(type, points, description, status = 'completed') {
    await db.collection('transactions').add({
        user_id: String(currentUser.id),
        type: type,
        points: points,
        description: description,
        status: status,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// --- WITHDRAWAL LOGIC ---
let selectedWithdraw = null;

function selectWithdrawOption(event) {
    document.querySelectorAll('.withdraw-option-btn').forEach(btn => btn.classList.remove('selected'));
    const button = event.currentTarget;
    button.classList.add('selected');

    selectedWithdraw = {
        points: parseInt(button.dataset.points),
        usd: parseFloat(button.dataset.usd)
    };

    document.getElementById('selected-withdraw-amount').innerText = `Withdraw ${selectedWithdraw.points} Points ($${selectedWithdraw.usd})`;
    document.getElementById('submit-withdrawal-btn').disabled = false;
}

async function submitWithdrawal() {
    if (!selectedWithdraw) {
        alert("Please select a withdrawal amount.");
        return;
    }

    const method = document.getElementById('withdraw-method').value;
    const address = document.getElementById('withdraw-address').value.trim();

    if (!address) {
        alert("Please enter your wallet address or Pay ID.");
        return;
    }

    if (userData.total_points < selectedWithdraw.points) {
        alert("You do not have enough points for this withdrawal.");
        return;
    }

    if (selectedWithdraw.points === 850 && userData.first_850_withdrawal_used) {
        alert("You can only use the 850 points withdrawal option once.");
        return;
    }
    
    const submitBtn = document.getElementById('submit-withdrawal-btn');
    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";

    try {
        const userRef = db.collection('users').doc(String(currentUser.id));
        
        // Use a transaction for safety
        await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (userDoc.data().total_points < selectedWithdraw.points) {
                throw "Insufficient points!";
            }
            
            const updateData = {
                total_points: firebase.firestore.FieldValue.increment(-selectedWithdraw.points)
            };
            
            if (selectedWithdraw.points === 850) {
                updateData.first_850_withdrawal_used = true;
            }
            
            transaction.update(userRef, updateData);

            // Create withdrawal request
            const withdrawalRef = db.collection('withdrawals').doc();
            transaction.set(withdrawalRef, {
                user_id: String(currentUser.id),
                username: userData.telegram_username,
                points_withdrawn: selectedWithdraw.points,
                amount_usd: selectedWithdraw.usd,
                method: method,
                wallet_address: address,
                status: 'Pending',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Log it in general transactions as well
            const transactionRef = db.collection('transactions').doc();
            transaction.set(transactionRef, {
                user_id: String(currentUser.id),
                type: 'withdrawal',
                points: -selectedWithdraw.points,
                description: `Withdrawal to ${method}`,
                status: 'Pending',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        
        // Update local data
        userData.total_points -= selectedWithdraw.points;
        if (selectedWithdraw.points === 850) {
            userData.first_850_withdrawal_used = true;
        }

        alert("Withdrawal request submitted successfully! It will be processed within 24-48 hours.");
        updateAllUI();
        document.getElementById('withdraw-address').value = '';
    } catch (error) {
        console.error("Withdrawal error:", error);
        alert("An error occurred: " + error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Request";
    }
}