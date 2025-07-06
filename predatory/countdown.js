// Copilot: do not overwrite
// Predatory Countdown Timer - Creates false urgency and psychological pressure

/**
 * Main countdown functionality with psychological manipulation tactics
 */
export function startCountdown(seconds = 300) {
  const display = document.getElementById('countdown-display');
  if (!display) return;
  
  let remaining = seconds;
  let hasResetOnce = false;
  
  const interval = setInterval(() => {
    if (remaining <= 0) {
      // Reset countdown to create false urgency - never actually expires
      if (!hasResetOnce) {
        remaining = Math.floor(seconds * 0.8); // Slightly shorter "final" countdown
        hasResetOnce = true;
        showUrgencyBoost();
      } else {
        remaining = seconds; // Full reset
        hasResetOnce = false;
      }
    }
    
    // Format time display
    const minutes = Math.floor(remaining / 60);
    const secs = remaining % 60;
    display.textContent = `${minutes}:${secs.toString().padStart(2, '0')}`;
    
    // Visual urgency escalation
    if (remaining <= 60) {
      display.style.color = '#ff0000';
      display.style.fontWeight = 'bold';
      display.style.animation = 'urgentBlink 0.5s infinite';
      
      // Add screen shake effect
      if (remaining <= 30) {
        document.body.style.animation = 'shake 0.1s infinite';
      }
    } else if (remaining <= 120) {
      display.style.color = '#ff6600';
      display.style.fontWeight = 'bold';
    } else {
      display.style.color = '#ffff00';
      display.style.fontWeight = 'normal';
      display.style.animation = 'none';
      document.body.style.animation = 'none';
    }
    
    remaining--;
  }, 1000);
  
  return interval;
}

/**
 * Shows additional urgency messaging when countdown "resets"
 */
