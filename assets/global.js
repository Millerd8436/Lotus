// Copilot: Global JavaScript functionality for the Lotus payday lending simulation
// Handles mode switching, tracking, dark patterns, and shared utilities

// Global application state
window.LotusApp = window.LotusApp || {
    currentMode: 'predatory', // 'predatory' or 'ethical'
    currentInterface: 'simulation', // 'simulation' or 'ui'
    analytics: {
        sessionStart: Date.now(),
        pageViews: 0,
        interactions: 0,
        conversions: 0
    },
    user: {
        visitCount: 0,
        timeOnSite: 0,
        highIntentSignals: []
    },
    config: {
        enableTracking: true,
        enablePressure: true,
        enableManipulation: true,
        debugMode: false
    },
    // Integration with simulation
    simulation: {
        active: false,
        session: null,
        echo: null,
        ghost: null
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupGlobalTracking();
    setupModeToggling();
    setupDarkPatterns();
    setupEducationalOverlay();
});

function initializeApp() {
    // Set initial mode based on URL parameters or default
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode') || 'predatory';
    
    setMode(mode);
    
    // Initialize user session
    LotusApp.user.visitCount = parseInt(localStorage.getItem('lotus_visits') || '0') + 1;
    localStorage.setItem('lotus_visits', LotusApp.user.visitCount.toString());
    
    // Set session tracking
    LotusApp.analytics.sessionStart = Date.now();
    
    // Log initialization
    if (LotusApp.config.debugMode) {
        console.log('Lotus App Initialized', {
            mode: LotusApp.currentMode,
            visitCount: LotusApp.user.visitCount,
            timestamp: new Date().toISOString()
        });
    }
}

function setMode(mode) {
    const validModes = ['predatory', 'ethical'];
    if (!validModes.includes(mode)) {
        mode = 'predatory';
    }
    
    LotusApp.currentMode = mode;
    document.body.className = `mode-${mode}`;
    document.body.setAttribute('data-mode', mode);
    
    // Update mode-specific elements
    updateModeSpecificContent();
    
    // Track mode selection
    trackEvent('mode_selection', {
        mode: mode,
        timestamp: Date.now()
    });
}

function updateModeSpecificContent() {
    const mode = LotusApp.currentMode;
    
    // Update navigation
    const navItems = document.querySelectorAll('[data-mode-content]');
    navItems.forEach(item => {
        const modeContent = item.getAttribute(`data-${mode}-content`);
        if (modeContent) {
            item.textContent = modeContent;
        }
    });
    
    // Update colors and themes
    const root = document.documentElement;
    if (mode === 'predatory') {
        root.style.setProperty('--primary-color', '#dc3545');
        root.style.setProperty('--accent-color', '#ffc107');
        root.style.setProperty('--urgency-color', '#ff4757');
    } else {
        root.style.setProperty('--primary-color', '#28a745');
        root.style.setProperty('--accent-color', '#17a2b8');
        root.style.setProperty('--urgency-color', '#6c757d');
    }
    
    // Show/hide mode-specific sections
    const predatoryElements = document.querySelectorAll('.predatory-only');
    const ethicalElements = document.querySelectorAll('.ethical-only');
    
    predatoryElements.forEach(el => {
        el.style.display = mode === 'predatory' ? 'block' : 'none';
    });
    
    ethicalElements.forEach(el => {
        el.style.display = mode === 'ethical' ? 'block' : 'none';
    });
}

