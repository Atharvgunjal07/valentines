// ===================================
// CONFIGURATION
// ===================================

const DEBUG_MODE = true; // Set to true to unlock all gifts for testing

const GIFT_CONTENT = {
    rose: {
        title: "Rose Day",
        subtitle: "A Symbol of Eternal Love",
        letter: `
            <p>For your first virtual valentines surprise I have nothing but the promise that I will never stop 
            unloving, unsurprising or un-tying to impress you everyday. Like this sacred flower reperesenting love I surrender
            my feelings and offer their smell. beauty and shades...light and dark to your feet. Happy Rose day. 
            Love you </p>
    
        `,
        imageUrl: "4.jpeg"
    },
    propose: {
        title: "Propose Day",
        subtitle: "A Question from the Heart",
        letter: `
            <p> The second surprise reminds me of an oath, a sacred one. A proposal that is as eternaal as the stars above us. 
            Will you be my valentine? Our names will in sometime travel to distance no human has ever vetured out in deep space.
            and in all that distance my heart still won't want anything but to be near your, to be yours and laugh with you to grow old
            and look into your eyes with all the love i have in my power, so i propose for us to be intertwined in the fabric of 
            space-time and in itself in body and soul. 
            Love you </p>
            
        `,
        imageUrl: "photo127.jpeg"
    },
    chocolate: {
        title: "Chocolate Day",
        subtitle: "Sweetness in Every Moment",
        letter: `
            <p> Dark chocaltes and dutch truffle are on the house ! but most importantly the best type of chocolate I can 
            give you is my coffee with some pastries. I love making you eat them with my hands and to make you coffee. 
            You are the chocalate of my life, full of antioxdants, tasty and I like it when its liquid and melted, hahaha 
            Love you </p>
        
        `,
        imageUrl: "10.jpeg"
    },
    teddy: {
        title: "Teddy Day",
        subtitle: "A Hug That Lasts Forever",
        letter: `
            <p>From your forever teddy, a very happy teddy day to you. I can't rn physcially give you one but you always have me yk that right?
            you can squeeze, stroke and bounce on me anytime you want! hahah and the best part this teddy comes with lifetime gurantee + a super natural vbrator ( haha ) 
            If you could be here physically rn I would just not leave you until I smeel like you, you are what makes everything worth it, like a small child hugs his teddy 
            and sleeps in the night I need you the same, with you tucked in me and giving the comfort of a true home. Please hug me asap. SOS call. 
            Love you and a happ teddy day to my Kuskisaurus </p>
        
        `,
        imageUrl: "photo25.jpeg"
    },
    promise: {
        title: "Promise Day",
        subtitle: "Vows Written in Starlight",
        letter: `
            <p> Well on this promise day, I promise you that I will always keep on try to be better for you, 
            be conistent in my actions resonating with my words and promises, promise to be the best supporter, always help you in
            your passions & aspirations. I promise to be your safe heaven, your shelter in the storm, your constant source of strength and Love. I promise to nerver let go of your hand 
            even when everything seems dark and hope lost, I even in times when will surely doubt myself promise to trust you and walk with you even when life tests me and us to the utmost 
            limits, knowing not everything but knowing that in the turmoil I have you with me, hand in hand. That is my promise...to even when uncertainity rains be certain that I will be at your side. 
           ( also promsie for the best sex sessions hahaha )
            Love you always</p>
           
        `,
        imageUrl: "11.jpeg"
    },
    hug: {
        title: "Hug Day",
        subtitle: "The Language of Comfort",
        letter: `
            <p>Happy hug day to my favourite person to hold close. In your arms, I find my home—that sacred space where the world fades away and it's just us, heartbeat to heartbeat, breathing in sync. 
            I promise to be your shelter when storms rage, your comfort when days feel heavy, and your celebration when joy overflows. Whether it's a tight squeeze that says "I've got you," a gentle embrace that whispers "you're safe," 
            or those playful bear hugs that end in laughter—every hug with you feels like coming home. 
            I want to hold you through every season, every mood, every moment...
             until we're old and grey, still wrapped up in each other. 
             Love you endlessly.</p>
           
        `,
        imageUrl: "13.JPG"
    },
    kiss: {
        title: "Kiss Day",
        subtitle: "Where Words Fail",
        letter: `
            <p> On this kiss day, I want to seal every promise, every whisper, every dream with the warmth of my lips against yours. Each kiss is a language we speak in silence—soft, passionate, playful, deep—a conversation where our souls meet and our hearts sync in perfect rhythm. I promise to kiss away your worries, 
            to wake you with gentle pecks, to steal kisses when you least expect them, and to make every kiss feel like the first time all over again. From quick stolen moments to those long, breath-taking ones that make time stop... 
            I want them all with you, forever. Love you, and happy kiss day to the lips I could never get tired of.
            Love you </p>
           
        `,
        imageUrl: "12.jpg"
    },
    valentine: {
        title: "Valentine's Day",
        subtitle: "The Culmination of Love",
        letter: `
            <p>My dearest Shrutika,
            I LOVE YOU and a happy valentine's day to you, my kuskisaurus and my best friend. 
            no amount of words can describe how much I am grateful to have you in my life. 
            You are my everything, a beacon of hope in dark times and always the one I turn to when I need strength. 
            Love you more then anything in this world. 
           
        `,
        imageUrl: "9.jpeg"
    }
};

