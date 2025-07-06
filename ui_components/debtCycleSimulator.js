// ui_components/debtCycleSimulator.js

/**
 * Debt Cycle Simulator
 * Simulates the debt trap cycle that payday loans create through rollovers and renewals
 */

class DebtCycleSimulator {
    constructor() {
        this.currentLoan = null;
        this.loanHistory = [];
        this.cycleCount = 0;
        this.totalPaid = 0;
        this.totalFees = 0;
        this.isInDebtTrap = false;
        this.simulationActive = false;
        this.autoRenewals = 0;
        this.originalAmount = 0;
    }

    /**
     * Initialize the debt cycle simulation
     */
    initialize(config = {}) {
        this.config = {
            initialAmount: config.initialAmount || 300,
            baseFee: config.baseFee || 45,
            rolloverFee: config.rolloverFee || 25,
            lateFee: config.lateFee || 35,
            maxCycles: config.maxCycles || 12,
            autoRenewal: config.autoRenewal || true,
            ...config
        };

        this.createUI();
        this.attachEventListeners();
        
        console.log('💰 Debt Cycle Simulator initialized');
    }

    /**
     * Create the simulation UI
     */
    createUI() {
        const container = document.createElement('div');
        container.id = 'debt-cycle-simulator';
        container.className = 'bg-slate-800 rounded-lg p-6 mb-6 border border-slate-600';
        
        container.innerHTML = `
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-white">
                    <i class="fas fa-recycle mr-2 text-orange-400"></i>
                    Debt Cycle Simulator
                </h3>
                <div class="flex space-x-2">
                    <button id="start-debt-cycle" class="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm transition">
                        Start Simulation
                    </button>
                    <button id="reset-debt-cycle" class="bg-slate-600 hover:bg-slate-500 text-white px-4 py-2 rounded-lg text-sm transition">
                        Reset
                    </button>
                </div>
            </div>

            <!-- Current Loan Status -->
            <div id="current-loan-status" class="bg-slate-700 rounded-lg p-4 mb-4">
                <h4 class="font-bold text-slate-200 mb-3">Current Loan Status</h4>
                <div class="grid md:grid-cols-4 gap-4 text-center">
                    <div>
                        <div class="text-2xl font-bold text-blue-400" id="current-principal">$0</div>
                        <div class="text-xs text-slate-300">Principal</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-red-400" id="current-fees">$0</div>
                        <div class="text-xs text-slate-300">Total Fees</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-yellow-400" id="cycle-count">0</div>
                        <div class="text-xs text-slate-300">Cycles</div>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-purple-400" id="days-trapped">0</div>
                        <div class="text-xs text-slate-300">Days Trapped</div>
                    </div>
                </div>
            </div>

            <!-- Debt Trap Progress Bar -->
            <div class="mb-4">
                <div class="flex justify-between text-sm text-slate-300 mb-1">
                    <span>Debt Trap Progress</span>
                    <span id="trap-percentage">0%</span>
                </div>
                <div class="w-full bg-slate-700 rounded-full h-3">
                    <div id="debt-trap-progress" class="bg-gradient-to-r from-yellow-500 to-red-600 h-3 rounded-full transition-all duration-500" style="width: 0%"></div>
                </div>
                <p class="text-xs text-slate-400 mt-1">Shows likelihood of being trapped in debt cycle</p>
            </div>

            <!-- Loan Timeline -->
            <div class="mb-4">
                <h4 class="font-bold text-slate-200 mb-3">Loan Timeline</h4>
                <div id="loan-timeline" class="space-y-2 max-h-48 overflow-y-auto">
                    <div class="text-slate-400 italic text-sm">No loans yet...</div>
                </div>
            </div>

            <!-- Financial Impact Summary -->
            <div class="grid md:grid-cols-3 gap-4 mb-4">
                <div class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 text-center">
                    <div class="text-xl font-bold text-red-300" id="total-paid-amount">$0</div>
                    <div class="text-xs text-red-200">Total Paid</div>
                </div>
                <div class="bg-orange-900/30 border border-orange-500/50 rounded-lg p-3 text-center">
                    <div class="text-xl font-bold text-orange-300" id="effective-apr">0%</div>
                    <div class="text-xs text-orange-200">Effective APR</div>
                </div>
                <div class="bg-purple-900/30 border border-purple-500/50 rounded-lg p-3 text-center">
                    <div class="text-xl font-bold text-purple-300" id="cost-ratio">0x</div>
                    <div class="text-xs text-purple-200">Cost Multiplier</div>
                </div>
            </div>

            <!-- Simulation Controls -->
            <div class="flex flex-wrap gap-2">
                <button id="renew-loan" disabled class="bg-orange-600 hover:bg-orange-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded text-sm transition">
                    Renew Loan (+$25 fee)
                </button>
                <button id="partial-payment" disabled class="bg-yellow-600 hover:bg-yellow-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded text-sm transition">
                    Partial Payment
                </button>
                <button id="full-payoff" disabled class="bg-green-600 hover:bg-green-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded text-sm transition">
                    Pay Off Loan
                </button>
                <button id="show-alternatives" class="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded text-sm transition">
                    Show Alternatives
                </button>
            </div>

            <!-- Debt Trap Warning -->
            <div id="debt-trap-warning" class="hidden mt-4 bg-red-900/50 border border-red-500 rounded-lg p-4">
                <div class="flex items-center mb-2">
                    <i class="fas fa-exclamation-triangle text-red-400 mr-2 text-xl"></i>
                    <span class="font-bold text-red-300">DEBT TRAP DETECTED</span>
                </div>
                <p class="text-red-200 text-sm mb-3">
                    You've renewed this loan <span id="renewal-count">0</span> times. 
                    The total cost now exceeds the original loan amount by <span id="excess-cost">0%</span>.
                </p>
                <div class="text-xs text-red-200">
                    <p>• Average borrower takes 10 months to pay off a 2-week loan</p>
                    <p>• Spends $520 in fees for every $375 borrowed</p>
                    <p>• Consider credit counseling or alternative lending sources</p>
                </div>
            </div>
        `;

        // Insert into the simulation interface
        const simulationInterface = document.getElementById('simulation-interface');
        if (simulationInterface) {
            simulationInterface.appendChild(container);
        } else {
            document.body.appendChild(container);
        }
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        document.getElementById('start-debt-cycle')?.addEventListener('click', () => this.startSimulation());
        document.getElementById('reset-debt-cycle')?.addEventListener('click', () => this.resetSimulation());
        document.getElementById('renew-loan')?.addEventListener('click', () => this.renewLoan());
        document.getElementById('partial-payment')?.addEventListener('click', () => this.makePartialPayment());
        document.getElementById('full-payoff')?.addEventListener('click', () => this.payoffLoan());
        document.getElementById('show-alternatives')?.addEventListener('click', () => this.showAlternatives());
    }

