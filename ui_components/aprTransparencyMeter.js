// ui_components/aprTransparencyMeter.js

/**
 * APR Transparency Meter
 * Visual component that shows true cost transparency vs hidden costs
 */

class APRTransparencyMeter {
    constructor() {
        this.currentTransparency = 0;
        this.maxTransparency = 100;
        this.hiddenCosts = [];
        this.revealedCosts = [];
        this.manipulationLevel = 'none';
        this.meterId = 'apr-transparency-meter';
    }

    /**
     * Initialize the transparency meter UI
     */
    initialize(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('APR Transparency Meter: Container not found');
            return;
        }

        container.innerHTML = this._generateMeterHTML();
        this._attachEventListeners();
        this._updateMeterDisplay();
    }

    /**
     * Generate the HTML for the transparency meter
     */
    _generateMeterHTML() {
        return `
            <div id="${this.meterId}" class="apr-transparency-meter bg-slate-800 rounded-lg p-6 border border-slate-600">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-bold text-white">
                        <i class="fas fa-tachometer-alt mr-2 text-blue-400"></i>
                        APR Transparency Meter
                    </h3>
                    <div class="text-sm text-slate-400">
                        Score: <span id="transparency-score" class="font-bold text-white">0%</span>
                    </div>
                </div>

                <!-- Main Transparency Gauge -->
                <div class="relative mb-6">
                    <div class="w-full bg-slate-700 rounded-full h-6 overflow-hidden">
                        <div id="transparency-fill" class="h-full bg-gradient-to-r from-red-600 via-yellow-500 to-green-500 rounded-full transition-all duration-1000" style="width: 0%"></div>
                    </div>
                    <div class="flex justify-between text-xs text-slate-400 mt-1">
                        <span>Hidden</span>
                        <span>Partially Disclosed</span>
                        <span>Fully Transparent</span>
                    </div>
                </div>

                <!-- Cost Breakdown Sections -->
                <div class="grid md:grid-cols-2 gap-4 mb-4">
                    <!-- Hidden Costs -->
                    <div class="bg-red-900/30 border border-red-500/50 rounded-lg p-4">
                        <h4 class="font-bold text-red-300 mb-2 flex items-center">
                            <i class="fas fa-eye-slash mr-2"></i>
                            Hidden Costs
                        </h4>
                        <div id="hidden-costs-list" class="space-y-1 text-sm text-red-200 min-h-[60px]">
                            <div class="text-slate-400 italic">No hidden costs detected yet...</div>
                        </div>
                    </div>

                    <!-- Revealed Costs -->
                    <div class="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                        <h4 class="font-bold text-green-300 mb-2 flex items-center">
                            <i class="fas fa-eye mr-2"></i>
                            Disclosed Costs
                        </h4>
                        <div id="revealed-costs-list" class="space-y-1 text-sm text-green-200 min-h-[60px]">
                            <div class="text-slate-400 italic">No costs disclosed yet...</div>
                        </div>
                    </div>
                </div>

                <!-- APR Calculation Display -->
                <div class="bg-slate-700 rounded-lg p-4 mb-4">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div class="text-2xl font-bold text-blue-400" id="advertised-apr">0%</div>
                            <div class="text-xs text-slate-300">Advertised APR</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-yellow-400" id="actual-apr">0%</div>
                            <div class="text-xs text-slate-300">Actual APR</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-red-400" id="true-apr">0%</div>
                            <div class="text-xs text-slate-300">True Cost APR</div>
                        </div>
                        <div>
                            <div class="text-2xl font-bold text-orange-400" id="apr-difference">0%</div>
                            <div class="text-xs text-slate-300">Difference</div>
                        </div>
                    </div>
                </div>

                <!-- Transparency Alerts -->
                <div id="transparency-alerts" class="space-y-2">
                    <!-- Alerts will be added dynamically -->
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-wrap gap-2 mt-4">
                    <button id="reveal-all-costs" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition">
                        <i class="fas fa-eye mr-1"></i>
                        Reveal All Costs
                    </button>
                    <button id="compare-alternatives" class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg text-sm transition">
                        <i class="fas fa-balance-scale mr-1"></i>
                        Compare Alternatives
                    </button>
                    <button id="export-transparency-report" class="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm transition">
                        <i class="fas fa-download mr-1"></i>
                        Export Report
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Attach event listeners
     */
    _attachEventListeners() {
        const revealBtn = document.getElementById('reveal-all-costs');
        const compareBtn = document.getElementById('compare-alternatives');
        const exportBtn = document.getElementById('export-transparency-report');

        if (revealBtn) {
            revealBtn.addEventListener('click', () => this.revealAllCosts());
        }
        
        if (compareBtn) {
            compareBtn.addEventListener('click', () => this.showAlternatives());
        }
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportTransparencyReport());
        }
    }

    /**
     * Add a hidden cost to track
     */
    addHiddenCost(cost) {
        const hiddenCost = {
            id: `hidden_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            type: cost.type || 'fee',
            amount: cost.amount || 0,
            description: cost.description || 'Unknown fee',
            disclosed: false,
            manipulation_technique: cost.manipulation_technique || 'hidden',
            timestamp: new Date().toISOString()
        };

        this.hiddenCosts.push(hiddenCost);
        this._updateTransparency();
        this._updateMeterDisplay();
        this._showAlert('hidden_cost', hiddenCost);

        return hiddenCost.id;
    }

    /**
     * Reveal a hidden cost
     */
    revealCost(costId, revealMethod = 'user_discovery') {
        const costIndex = this.hiddenCosts.findIndex(cost => cost.id === costId);
        
        if (costIndex === -1) {
            console.warn('Cost not found for revealing:', costId);
            return;
        }

        const cost = this.hiddenCosts[costIndex];
        cost.disclosed = true;
        cost.reveal_method = revealMethod;
        cost.reveal_timestamp = new Date().toISOString();

        // Move to revealed costs
        this.revealedCosts.push(cost);
        this.hiddenCosts.splice(costIndex, 1);

        this._updateTransparency();
        this._updateMeterDisplay();
        this._showAlert('cost_revealed', cost);

        return cost;
    }

    /**
     * Update overall transparency score
     */
    _updateTransparency() {
        const totalCosts = this.hiddenCosts.length + this.revealedCosts.length;
        
        if (totalCosts === 0) {
            this.currentTransparency = 100; // No costs = fully transparent
        } else {
            this.currentTransparency = Math.round((this.revealedCosts.length / totalCosts) * 100);
        }

        // Adjust for manipulation level
        if (this.manipulationLevel === 'high') {
            this.currentTransparency = Math.max(0, this.currentTransparency - 30);
        } else if (this.manipulationLevel === 'medium') {
            this.currentTransparency = Math.max(0, this.currentTransparency - 15);
        }
    }

    /**
     * Update the visual meter display
     */
    _updateMeterDisplay() {
        const fillElement = document.getElementById('transparency-fill');
        const scoreElement = document.getElementById('transparency-score');
        const hiddenList = document.getElementById('hidden-costs-list');
        const revealedList = document.getElementById('revealed-costs-list');

        // Update meter fill
        if (fillElement) {
            fillElement.style.width = `${this.currentTransparency}%`;
            
            // Change color based on transparency level
            if (this.currentTransparency < 30) {
                fillElement.className = 'h-full bg-red-600 rounded-full transition-all duration-1000';
            } else if (this.currentTransparency < 70) {
                fillElement.className = 'h-full bg-yellow-500 rounded-full transition-all duration-1000';
            } else {
                fillElement.className = 'h-full bg-green-500 rounded-full transition-all duration-1000';
            }
        }

        // Update score display
        if (scoreElement) {
            scoreElement.textContent = `${this.currentTransparency}%`;
            scoreElement.className = this.currentTransparency < 50 ? 'font-bold text-red-400' : 
                                   this.currentTransparency < 80 ? 'font-bold text-yellow-400' : 
                                   'font-bold text-green-400';
        }

        // Update hidden costs list
        if (hiddenList) {
            if (this.hiddenCosts.length === 0) {
                hiddenList.innerHTML = '<div class="text-slate-400 italic">No hidden costs detected</div>';
            } else {
                hiddenList.innerHTML = this.hiddenCosts.map(cost => `
                    <div class="flex justify-between items-center p-2 bg-red-800/30 rounded">
                        <span>${cost.description}</span>
                        <span class="font-bold text-red-300">$${cost.amount}</span>
                    </div>
                `).join('');
            }
        }

        // Update revealed costs list
        if (revealedList) {
            if (this.revealedCosts.length === 0) {
                revealedList.innerHTML = '<div class="text-slate-400 italic">No costs disclosed yet</div>';
            } else {
                revealedList.innerHTML = this.revealedCosts.map(cost => `
                    <div class="flex justify-between items-center p-2 bg-green-800/30 rounded">
                        <span>${cost.description}</span>
                        <span class="font-bold text-green-300">$${cost.amount}</span>
                    </div>
                `).join('');
            }
        }

        this._updateAPRDisplays();
    }

    /**
     * Update APR calculations and displays
     */
    _updateAPRDisplays() {
        const advertisedAPR = this._calculateAdvertisedAPR();
        const actualAPR = this._calculateActualAPR();
        const trueAPR = this._calculateTrueAPR();
        const difference = trueAPR - advertisedAPR;

        const elements = {
            'advertised-apr': `${advertisedAPR.toFixed(1)}%`,
            'actual-apr': `${actualAPR.toFixed(1)}%`,
            'true-apr': `${trueAPR.toFixed(1)}%`,
            'apr-difference': `+${difference.toFixed(1)}%`
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = value;
            }
        });
    }

    /**
     * Calculate advertised APR (what lenders show)
     */
    _calculateAdvertisedAPR() {
        // Simplified calculation - typically much lower than reality
        return 15.99;
    }

    /**
     * Calculate actual APR (including some fees)
     */
    _calculateActualAPR() {
        const baseFees = this.revealedCosts
            .filter(cost => cost.type === 'fee')
            .reduce((total, cost) => total + cost.amount, 0);
        
        // Rough APR calculation including revealed fees
        return this._calculateAdvertisedAPR() + (baseFees * 2);
    }

    /**
     * Calculate true APR (including all costs)
     */
    _calculateTrueAPR() {
        const allFees = [...this.hiddenCosts, ...this.revealedCosts]
            .filter(cost => cost.type === 'fee')
            .reduce((total, cost) => total + cost.amount, 0);
        
        const rolloverCosts = [...this.hiddenCosts, ...this.revealedCosts]
            .filter(cost => cost.type === 'rollover')
            .reduce((total, cost) => total + cost.amount, 0);
        
        // More accurate calculation including all costs
        return this._calculateAdvertisedAPR() + (allFees * 3) + (rolloverCosts * 10);
    }

    /**
     * Show transparency alert
     */
    _showAlert(type, data) {
        const alertsContainer = document.getElementById('transparency-alerts');
        if (!alertsContainer) return;

        const alert = document.createElement('div');
        alert.className = 'p-3 rounded-lg border text-sm';
        
        switch (type) {
            case 'hidden_cost':
                alert.className += ' bg-red-900/30 border-red-500/50 text-red-200';
                alert.innerHTML = `
                    <div class="flex items-center">
                        <i class="fas fa-exclamation-triangle mr-2 text-red-400"></i>
                        <span><strong>Hidden Cost Detected:</strong> ${data.description} ($${data.amount})</span>
                    </div>
                `;
                break;
                
            case 'cost_revealed':
                alert.className += ' bg-green-900/30 border-green-500/50 text-green-200';
                alert.innerHTML = `
                    <div class="flex items-center">
                        <i class="fas fa-eye mr-2 text-green-400"></i>
                        <span><strong>Cost Disclosed:</strong> ${data.description} ($${data.amount})</span>
                    </div>
                `;
                break;
                
            case 'low_transparency':
                alert.className += ' bg-orange-900/30 border-orange-500/50 text-orange-200';
                alert.innerHTML = `
                    <div class="flex items-center">
                        <i class="fas fa-shield-alt mr-2 text-orange-400"></i>
                        <span><strong>Warning:</strong> Low transparency detected. Consider alternatives.</span>
                    </div>
                `;
                break;
        }

        alertsContainer.appendChild(alert);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.parentNode.removeChild(alert);
            }
        }, 10000);
    }

    /**
     * Reveal all hidden costs at once
     */
    revealAllCosts() {
        const costsToReveal = [...this.hiddenCosts];
        costsToReveal.forEach(cost => {
            this.revealCost(cost.id, 'forced_disclosure');
        });

        this._showAlert('cost_revealed', {
            description: `All ${costsToReveal.length} hidden costs`,
            amount: costsToReveal.reduce((sum, cost) => sum + cost.amount, 0)
        });
    }

    /**
     * Show alternative lending options
     */
    showAlternatives() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-slate-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-white">Better Alternatives</h3>
                    <button id="close-alternatives" class="text-slate-400 hover:text-white">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                
                <div class="space-y-4">
                    <div class="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                        <h4 class="font-bold text-green-300 mb-2">Credit Union Loans</h4>
                        <p class="text-green-200 text-sm mb-2">Typical APR: 12-18%</p>
                        <p class="text-slate-300 text-sm">Non-profit organizations with member benefits and lower rates.</p>
                    </div>
                    
                    <div class="bg-blue-900/30 border border-blue-500/50 rounded-lg p-4">
                        <h4 class="font-bold text-blue-300 mb-2">Employer Advance Programs</h4>
                        <p class="text-blue-200 text-sm mb-2">Typical APR: 0-6%</p>
                        <p class="text-slate-300 text-sm">Many employers offer paycheck advance programs with minimal fees.</p>
                    </div>
                    
                    <div class="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
                        <h4 class="font-bold text-purple-300 mb-2">Community Assistance Programs</h4>
                        <p class="text-purple-200 text-sm mb-2">Typical APR: 0%</p>
                        <p class="text-slate-300 text-sm">Local charities and government programs for emergency assistance.</p>
                    </div>
                    
                    <div class="bg-orange-900/30 border border-orange-500/50 rounded-lg p-4">
                        <h4 class="font-bold text-orange-300 mb-2">Credit Card Cash Advance</h4>
                        <p class="text-orange-200 text-sm mb-2">Typical APR: 25-30%</p>
                        <p class="text-slate-300 text-sm">Often still better than payday loans, especially for short-term needs.</p>
                    </div>
                </div>
                
                <div class="mt-6 text-center">
                    <button id="find-local-resources" class="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg">
                        Find Local Resources
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal event
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
     * Export transparency report
     */
    exportTransparencyReport() {
        const report = {
            timestamp: new Date().toISOString(),
            transparency_score: this.currentTransparency,
            manipulation_level: this.manipulationLevel,
            apr_calculations: {
                advertised: this._calculateAdvertisedAPR(),
                actual: this._calculateActualAPR(),
                true_cost: this._calculateTrueAPR()
            },
            hidden_costs: this.hiddenCosts,
            revealed_costs: this.revealedCosts,
            total_hidden_amount: this.hiddenCosts.reduce((sum, cost) => sum + cost.amount, 0),
            total_revealed_amount: this.revealedCosts.reduce((sum, cost) => sum + cost.amount, 0),
            recommendations: this._generateRecommendations()
        };

        // Create and download file
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transparency_report_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this._showAlert('cost_revealed', {
            description: 'Transparency report exported',
            amount: 0
        });
    }

    /**
     * Generate recommendations based on transparency score
     */
    _generateRecommendations() {
        const recommendations = [];

        if (this.currentTransparency < 50) {
            recommendations.push('Consider alternative lending options');
            recommendations.push('Demand full cost disclosure before proceeding');
            recommendations.push('Review all terms and conditions carefully');
        }

        if (this.hiddenCosts.length > 0) {
            recommendations.push('Ask about all potential fees and charges');
            recommendations.push('Get cost estimates in writing');
        }

        if (this.manipulationLevel !== 'none') {
            recommendations.push('Be aware of manipulation techniques being used');
            recommendations.push('Take time to consider the decision');
            recommendations.push('Seek independent financial advice');
        }

        return recommendations;
    }

    /**
     * Set manipulation level
     */
    setManipulationLevel(level) {
        this.manipulationLevel = level;
        this._updateTransparency();
        this._updateMeterDisplay();

        if (level === 'high') {
            this._showAlert('low_transparency', {});
        }
    }

    /**
     * Reset the meter
     */
    reset() {
        this.currentTransparency = 0;
        this.hiddenCosts = [];
        this.revealedCosts = [];
        this.manipulationLevel = 'none';
        this._updateMeterDisplay();

        // Clear alerts
        const alertsContainer = document.getElementById('transparency-alerts');
        if (alertsContainer) {
            alertsContainer.innerHTML = '';
        }
    }

    /**
     * Get current metrics
     */
    getMetrics() {
        return {
            transparency_score: this.currentTransparency,
            hidden_costs_count: this.hiddenCosts.length,
            revealed_costs_count: this.revealedCosts.length,
            total_hidden_amount: this.hiddenCosts.reduce((sum, cost) => sum + cost.amount, 0),
            total_revealed_amount: this.revealedCosts.reduce((sum, cost) => sum + cost.amount, 0),
            manipulation_level: this.manipulationLevel,
            apr_difference: this._calculateTrueAPR() - this._calculateAdvertisedAPR()
        };
    }
}

// Export the class
export { APRTransparencyMeter };