function showUrgencyBoost() {
  const urgencyMsg = document.createElement('div');
  urgencyMsg.className = 'countdown-reset-message';
  urgencyMsg.innerHTML = `
    <div class="reset-content">
      <h3>🚨 FINAL WARNING!</h3>
      <p>This offer has been extended for you personally!</p>
      <p>But this is truly your last chance!</p>
      <button onclick="this.parentElement.parentElement.remove()">I understand</button>
    </div>
  `;
  
  urgencyMsg.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: urgencyFlash 0.5s ease-in;
  `;
  
  document.body.appendChild(urgencyMsg);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (urgencyMsg.parentElement) {
      urgencyMsg.remove();
    }
  }, 5000);
}

/**
 * Creates multiple countdown timers for different sections
 */
export function initializeMultipleCountdowns() {
  // Main hero countdown
  startCountdown(300);
  
  // Form countdown (shorter to increase pressure)
  const formCountdown = document.getElementById('form-countdown');
  if (formCountdown) {
    startFormSpecificCountdown(formCountdown, 263);
  }
  
  // Rate change countdown
  const rateCountdown = document.getElementById('rate-countdown');
  if (rateCountdown) {
    startRateCountdown(rateCountdown, 462);
  }
  
  // Offer expiration countdown
  const offerCountdown = document.getElementById('offer-countdown');
  if (offerCountdown) {
    startOfferCountdown(offerCountdown, 180);
  }
}

/**
 * Form-specific countdown with different urgency tactics
 */
function startFormSpecificCountdown(element, initialSeconds) {
  let remaining = initialSeconds;
  
  const interval = setInterval(() => {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    element.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Form-specific urgency escalation
    if (remaining <= 30) {
      element.style.color = '#ff0000';
      element.style.fontSize = '1.2em';
      element.style.fontWeight = 'bold';
      
      // Show field-by-field urgency
      if (remaining <= 15) {
        highlightIncompleteFields();
      }
    } else if (remaining <= 60) {
      element.style.color = '#ff6600';
      showFormUrgencyMessage(remaining);
    }
    
    remaining--;
    
    if (remaining < 0) {
      // Show "form expired" message but allow continuation
      showFormExpiredMessage();
      remaining = Math.floor(initialSeconds * 0.6); // Shorter reset
    }
  }, 1000);
  
  return interval;
}

/**
 * Rate change countdown (creates fear of losing "deal")
 */
function startRateCountdown(element, initialSeconds) {
  let remaining = initialSeconds;
  
  const interval = setInterval(() => {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    element.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    // Rate urgency messaging
    if (remaining <= 300) { // Last 5 minutes
      element.style.color = '#ff4444';
      
      if (remaining <= 60) {
        showRateIncreaseWarning();
      }
    }
    
    remaining--;
    
    if (remaining < 0) {
      // Fake "rate increase" then reset
      showFakeRateIncrease();
      remaining = initialSeconds;
    }
  }, 1000);
  
  return interval;
}

/**
 * Special offer countdown
 */
function startOfferCountdown(element, initialSeconds) {
  let remaining = initialSeconds;
  
  const interval = setInterval(() => {
    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;
    element.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    
    remaining--;
    
    if (remaining < 0) {
      // Show "offer extended" message
      showOfferExtension();
      remaining = Math.floor(initialSeconds * 0.7);
    }
  }, 1000);
  
  return interval;
}

/**
 * Highlights incomplete form fields with urgency
 */
function highlightIncompleteFields() {
  const requiredFields = document.querySelectorAll('input[required]:invalid');
  
  requiredFields.forEach(field => {
    field.style.border = '3px solid #ff0000';
    field.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
    field.style.animation = 'fieldUrgent 0.5s infinite';
  });
}

/**
 * Shows form urgency messages
 */
function showFormUrgencyMessage(timeLeft) {
  const existingMsg = document.querySelector('.form-urgency-message');
  if (existingMsg || timeLeft % 30 !== 0) return; // Only show every 30 seconds
  
  const messages = [
    "⚠️ Others are applying for the same loans!",
    "🔥 Only a few spots left for instant approval!",
    "⏰ Don't lose your reserved amount!",
    "💰 Your pre-approval is about to expire!"
  ];
  
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
  const urgencyDiv = document.createElement('div');
  urgencyDiv.className = 'form-urgency-message';
  urgencyDiv.innerHTML = `
    <div class="urgency-banner-small">
      <span>${randomMessage}</span>
      <button onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;
  
  urgencyDiv.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: linear-gradient(45deg, #ff4444, #ff6666);
    color: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(255, 68, 68, 0.5);
    z-index: 1000;
    animation: slideInRight 0.5s ease;
  `;
  
  document.body.appendChild(urgencyDiv);
  
  setTimeout(() => {
    if (urgencyDiv.parentElement) {
      urgencyDiv.remove();
    }
  }, 8000);
}

/**
 * Shows form expired message
 */
function showFormExpiredMessage() {
  const expiredMsg = document.createElement('div');
  expiredMsg.className = 'form-expired-overlay';
  expiredMsg.innerHTML = `
    <div class="expired-content">
      <h3>⏰ Time Expired!</h3>
      <p>But don't worry - we've given you a final extension!</p>
      <p>Complete your application in the next few minutes to secure your loan.</p>
      <button onclick="this.parentElement.parentElement.remove()">Continue Application</button>
    </div>
  `;
  
  expiredMsg.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    animation: expiredFlash 0.5s ease;
  `;
  
  document.body.appendChild(expiredMsg);
  
  setTimeout(() => {
    if (expiredMsg.parentElement) {
      expiredMsg.remove();
    }
  }, 10000);
}

/**
 * Shows rate increase warning
 */
function showRateIncreaseWarning() {
  const existingWarning = document.querySelector('.rate-warning');
  if (existingWarning) return;
  
  const warningMsg = document.createElement('div');
  warningMsg.className = 'rate-warning';
  warningMsg.innerHTML = `
    <div class="warning-content">
      <h4>📈 Rate Increase Alert!</h4>
      <p>Rates will increase by 2% in less than 1 minute!</p>
      <p>Complete now to lock in current rate!</p>
    </div>
  `;
  
  warningMsg.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    right: 20px;
    background: linear-gradient(45deg, #ff6600, #ff9900);
    color: white;
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    z-index: 1000;
    animation: slideUp 0.5s ease;
  `;
  
  document.body.appendChild(warningMsg);
  
  setTimeout(() => {
    if (warningMsg.parentElement) {
      warningMsg.remove();
    }
  }, 5000);
}

/**
 * Shows fake rate increase
 */
function showFakeRateIncrease() {
  const rateMsg = document.createElement('div');
  rateMsg.className = 'rate-increase-notification';
  rateMsg.innerHTML = `
    <div class="rate-content">
      <h3>📈 Rates Have Increased!</h3>
      <p>Good news - your rate is still locked in!</p>
      <p>But this protection expires soon...</p>
      <button onclick="this.parentElement.parentElement.remove()">Got it</button>
    </div>
  `;
  
  rateMsg.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 102, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: rateFlash 0.5s ease;
  `;
  
  document.body.appendChild(rateMsg);
  
  setTimeout(() => {
    if (rateMsg.parentElement) {
      rateMsg.remove();
    }
  }, 6000);
}

/**
 * Shows offer extension message
 */
function showOfferExtension() {
  const extensionMsg = document.createElement('div');
  extensionMsg.className = 'offer-extension';
  extensionMsg.innerHTML = `
    <div class="extension-content">
      <h4>🎉 Special Extension!</h4>
      <p>We've extended this exclusive offer just for you!</p>
      <p>This is your final opportunity!</p>
    </div>
  `;
  
  extensionMsg.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: linear-gradient(45deg, #28a745, #20c997);
    color: white;
    padding: 2rem;
    border-radius: 15px;
    text-align: center;
    z-index: 1000;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    animation: extensionBounce 0.5s ease;
  `;
  
  document.body.appendChild(extensionMsg);
  
  setTimeout(() => {
    if (extensionMsg.parentElement) {
      extensionMsg.remove();
    }
  }, 4000);
}

/**
 * Creates artificial scarcity with fake viewer counts
 */
export function startViewerCount() {
  const viewerElements = document.querySelectorAll('.viewer-count');
  
  viewerElements.forEach(element => {
    let baseCount = Math.floor(Math.random() * 50) + 20; // 20-70 base viewers
    
    setInterval(() => {
      // Fluctuate viewer count to create urgency
      const change = Math.floor(Math.random() * 10) - 5; // -5 to +5
      baseCount = Math.max(15, Math.min(100, baseCount + change));
      
      element.textContent = baseCount;
      
      // Flash red when viewers increase significantly
      if (change >= 3) {
        element.style.color = '#ff4444';
        element.style.fontWeight = 'bold';
        setTimeout(() => {
          element.style.color = '';
          element.style.fontWeight = '';
        }, 2000);
      }
    }, 5000 + Math.random() * 10000); // 5-15 second intervals
  });
}

/**
 * Tracks user behavior and increases pressure accordingly
 */
export function startBehaviorTracking() {
  let inactiveTime = 0;
  let scrolledToBottom = false;
  
  // Track inactivity
  const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
  
  function resetInactivityTimer() {
    inactiveTime = 0;
  }
  
  activityEvents.forEach(event => {
    document.addEventListener(event, resetInactivityTimer, true);
  });
  
  // Check for inactivity every second
  setInterval(() => {
    inactiveTime++;
    
    if (inactiveTime === 30) { // 30 seconds inactive
      showInactivityPrompt();
    } else if (inactiveTime === 60) { // 1 minute inactive
      showStrongerInactivityPrompt();
    }
  }, 1000);
  
  // Track scroll behavior
  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercent > 80 && !scrolledToBottom) {
      scrolledToBottom = true;
      showScrollCompletionBonus();
    }
  });
  
  // Track exit intent (mouse leaving viewport)
  document.addEventListener('mouseleave', showExitIntent);
}

/**
 * Shows inactivity prompts
 */
function showInactivityPrompt() {
  const prompt = document.createElement('div');
  prompt.className = 'inactivity-prompt';
  prompt.innerHTML = `
    <div class="prompt-content">
      <h4>🤔 Still there?</h4>
      <p>Your pre-approval is waiting!</p>
      <button onclick="this.parentElement.parentElement.remove()">Continue</button>
    </div>
  `;
  
  prompt.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    padding: 1rem;
    border-radius: 10px;
    z-index: 1000;
    animation: slideInRight 0.5s ease;
  `;
  
  document.body.appendChild(prompt);
  
  setTimeout(() => {
    if (prompt.parentElement) prompt.remove();
  }, 8000);
}

function showStrongerInactivityPrompt() {
  const prompt = document.createElement('div');
  prompt.className = 'strong-inactivity-prompt';
  prompt.innerHTML = `
    <div class="strong-prompt-content">
      <h3>⚠️ Don't Miss Out!</h3>
      <p>Your $500 loan is approved and waiting!</p>
      <p>Complete your application before someone else takes your spot!</p>
      <button onclick="this.parentElement.parentElement.remove()">Secure My Loan</button>
    </div>
  `;
  
  prompt.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 68, 68, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: strongPromptFlash 0.5s ease;
  `;
  
  document.body.appendChild(prompt);
  
  setTimeout(() => {
    if (prompt.parentElement) prompt.remove();
  }, 10000);
}

function showScrollCompletionBonus() {
  const bonus = document.createElement('div');
  bonus.className = 'scroll-bonus';
  bonus.innerHTML = `
    <div class="bonus-content">
      <h4>🎁 Bonus Unlocked!</h4>
      <p>You've earned an extra $100 loan increase!</p>
      <p>Now eligible for up to $600!</p>
    </div>
  `;
  
  bonus.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(45deg, #ffd700, #ffed4e);
    color: #000;
    padding: 1rem 2rem;
    border-radius: 15px;
    text-align: center;
    z-index: 1000;
    font-weight: bold;
    animation: bonusBounce 0.5s ease;
  `;
  
  document.body.appendChild(bonus);
  
  setTimeout(() => {
    if (bonus.parentElement) bonus.remove();
  }, 6000);
}

function showExitIntent() {
  const exitPrompt = document.createElement('div');
  exitPrompt.className = 'exit-intent-prompt';
  exitPrompt.innerHTML = `
    <div class="exit-content">
      <h3>🛑 Wait! Don't Leave!</h3>
      <p>You're about to lose your guaranteed approval!</p>
      <p>We'll give you an extra $100 if you complete now!</p>
      <div class="exit-buttons">
        <button onclick="this.parentElement.parentElement.remove()" class="stay-btn">Stay & Get Bonus</button>
        <button onclick="window.close()" class="leave-btn">Leave (Lose Approval)</button>
      </div>
    </div>
  `;
  
  exitPrompt.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10001;
    animation: exitFlash 0.5s ease;
  `;
  
  document.body.appendChild(exitPrompt);
}

// Initialize all countdown functionality
window.addEventListener('load', () => {
  initializeMultipleCountdowns();
  startViewerCount();
  startBehaviorTracking();
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes urgentBlink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0.3; }
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  
  @keyframes slideUp {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  
  @keyframes urgencyFlash {
    0% { background: rgba(255, 0, 0, 0); }
    50% { background: rgba(255, 0, 0, 0.9); }
    100% { background: rgba(255, 0, 0, 0.9); }
  }
  
  @keyframes expiredFlash {
    0% { background: rgba(0, 0, 0, 0); }
    100% { background: rgba(0, 0, 0, 0.9); }
  }
  
  @keyframes rateFlash {
    0% { background: rgba(255, 102, 0, 0); }
    100% { background: rgba(255, 102, 0, 0.9); }
  }
  
  @keyframes extensionBounce {
    0% { transform: translate(-50%, -50%) scale(0.5); }
    50% { transform: translate(-50%, -50%) scale(1.1); }
    100% { transform: translate(-50%, -50%) scale(1); }
  }
  
  @keyframes bonusBounce {
    0% { transform: translateX(-50%) translateY(100px) scale(0.8); }
    50% { transform: translateX(-50%) translateY(-10px) scale(1.1); }
    100% { transform: translateX(-50%) translateY(0) scale(1); }
  }
  
  @keyframes strongPromptFlash {
    0% { background: rgba(255, 68, 68, 0); }
    100% { background: rgba(255, 68, 68, 0.95); }
  }
  
  @keyframes exitFlash {
    0% { background: rgba(0, 0, 0, 0); }
    100% { background: rgba(0, 0, 0, 0.95); }
  }
  
  @keyframes fieldUrgent {
    0%, 100% { box-shadow: 0 0 10px rgba(255, 0, 0, 0.5); }
    50% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.8); }
  }
`;
document.head.appendChild(style);