// Global variables
let currentMouseX = 0;
let currentMouseY = 0;

// Track mouse position for flying button
document.addEventListener('mousemove', (e) => {
    currentMouseX = e.clientX;
    currentMouseY = e.clientY;
});

// Main function for pet selection - now fully frontend
async function tellMeWhatYouThink() {
    const nameInput = document.getElementById('nameInput');
    const selectedPet = document.querySelector('input[name="pet"]:checked');
    
    // Validation
    if (!nameInput.value.trim()) {
        alert('Please enter your name!');
        nameInput.focus();
        return;
    }
    
    if (!selectedPet) {
        alert('Please select a pet!');
        return;
    }
    
    const name = nameInput.value.trim();
    
    // Check if name is too long (>50 characters)
    if (name.length > 50) {
        showPayloadTooLarge();
        return;
    }
    
    const pet = selectedPet.value;
    
    // Frontend logic for different pet responses
    let response = {};
    
    switch(pet.toLowerCase()) {
        case 'cat':
            response = {
                type: 'celebration',
                message: `meow ${name} that is the best pet.`,
                special: 'celebration'
            };
            break;
        case 'dog':
            response = {
                type: 'simple',
                message: 'boof boof',
                special: 'none'
            };
            break;
        case 'bird':
            response = {
                type: 'flying',
                message: 'tweet tweet',
                special: 'flying_button'
            };
            break;
        case 'fish':
            response = {
                type: 'simple',
                message: 'Very fooshy, very demure',
                special: 'none'
            };
            break;
        case 'lizard':
            response = {
                type: 'lizard_queen',
                message: 'I AM THE LIZARD QUEEN',
                special: 'fullscreen_flash'
            };
            break;
        default:
            response = {
                type: 'simple',
                message: 'Please select a valid pet!',
                special: 'none'
            };
    }
    
    // Handle different response types
    switch (response.special) {
        case 'celebration':
            showCelebration(response.message);
            break;
        case 'flying_button':
            showFlyingButton(response.message);
            break;
        case 'fullscreen_flash':
            showLizardQueen();
            break;
        default:
            showSimpleResponse(response.message);
    }
}

// Show celebration for cat selection
function showCelebration(message) {
    const responseArea = document.getElementById('responseArea');
    const responseMessage = document.getElementById('responseMessage');
    
    responseMessage.innerHTML = `<div class="celebration cat-ears">${message}</div>`;
    responseArea.className = 'response-visible';
    
    // Add some confetti effect
    createConfetti();
}

// Show simple response (dog, fish)
function showSimpleResponse(message) {
    const responseArea = document.getElementById('responseArea');
    const responseMessage = document.getElementById('responseMessage');
    
    // Check if this is a fish response
    if (message.toLowerCase().includes('fooshy') || message.toLowerCase().includes('demure')) {
        responseMessage.innerHTML = `
            <div class="fish-response">
                <h2 class="text-warning fish-text">${message}</h2>
                <div style="font-size: 3rem; margin-top: 1rem;">🌊🐠🌊</div>
            </div>
        `;
    } else {
        responseMessage.innerHTML = `<h2 class="text-warning">${message}</h2>`;
    }
    
    responseArea.className = 'response-visible';
}

// Show payload too large message
function showPayloadTooLarge() {
    const responseArea = document.getElementById('responseArea');
    const responseMessage = document.getElementById('responseMessage');
    
    responseMessage.innerHTML = `
        <div class="text-center">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🍆👀</div>
            <h2 class="text-warning">Sorry, your payload is too large</h2>
        </div>
    `;
    responseArea.className = 'response-visible';
}