    /**
     * Start the debt cycle simulation
     */
    startSimulation() {
        this.resetSimulation();
        
        this.originalAmount = this.config.initialAmount;
        this.currentLoan = {
            id: `loan_${Date.now()}`,
            principal: this.originalAmount,
            fees: this.config.baseFee,
            totalOwed: this.originalAmount + this.config.baseFee,
            startDate: new Date(),
            dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
            renewalCount: 0,
            status: 'active'
        };

        this.loanHistory.push({...this.currentLoan});
        this.simulationActive = true;
        
        this.updateUI();
        this.enableControls();
        
        // Start automatic renewal countdown
        this.startRenewalCountdown();
        
        console.log('🔄 Debt cycle simulation started');
    }

    /**
     * Renew the current loan
     */
    renewLoan() {
        if (!this.currentLoan || !this.simulationActive) return;

        this.currentLoan.renewalCount++;
        this.currentLoan.fees += this.config.rolloverFee;
        this.currentLoan.totalOwed = this.currentLoan.principal + this.currentLoan.fees;
        this.currentLoan.dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // Extend 14 days
        
        this.totalFees += this.config.rolloverFee;
        this.cycleCount++;
        this.autoRenewals++;

        // Add to history
        this.loanHistory.push({
            ...this.currentLoan,
            action: 'renewal',
            timestamp: new Date()
        });

        this.checkDebtTrap();
        this.updateUI();
        this.addToTimeline('renewal', `Loan renewed. Added $${this.config.rolloverFee} fee.`);

        // Auto-renewal warning
        if (this.config.autoRenewal && this.autoRenewals >= 3) {
            this.showAutoRenewalWarning();
        }

        console.log(`🔄 Loan renewed (cycle ${this.cycleCount})`);
    }