// Analytics and tracking system
function setupGlobalTracking() {
    // Page view tracking
    trackPageView();
    
    // Time on page tracking
    let timeTracking = setInterval(() => {
        LotusApp.user.timeOnSite += 1000;
        
        // Track engagement milestones
        const seconds = LotusApp.user.timeOnSite / 1000;
        if ([30, 60, 120, 300, 600].includes(seconds)) {
            trackEvent('time_milestone', {
                seconds: seconds,
                engagement_level: getEngagementLevel(seconds)
            });
        }
    }, 1000);
    
    // Stop tracking when user leaves
    window.addEventListener('beforeunload', () => {
        clearInterval(timeTracking);
        trackEvent('session_end', {
            duration: LotusApp.user.timeOnSite,
            interactions: LotusApp.analytics.interactions,
            conversions: LotusApp.analytics.conversions
        });
    });
    
    // Scroll tracking
    let maxScroll = 0;
    window.addEventListener('scroll', throttle(() => {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if ([25, 50, 75, 90, 100].includes(scrollPercent)) {
                trackEvent('scroll_milestone', {
                    percent: scrollPercent
                });
            }
        }
    }, 1000));
    
    // Click tracking
    document.addEventListener('click', (e) => {
        LotusApp.analytics.interactions++;
        
        // Track high-intent elements
        const highIntentSelectors = [
            '.apply-btn', '.cta-btn', '.loan-amount-btn',
            '.urgent-cta', '.emergency-btn', '.instant-approval-btn'
        ];
        
        if (highIntentSelectors.some(selector => e.target.matches(selector))) {
            LotusApp.user.highIntentSignals.push({
                element: e.target.className,
                timestamp: Date.now(),
                text: e.target.textContent.trim()
            });
            
            trackEvent('high_intent_click', {
                element: e.target.className,
                text: e.target.textContent.trim().substring(0, 50),
                intent_score: calculateIntentScore()
            });
        }
    });
    
    // Form interaction tracking
    document.addEventListener('input', (e) => {
        if (e.target.type === 'email' || e.target.type === 'tel' || e.target.name === 'loan_amount') {
            trackEvent('form_interaction', {
                field: e.target.name || e.target.type,
                value_length: e.target.value.length
            });
        }
    });
}

function trackPageView() {
    LotusApp.analytics.pageViews++;
    
    trackEvent('page_view', {
        page: window.location.pathname,
        mode: LotusApp.currentMode,
        visit_count: LotusApp.user.visitCount,
        referrer: document.referrer
    });
}

function trackEvent(eventName, data = {}) {
    if (!LotusApp.config.enableTracking) return;
    
    const eventData = {
        event: eventName,
        timestamp: Date.now(),
        session_id: getSessionId(),
        mode: LotusApp.currentMode,
        page: window.location.pathname,
        ...data
    };
    
    // Send to analytics (simulated)
    if (window.gtag) {
        gtag('event', eventName, eventData);
    }
    
    // Debug logging
    if (LotusApp.config.debugMode) {
        console.log('Event tracked:', eventData);
    }
    
    // Store for analysis
    const events = JSON.parse(localStorage.getItem('lotus_events') || '[]');
    events.push(eventData);
    
    // Keep only last 100 events to prevent storage overflow
    if (events.length > 100) {
        events.splice(0, events.length - 100);
    }
    
    localStorage.setItem('lotus_events', JSON.stringify(events));
}

// Mode switching functionality
function setupModeToggling() {
    // Create mode toggle button (hidden by default)
    const modeToggle = document.createElement('div');
    modeToggle.id = 'mode-toggle';
    modeToggle.className = 'mode-toggle hidden';
    modeToggle.innerHTML = `
        <button class="toggle-btn" onclick="toggleMode()">
            <span class="mode-indicator"></span>
            <span class="mode-text">Switch Mode</span>
        </button>
    `;
    document.body.appendChild(modeToggle);
    
    // Show toggle button on special key combination (Ctrl+Shift+M)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'M') {
            modeToggle.classList.toggle('hidden');
            trackEvent('mode_toggle_revealed', {
                method: 'keyboard_shortcut'
            });
        }
    });
    
    // Show toggle after extended engagement (educational purpose)
    setTimeout(() => {
        if (LotusApp.user.timeOnSite > 120000) { // 2 minutes
            modeToggle.classList.remove('hidden');
            trackEvent('mode_toggle_revealed', {
                method: 'time_based',
                time_on_site: LotusApp.user.timeOnSite
            });
        }
    }, 120000);
}