// ===================================
// STATE MANAGEMENT
// ===================================

let currentDay = null;
const today = new Date();

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    updateCurrentDate();
    updateCardStates();
    attachEventListeners();
    initializeConfetti();
}

// ===================================
// DATE & TIME LOGIC
// ===================================

function updateCurrentDate() {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = today.toLocaleDateString('en-US', options);
    document.getElementById('currentDate').textContent = dateString;
}

function getCardState(cardDate) {
    const [year, month, day] = cardDate.split('-').map(Number);
    const giftDate = new Date(year, month - 1, day);
    
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const giftMidnight = new Date(giftDate.getFullYear(), giftDate.getMonth(), giftDate.getDate());
    
    if (DEBUG_MODE) {
        return 'unlocked';
    }
    
    if (giftMidnight > todayMidnight) {
        const timeDiff = giftMidnight - todayMidnight;
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return { state: 'locked', daysRemaining };
    } else if (giftMidnight.getTime() === todayMidnight.getTime()) {
        return 'unlocked';
    } else {
        return 'opened';
    }
}

// ===================================
// CARD STATE MANAGEMENT
// ===================================

function updateCardStates() {
    const cards = document.querySelectorAll('.gift-day');
    
    cards.forEach(card => {
        const cardDate = card.getAttribute('data-date');
        const state = getCardState(cardDate);
        const statusBadge = card.querySelector('.status-badge');
        
        card.classList.remove('locked', 'unlocked', 'opened');
        
        if (typeof state === 'object' && state.state === 'locked') {
            card.classList.add('locked');
            statusBadge.innerHTML = `🔒 ${state.daysRemaining}d`;
            card.style.cursor = 'not-allowed';
        } else if (state === 'unlocked') {
            card.classList.add('unlocked');
            statusBadge.innerHTML = '💝 Open Gift';
            card.style.cursor = 'pointer';
        } else if (state === 'opened') {
            card.classList.add('opened');
            statusBadge.innerHTML = '🔄 Replay';
            card.style.cursor = 'pointer';
        }
    });
}

// ===================================
// EVENT LISTENERS
// ===================================

function attachEventListeners() {
    const cards = document.querySelectorAll('.gift-day');
    const closeButton = document.getElementById('closeStage');
    
    cards.forEach(card => {
        card.addEventListener('click', handleCardClick);
    });
    
    closeButton.addEventListener('click', closeStage);
}

function handleCardClick(event) {
    const card = event.currentTarget;
    
    if (card.classList.contains('locked')) {
        return;
    }
    
    const day = card.getAttribute('data-day');
    currentDay = day;
    
    openStage(day);
}

// ===================================
// CURTAIN & STAGE MECHANICS
// ===================================

function openStage(day) {
    const curtainContainer = document.getElementById('curtainContainer');
    const stageOverlay = document.getElementById('stageOverlay');
    const gridView = document.getElementById('gridView');
    
    curtainContainer.style.pointerEvents = 'all';
    curtainContainer.classList.add('closing');
    curtainContainer.classList.remove('opening');
    
    setTimeout(() => {
        gridView.style.display = 'none';
        stageOverlay.classList.add('active');
        stageOverlay.style.opacity = '1';
        
        populateStage(day);
        
        curtainContainer.classList.remove('closing');
        curtainContainer.classList.add('opening');
        
        setTimeout(() => {
            launchConfetti();
            curtainContainer.style.pointerEvents = 'none';
        }, 500);
        
    }, 1500);
}