    /**
     * Make a partial payment
     */
    makePartialPayment() {
        if (!this.currentLoan || !this.simulationActive) return;

        // Simulate paying only fees (common debt trap scenario)
        const feePayment = this.config.baseFee;
        this.totalPaid += feePayment;
        
        // Loan gets renewed automatically after fee-only payment
        this.addToTimeline('partial_payment', `Paid $${feePayment} (fees only). Loan automatically renewed.`);
        
        setTimeout(() => this.renewLoan(), 1000);
    }

    /**
     * Pay off the loan completely
     */
    payoffLoan() {
        if (!this.currentLoan || !this.simulationActive) return;

        this.totalPaid += this.currentLoan.totalOwed;
        this.currentLoan.status = 'paid_off';
        
        this.addToTimeline('payoff', `Loan paid off. Total paid: $${this.totalPaid}`);
        
        this.simulationActive = false;
        this.disableControls();
        
        this.showPayoffSummary();
        
        console.log('✅ Loan paid off');
    }

    /**
     * Check if borrower is in debt trap
     */
    checkDebtTrap() {
        const totalPaidInFees = this.totalFees + this.totalPaid;
        const originalPrincipal = this.originalAmount;
        
        // Debt trap indicators
        const feesExceedPrincipal = this.totalFees > originalPrincipal;
        const multipleCycles = this.cycleCount >= 3;
        const longTerm = this.getDaysInDebt() > 60;
        
        this.isInDebtTrap = feesExceedPrincipal || (multipleCycles && longTerm);
        
        if (this.isInDebtTrap) {
            this.showDebtTrapWarning();
        }
        
        // Update progress bar
        const trapProgress = Math.min(100, (this.cycleCount / 8) * 100);
        this.updateDebtTrapProgress(trapProgress);
    }

    /**
     * Update the UI with current data
     */
    updateUI() {
        if (!this.currentLoan) return;

        // Current loan status
        document.getElementById('current-principal').textContent = `$${this.currentLoan.principal}`;
        document.getElementById('current-fees').textContent = `$${this.currentLoan.fees}`;
        document.getElementById('cycle-count').textContent = this.cycleCount;
        document.getElementById('days-trapped').textContent = this.getDaysInDebt();

        // Financial impact
        document.getElementById('total-paid-amount').textContent = `$${this.totalPaid + this.totalFees}`;
        document.getElementById('effective-apr').textContent = `${this.calculateEffectiveAPR().toFixed(0)}%`;
        document.getElementById('cost-ratio').textContent = `${this.calculateCostRatio().toFixed(1)}x`;
    }

    /**
     * Update debt trap progress bar
     */
    updateDebtTrapProgress(percentage) {
        const progressBar = document.getElementById('debt-trap-progress');
        const percentageLabel = document.getElementById('trap-percentage');
        
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
        
        if (percentageLabel) {
            percentageLabel.textContent = `${percentage.toFixed(0)}%`;
        }
    }