function toggleMode() {
    const newMode = LotusApp.currentMode === 'predatory' ? 'ethical' : 'predatory';
    setMode(newMode);
    
    // Update URL without refresh
    const url = new URL(window.location);
    url.searchParams.set('mode', newMode);
    window.history.pushState({}, '', url);
    
    // Show educational message
    showModeChangeMessage(newMode);
    
    trackEvent('mode_switched', {
        from: LotusApp.currentMode === 'predatory' ? 'ethical' : 'predatory',
        to: newMode
    });
}

function showModeChangeMessage(mode) {
    const message = document.createElement('div');
    message.className = 'mode-change-notification';
    message.innerHTML = `
        <div class="notification-content">
            <h4>Mode Changed</h4>
            <p>Now viewing: ${mode === 'predatory' ? 'Predatory' : 'Ethical'} lending interface</p>
            <p class="note">${mode === 'predatory' 
                ? 'Notice the dark patterns and manipulation tactics'
                : 'See how transparency and fairness changes the experience'
            }</p>
            <button onclick="this.parentElement.parentElement.remove()">Got it</button>
        </div>
    `;
    
    document.body.appendChild(message);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        message.remove();
    }, 8000);
}

// Dark patterns and manipulation (predatory mode)
function setupDarkPatterns() {
    if (LotusApp.currentMode === 'ethical' || !LotusApp.config.enableManipulation) {
        return;
    }
    
    // Urgency countdown timers
    createUrgencyTimers();
    
    // Fake live notifications
    createFakeNotifications();
    
    // Pressure pop-ups
    setupPressurePopups();
    
    // Exit-intent manipulation
    setupExitIntent();
    
    // Social proof manipulation
    createFakeSocialProof();
}

function createUrgencyTimers() {
    const timerElements = document.querySelectorAll('.countdown-timer');
    timerElements.forEach(timer => {
        let timeLeft = 1800; // 30 minutes
        
        const interval = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            timeLeft--;
            
            if (timeLeft < 0) {
                timeLeft = 1800; // Reset timer (fake urgency)
            }
            
            // Increase pressure as time decreases
            if (timeLeft < 300) { // Last 5 minutes
                timer.classList.add('urgent');
            }
        }, 1000);
        
        // Store interval for cleanup
        timer.setAttribute('data-interval', interval);
    });
}

function createFakeNotifications() {
    const notifications = [
        'Sarah from Phoenix just got approved for $1,200!',
        'Mike from Dallas received $800 in his account!',
        'Jennifer from Miami got instant approval!',
        'David from Chicago just saved $300 vs other lenders!',
        'Lisa from Seattle approved despite poor credit!'
    ];
    
    let notificationIndex = 0;
    
    setInterval(() => {
        const notification = document.createElement('div');
        notification.className = 'fake-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">✅</span>
                <span class="notification-text">${notifications[notificationIndex]}</span>
                <span class="notification-time">Just now</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        notificationIndex = (notificationIndex + 1) % notifications.length;
    }, 8000);
}

function setupPressurePopups() {
    // Exit-intent popup
    let hasShownExitPopup = false;
    
    document.addEventListener('mouseleave', () => {
        if (!hasShownExitPopup && LotusApp.user.timeOnSite > 30000) {
            showExitIntentPopup();
            hasShownExitPopup = true;
        }
    });
    
    // Time-based pressure popup
    setTimeout(() => {
        if (!hasShownExitPopup) {
            showTimeBasedPressure();
        }
    }, 180000); // 3 minutes
}

