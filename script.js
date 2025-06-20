// script.js

// --- IMPORTANT: PASTE YOUR FIREBASE CONFIGURATION HERE ---
const firebaseConfig = {
    apiKey: "AIzaSyC14bqWc3VtB9vB5R7nRKro-S5F6BgUsg4",
    authDomain: "auiz-aarn-bot-32baa.firebaseapp.com",
    projectId: "auiz-aarn-bot-32baa",
    storageBucket: "auiz-aarn-bot-32baa.firebasestorage.app",
    messagingSenderId: "779644493972",
    appId: "1:779644493972:web:cffebcbcd0fa6318059481"
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
    tg.expand();

    if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
        currentUser = tg.initDataUnsafe.user;
        loadOrCreateUser(currentUser);
    } else {
        loader.innerHTML = '<p>Error: Please open this app within Telegram.</p>';
    }

    setupEventListeners();
});

async function loadOrCreateUser(user) {
    const userRef = db.collection('users').doc(String(user.id));
    const doc = await userRef.get();

    if (!doc.exists) {
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
            daily_ad_quiz_watched: 0,
            daily_ad_energy_watched: 0,
            last_channel_join_bonus_date: null,
            first_1050_withdrawal_used: false,
            played_question_indices: []
        };
        await userRef.set(newUser);
        userData = newUser;
        await logTransaction('system', 0, 'Welcome Bonus');
    } else {
        userData = doc.data();
        const today = new Date().toISOString().split('T')[0];
        if (userData.last_login_date !== today) {
            await userRef.update({
                last_login_date: today,
                energy: 5,
                daily_quiz_limit: 15,
                daily_ad_quiz_watched: 0,
                daily_ad_energy_watched: 0,
            });
            const updatedDoc = await userRef.get();
            userData = updatedDoc.data();
        }
    }
    
    loader.style.display = 'none';
    appContainer.style.display = 'flex';
    updateAllUI();
}

function updateAllUI() {
    if (!userData) return;
    document.getElementById('profile-username').innerText = userData.first_name || 'Player';
    document.getElementById('profile-userid').innerText = `ID: ${userData.telegram_user_id}`;
    document.getElementById('profile-points').innerText = userData.total_points || 0;
    document.getElementById('profile-referrals').innerText = userData.total_referrals || 0;
    document.getElementById('profile-energy').innerText = `${userData.energy || 0} / 5+`;
    document.getElementById('profile-quiz-limit').innerText = `${userData.daily_quiz_limit || 0} / 15+`;
    document.getElementById('profile-referral-code').innerText = userData.referral_code || 'Loading...';
    document.getElementById('referral-code-text').innerText = userData.referral_code || 'Loading...';
    document.getElementById('ad-quiz-limit-tracker').innerText = `Ads watched today: ${userData.daily_ad_quiz_watched || 0}/15`;
    document.getElementById('ad-energy-limit-tracker').innerText = `Ads watched today: ${userData.daily_ad_energy_watched || 0}/20`;
}

function setupEventListeners() {
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.target;
            showPage(targetId);
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

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
    pages.forEach(page => page.classList.remove('active'));
    const newPage = document.getElementById(pageId);
    if (newPage) {
        newPage.classList.add('active');
        if(pageId === 'history-section') fetchHistory();
    }
}

// --- QUIZ LOGIC ---
function startQuiz() {
    if (userData.daily_quiz_limit <= 0) {
        return alert("You've reached your daily quiz limit! Watch an ad in the Premium section for more.");
    }
    if (userData.energy <= 0) {
        return alert("You're out of energy! Answer correctly or watch an ad to get more.");
    }

    document.getElementById('quiz-main-view').style.display = 'none';
    document.getElementById('quiz-game-view').style.display = 'block';
    loadNextQuestion();
}

function loadNextQuestion() {
    let playedIndices = userData.played_question_indices || [];
    let availableQuestions = quizData.map((_, index) => index).filter(index => !playedIndices.includes(index));

    if (availableQuestions.length === 0) {
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
    void timerBar.offsetWidth; 
    timerBar.style.transition = `width ${timeLeft}s linear`;
    timerBar.style.width = '0%';
    
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            const currentQuestionText = document.getElementById('quiz-question').innerText;
            const currentQuestion = quizData.find(q => q.question === currentQuestionText);
            handleAnswer(null, null, currentQuestion.correctAnswer);
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
        document.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.innerText === correctAnswer) btn.classList.add('correct');
        });
        
        userData.energy = Math.max(0, userData.energy - 1);
        await db.collection('users').doc(String(currentUser.id)).update({ energy: userData.energy });
    }

    userData.total_points += pointsEarned;
    userData.daily_quiz_limit -= 1;
    await db.collection('users').doc(String(currentUser.id)).update({
        total_points: firebase.firestore.FieldValue.increment(pointsEarned),
        daily_quiz_limit: firebase.firestore.FieldValue.increment(-1),
        played_question_indices: userData.played_question_indices
    });
    
    await logTransaction('quiz', pointsEarned, `Quiz: ${correctAnswer}`);
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
        return alert("You have already claimed this bonus today.");
    }
    
    tg.openTelegramLink("https://t.me/AGuttuGhosh");
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
        return alert("You have reached the daily limit for extra quiz ads.");
    }
    if (type === 'energy' && userData.daily_ad_energy_watched >= 20) {
        return alert("You have reached the daily limit for extra energy ads.");
    }

    if (typeof show_9405037 === 'function') {
        show_9405037().then(async () => {
            alert('Ad finished! You have received your reward.');
            const userRef = db.collection('users').doc(String(currentUser.id));
            if (type === 'quiz') {
                await userRef.update({
                    daily_quiz_limit: firebase.firestore.FieldValue.increment(1),
                    daily_ad_quiz_watched: firebase.firestore.FieldValue.increment(1)
                });
                userData.daily_quiz_limit++;
                userData.daily_ad_quiz_watched++;
                await logTransaction('ad_reward', 0, '+1 Quiz Limit');
            } else if (type === 'energy') {
                await userRef.update({
                    energy: firebase.firestore.FieldValue.increment(1),
                    daily_ad_energy_watched: firebase.firestore.FieldValue.increment(1)
                });
                userData.energy++;
                userData.daily_ad_energy_watched++;
                await logTransaction('ad_reward', 0, '+1 Energy');
            }
            updateAllUI();
        }).catch(error => alert('Could not show ad. Please try again later.'));
    } else {
        alert("Ad service is not available. Please try again later.");
    }
}