    /**
     * Add entry to loan timeline
     */
    addToTimeline(type, description) {
        const timeline = document.getElementById('loan-timeline');
        if (!timeline) return;

        // Remove "no loans" message
        if (timeline.querySelector('.italic')) {
            timeline.innerHTML = '';
        }

        const entry = document.createElement('div');
        entry.className = 'flex items-center justify-between p-2 bg-slate-600 rounded text-sm';
        
        const iconMap = {
            'start': '🟢',
            'renewal': '🔄',
            'partial_payment': '💳',
            'payoff': '✅',
            'late_fee': '⚠️'
        };

        entry.innerHTML = `
            <div class="flex items-center">
                <span class="mr-2">${iconMap[type] || '📝'}</span>
                <span class="text-slate-200">${description}</span>
            </div>
            <span class="text-slate-400 text-xs">${new Date().toLocaleTimeString()}</span>
        `;

        timeline.insertBefore(entry, timeline.firstChild);

        // Limit timeline entries
        while (timeline.children.length > 10) {
            timeline.removeChild(timeline.lastChild);
        }
    }

    /**
     * Start renewal countdown
     */
    startRenewalCountdown() {
        if (!this.config.autoRenewal) return;

        // Simulate automatic renewal after "due date"
        setTimeout(() => {
            if (this.simulationActive && this.currentLoan) {
                this.addToTimeline('late_fee', 'Payment missed. Late fee added. Auto-renewal triggered.');
                this.currentLoan.fees += this.config.lateFee;
                this.renewLoan();
            }
        }, 5000); // 5 seconds for demo
    }

    /**
     * Show debt trap warning
     */
    showDebtTrapWarning() {
        const warning = document.getElementById('debt-trap-warning');
        if (warning) {
            warning.classList.remove('hidden');
            
            document.getElementById('renewal-count').textContent = this.cycleCount;
            
            const excessPercent = ((this.totalFees / this.originalAmount) * 100).toFixed(0);
            document.getElementById('excess-cost').textContent = `${excessPercent}`;
        }
    }

    /**
     * Show auto-renewal warning
     */
    showAutoRenewalWarning() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-slate-800 rounded-lg p-6 max-w-lg w-full mx-4">
                <div class="text-center mb-4">
                    <i class="fas fa-exclamation-triangle text-red-400 text-4xl mb-2"></i>
                    <h3 class="text-xl font-bold text-red-300">Automatic Renewal Trap</h3>
                </div>
                
                <div class="text-sm text-slate-300 space-y-3">
                    <p>This loan has been automatically renewed <strong>${this.autoRenewals} times</strong>.</p>
                    <p>You've paid <strong>$${this.totalFees}</strong> in fees on a <strong>$${this.originalAmount}</strong> loan.</p>
                    <p class="text-red-300 font-bold">This is a common debt trap pattern!</p>
                </div>
                
                <div class="bg-red-900/30 border border-red-500/50 rounded p-3 mt-4 text-xs text-red-200">
                    <p><strong>What's happening:</strong> You're paying fees repeatedly without reducing the principal balance.</p>
                    <p><strong>Real impact:</strong> Average borrower spends $520 in fees for a $375 loan.</p>
                </div>
                