function closeStage() {
    const curtainContainer = document.getElementById('curtainContainer');
    const stageOverlay = document.getElementById('stageOverlay');
    const gridView = document.getElementById('gridView');
    
    curtainContainer.style.pointerEvents = 'all';
    curtainContainer.classList.add('closing');
    curtainContainer.classList.remove('opening');
    
    setTimeout(() => {
        stageOverlay.classList.remove('active');
        stageOverlay.style.opacity = '0';
        gridView.style.display = 'block';
        
        curtainContainer.classList.remove('closing');
        curtainContainer.classList.add('opening');
        
        setTimeout(() => {
            curtainContainer.style.pointerEvents = 'none';
        }, 1500);
        
    }, 1500);
}

// ===================================
// STAGE CONTENT POPULATION
// ===================================

function populateStage(day) {
    const content = GIFT_CONTENT[day];
    const stageContent = document.getElementById('stageContent');
    
    let visualHTML = '';
    
    if (content.imageUrl && content.imageUrl.trim() !== '') {
        visualHTML = `
            <div class="stage-visual">
                <img src="${content.imageUrl}" alt="${content.title}" class="stage-image">
            </div>
        `;
    } else {
        visualHTML = `
            <div class="stage-visual">
                <div class="stage-image-placeholder">
                    📸 Add your photo URL in script.js<br>
                    <small style="font-size: 0.9rem; margin-top: 1rem; display: block;">GIFT_CONTENT.${day}.imageUrl</small>
                </div>
            </div>
        `;
    }
    
    const stageHTML = `
        <div class="stage-header">
            <h1 class="stage-title">${content.title}</h1>
            <p class="stage-subtitle">${content.subtitle}</p>
        </div>
        
        ${visualHTML}
        
        <div class="stage-letter">
            <div class="letter-text">
                ${content.letter}
            </div>
            <div class="letter-signature">With all my love ❤️</div>
        </div>
    `;
    
    stageContent.innerHTML = stageHTML;
}

// ===================================
// CONFETTI SYSTEM
// ===================================

let confettiCanvas, confettiCtx, confettiParticles = [];

function initializeConfetti() {
    confettiCanvas = document.getElementById('confettiCanvas');
    confettiCtx = confettiCanvas.getContext('2d');
    
    resizeConfettiCanvas();
    window.addEventListener('resize', resizeConfettiCanvas);
}

function resizeConfettiCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
}

function launchConfetti() {
    const colors = ['#e3e98d', '#9fa764', '#613c4e', '#d9d8d0', '#31243f'];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
        confettiParticles.push({
            x: Math.random() * confettiCanvas.width,
            y: -20,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocityY: Math.random() * 3 + 2,
            velocityX: Math.random() * 4 - 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            opacity: 1
        });
    }
    
    animateConfetti();
}

function animateConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    confettiParticles.forEach((particle, index) => {
        particle.y += particle.velocityY;
        particle.x += particle.velocityX;
        particle.rotation += particle.rotationSpeed;
        particle.velocityY += 0.1;
        
        if (particle.y > confettiCanvas.height - 100) {
            particle.opacity -= 0.02;
        }
        
        if (particle.y > confettiCanvas.height + 20 || particle.opacity <= 0) {
            confettiParticles.splice(index, 1);
            return;
        }
        
        confettiCtx.save();
        confettiCtx.globalAlpha = particle.opacity;
        confettiCtx.translate(particle.x, particle.y);
        confettiCtx.rotate(particle.rotation * Math.PI / 180);
        confettiCtx.fillStyle = particle.color;
        confettiCtx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 1.5);
        confettiCtx.restore();
    });
    
    if (confettiParticles.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
}

// ===================================
// CONSOLE EASTER EGG
// ===================================

console.log('%c💝 Valentine\'s Week Gift 💝', 'font-size: 20px; color: #e3e98d; font-weight: bold;');
console.log('%cMade with love for Shrutika ✨', 'font-size: 14px; color: #9fa764;');
if (DEBUG_MODE) {
    console.log('%c🔧 DEBUG MODE ACTIVE', 'font-size: 12px; color: #e3e98d; background: #31243f; padding: 5px;');
}

// ===================================
// LOADING SCREEN
// ===================================

window.addEventListener('load', () => {
    // Wait for bouquet animation to complete (2.5 seconds)
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('fade-out');
        
        // Remove from DOM after fade out
        setTimeout(() => {
            loadingScreen.remove();
        }, 1000);
    }, 3000);
});