// --- REFERRAL LOGIC ---
function copyReferralCode() {
    navigator.clipboard.writeText(userData.referral_code).then(() => {
        tg.showPopup({
            type: 'ok',
            title: 'Copied!',
            message: 'Your referral code has been copied.'
        });
    }).catch(err => alert("Failed to copy code."));
}

function shareReferralLink() {
    const text = `Join Auiz Aarn Bot, play quizzes, and earn rewards! Use my code ${userData.referral_code} to get a starter bonus.`;
    const url = `http://t.me/AuizAarnBot/Play`; // Replace with your bot's actual link if different
    tg.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
}

async function submitReferralCode() {
    const input = document.getElementById('submit-referral-input');
    const code = input.value.trim();

    if (!code) { return alert("Please enter a code."); }
    if (code === userData.referral_code) { return alert("You cannot use your own referral code."); }
    if (userData.referred_by) { return alert("You have already used a referral code."); }

    const referralQuery = await db.collection('users').where('referral_code', '==', code).limit(1).get();
    if (referralQuery.empty) { return alert("Invalid referral code."); }
    
    const referrerDoc = referralQuery.docs[0];
    const referrerId = referrerDoc.id;
    const referrerRef = db.collection('users').doc(referrerId);
    const currentUserRef = db.collection('users').doc(String(currentUser.id));

    await db.runTransaction(async (transaction) => {
        transaction.update(referrerRef, {
            total_points: firebase.firestore.FieldValue.increment(10),
            total_referrals: firebase.firestore.FieldValue.increment(1)
        });
        transaction.update(currentUserRef, {
            total_points: firebase.firestore.FieldValue.increment(5),
            referred_by: referrerId
        });
    });

    await logTransaction('referral_bonus', 5, `Used code from ${referrerDoc.data().first_name}`);
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

    try {
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
            const date = item.timestamp ? item.timestamp.toDate().toLocaleString() : 'Just now';
            
            const itemDiv = document.createElement('div');
            itemDiv.className = 'history-item';
            
            let pointsClass = item.points > 0 ? 'positive' : (item.points < 0 ? 'negative' : '');
            let pointsSign = item.points > 0 ? '+' : '';
            
            let statusHtml = item.type === 'withdrawal' ? `<span class="status-${item.status.toLowerCase()}">Status: ${item.status}</span>` : '';
            
            itemDiv.innerHTML = `
                <div class="details">
                    <span class="type">${item.description}</span>
                    <span class="date">${date}</span>
                    ${statusHtml}
                </div>
                <span class="points ${pointsClass}">${pointsSign}${item.points}</span>
            `;
            historyList.appendChild(itemDiv);
        });
    } catch (error) {
        console.error("Error fetching history:", error);
        historyList.innerHTML = '<p style="color: var(--glow-red);">Could not load history. Please try again later.</p>';
    }
}

async function logTransaction(type, points, description, status = 'Completed') {
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
    if (!selectedWithdraw) { return alert("Please select a withdrawal amount."); }

    const method = document.getElementById('withdraw-method').value;
    const address = document.getElementById('withdraw-address').value.trim();

    if (!address) { return alert("Please enter your wallet address or Pay ID."); }
    if (userData.total_points < selectedWithdraw.points) { return alert("You do not have enough points."); }
    if (selectedWithdraw.points === 1050 && userData.first_1050_withdrawal_used) { return alert("You can only use the 1050 points withdrawal option once."); }
    
    const submitBtn = document.getElementById('submit-withdrawal-btn');
    submitBtn.disabled = true;
    submitBtn.innerText = "Processing...";

    try {
        const userRef = db.collection('users').doc(String(currentUser.id));
        await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (userDoc.data().total_points < selectedWithdraw.points) { throw "Insufficient points!"; }
            
            const updateData = { total_points: firebase.firestore.FieldValue.increment(-selectedWithdraw.points) };
            if (selectedWithdraw.points === 1050) { updateData.first_1050_withdrawal_used = true; }
            transaction.update(userRef, updateData);

            const withdrawalRef = db.collection('withdrawals').doc();
            transaction.set(withdrawalRef, { user_id: String(currentUser.id), username: userData.telegram_username, points_withdrawn: selectedWithdraw.points, amount_usd: selectedWithdraw.usd, method: method, wallet_address: address, status: 'Pending', timestamp: firebase.firestore.FieldValue.serverTimestamp() });
            
            await logTransaction('withdrawal', -selectedWithdraw.points, `Withdrawal to ${method}`, 'Pending');
        });
        
        userData.total_points -= selectedWithdraw.points;
        if (selectedWithdraw.points === 1050) { userData.first_1050_withdrawal_used = true; }

        alert("Withdrawal request submitted successfully!");
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