                <div class="flex space-x-2 mt-6">
                    <button id="continue-simulation" class="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded">
                        Continue Simulation
                    </button>
                    <button id="seek-help" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded">
                        Get Help
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('continue-simulation').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        document.getElementById('seek-help').addEventListener('click', () => {
            document.body.removeChild(modal);
            this.showAlternatives();
        });
    }

    /**
     * Show payoff summary
     */
    showPayoffSummary() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
        
        const costRatio = this.calculateCostRatio();
        const effectiveAPR = this.calculateEffectiveAPR();
        
        modal.innerHTML = `
            <div class="bg-slate-800 rounded-lg p-6 max-w-lg w-full mx-4">
                <div class="text-center mb-4">
                    <i class="fas fa-chart-line text-green-400 text-4xl mb-2"></i>
                    <h3 class="text-xl font-bold text-white">Loan Payoff Summary</h3>
                </div>
                
                <div class="space-y-4 text-sm">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-slate-700 p-3 rounded text-center">
                            <div class="text-lg font-bold text-blue-400">$${this.originalAmount}</div>
                            <div class="text-slate-300">Original Loan</div>
                        </div>
                        <div class="bg-slate-700 p-3 rounded text-center">
                            <div class="text-lg font-bold text-red-400">$${this.totalPaid}</div>
                            <div class="text-slate-300">Total Paid</div>
                        </div>
                    </div>
                    
                    <div class="bg-red-900/30 border border-red-500/50 rounded p-3">
                        <div class="text-center">
                            <div class="text-2xl font-bold text-red-300">${costRatio.toFixed(1)}x</div>
                            <div class="text-red-200">Cost Multiplier</div>
                        </div>
                        <p class="text-xs text-red-200 mt-2 text-center">
                            You paid ${costRatio.toFixed(1)} times the original loan amount
                        </p>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4">
                        <div class="bg-slate-700 p-3 rounded text-center">
                            <div class="text-lg font-bold text-orange-400">${effectiveAPR.toFixed(0)}%</div>
                            <div class="text-slate-300">Effective APR</div>
                        </div>
                        <div class="bg-slate-700 p-3 rounded text-center">
                            <div class="text-lg font-bold text-purple-400">${this.getDaysInDebt()}</div>
                            <div class="text-slate-300">Days in Debt</div>
                        </div>
                    </div>
                    
                    <div class="bg-yellow-900/30 border border-yellow-500/50 rounded p-3 text-yellow-200 text-xs">
                        <p><strong>Educational Note:</strong> This simulation shows how payday loans can become expensive through renewal cycles. Consider alternatives like credit union loans, employer advances, or financial counseling.</p>
                    </div>
                </div>
                
                <button id="close-summary" class="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded mt-4">
                    Close Summary
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('close-summary').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
    }

    /**
     * Show alternatives to payday loans
     */
    showAlternatives() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-white">Better Alternatives to Payday Loans</h3>
                    <button id="close-alternatives" class="text-slate-400 hover:text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="space-y-4 text-sm">
                    <div class="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                        <h4 class="font-bold text-green-300 mb-2">🏦 Credit Union Small Dollar Loans</h4>
                        <p class="text-green-200 mb-2">APR: 8.86% - 18% | Loan amounts up to $2,000</p>
                        <p class="text-slate-300">Non-profit institutions focused on member benefits, not profits.</p>
                    </div>
                    
                    <div class="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
                        <h4 class="font-bold text-blue-300 mb-2">💼 Employer-Sponsored Programs</h4>
                        <p class="text-blue-200 mb-2">Cost: Often free or low fee | Up to 50% of paycheck</p>
                        <p class="text-slate-300">Many employers offer paycheck advance programs through benefits.</p>
                    </div>
                    
                    <div class="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
                        <h4 class="font-bold text-purple-300 mb-2">📱 Legitimate Cash Advance Apps</h4>
                        <p class="text-purple-200 mb-2">Cost: $0-$8 per advance | Built-in budgeting tools</p>
                        <p class="text-slate-300">Apps like Earnin, Dave, or Brigit with transparent fee structures.</p>
                    </div>
                    
                    <div class="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4">
                        <h4 class="font-bold text-yellow-300 mb-2">🤝 Community Assistance</h4>
                        <p class="text-yellow-200 mb-2">Cost: Free | Emergency assistance programs</p>
                        <p class="text-slate-300">Local charities, religious organizations, and government programs.</p>
                    </div>
                    
                    <div class="bg-orange-900/30 border border-orange-500/50 rounded-lg p-4">
                        <h4 class="font-bold text-orange-300 mb-2">💳 Credit Card Cash Advance</h4>
                        <p class="text-orange-200 mb-2">APR: 20-30% | Often still better than payday loans</p>
                        <p class="text-slate-300">Even with high rates, usually less expensive than payday loan cycles.</p>
                    </div>
                </div>
                
                <div class="bg-slate-700 rounded-lg p-4 mt-4">
                    <h4 class="font-bold text-slate-200 mb-2">📞 Get Help Now</h4>
                    <div class="text-xs text-slate-300 space-y-1">
                        <p>• National Foundation for Credit Counseling: 1-800-388-2227</p>
                        <p>• Financial Counseling Association of America: findafca.org</p>
                        <p>• 211 (dial 2-1-1): Free referrals to local assistance programs</p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('close-alternatives').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    /**
     * Calculate effective APR based on actual payments and time
     */
    calculateEffectiveAPR() {
        if (this.totalPaid === 0 || this.getDaysInDebt() === 0) return 0;
        
        const totalCost = this.totalPaid + this.totalFees;
        const principal = this.originalAmount;
        const daysInDebt = this.getDaysInDebt();
        
        // APR = (Total Interest / Principal) * (365 / Days) * 100
        const apr = ((totalCost - principal) / principal) * (365 / daysInDebt) * 100;
        return Math.max(0, apr);
    }

    /**
     * Calculate cost ratio (total paid / original amount)
     */
    calculateCostRatio() {
        if (this.originalAmount === 0) return 0;
        return (this.totalPaid + this.totalFees) / this.originalAmount;
    }

    /**
     * Get number of days in debt
     */
    getDaysInDebt() {
        if (!this.loanHistory.length) return 0;
        
        const firstLoan = this.loanHistory[0];
        const daysDiff = Math.floor((Date.now() - firstLoan.startDate.getTime()) / (1000 * 60 * 60 * 24));
        return Math.max(1, daysDiff);
    }

    /**
     * Enable simulation controls
     */
    enableControls() {
        ['renew-loan', 'partial-payment', 'full-payoff'].forEach(id => {
            const button = document.getElementById(id);
            if (button) button.disabled = false;
        });
    }

    /**
     * Disable simulation controls
     */
    disableControls() {
        ['renew-loan', 'partial-payment', 'full-payoff'].forEach(id => {
            const button = document.getElementById(id);
            if (button) button.disabled = true;
        });
    }

    /**
     * Reset the simulation
     */
    resetSimulation() {
        this.currentLoan = null;
        this.loanHistory = [];
        this.cycleCount = 0;
        this.totalPaid = 0;
        this.totalFees = 0;
        this.isInDebtTrap = false;
        this.simulationActive = false;
        this.autoRenewals = 0;
        this.originalAmount = 0;

        // Reset UI
        this.updateUI();
        this.updateDebtTrapProgress(0);
        this.disableControls();

        // Clear timeline
        const timeline = document.getElementById('loan-timeline');
        if (timeline) {
            timeline.innerHTML = '<div class="text-slate-400 italic text-sm">No loans yet...</div>';
        }

        // Hide warnings
        const warning = document.getElementById('debt-trap-warning');
        if (warning) warning.classList.add('hidden');

        console.log('🔄 Debt cycle simulation reset');
    }

    /**
     * Get simulation data for export
     */
    getSimulationData() {
        return {
            simulation_type: 'debt_cycle',
            original_amount: this.originalAmount,
            cycle_count: this.cycleCount,
            total_paid: this.totalPaid,
            total_fees: this.totalFees,
            days_in_debt: this.getDaysInDebt(),
            effective_apr: this.calculateEffectiveAPR(),
            cost_ratio: this.calculateCostRatio(),
            is_in_debt_trap: this.isInDebtTrap,
            auto_renewals: this.autoRenewals,
            loan_history: this.loanHistory,
            config: this.config
        };
    }
}

// Export the class
export { DebtCycleSimulator };
