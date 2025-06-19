// quiz-data.js

const quizData = [
    // Original Questions
    {
        question: "Who is known as the Father of the Indian Constitution?",
        options: ["Mahatma Gandhi", "B. R. Ambedkar", "Jawaharlal Nehru", "Sardar Vallabhbhai Patel"],
        correctAnswer: "B. R. Ambedkar"
    },
    {
        question: "Which organ in the human body purifies blood?",
        options: ["Lungs", "Heart", "Liver", "Kidneys"],
        correctAnswer: "Kidneys"
    },
    {
        question: "What is the value of π (pi) up to two decimal places?",
        options: ["3.12", "3.14", "3.16", "3.18"],
        correctAnswer: "3.14"
    },
    {
        question: "Who was the first President of the United States?",
        options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
        correctAnswer: "George Washington"
    },
    {
        question: "What is the chemical symbol of Gold?",
        options: ["Gd", "Go", "Au", "Ag"],
        correctAnswer: "Au"
    },
    {
        question: "Which planet is known as the “Red Planet”?",
        options: ["Venus", "Earth", "Mars", "Jupiter"],
        correctAnswer: "Mars"
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "George Orwell"],
        correctAnswer: "William Shakespeare"
    },

    // Economics & Behavioral Finance Questions
    {
        question: "What does GDP stand for?",
        options: ["Gross Domestic Product", "General Demand Principle", "Government Debt Percentage", "Global Development Plan"],
        correctAnswer: "Gross Domestic Product"
    },
    {
        question: "Which economist is known as the 'father of modern economics'?",
        options: ["John Maynard Keynes", "Milton Friedman", "Adam Smith", "Karl Marx"],
        correctAnswer: "Adam Smith"
    },
    {
        question: "The 'Lorenz Curve' is used to measure what?",
        options: ["Inflation", "Income inequality", "Trade deficits", "Consumer confidence"],
        correctAnswer: "Income inequality"
    },
    {
        question: "What is 'quantitative easing'?",
        options: ["Printing more physical currency", "Central banks buying assets to inject money into the economy", "Reducing taxes to stimulate spending", "Limiting imports to protect domestic industries"],
        correctAnswer: "Central banks buying assets to inject money into the economy"
    },
    {
        question: "The 'Dunning-Kruger effect' explains:",
        options: ["Why people overestimate their knowledge/skills", "How framing affects risk assessment", "The impact of social proof on spending", "Mental accounting of money"],
        correctAnswer: "Why people overestimate their knowledge/skills"
    },

    // Geography & Geology Questions
    {
        question: "Which country has the most time zones?",
        options: ["United States", "China", "Russia", "France"],
        correctAnswer: "France"
    },
    {
        question: "The Darién Gap separates which two continents?",
        options: ["North America and South America", "Europe and Asia", "Africa and Asia", "Asia and Oceania"],
        correctAnswer: "North America and South America"
    },
    {
        question: "What is the only sea without coasts?",
        options: ["Sargasso Sea", "Dead Sea", "Coral Sea", "Black Sea"],
        correctAnswer: "Sargasso Sea"
    },
    {
        question: "Which river flows through the most countries?",
        options: ["Nile", "Amazon", "Danube", "Congo"],
        correctAnswer: "Danube"
    },
    {
        question: "What is the world's highest capital city by elevation?",
        options: ["Quito, Ecuador", "La Paz, Bolivia", "Bogotá, Colombia", "Thimphu, Bhutan"],
        correctAnswer: "La Paz, Bolivia"
    },
    {
        question: "Which country has the longest coastline?",
        options: ["Canada", "Norway", "Indonesia", "Russia"],
        correctAnswer: "Canada"
    },
    {
        question: "What is the deepest known point in Earth's oceans?",
        options: ["Mariana Trench", "Puerto Rico Trench", "Java Trench", "Tonga Trench"],
        correctAnswer: "Mariana Trench"
    },
    {
        question: "What type of rock is formed from cooled lava or magma?",
        options: ["Sedimentary", "Metamorphic", "Igneous", "Conglomerate"],
        correctAnswer: "Igneous"
    },
    
    // Tech & Gaming Peripherals Questions
    {
        question: "What does 'mAh' measure in power banks?",
        options: ["Charging speed", "Battery capacity", "Voltage output", "Number of cycles"],
        correctAnswer: "Battery capacity"
    },
    {
        question: "What is the key benefit of GaN (Gallium Nitride) chargers?",
        options: ["Lower heat generation", "Higher wattage in smaller size", "Wireless charging", "Water resistance"],
        correctAnswer: "Higher wattage in smaller size"
    },
    {
        question: "What does IP68 rating indicate about a phone case?",
        options: ["6ft drop protection", "Dustproof + 30min underwater", "Fire resistance", "Scratch-proof"],
        correctAnswer: "Dustproof + 30min underwater"
    },
    {
        question: "Which headset technology creates 3D audio without surround speakers?",
        options: ["Dolby Atmos", "THX Spatial", "DTS Headphone:X", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "Why do pro gamers use 1000Hz polling rate mice?",
        options: ["Reduced input lag (1ms response)", "Higher DPI sensitivity", "Longer battery life", "RGB sync compatibility"],
        correctAnswer: "Reduced input lag (1ms response)"
    },
    {
        question: "Which keyboard layout saves space for mouse movement in FPS games?",
        options: ["100% full-size", "TKL (Tenkeyless)", "60% compact", "Alice layout"],
        correctAnswer: "TKL (Tenkeyless)"
    },
    {
        question: "Which monitor spec matters most for competitive shooters?",
        options: ["4K resolution", "240Hz refresh rate", "HDR1000", "32\" screen size"],
        correctAnswer: "240Hz refresh rate"
    },
    {
        question: "What does 'DPI' stand for in gaming mice?",
        options: ["Dots Per Inch", "Digital Pointer Interface", "Dynamic Precision Index", "Drag Performance Indicator"],
        correctAnswer: "Dots Per Inch"
    },

    // --- NEWLY ADDED QUESTIONS START HERE ---

    // Gaming & Mobile Gaming
    {
        question: "What is the primary function of a GPU in a computer?",
        options: ["Managing storage devices", "Handling internet traffic", "Rendering graphics and images", "Controlling keyboard input"],
        correctAnswer: "Rendering graphics and images"
    },
    {
        question: "What does 'FPS' stand for in gaming?",
        options: ["First Person Shot", "Frames Per Second", "Fast Pixel Scan", "Full Power Sync"],
        correctAnswer: "Frames Per Second"
    },
    {
        question: "Which company developed the 'GeForce' line of graphics cards?",
        options: ["AMD", "Intel", "NVIDIA", "ASUS"],
        correctAnswer: "NVIDIA"
    },
    {
        question: "What is 'ray tracing' used for in modern video games?",
        options: ["Faster internet speeds", "Realistic lighting and shadows", "Increasing frame rate", "Reducing game file size"],
        correctAnswer: "Realistic lighting and shadows"
    },
    {
        question: "What does 'RGB' commonly refer to in gaming gear?",
        options: ["Real Gaming Base", "Red Green Blue (lighting)", "Random Graphic Boost", "Reactive Game Buffer"],
        correctAnswer: "Red Green Blue (lighting)"
    },
    {
        question: "Which of these games is not developed by Supercell?",
        options: ["Clash of Clans", "Clash Royale", "PUBG Mobile", "Brawl Stars"],
        correctAnswer: "PUBG Mobile"
    },
    {
        question: "What does 'gacha' mean in mobile gaming?",
        options: ["A skill-based combat mechanic", "A loot-box-style random reward system", "A multiplayer tournament", "A mobile game update"],
        correctAnswer: "A loot-box-style random reward system"
    },
    {
        question: "Which company developed PUBG Mobile?",
        options: ["Tencent Games", "Gameloft", "Supercell", "NetEase"],
        correctAnswer: "Tencent Games"
    },
    {
        question: "What genre is the game Mobile Legends: Bang Bang?",
        options: ["Puzzle", "MOBA (Multiplayer Online Battle Arena)", "Racing", "Battle Royale"],
        correctAnswer: "MOBA (Multiplayer Online Battle Arena)"
    },
    {
        question: "Which of these games is known for augmented reality (AR) gameplay?",
        options: ["Call of Duty: Mobile", "Genshin Impact", "Pokémon GO", "Free Fire"],
        correctAnswer: "Pokémon GO"
    },
    {
        question: "What is the energy/stamina system in many mobile games typically used for?",
        options: ["Changing graphics settings", "Limiting how often you can play", "Boosting game speed", "Saving your progress"],
        correctAnswer: "Limiting how often you can play"
    },
    {
        question: "What is the in-game currency in Clash of Clans used to speed up processes?",
        options: ["Elixir", "Coins", "Diamonds", "Gems"],
        correctAnswer: "Gems"
    },

    // Free Fire
    {
        question: "Which pet gives EP recovery over time in Free Fire?",
        options: ["Ottero", "Falco", "Mr. Waggor", "Panda"],
        correctAnswer: "Ottero"
    },
    {
        question: "What type of game is Free Fire?",
        options: ["MOBA", "Puzzle", "Battle Royale", "Endless Runner"],
        correctAnswer: "Battle Royale"
    },
    {
        question: "What is the maximum number of players in a classic Free Fire match?",
        options: ["100", "50", "60", "52"],
        correctAnswer: "50"
    },
    {
        question: "What is the name of Free Fire's premium currency?",
        options: ["Coins", "Gold", "Diamonds", "Tokens"],
        correctAnswer: "Diamonds"
    },
    {
        question: "Which character in Free Fire is based on footballer Cristiano Ronaldo?",
        options: ["K", "Jota", "Chrono", "Alok"],
        correctAnswer: "Chrono"
    },
    {
        question: "Who is the first real-life character added to Free Fire?",
        options: ["Alok", "Chrono", "K", "Jota"],
        correctAnswer: "Alok"
    },
    {
        question: "What is the name of the default Free Fire character?",
        options: ["Kelly", "Adam", "Ford", "Hayato"],
        correctAnswer: "Adam"
    },
    {
        question: "What does the 'Blue Zone' in Free Fire do?",
        options: ["Reduces damage taken", "Increases loot quality", "Slows down players", "Teleports you to safety"],
        correctAnswer: "Increases loot quality"
    },

    // General Knowledge (Geography)
    {
        question: "Which continent has the most countries?",
        options: ["South America", "Europe", "Africa", "Asia"],
        correctAnswer: "Africa"
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
        correctAnswer: "Vatican City"
    },
    {
        question: "Which ocean is the deepest?",
        options: ["Atlantic Ocean", "Arctic Ocean", "Pacific Ocean", "Indian Ocean"],
        correctAnswer: "Pacific Ocean"
    },
    {
        question: "What is the currency of Japan?",
        options: ["Won", "Yen", "Yuan", "Ringgit"],
        correctAnswer: "Yen"
    },
    {
        question: "Which country is both an island and a continent?",
        options: ["New Zealand", "Madagascar", "Australia", "Iceland"],
        correctAnswer: "Australia"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Amazon River", "Yangtze River", "Mississippi River", "Nile River"],
        correctAnswer: "Nile River"
    },
    {
        question: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Montreal", "Ottawa"],
        correctAnswer: "Ottawa"
    },
    {
        question: "Mount Everest lies on the border of Nepal and which other country?",
        options: ["Bhutan", "India", "China", "Pakistan"],
        correctAnswer: "China"
    },
    {
        question: "Which desert is the largest in the world by area?",
        options: ["Arabian Desert", "Gobi Desert", "Sahara Desert", "Antarctic Desert"],
        correctAnswer: "Antarctic Desert"
    },

    // Math
    {
        question: "What is the result of 9 × 8?",
        options: ["72", "64", "81", "88"],
        correctAnswer: "72"
    },
    {
        question: "Which number is a prime number?",
        options: ["15", "21", "31", "45"],
        correctAnswer: "31"
    },
    {
        question: "What is the next number in this pattern: 2, 4, 8, 16, ?",
        options: ["18", "20", "24", "32"],
        correctAnswer: "32"
    },
    {
        question: "A triangle has angles measuring 90° and 45°. What is the third angle?",
        options: ["35°", "45°", "60°", "90°"],
        correctAnswer: "45°"
    },
    {
        question: "What is the perimeter of a square with side length 5 cm?",
        options: ["10 cm", "20 cm", "15 cm", "25 cm"],
        correctAnswer: "20 cm"
    },
    {
        question: "What is the value of 2³ (2 to the power of 3)?",
        options: ["6", "8", "9", "12"],
        correctAnswer: "8"
    },
    {
        question: "If a pizza is cut into 8 equal slices and you eat 3, what fraction of the pizza is left?",
        options: ["5/8", "3/8", "1/2", "1/3"],
        correctAnswer: "5/8"
    },
    {
        question: "What is the square root of 144?",
        options: ["10", "11", "12", "13"],
        correctAnswer: "12"
    },
    {
        question: "What is 15% of 200?",
        options: ["20", "25", "30", "35"],
        correctAnswer: "30"
    },

    // Earth's Magnetic Field
    {
        question: "What is the name of the imaginary line connecting the magnetic north and south poles?",
        options: ["Axis of rotation", "Geoid", "Magnetic axis", "Equator"],
        correctAnswer: "Magnetic axis"
    },
    {
        question: "What instrument is used to detect Earth’s magnetic field?",
        options: ["Thermometer", "Seismograph", "Barometer", "Magnetometer"],
        correctAnswer: "Magnetometer"
    },
    {
        question: "Where is Earth's magnetic field the strongest?",
        options: ["At the Equator", "At the magnetic poles", "In the stratosphere", "At the Tropic of Cancer"],
        correctAnswer: "At the magnetic poles"
    },
    {
        question: "What happens when Earth's magnetic poles reverse?",
        options: ["Gravity increases", "The field disappears permanently", "North becomes south, and compass directions reverse", "The Earth stops rotating"],
        correctAnswer: "North becomes south, and compass directions reverse"
    },
    {
        question: "The movement of what material in the Earth's core generates its magnetic field?",
        options: ["Solid iron", "Liquid water", "Liquid iron and nickel", "Molten lava"],
        correctAnswer: "Liquid iron and nickel"
    },
    {
        question: "What is the name of the region around Earth controlled by its magnetic field?",
        options: ["Atmosphere", "Magnetosphere", "Lithosphere", "Troposphere"],
        correctAnswer: "Magnetosphere"
    },
    {
        question: "Which particles does Earth’s magnetic field help protect us from?",
        options: ["Oxygen atoms", "Sound waves", "Solar wind and cosmic rays", "Infrared radiation"],
        correctAnswer: "Solar wind and cosmic rays"
    },
    {
        question: "What natural phenomenon is caused by charged particles interacting with Earth's magnetic field near the poles?",
        options: ["Earthquakes", "Volcanic eruptions", "Aurora (Northern and Southern Lights)", "Tides"],
        correctAnswer: "Aurora (Northern and Southern Lights)"
    },

    // Indian Education System
    {
        question: "Which exam is conducted for entry into Indian Institutes of Technology (IITs)?",
        options: ["CAT", "NEET", "JEE Advanced", "GATE"],
        correctAnswer: "JEE Advanced"
    },
    {
        question: "What is the name of the policy that replaced the National Policy on Education 1986?",
        options: ["New Curriculum Framework 2019", "Digital India Policy", "National Education Policy 2020", "Sarva Shiksha Abhiyan"],
        correctAnswer: "National Education Policy 2020"
    },
    {
        question: "At what class level does the board exam typically occur in CBSE schools?",
        options: ["Class 7", "Class 8", "Class 9", "Class 10 and 12"],
        correctAnswer: "Class 10 and 12"
    },
    {
        question: "Which body is responsible for regulating higher education in India?",
        options: ["NCERT", "UGC", "CBSE", "NIOS"],
        correctAnswer: "UGC"
    },
    {
        question: "What is the full form of NIOS?",
        options: ["National Institute of Open Studies", "National Institute of Online Schools", "National Institute of Open Schooling", "National International Open System"],
        correctAnswer: "National Institute of Open Schooling"
    },
    {
        question: "Under NEP 2020, what is the new school structure proposed?",
        options: ["10+2", "5+3+3+4", "3+2+5+2", "4+4+4"],
        correctAnswer: "5+3+3+4"
    },
    {
        question: "Which organization conducts the NEET examination in India?",
        options: ["UPSC", "CBSE", "NTA", "AIIMS"],
        correctAnswer: "NTA"
    },
    {
        question: "What is the Right to Education Act (RTE) in India?",
        options: ["Free education for students from age 14 to 18", "Free and compulsory education for children aged 6 to 14", "Compulsory private school education", "A scheme for teacher training"],
        correctAnswer: "Free and compulsory education for children aged 6 to 14"
    },

    // Indian Railways
    {
        question: "What is the full form of IRCTC?",
        options: ["Indian Rail Catering and Tourism Corporation", "Indian Railway Commission for Train Control", "International Rail Connectivity & Tourism Council", "Indian Railway and Cargo Transport Corporation"],
        correctAnswer: "Indian Rail Catering and Tourism Corporation"
    },
    {
        question: "Which Indian train is known for luxury travel and royal experience?",
        options: ["Vande Bharat Express", "Palace on Wheels", "Jan Shatabdi", "Garib Rath"],
        correctAnswer: "Palace on Wheels"
    },
    {
        question: "What type of gauge is most widely used in Indian Railways?",
        options: ["Meter gauge", "Narrow gauge", "Broad gauge", "Standard gauge"],
        correctAnswer: "Broad gauge"
    },
    {
        question: "How many railway zones are there in India (as of 2024)?",
        options: ["12", "15", "18", "21"],
        correctAnswer: "18"
    },
    {
        question: "Which Indian railway station has the world’s longest railway platform?",
        options: ["Howrah Junction", "Gorakhpur Junction", "Kollam Junction", "Kharagpur Junction"],
        correctAnswer: "Gorakhpur Junction"
    },

    // History & World Wars
    {
        question: "Who is known as the 'Iron Man of India'?",
        options: ["Jawaharlal Nehru", "Subhas Chandra Bose", "Bal Gangadhar Tilak", "Sardar Vallabhbhai Patel"],
        correctAnswer: "Sardar Vallabhbhai Patel"
    },
    {
        question: "The Battle of Plassey was fought in which year?",
        options: ["1747", "1757", "1767", "1777"],
        correctAnswer: "1757"
    },
    {
        question: "Who discovered the sea route to India in 1498?",
        options: ["Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama", "Marco Polo"],
        correctAnswer: "Vasco da Gama"
    },
    {
        question: "Which ancient civilization developed along the Indus River?",
        options: ["Mesopotamian Civilization", "Egyptian Civilization", "Harappan Civilization", "Chinese Civilization"],
        correctAnswer: "Harappan Civilization"
    },
    {
        question: "Who was the first Mughal emperor of India?",
        options: ["Akbar", "Humayun", "Babur", "Shah Jahan"],
        correctAnswer: "Babur"
    },
    {
        question: "In which year did India gain independence from British rule?",
        options: ["1945", "1946", "1947", "1950"],
        correctAnswer: "1947"
    },
    {
        question: "What was the capital of the Maurya Empire under Emperor Ashoka?",
        options: ["Pataliputra", "Delhi", "Taxila", "Ujjain"],
        correctAnswer: "Pataliputra"
    },
    {
        question: "In which year did World War II end?",
        options: ["1942", "1943", "1944", "1945"],
        correctAnswer: "1945"
    },
    {
        question: "Which two cities were destroyed by atomic bombs in 1945?",
        options: ["Tokyo and Osaka", "Hiroshima and Nagasaki", "Berlin and Dresden", "Kyoto and Nagoya"],
        correctAnswer: "Hiroshima and Nagasaki"
    },
    {
        question: "What major event brought the United States into World War II?",
        options: ["Invasion of Poland", "Fall of France", "Bombing of Pearl Harbor", "Assassination of a president"],
        correctAnswer: "Bombing of Pearl Harbor"
    },
    {
        question: "In which year did World War I begin?",
        options: ["1912", "1914", "1916", "1918"],
        correctAnswer: "1914"
    },
    {
        question: "Who was the Prime Minister of Britain during most of World War II?",
        options: ["Winston Churchill", "Neville Chamberlain", "Tony Blair", "Margaret Thatcher"],
        correctAnswer: "Winston Churchill"
    },

    // CEOs of Tech Companies
    {
        question: "Who is the CEO of YouTube?",
        options: ["Neal Mohan", "Sundar Pichai", "Susan Wojcicki", "Kevin Systrom"],
        correctAnswer: "Neal Mohan"
    },
    {
        question: "Who is the CEO of Snapchat?",
        options: ["Evan Spiegel", "Bobby Murphy", "Brian Chesky", "Travis Kalanick"],
        correctAnswer: "Evan Spiegel"
    },
    {
        question: "Who is the CEO of OpenAI, the maker of ChatGPT?",
        options: ["Sam Altman", "Demis Hassabis", "Elon Musk", "Satya Nadella"],
        correctAnswer: "Sam Altman"
    },
    {
        question: "Who is the CEO of Spotify?",
        options: ["Daniel Ek", "Tim Cook", "Jeff Bezos", "Evan Spiegel"],
        correctAnswer: "Daniel Ek"
    },
    {
        question: "Who is the CEO of Instagram (under Meta)?",
        options: ["Kevin Systrom", "Adam Mosseri", "Mark Zuckerberg", "Chris Cox"],
        correctAnswer: "Adam Mosseri"
    },
    {
        question: "Who is the CEO of Telegram Messenger?",
        options: ["Pavel Durov", "Jan Koum", "Brian Acton", "Niklas Zennström"],
        correctAnswer: "Pavel Durov"
    },
    {
        question: "Who is the CEO of Meta (formerly Facebook)?",
        options: ["Tim Cook", "Sundar Pichai", "Satya Nadella", "Mark Zuckerberg"],
        correctAnswer: "Mark Zuckerberg"
    },
    {
        question: "Who is the CEO of X (formerly Twitter)?",
        options: ["Elon Musk", "Jack Dorsey", "Linda Yaccarino", "Parag Agrawal"],
        correctAnswer: "Linda Yaccarino"
    },
    {
        question: "Who is the CEO of TikTok?",
        options: ["Shou Zi Chew", "Zhang Yiming", "Lei Jun", "Evan Spiegel"],
        correctAnswer: "Shou Zi Chew"
    },
    {
        question: "Who is the CEO of Paytm (India)?",
        options: ["Vijay Shekhar Sharma", "Kunal Shah", "Nandan Nilekani", "Rajeev Chandrasekhar"],
        correctAnswer: "Vijay Shekhar Sharma"
    },
    {
        question: "Who is the CEO of WhatsApp (Meta-owned)?",
        options: ["Jan Koum", "Will Cathcart", "Brian Acton", "Adam Mosseri"],
        correctAnswer: "Will Cathcart"
    },
    {
        question: "Who is the CEO of Netflix?",
        options: ["Reed Hastings", "Bob Iger", "Ted Sarandos", "Tim Sweeney"],
        correctAnswer: "Ted Sarandos"
    },
    {
        question: "Who is the CEO of Discord?",
        options: ["Daniel Ek", "Jason Citron", "Drew Houston", "Kevin Systrom"],
        correctAnswer: "Jason Citron"
    },
    {
        question: "Who is the CEO of Epic Games (creator of Fortnite)?",
        options: ["Tim Sweeney", "Markus Persson", "Gabe Newell", "Jensen Huang"],
        correctAnswer: "Tim Sweeney"
    },
    {
        question: "Who is the CEO of OYO Rooms?",
        options: ["Deepinder Goyal", "Ritesh Agarwal", "Vijay Shekhar Sharma", "Kunal Bahl"],
        correctAnswer: "Ritesh Agarwal"
    },
    {
        question: "Who is the CEO of Reddit?",
        options: ["Alexis Ohanian", "Steve Huffman", "Jack Dorsey", "Ben Silbermann"],
        correctAnswer: "Steve Huffman"
    },
    {
        question: "Who is the CEO of LinkedIn (Microsoft-owned)?",
        options: ["Satya Nadella", "Ryan Roslansky", "Jeff Weiner", "Sundar Pichai"],
        correctAnswer: "Ryan Roslansky"
    },
    {
        question: "Who is the CEO of Swiggy (India-based food delivery app)?",
        options: ["Deepinder Goyal", "Sriharsha Majety", "Nandan Nilekani", "Nikhil Kamath"],
        correctAnswer: "Sriharsha Majety"
    },

    // Crypto & Blockchain
    {
        question: "Which of these apps is a decentralized crypto wallet, not an exchange?",
        options: ["Binance", "MetaMask", "CoinDCX", "WazirX"],
        correctAnswer: "MetaMask"
    },
    {
        question: "Which cryptocurrency app is most widely used in the United States?",
        options: ["Binance", "CoinDCX", "Coinbase", "Crypto.com"],
        correctAnswer: "Coinbase"
    },
    {
        question: "What is MetaMask primarily used for?",
        options: ["Buying Bitcoin", "Storing NFTs and using Web3 apps", "Watching crypto news", "Generating taxes"],
        correctAnswer: "Storing NFTs and using Web3 apps"
    },
    {
        question: "Which Indian crypto app was acquired by Binance in 2019 (though ownership later disputed)?",
        options: ["CoinDCX", "WazirX", "Bitbns", "ZebPay"],
        correctAnswer: "WazirX"
    },
    {
        question: "Which exchange collapsed in 2022, causing a massive loss in the global crypto market?",
        options: ["Binance", "FTX", "Coinbase", "Bitfinex"],
        correctAnswer: "FTX"
    },
    {
        question: "Which company owns Trust Wallet?",
        options: ["Coinbase", "Meta", "Binance", "Ripple"],
        correctAnswer: "Binance"
    },
    {
        question: "Who is credited as the creator of Bitcoin and the concept of blockchain?",
        options: ["Vitalik Buterin", "Charles Hoskinson", "Satoshi Nakamoto", "Brian Armstrong"],
        correctAnswer: "Satoshi Nakamoto"
    },
    {
        question: "Which blockchain platform is primarily used for smart contracts and decentralized applications (dApps)?",
        options: ["Bitcoin", "Ethereum", "Litecoin", "Ripple"],
        correctAnswer: "Ethereum"
    },
    {
        question: "What does 'DeFi' stand for in blockchain technology?",
        options: ["Defined Finance", "Digital Federation", "Decentralized Finance", "Derivative Functions"],
        correctAnswer: "Decentralized Finance"
    },
    {
        question: "Which consensus mechanism is used by Bitcoin?",
        options: ["Proof of Stake", "Delegated Proof", "Proof of Work", "Byzantine Fault Tolerance"],
        correctAnswer: "Proof of Work"
    },
    {
        question: "Which blockchain is known for its low fees and high-speed transactions, often used in gaming and NFTs?",
        options: ["Ethereum", "Solana", "Bitcoin", "Monero"],
        correctAnswer: "Solana"
    },
    {
        question: "Which programming language is most commonly used to write smart contracts on Ethereum?",
        options: ["Python", "Solidity", "Java", "Rust"],
        correctAnswer: "Solidity"
    },

    // General Technology
    {
        question: "What does 'IoT' stand for in technology?",
        options: ["Internet of Tasks", "Interface of Tech", "Internet of Things", "Input of Technology"],
        correctAnswer: "Internet of Things"
    },
    {
        question: "What does 'CPU' stand for?",
        options: ["Central Processing Unit", "Core Program Unit", "Computer Power Utility", "Central Peripheral Unit"],
        correctAnswer: "Central Processing Unit"
    },
    {
        question: "What is the primary function of RAM in a computer?",
        options: ["To store permanent files", "To manage internet speed", "To handle temporary memory and multitasking", "To power the CPU"],
        correctAnswer: "To handle temporary memory and multitasking"
    },
    {
        question: "Who is the CEO of Microsoft (as of 2024)?",
        options: ["Satya Nadella", "Bill Gates", "Jeff Bezos", "Tim Cook"],
        correctAnswer: "Satya Nadella"
    },
    {
        question: "What is the name of the AI chatbot developed by OpenAI?",
        options: ["AlphaGo", "DeepMind", "ChatGPT", "GPTTube"],
        correctAnswer: "ChatGPT"
    },
    {
        question: "What does '5G' refer to in mobile technology?",
        options: ["5th Generation of internet devices", "5 Gigabytes of data", "5th Generation wireless network technology", "5 Google services"],
        correctAnswer: "5th Generation wireless network technology"
    },
    {
        question: "What does 'AI' stand for in technology?",
        options: ["Advanced Interface", "Automated Internet", "Artificial Intelligence", "Applied Infrastructure"],
        correctAnswer: "Artificial Intelligence"
    },
    {
        question: "Who is the CEO of Apple Inc. (as of 2024)?",
        options: ["Steve Jobs", "Sundar Pichai", "Tim Cook", "Satya Nadella"],
        correctAnswer: "Tim Cook"
    },
    {
        question: "Which company owns the Android operating system?",
        options: ["Apple", "Microsoft", "Google", "Samsung"],
        correctAnswer: "Google"
    },

    // Cybersecurity & Data Privacy
    {
        question: "What does 'VPN' stand for in cybersecurity?",
        options: ["Virtual Private Network", "Verified Protocol Node", "Voice Privacy Network", "Virtual Protected Net"],
        correctAnswer: "Virtual Private Network"
    },
    {
        question: "What kind of malware demands payment to unlock your data?",
        options: ["Spyware", "Ransomware", "Worm", "Trojan"],
        correctAnswer: "Ransomware"
    },
    {
        question: "What is the strongest method for securing online accounts?",
        options: ["Password only", "2-Factor Authentication (2FA)", "Username only", "SMS confirmation"],
        correctAnswer: "2-Factor Authentication (2FA)"
    },
    {
        question: "What does 'HTTPS' in a website URL indicate?",
        options: ["Hacker-protected system", "High-speed internet", "Secure and encrypted connection", "HTML-powered site"],
        correctAnswer: "Secure and encrypted connection"
    },
    {
        question: "What is phishing?",
        options: ["A virus cleaner", "Hacking software", "Fraud attempt to steal sensitive information by pretending to be trustworthy", "A type of firewall"],
        correctAnswer: "Fraud attempt to steal sensitive information by pretending to be trustworthy"
    },
    {
        question: "What does 'end-to-end encryption' ensure?",
        options: ["Data is shared with advertisers", "Messages can be read only by sender and receiver", "Only phone companies can read your messages", "Messages are public by default"],
        correctAnswer: "Messages can be read only by sender and receiver"
    },
    {
        question: "What kind of attack involves overwhelming a server with traffic?",
        options: ["Spyware", "Keylogging", "DDoS Attack", "Phishing"],
        correctAnswer: "DDoS Attack"
    },
    {
        question: "What does GDPR stand for?",
        options: ["General Data Protection Regulation", "Global Data Privacy Rule", "Government Digital Protection Regulation", "General Data Privacy Resolution"],
        correctAnswer: "General Data Protection Regulation"
    },
    {
        question: "What is the name of India’s main personal data protection law passed in 2023?",
        options: ["Information Technology Act", "Cyber Law India Act", "Digital Personal Data Protection Act", "Data Privacy Act"],
        correctAnswer: "Digital Personal Data Protection Act"
    },
    {
        question: "What is required from users before collecting their personal data under most data laws?",
        options: ["Payment", "Consent", "Aadhar card", "Internet connection"],
        correctAnswer: "Consent"
    },

    // Child Safety & Cyberbullying
    {
        question: "What does COPPA stand for in the context of online child safety?",
        options: ["Children's Online Protection & Privacy Act", "Child-Oriented Personal Protection Act", "Children's Online Privacy Protection Act", "Cyber Online Parental Policy Act"],
        correctAnswer: "Children's Online Privacy Protection Act"
    },
    {
        question: "At what age does COPPA restrict companies from collecting personal data without parental consent?",
        options: ["Under 18", "Under 16", "Under 13", "Under 10"],
        correctAnswer: "Under 13"
    },
    {
        question: "What is cyberbullying?",
        options: ["Playing games online", "Sending friendly messages", "Using technology to harass, threaten, or humiliate someone", "Posting news articles"],
        correctAnswer: "Using technology to harass, threaten, or humiliate someone"
    },
    {
        question: "What should you do if you witness cyberbullying?",
        options: ["Ignore it", "Like the post", "Report it to the platform or a trusted adult", "Join in"],
        correctAnswer: "Report it to the platform or a trusted adult"
    },
    {
        question: "What Indian law deals with cyberbullying and online harassment?",
        options: ["Right to Education Act", "IT Act 2000 (Section 66A and others)", "Motor Vehicles Act", "Civil Code Act"],
        correctAnswer: "IT Act 2000 (Section 66A and others)"
    },
    {
        question: "What should you never do in response to cyberbullying?",
        options: ["Report the abuser", "Save evidence", "Bully them back", "Talk to someone you trust"],
        correctAnswer: "Bully them back"
    },

    // Online Safety Tools & The Dark Web
    {
        question: "What is the main function of antivirus software?",
        options: ["Speed up games", "Block ads", "Detect and remove malicious software", "Increase battery life"],
        correctAnswer: "Detect and remove malicious software"
    },
    {
        question: "What does a firewall do in a computer or network?",
        options: ["Stores data", "Controls incoming and outgoing traffic for security", "Opens websites faster", "Backs up photos"],
        correctAnswer: "Controls incoming and outgoing traffic for security"
    },
    {
        question: "What is the purpose of a password manager?",
        options: ["Manage mobile apps", "Store and auto-fill strong, unique passwords securely", "Monitor screen time", "Increase internet speed"],
        correctAnswer: "Store and auto-fill strong, unique passwords securely"
    },
    {
        question: "Which app helps parents monitor their child’s online activities?",
        options: ["WhatsApp", "Google Family Link", "Chrome", "Uber"],
        correctAnswer: "Google Family Link"
    },
    {
        question: "Which browser is known for its privacy features like tracker blocking and HTTPS upgrades?",
        options: ["Brave", "Internet Explorer", "UC Browser", "Opera Mini"],
        correctAnswer: "Brave"
    },
    {
        question: "What is the 'dark web'?",
        options: ["A website with dark backgrounds", "A part of the internet not indexed by search engines", "A type of Wi-Fi network", "A secure government server"],
        correctAnswer: "A part of the internet not indexed by search engines"
    },
    {
        question: "Which browser is commonly used to access the dark web?",
        options: ["Chrome", "Brave", "Tor", "Safari"],
        correctAnswer: "Tor"
    },
    {
        question: "Is all activity on the dark web illegal?",
        options: ["Yes, everything", "No, it also includes anonymous communication for privacy and journalism", "Only buying Bitcoin", "Only downloading games"],
        correctAnswer: "No, it also includes anonymous communication for privacy and journalism"
    },

    // Digital Identity
    {
        question: "What is digital identity?",
        options: ["A computer brand", "The digital footprint left by someone else", "The online information used to identify a person", "A gaming profile"],
        correctAnswer: "The online information used to identify a person"
    },
    {
        question: "Which of the following can be part of your digital identity?",
        options: ["Email address", "Social media accounts", "Browsing history", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "What is identity theft in the digital world?",
        options: ["Playing someone’s playlist", "Using another person’s personal data for fraud", "Sharing memes", "Posting fake news"],
        correctAnswer: "Using another person’s personal data for fraud"
    },
    {
        question: "What is the safest way to protect your digital identity?",
        options: ["Use public Wi-Fi without protection", "Use the same password everywhere", "Enable 2FA and use strong, unique passwords", "Share login info with friends"],
        correctAnswer: "Enable 2FA and use strong, unique passwords"
    },
    {
        question: "What does a data breach mean?",
        options: ["Losing your phone", "An app going offline", "Unauthorized access and leak of personal data from a system", "Changing your password"],
        correctAnswer: "Unauthorized access and leak of personal data from a system"
    },
    {
        question: "Which of the following should NOT be shared online to protect your identity?",
        options: ["Favorite movie", "Aadhar number or government ID", "Public email for contact", "Pet photos"],
        correctAnswer: "Aadhar number or government ID"
    },
    {
        question: "How can you monitor if your personal data has been compromised in a breach?",
        options: ["Use breach alert tools like 'Have I Been Pwned'", "Ask friends", "Reboot your phone", "Change wallpaper"],
        correctAnswer: "Use breach alert tools like 'Have I Been Pwned'"
    }
];