// Show flying button for bird selection
function showFlyingButton(message) {
    const flyingButton = document.getElementById('flyingButton');
    const responseArea = document.getElementById('responseArea');
    
    // Position button near the submit button initially
    const submitBtn = document.getElementById('submitBtn');
    const rect = submitBtn.getBoundingClientRect();
    
    flyingButton.style.left = rect.left + 'px';
    flyingButton.style.top = rect.top + 'px';
    flyingButton.className = 'flying-button active';
    
    // Update button text
    flyingButton.querySelector('button').textContent = message;
    
    // Show background response after a delay
    setTimeout(() => {
        const responseMessage = document.getElementById('responseMessage');
        responseMessage.innerHTML = `<h2 class="text-warning">The bird has flown away!</h2>`;
        responseArea.className = 'response-visible';
        
        // Hide flying button
        flyingButton.className = 'flying-button';
    }, 2000);
    
    // Make the flying button follow the mouse for a bit
    setTimeout(() => {
        startChasingMouse();
    }, 500);
}

// Make button chase mouse (then fly away)
function startChasingMouse() {
    const flyingButton = document.getElementById('flyingButton');
    let chaseInterval;
    let chaseCount = 0;
    
    chaseInterval = setInterval(() => {
        if (chaseCount > 10) { // Stop chasing after 10 updates
            clearInterval(chaseInterval);
            return;
        }
        
        const buttonRect = flyingButton.getBoundingClientRect();
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        const buttonCenterY = buttonRect.top + buttonRect.height / 2;
        
        // Calculate distance and move towards mouse (but not too fast)
        const deltaX = (currentMouseX - buttonCenterX) * 0.3;
        const deltaY = (currentMouseY - buttonCenterY) * 0.3;
        
        flyingButton.style.left = (buttonRect.left + deltaX) + 'px';
        flyingButton.style.top = (buttonRect.top + deltaY) + 'px';
        
        chaseCount++;
    }, 100);
}

// Show lizard queen fullscreen
function showLizardQueen() {
    const lizardQueen = document.getElementById('lizardQueen');
    lizardQueen.className = 'lizard-queen-overlay active';
    
    // Play dramatic sound effect (if available)
    playLizardQueenSound();
}

// Close lizard queen overlay
function closeLizardQueen() {
    const lizardQueen = document.getElementById('lizardQueen');
    lizardQueen.className = 'lizard-queen-overlay';
}

// Reset form to initial state (but keep the name)
function resetForm() {
    // Hide all overlays
    document.getElementById('responseArea').className = 'response-hidden';
    document.getElementById('flyingButton').className = 'flying-button';
    document.getElementById('lizardQueen').className = 'lizard-queen-overlay';
    
    // Clear pet selection but keep the name
    const selectedPet = document.querySelector('input[name="pet"]:checked');
    if (selectedPet) {
        selectedPet.checked = false;
    }
    
    // Focus on name input (but don't clear the value)
    document.getElementById('nameInput').focus();
}

// Create confetti effect for celebration
function createConfetti() {
    const colors = ['#ffc107', '#ffb300', '#ff9800', '#f57f17'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '999';
    
    document.body.appendChild(confettiContainer);
    
    // Create multiple confetti pieces
    for (let i = 0; i < 50; i++) {
        setTimeout(() => createConfettiPiece(confettiContainer, colors), i * 50);
    }
    
    // Remove confetti container after animation
    setTimeout(() => {
        if (confettiContainer.parentNode) {
            confettiContainer.parentNode.removeChild(confettiContainer);
        }
    }, 3000);
}

function createConfettiPiece(container, colors) {
    const confetti = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    confetti.style.position = 'absolute';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
    
    container.appendChild(confetti);
    
    // Remove individual confetti piece after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, 4000);
}

// Add confetti animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Attempt to play sound for lizard queen (optional)
function playLizardQueenSound() {
    try {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // A note
        oscillator.type = 'square';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Audio not supported or blocked');
    }
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        resetForm();
    }
    
    if (e.key === 'Enter') {
        const responseArea = document.getElementById('responseArea');
        if (responseArea.className === 'response-hidden') {
            tellMeWhatYouThink();
        }
    }
});

// Initialize focus on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nameInput').focus();
});