function showExitIntentPopup() {
    const popup = document.createElement('div');
    popup.className = 'exit-intent-popup';
    popup.innerHTML = `
        <div class="popup-overlay"></div>
        <div class="popup-content">
            <h3>⚠️ WAIT! Don't miss out!</h3>
            <p>You're about to leave without getting your instant cash approval!</p>
            <div class="special-offer">
                <span class="offer-text">SPECIAL OFFER: Apply now and get $50 BONUS!</span>
                <span class="countdown">This offer expires in: <span id="exit-timer">5:00</span></span>
            </div>
            <div class="popup-buttons">
                <button class="popup-apply-btn" onclick="applyFromPopup()">GET MY CASH NOW!</button>
                <button class="popup-close-btn" onclick="closeExitPopup()">No thanks, I don't need money</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Start countdown
    let exitTimer = 300; // 5 minutes
    const timerElement = document.getElementById('exit-timer');
    const exitInterval = setInterval(() => {
        const minutes = Math.floor(exitTimer / 60);
        const seconds = exitTimer % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        exitTimer--;
        
        if (exitTimer < 0) {
            popup.remove();
            clearInterval(exitInterval);
        }
    }, 1000);
    
    trackEvent('exit_intent_popup_shown', {
        time_on_site: LotusApp.user.timeOnSite
    });
}

function closeExitPopup() {
    document.querySelector('.exit-intent-popup').remove();
    trackEvent('exit_intent_popup_closed', {
        action: 'user_closed'
    });
}

function applyFromPopup() {
    trackEvent('exit_intent_conversion', {
        offer: 'bonus_50'
    });
    document.querySelector('.exit-intent-popup').remove();
    window.location.href = '#loan-application';
}

// Educational overlay system
function setupEducationalOverlay() {
    // Create educational panel (hidden by default)
    const eduPanel = document.createElement('div');
    eduPanel.id = 'educational-panel';
    eduPanel.className = 'educational-panel hidden';
    eduPanel.innerHTML = `
        <div class="edu-header">
            <h3>🎓 Educational Information</h3>
            <button class="edu-close" onclick="toggleEducationalPanel()">×</button>
        </div>
        <div class="edu-content">
            <div class="edu-section">
                <h4>Dark Patterns Detected:</h4>
                <ul id="dark-patterns-list"></ul>
            </div>
            <div class="edu-section">
                <h4>Consumer Rights:</h4>
                <ul>
                    <li>You have the right to clear, honest information about loan terms</li>
                    <li>You can cancel within 24 hours in most states</li>
                    <li>Alternatives like credit unions often offer better rates</li>
                    <li>Payment plans with creditors may be available</li>
                </ul>
            </div>
            <div class="edu-section">
                <h4>Red Flags to Watch For:</h4>
                <ul>
                    <li>Pressure to "act now" or "limited time offers"</li>
                    <li>Hidden fees or unclear terms</li>
                    <li>Automatic rollover clauses</li>
                    <li>Requests for upfront payments</li>
                </ul>
            </div>
        </div>
    `;
    document.body.appendChild(eduPanel);
    
    // Show educational panel button after detecting manipulation
    setTimeout(() => {
        if (LotusApp.currentMode === 'predatory') {
            createEducationalTrigger();
        }
    }, 60000); // After 1 minute
}

function createEducationalTrigger() {
    const trigger = document.createElement('button');
    trigger.id = 'edu-trigger';
    trigger.className = 'educational-trigger';
    trigger.innerHTML = '🎓 Learn About This Page';
    trigger.onclick = toggleEducationalPanel;
    
    document.body.appendChild(trigger);
    
    // Pulse animation to draw attention
    trigger.style.animation = 'pulse 2s infinite';
}

function toggleEducationalPanel() {
    const panel = document.getElementById('educational-panel');
    panel.classList.toggle('hidden');
    
    if (!panel.classList.contains('hidden')) {
        updateDarkPatternsList();
        trackEvent('educational_panel_opened', {
            dark_patterns_detected: detectDarkPatterns().length
        });
    }
}

function detectDarkPatterns() {
    const patterns = [];
    
    // Check for various dark patterns
    if (document.querySelector('.countdown-timer')) {
        patterns.push('Fake urgency timers');
    }
    
    if (document.querySelector('.fake-notification')) {
        patterns.push('Fake social proof notifications');
    }
    
    if (document.querySelector('input[checked]')) {
        patterns.push('Pre-checked consent boxes');
    }
    
    if (document.querySelector('.hidden-cost, .buried-cost')) {
        patterns.push('Hidden costs and fees');
    }
    
    if (document.querySelector('.fake-testimonial')) {
        patterns.push('Fake customer testimonials');
    }
    
    return patterns;
}

function updateDarkPatternsList() {
    const list = document.getElementById('dark-patterns-list');
    const patterns = detectDarkPatterns();
    
    list.innerHTML = patterns.length > 0 
        ? patterns.map(pattern => `<li>${pattern}</li>`).join('')
        : '<li>No dark patterns detected on this page</li>';
}

// Utility functions
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

function getSessionId() {
    let sessionId = sessionStorage.getItem('lotus_session_id');
    if (!sessionId) {
        sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('lotus_session_id', sessionId);
    }
    return sessionId;
}

function getEngagementLevel(seconds) {
    if (seconds < 30) return 'low';
    if (seconds < 120) return 'medium';
    if (seconds < 300) return 'high';
    return 'very_high';
}

function calculateIntentScore() {
    const signals = LotusApp.user.highIntentSignals;
    const timeOnSite = LotusApp.user.timeOnSite / 1000;
    const interactions = LotusApp.analytics.interactions;
    
    let score = 0;
    score += signals.length * 20; // 20 points per high-intent click
    score += Math.min(timeOnSite / 10, 50); // Up to 50 points for time
    score += Math.min(interactions * 2, 30); // Up to 30 points for interactions
    
    return Math.min(score, 100); // Cap at 100
}

// Predatory loan calculator utilities
function calculatePredatoryLoan(amount, term = 14) {
    const baseRate = 0.25; // 25% for 2 weeks (650% APR)
    const processingFee = 25;
    const fastFundingFee = 30;
    
    const financeCharge = amount * baseRate;
    const totalCost = amount + financeCharge + processingFee + fastFundingFee;
    
    const annualizedRate = ((financeCharge / amount) * (365 / term)) * 100;
    
    return {
        loanAmount: amount,
        financeCharge: financeCharge,
        processingFee: processingFee,
        fastFundingFee: fastFundingFee,
        totalRepayment: totalCost,
        apr: annualizedRate,
        term: term
    };
}

function calculateEthicalAlternatives(amount) {
    return {
        creditUnion: {
            apr: 18.0,
            monthlyPayment: (amount * 1.18) / 12,
            totalCost: amount * 1.18,
            term: 12
        },
        creditCard: {
            apr: 24.99,
            monthlyPayment: (amount * 1.2499) / 12,
            totalCost: amount * 1.2499,
            term: 12
        },
        personalLoan: {
            apr: 15.5,
            monthlyPayment: (amount * 1.155) / 24,
            totalCost: amount * 1.155,
            term: 24
        }
    };
}

// Export for use in other modules
window.LotusApp.utils = {
    trackEvent,
    setMode,
    toggleMode,
    calculatePredatoryLoan,
    calculateEthicalAlternatives,
    detectDarkPatterns,
    getEngagementLevel,
    calculateIntentScore
};

// Debug utilities
if (LotusApp.config.debugMode) {
    window.LotusDebug = {
        showStats: () => console.table(LotusApp.analytics),
        showEvents: () => console.log(JSON.parse(localStorage.getItem('lotus_events') || '[]')),
        clearData: () => {
            localStorage.removeItem('lotus_events');
            sessionStorage.clear();
            console.log('Lotus data cleared');
        },
        toggleMode: () => toggleMode(),
        showDarkPatterns: () => console.log(detectDarkPatterns())
    };
    
    console.log('Lotus Debug utilities available at window.LotusDebug');
}