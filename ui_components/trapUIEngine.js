/**
 * ui_components/trapUIEngine.js - Implements sliders, pre-checks, urgency traps
 * 
 * Comprehensive UI trap engine for educational dark pattern demonstration
 */

export class TrapUIEngine {
    constructor() {
        this.activeTraps = [];
        this.trapHistory = [];
        this.userInteractions = [];
    }

    // 1. Deceptive Tip Slider Implementation
    createDeceptiveTipSlider(containerId, options = {}) {
        const defaults = {
            minTip: 0,
            maxTip: 15,
            suggestedTip: 12,
            penalizeZero: true,
            socialPressure: "95% of users tip $10 or more",
            consequenceText: "Your request may be delayed or denied with a $0 tip"
        };
        
        const config = { ...defaults, ...options };
        const container = document.getElementById(containerId);
        
        const sliderHTML = `
            <div class="deceptive-tip-slider">
                <h3>💰 Show Your Appreciation (Optional)</h3>
                <p class="social-pressure">${config.socialPressure}</p>
                
                <div class="slider-container">
                    <input type="range" id="tip-slider" min="${config.minTip}" max="${config.maxTip}" 
                           value="${config.suggestedTip}" class="tip-slider">
                    <div class="tip-display">
                        <span id="tip-amount">$${config.suggestedTip}</span>
                    </div>
                </div>
                
                <div class="tip-consequences">
                    <div id="zero-tip-warning" class="warning-text" style="display: none;">
                        ⚠️ ${config.consequenceText}
                    </div>
                    <div id="good-tip-praise" class="praise-text">
                        ✅ Great choice! This helps keep our service free for everyone.
                    </div>
                </div>
                
                <div class="fake-user-activity">
                    <p>💬 Recent: "I always tip $10+ because they've saved me so much!" - Sarah K.</p>
                </div>
            </div>
        `;
        
        container.innerHTML = sliderHTML;
        
        // Add interactivity
        const slider = container.querySelector('#tip-slider');
        const amountDisplay = container.querySelector('#tip-amount');
        const zeroWarning = container.querySelector('#zero-tip-warning');
        const goodPraise = container.querySelector('#good-tip-praise');
        
        slider.addEventListener('input', (e) => {
            const value = e.target.value;
            amountDisplay.textContent = `$${value}`;
            
            if (value == 0 && config.penalizeZero) {
                zeroWarning.style.display = 'block';
                goodPraise.style.display = 'none';
                slider.style.background = 'linear-gradient(to right, #ff4444, #ffaa44)';
            } else {
                zeroWarning.style.display = 'none';
                goodPraise.style.display = 'block';
                slider.style.background = 'linear-gradient(to right, #44ff44, #44aa44)';
            }
            
            this.recordUserInteraction('tip_slider_change', { value: parseInt(value) });
        });
        
        this.activeTraps.push({
            type: 'deceptive_tip_slider',
            element: container,
            config,
            getManipulationData: () => ({
                currentTip: parseInt(slider.value),
                socialPressureShown: true,
                consequencesDisplayed: config.penalizeZero,
                defaultBias: config.suggestedTip > config.minTip
            })
        });
        
        return container;
    }

    // 2. Pre-Checked Options Trap
    createPreCheckedTraps(containerId, options = []) {
        const defaults = [
            { text: "Express delivery (recommended)", fee: 25, checked: true, difficulty: "HARD" },
            { text: "Payment protection insurance", fee: 8.99, checked: true, difficulty: "MEDIUM" },
            { text: "Credit monitoring service", fee: 9.99, checked: true, difficulty: "EASY" },
            { text: "Auto-renewal (convenient!)", fee: 0, checked: true, difficulty: "HARD" },
            { text: "SMS notifications", fee: 2.99, checked: true, difficulty: "MEDIUM" }
        ];
        
        const trapOptions = options.length > 0 ? options : defaults;
        const container = document.getElementById(containerId);
        
        const optionsHTML = `
            <div class="pre-checked-traps">
                <h3>📋 Recommended Services (Pre-selected for your convenience)</h3>
                <p class="warning-text">⚠️ Removing these protections may affect your application processing</p>
                
                <form class="trap-options-form">
                    ${trapOptions.map((option, index) => `
                        <div class="option-row ${option.difficulty.toLowerCase()}-to-uncheck">
                            <label class="option-label ${option.checked ? 'checked' : ''}">
                                <input type="checkbox" 
                                       ${option.checked ? 'checked' : ''} 
                                       data-fee="${option.fee}"
                                       data-difficulty="${option.difficulty}"
                                       class="trap-checkbox">
                                <span class="option-text">${option.text}</span>
                                ${option.fee > 0 ? `<span class="fee-text">+$${option.fee}</span>` : ''}
                                ${option.difficulty === 'HARD' ? '<span class="required-badge">REQUIRED</span>' : ''}
                            </label>
                            ${option.difficulty === 'HARD' ? 
                                '<p class="small-text">This option cannot be removed</p>' : ''
                            }
                        </div>
                    `).join('')}
                </form>
                
                <div class="total-fees">
                    Total additional fees: $<span id="total-additional-fees">0.00</span>
                </div>
            </div>
        `;
        
        container.innerHTML = optionsHTML;
        
        // Add interactivity and manipulation
        const checkboxes = container.querySelectorAll('.trap-checkbox');
        const totalFeesElement = container.querySelector('#total-additional-fees');
        
        checkboxes.forEach(checkbox => {
            // Make HARD difficulty options very difficult to uncheck
            if (checkbox.dataset.difficulty === 'HARD') {
                checkbox.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showDifficultyModal('This service is required for processing your application');
                    return false;
                });
            }
            
            // Make MEDIUM difficulty require confirmation
            if (checkbox.dataset.difficulty === 'MEDIUM') {
                checkbox.addEventListener('change', (e) => {
                    if (!e.target.checked) {
                        const confirm = window.confirm('Are you sure? This may result in processing delays.');
                        if (!confirm) {
                            e.target.checked = true;
                        }
                    }
                });
            }
            
            checkbox.addEventListener('change', () => {
                this.updateTotalFees(checkboxes, totalFeesElement);
                this.recordUserInteraction('checkbox_change', {
                    fee: parseFloat(checkbox.dataset.fee),
                    checked: checkbox.checked,
                    difficulty: checkbox.dataset.difficulty
                });
            });
        });
        
        // Initial fee calculation
        this.updateTotalFees(checkboxes, totalFeesElement);
        
        this.activeTraps.push({
            type: 'pre_checked_traps',
            element: container,
            options: trapOptions,
            getManipulationData: () => ({
                totalChecked: Array.from(checkboxes).filter(cb => cb.checked).length,
                totalFees: this.calculateTotalFees(checkboxes),
                hardToRemoveCount: Array.from(checkboxes).filter(cb => 
                    cb.dataset.difficulty === 'HARD' && cb.checked).length
            })
        });
        
        return container;
    }

    // 3. Urgency Timer Trap
    createUrgencyTimer(containerId, options = {}) {
        const defaults = {
            initialTime: 300, // 5 minutes
            urgentThreshold: 60, // Last minute is "urgent"
            warningTexts: [
                "⏰ Limited time offer expires soon!",
                "🔥 Only 5 minutes left to lock in this rate!",
                "⚠️ Don't lose your spot - complete now!"
            ]
        };
        
        const config = { ...defaults, ...options };
        const container = document.getElementById(containerId);
        
        let timeRemaining = config.initialTime;
        
        const timerHTML = `
            <div class="urgency-timer">
                <div class="timer-display">
                    <h3>🚨 SPECIAL OFFER EXPIRES IN:</h3>
                    <div class="countdown">
                        <span id="minutes">00</span>:<span id="seconds">00</span>
                    </div>
                </div>
                <div class="urgency-messages">
                    <p id="urgency-text">${config.warningTexts[0]}</p>
                </div>
                <div class="fake-activity">
                    <p>🔴 LIVE: 47 people viewing this offer in your area</p>
                </div>
            </div>
        `;
        
        container.innerHTML = timerHTML;
        
        const minutesElement = container.querySelector('#minutes');
        const secondsElement = container.querySelector('#seconds');
        const urgencyTextElement = container.querySelector('#urgency-text');
        
        const timer = setInterval(() => {
            timeRemaining--;
            
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
            
            // Change urgency level
            if (timeRemaining <= config.urgentThreshold) {
                container.classList.add('urgent');
                urgencyTextElement.textContent = config.warningTexts[2];
            } else if (timeRemaining <= config.urgentThreshold * 2) {
                urgencyTextElement.textContent = config.warningTexts[1];
            }
            
            if (timeRemaining <= 0) {
                clearInterval(timer);
                this.handleTimerExpiration(container);
            }
            
        }, 1000);
        
        this.activeTraps.push({
            type: 'urgency_timer',
            element: container,
            timer,
            getManipulationData: () => ({
                timeRemaining,
                isUrgent: timeRemaining <= config.urgentThreshold,
                hasExpired: timeRemaining <= 0
            })
        });
        
        return container;
    }

    // 4. Fake Progress Indicator
    createFakeProgress(containerId, options = {}) {
        const defaults = {
            stages: [
                "Analyzing your financial profile...",
                "Checking eligibility...",
                "Calculating your rate...",
                "Almost done!",
                "Just one more step..."
            ],
            stageDelays: [2000, 1500, 2000, 1000, 500],
            finalProgress: 95 // Don't reach 100% to maintain tension
        };
        
        const config = { ...defaults, ...options };
        const container = document.getElementById(containerId);
        
        const progressHTML = `
            <div class="fake-progress">
                <h3>🔄 Processing Your Application</h3>
                <div class="progress-bar-container">
                    <div class="progress-bar">
                        <div id="progress-fill" class="progress-fill"></div>
                    </div>
                    <span id="progress-percentage">0%</span>
                </div>
                <p id="progress-stage">${config.stages[0]}</p>
                <div class="dont-leave-warning">
                    <p>⚠️ Don't refresh or leave this page - you'll lose your progress!</p>
                </div>
            </div>
        `;
        
        container.innerHTML = progressHTML;
        
        const progressFill = container.querySelector('#progress-fill');
        const progressPercentage = container.querySelector('#progress-percentage');
        const progressStage = container.querySelector('#progress-stage');
        
        let currentStage = 0;
        let currentProgress = 0;
        
        const progressInterval = setInterval(() => {
            currentProgress += Math.random() * 15 + 5; // Random progress increments
            currentProgress = Math.min(currentProgress, config.finalProgress);
            
            progressFill.style.width = `${currentProgress}%`;
            progressPercentage.textContent = `${Math.round(currentProgress)}%`;
            
            // Update stage text
            const stageIndex = Math.min(
                Math.floor((currentProgress / config.finalProgress) * config.stages.length),
                config.stages.length - 1
            );
            
            if (stageIndex !== currentStage) {
                currentStage = stageIndex;
                progressStage.textContent = config.stages[currentStage];
            }
            
            if (currentProgress >= config.finalProgress) {
                clearInterval(progressInterval);
                this.showSunkCostMessage(container);
            }
        }, 800);
        
        this.activeTraps.push({
            type: 'fake_progress',
            element: container,
            getManipulationData: () => ({
                currentProgress,
                currentStage: config.stages[currentStage],
                isNearComplete: currentProgress >= config.finalProgress * 0.9
            })
        });
        
        return container;
    }

    // Helper methods
    updateTotalFees(checkboxes, totalElement) {
        const total = this.calculateTotalFees(checkboxes);
        totalElement.textContent = total.toFixed(2);
    }

    calculateTotalFees(checkboxes) {
        return Array.from(checkboxes)
            .filter(cb => cb.checked)
            .reduce((total, cb) => total + parseFloat(cb.dataset.fee), 0);
    }

    showDifficultyModal(message) {
        const modal = document.createElement('div');
        modal.className = 'difficulty-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Required Service</h3>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">OK</button>
            </div>
        `;
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); display: flex; align-items: center;
            justify-content: center; z-index: 10000;
        `;
        document.body.appendChild(modal);
    }

    showSunkCostMessage(container) {
        const message = document.createElement('div');
        message.className = 'sunk-cost-message';
        message.innerHTML = `
            <p class="highlight">🎉 You're 95% complete! Don't give up now!</p>
            <p>You've invested valuable time in this application. Complete it to avoid losing your progress.</p>
        `;
        container.appendChild(message);
    }

    handleTimerExpiration(container) {
        container.innerHTML += `
            <div class="timer-expired">
                <h3>⏰ Time Expired!</h3>
                <p>This special offer has expired, but you can still continue at our standard rate.</p>
                <p class="fake-urgency">Limited slots still available - complete now!</p>
            </div>
        `;
    }

    recordUserInteraction(interactionType, data) {
        this.userInteractions.push({
            timestamp: Date.now(),
            type: interactionType,
            data
        });
    }

    // Get comprehensive trap data
    getTrapAnalysis() {
        return {
            activeTrapCount: this.activeTraps.length,
            trapTypes: this.activeTraps.map(trap => trap.type),
            manipulationData: this.activeTraps.map(trap => ({
                type: trap.type,
                data: trap.getManipulationData()
            })),
            userInteractions: this.userInteractions,
            trapEffectiveness: this.calculateTrapEffectiveness()
        };
    }

    calculateTrapEffectiveness() {
        // Calculate how effective the traps were based on user interactions
        const totalTraps = this.activeTraps.length;
        const interactedTraps = new Set(this.userInteractions.map(i => i.type)).size;
        
        return {
            engagementRate: totalTraps > 0 ? (interactedTraps / totalTraps) * 100 : 0,
            totalInteractions: this.userInteractions.length,
            averageInteractionsPerTrap: totalTraps > 0 ? this.userInteractions.length / totalTraps : 0
        };
    }

    // Clean up all traps
    clearAllTraps() {
        this.activeTraps.forEach(trap => {
            if (trap.timer) clearInterval(trap.timer);
        });
        this.activeTraps = [];
        this.userInteractions = [];
    }
}

export default TrapUIEngine;
