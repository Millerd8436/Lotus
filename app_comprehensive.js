// Copilot: Comprehensive GitHub Pages application integrating all features
// Preserves all content from exploitative.js, ethical.js, and all UI components
// Enhanced with performance optimization and modular architecture

import { LoanSession } from './core/loan_core.js';
import { Exploitative } from './modes/exploitative.js';
import { Ethical } from './modes/ethical.js';
import { Echo } from './engine/echo.js';
import { GhostNarrator } from './narrator/ghost.js';
import { ResearchAnalytics } from './research/research_analytics.js';
import { APRTransparencyMeter } from './ui_components/aprTransparencyMeter.js';
import { DarkPatternEngine } from './ui_components/darkPatternEngine.js';
import { DarkPatternFlags } from './ui_components/darkPatternFlags.js';

class LotusApp {
    constructor() {
        this.version = '2.0.0-comprehensive';
        this.initialized = false;
        this.currentMode = 'neutral';
        this.currentInterface = 'web'; // 'web' or 'simulation'
        
        // Core components
        this.session = null;
        this.exploitativeMode = new Exploitative();
        this.ethicalMode = new Ethical();
        this.echo = new Echo();
        this.ghost = new GhostNarrator();
        this.analytics = new ResearchAnalytics();
        this.transparencyMeter = new APRTransparencyMeter();
        this.darkPatternEngine = new DarkPatternEngine();
        this.darkPatternFlags = new DarkPatternFlags();
        
        // Performance monitoring
        this.performance = {
            startTime: performance.now(),
            marks: new Map(),
            measures: new Map()
        };
        
        // State management
        this.state = {
            educationalModulesShown: new Set(),
            darkPatternsDetected: new Set(),
            userInteractions: [],
            complianceViolations: [],
            researchData: {}
        };
        
        // UI references
        this.elements = {
            mainContent: null,
            dynamicContent: null,
            educationalPanel: null,
            modeButtons: null
        };
        
        this.init();
    }
    
    async init() {
        try {
            console.log('🪷 Initializing Lotus Comprehensive Platform v' + this.version);
            this.mark('init_start');
            
            // Initialize DOM references
            this.initDOMReferences();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize analytics
            this.analytics.enableResearchMode();
            this.analytics.enableEducationalMode();
            
            // Initialize dark pattern detection
            this.darkPatternFlags.setRealTimeDetection(true);
            
            // Check URL parameters
            this.handleURLParameters();
            
            // Initialize accessibility features
            this.initAccessibility();
            
            // Setup performance monitoring
            this.setupPerformanceMonitoring();
            
            this.mark('init_complete');
            this.initialized = true;
            
            console.log('✅ Lotus Platform initialized successfully');
            this.logPerformanceMetrics();
            
        } catch (error) {
            console.error('❌ Failed to initialize Lotus Platform:', error);
            this.handleInitializationError(error);
        }
    }
    
    initDOMReferences() {
        this.elements = {
            mainContent: document.getElementById('main-content'),
            dynamicContent: document.getElementById('dynamic-content'),
            educationalPanel: document.getElementById('educational-panel'),
            modeButtons: document.querySelectorAll('.mode-btn'),
            comparisonView: document.getElementById('comparison-view')
        };
        
        // Verify critical elements exist
        if (!this.elements.mainContent) {
            throw new Error('Critical DOM element #main-content not found');
        }
    }
    
    setupEventListeners() {
        // Mode switching
        this.elements.modeButtons?.forEach(button => {
            button.addEventListener('click', (e) => {
                const mode = e.target.dataset.mode;
                this.switchMode(mode);
            });
        });
        
        // Accessibility controls
        document.getElementById('toggle-contrast')?.addEventListener('click', () => {
            this.toggleHighContrast();
        });
        
        document.getElementById('toggle-animations')?.addEventListener('click', () => {
            this.toggleAnimations();
        });
        
        document.getElementById('reset-simulation')?.addEventListener('click', () => {
            this.resetSession();
        });
        
        document.getElementById('show-help')?.addEventListener('click', () => {
            this.showHelp();
        });
        
        // Educational panel
        document.getElementById('close-panel')?.addEventListener('click', () => {
            this.closeEducationalPanel();
        });
        
        // Global interaction tracking
        document.addEventListener('click', (e) => {
            this.trackInteraction('click', {
                element: e.target.tagName,
                className: e.target.className,
                id: e.target.id,
                timestamp: Date.now()
            });
        });
        
        // Scroll tracking for educational triggers
        window.addEventListener('scroll', this.throttle(() => {
            this.trackScrollBehavior();
        }, 1000));
        
        // Exit intent detection
        document.addEventListener('mouseleave', () => {
            this.handleExitIntent();
        });
    }
    
    async switchMode(mode) {
        if (mode === this.currentMode) return;
        
        console.log(`🔄 Switching to ${mode} mode`);
        this.mark(`mode_switch_${mode}_start`);
        
        try {
            // Update UI state
            this.updateModeButtons(mode);
            
            // Track mode switch
            this.analytics.recordDecisionPoint('mode_switch', 
                ['neutral', 'predatory', 'ethical'], 
                mode, 
                Date.now() - this.performance.startTime
            );
            
            // Clear previous content
            if (this.elements.dynamicContent) {
                this.elements.dynamicContent.innerHTML = '';
            }
            
            // Load mode-specific content
            await this.loadModeContent(mode);
            
            // Update current mode
            this.currentMode = mode;
            
            // Update URL without refresh
            this.updateURL(mode);
            
            this.mark(`mode_switch_${mode}_complete`);
            console.log(`✅ Successfully switched to ${mode} mode`);
            
        } catch (error) {
            console.error(`❌ Failed to switch to ${mode} mode:`, error);
            this.handleModeError(mode, error);
        }
    }
    
    async loadModeContent(mode) {
        switch (mode) {
            case 'predatory':
                await this.loadPredatoryMode();
                break;
            case 'ethical':
                await this.loadEthicalMode();
                break;
            case 'neutral':
            default:
                await this.loadComparisonMode();
                break;
        }
    }
    
    async loadPredatoryMode() {
        console.log('📈 Loading predatory mode with full dark pattern suite');
        
        try {
            // Initialize session for predatory mode
            this.session = new LoanSession();
            this.session.mode = 'predatory';
            
            // Enable dark pattern detection
            this.darkPatternFlags.clearFlags();
            
            // Load predatory interface
            const predatoryContent = await this.loadComponent('predatory-interface');
            
            if (this.elements.dynamicContent) {
                this.elements.dynamicContent.innerHTML = predatoryContent;
            }
            
            // Initialize predatory mode functionality
            await this.exploitativeMode.initializePredatoryInterface(this.session);
            
            // Deploy dark patterns
            await this.darkPatternEngine.deployComprehensiveDeception(this.session, {
                enableAllPatterns: true,
                enableUsuryLoopholes: true,
                trackViolations: true
            });
            
            // Start behavioral tracking
            this.echo.logAction('predatory_mode_started', { timestamp: Date.now() });
            
            // Initialize transparency meter for educational purposes
            this.transparencyMeter.initialize('transparency-container');
            this.transparencyMeter.setManipulationLevel('high');
            
            console.log('✅ Predatory mode loaded with comprehensive dark patterns');
            
        } catch (error) {
            console.error('❌ Failed to load predatory mode:', error);
            throw error;
        }
    }
    
    async loadEthicalMode() {
        console.log('📊 Loading ethical mode with comprehensive education');
        
        try {
            // Initialize session for ethical mode
            this.session = new LoanSession();
            this.session.mode = 'ethical';
            
            // Clear any dark pattern flags
            this.darkPatternFlags.clearFlags();
            
            // Load ethical interface
            const ethicalContent = await this.loadComponent('ethical-interface');
            
            if (this.elements.dynamicContent) {
                this.elements.dynamicContent.innerHTML = ethicalContent;
            }
            
            // Initialize ethical mode functionality
            await this.ethicalMode.initializeEthicalInterface(this.session);
            
            // Enable educational modules
            await this.ethicalMode.enableComprehensiveEducation(this.session, {
                enableAllModules: true,
                enableKantianFramework: true,
                enableUsuryEducation: true,
                enableRealWorldExamples: true
            });
            
            // Initialize transparency meter showing full transparency
            this.transparencyMeter.initialize('transparency-container');
            this.transparencyMeter.setManipulationLevel('none');
            
            // Start educational tracking
            this.echo.logAction('ethical_mode_started', { timestamp: Date.now() });
            
            console.log('✅ Ethical mode loaded with comprehensive education');
            
        } catch (error) {
            console.error('❌ Failed to load ethical mode:', error);
            throw error;
        }
    }
    
    async loadComparisonMode() {
        console.log('📊 Loading comparison mode');
        
        try {
            // Show comparison view
            if (this.elements.comparisonView) {
                this.elements.comparisonView.style.display = 'block';
            }
            
            if (this.elements.dynamicContent) {
                this.elements.dynamicContent.innerHTML = `
                    <div class="comparison-details bg-white rounded-2xl shadow-xl p-8 mt-8">
                        <h3 class="text-3xl font-bold text-center mb-8">Detailed Feature Comparison</h3>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left">
                                <thead>
                                    <tr class="border-b-2">
                                        <th class="p-4">Feature</th>
                                        <th class="p-4 text-red-600">Predatory Approach</th>
                                        <th class="p-4 text-green-600">Ethical Alternative</th>
                                    </tr>
                                </thead>
                                <tbody class="space-y-2">
                                    <tr class="border-b">
                                        <td class="p-4 font-semibold">APR Disclosure</td>
                                        <td class="p-4 text-red-600">Hidden behind "fees" (391% APR as "$15 fee")</td>
                                        <td class="p-4 text-green-600">Clear, upfront APR calculation</td>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="p-4 font-semibold">Terms & Conditions</td>
                                        <td class="p-4 text-red-600">Buried in fine print, auto-consent</td>
                                        <td class="p-4 text-green-600">Clear, accessible, explained terms</td>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="p-4 font-semibold">Marketing Tactics</td>
                                        <td class="p-4 text-red-600">Fake urgency, countdown timers, social pressure</td>
                                        <td class="p-4 text-green-600">Honest information, no pressure tactics</td>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="p-4 font-semibold">Educational Content</td>
                                        <td class="p-4 text-red-600">None or misleading information</td>
                                        <td class="p-4 text-green-600">Comprehensive financial education</td>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="p-4 font-semibold">Alternatives Offered</td>
                                        <td class="p-4 text-red-600">None mentioned</td>
                                        <td class="p-4 text-green-600">Credit unions, PALs, counseling resources</td>
                                    </tr>
                                    <tr class="border-b">
                                        <td class="p-4 font-semibold">Regulatory Compliance</td>
                                        <td class="p-4 text-red-600">Exploits loopholes (tribal lending, rent-a-bank)</td>
                                        <td class="p-4 text-green-600">Full regulatory compliance</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div class="mt-8 grid md:grid-cols-2 gap-6">
                            <div class="bg-red-50 p-6 rounded-lg">
                                <h4 class="font-bold text-red-800 mb-4">Real-World Impact of Predatory Practices</h4>
                                <ul class="text-red-700 space-y-2 text-sm">
                                    <li>• Average borrower pays $520 in fees for $375 loan</li>
                                    <li>• 80% of payday loan revenue comes from borrowers trapped in debt</li>
                                    <li>• 65% of borrowers roll over loans multiple times</li>
                                    <li>• Disproportionately targets communities of color</li>
                                </ul>
                            </div>
                            
                            <div class="bg-green-50 p-6 rounded-lg">
                                <h4 class="font-bold text-green-800 mb-4">Benefits of Ethical Alternatives</h4>
                                <ul class="text-green-700 space-y-2 text-sm">
                                    <li>• Credit union PALs: 28% maximum APR by law</li>
                                    <li>• No rollover traps or debt cycles</li>
                                    <li>• Financial counseling and education included</li>
                                    <li>• Community-focused, member-owned institutions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            }
            
            console.log('✅ Comparison mode loaded');
            
        } catch (error) {
            console.error('❌ Failed to load comparison mode:', error);
            throw error;
        }
    }
    
    async loadComponent(componentName) {
        // Component templates for different interfaces
        const components = {
            'predatory-interface': `
                <div class="predatory-container bg-gradient-to-br from-red-500 to-red-700 min-h-screen text-white">
                    <div class="container mx-auto px-4 py-8">
                        <div class="max-w-4xl mx-auto">
                            <!-- Hero Section with Dark Patterns -->
                            <div class="text-center mb-8">
                                <div class="bg-red-600 text-white px-4 py-2 rounded-lg mb-4 animate-pulse">
                                    🔥 LIMITED TIME OFFER - EXPIRES IN: <span id="countdown-timer">05:00</span>
                                </div>
                                <h1 class="text-5xl font-bold mb-4">Need Cash TODAY?</h1>
                                <h2 class="text-2xl mb-6">Get Up To $1,500 Instantly!</h2>
                                <div class="bg-yellow-400 text-black px-6 py-2 rounded-full inline-block mb-4">
                                    98% APPROVAL RATE!
                                </div>
                            </div>
                            
                            <!-- Fake Testimonials -->
                            <div class="bg-white text-black rounded-lg p-6 mb-8">
                                <h3 class="text-xl font-bold mb-4">What Our Customers Say:</h3>
                                <div class="grid md:grid-cols-2 gap-4">
                                    <div class="bg-gray-50 p-4 rounded">
                                        <p>"Got $800 in 5 minutes! Life saver!" - Sarah M. ⭐⭐⭐⭐⭐</p>
                                    </div>
                                    <div class="bg-gray-50 p-4 rounded">
                                        <p>"So easy! No credit check needed!" - Mike T. ⭐⭐⭐⭐⭐</p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Application Form with Dark Patterns -->
                            <div class="bg-white text-black rounded-lg p-8">
                                <h3 class="text-2xl font-bold mb-6 text-center">Quick Application - 2 Minutes!</h3>
                                <form id="predatory-form" class="space-y-4">
                                    <div class="grid md:grid-cols-2 gap-4">
                                        <input type="text" placeholder="First Name" class="p-3 border rounded" required>
                                        <input type="text" placeholder="Last Name" class="p-3 border rounded" required>
                                    </div>
                                    <input type="email" placeholder="Email" class="w-full p-3 border rounded" required>
                                    <input type="tel" placeholder="Phone" class="w-full p-3 border rounded" required>
                                    
                                    <!-- Loan Amount Slider with Manipulation -->
                                    <div class="space-y-2">
                                        <label class="font-semibold">How much do you need?</label>
                                        <input type="range" id="loan-amount" min="100" max="1500" value="500" class="w-full">
                                        <div class="flex justify-between text-sm text-gray-600">
                                            <span>$100</span>
                                            <span id="selected-amount" class="font-bold text-red-600">$500</span>
                                            <span>$1500</span>
                                        </div>
                                    </div>
                                    
                                    <!-- Hidden Consent Checkboxes -->
                                    <div class="space-y-2 text-sm">
                                        <label class="flex items-center">
                                            <input type="checkbox" checked class="mr-2"> 
                                            I agree to Express Processing (+$25 fee)
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" checked class="mr-2"> 
                                            I agree to automatic renewal if needed
                                        </label>
                                        <label class="flex items-center">
                                            <input type="checkbox" checked class="mr-2"> 
                                            I agree to marketing communications
                                        </label>
                                    </div>
                                    
                                    <button type="submit" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-lg text-xl animate-pulse">
                                        GET MY CASH NOW! 💰
                                    </button>
                                    
                                    <p class="text-xs text-gray-500 text-center">
                                        *By clicking above, you agree to our terms and conditions and automatic withdrawal authorization.
                                    </p>
                                </form>
                            </div>
                            
                            <!-- Educational Overlay (Always Visible) -->
                            <div class="mt-8 bg-blue-900 p-6 rounded-lg">
                                <h4 class="text-xl font-bold mb-4">🎓 Educational Notice</h4>
                                <p class="mb-4">This is a simulation demonstrating predatory lending tactics. Notice:</p>
                                <ul class="space-y-1 text-sm">
                                    <li>• False urgency countdown timer</li>
                                    <li>• Hidden fees in pre-checked boxes</li>
                                    <li>• Fake testimonials and approval rates</li>
                                    <li>• Automatic consent to unfavorable terms</li>
                                </ul>
                                <div id="transparency-container" class="mt-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `,
            
            'ethical-interface': `
                <div class="ethical-container bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
                    <div class="container mx-auto px-4 py-8">
                        <div class="max-w-4xl mx-auto">
                            <!-- Transparent Hero Section -->
                            <div class="text-center mb-8">
                                <h1 class="text-4xl font-bold text-gray-800 mb-4">Responsible Financial Options</h1>
                                <p class="text-xl text-gray-600 mb-6">
                                    Transparent information to help you make informed financial decisions
                                </p>
                                <div class="bg-green-100 border border-green-400 rounded-lg p-4 max-w-2xl mx-auto">
                                    <p class="text-green-800">
                                        <strong>Our Commitment:</strong> Full transparency, no hidden fees, comprehensive education about all options
                                    </p>
                                </div>
                            </div>
                            
                            <!-- Educational Content First -->
                            <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                                <h2 class="text-2xl font-bold text-gray-800 mb-6">Before You Borrow: Understanding Your Options</h2>
                                
                                <div class="grid md:grid-cols-2 gap-6 mb-8">
                                    <div class="bg-blue-50 p-6 rounded-lg">
                                        <h3 class="font-bold text-blue-800 mb-4">💰 Understanding True Costs</h3>
                                        <p class="text-blue-700 mb-4">
                                            A $100 payday loan with a "$15 fee" for 14 days actually costs:
                                        </p>
                                        <div class="bg-blue-100 p-4 rounded">
                                            <p class="font-bold text-blue-900">391% APR</p>
                                            <p class="text-sm text-blue-800">($15 ÷ $100) × (365 ÷ 14) × 100%</p>
                                        </div>
                                    </div>
                                    
                                    <div class="bg-green-50 p-6 rounded-lg">
                                        <h3 class="font-bold text-green-800 mb-4">✅ Better Alternatives</h3>
                                        <ul class="text-green-700 space-y-2">
                                            <li>• Credit Union PALs: 28% max APR</li>
                                            <li>• Payment plans with creditors</li>
                                            <li>• Emergency assistance programs</li>
                                            <li>• Employer advance programs</li>
                                        </ul>
                                    </div>
                                </div>
                                
                                <!-- Honest Financial Assessment -->
                                <div class="border-t pt-6">
                                    <h3 class="text-xl font-bold mb-4">Financial Assessment</h3>
                                    <div class="space-y-4">
                                        <div>
                                            <label class="block text-sm font-semibold mb-2">What is your specific financial need?</label>
                                            <select class="w-full p-3 border rounded" id="financial-need">
                                                <option value="">Select your situation</option>
                                                <option value="emergency">Emergency expense (medical, car repair)</option>
                                                <option value="bills">Help with regular bills (rent, utilities)</option>
                                                <option value="groceries">Groceries or essential needs</option>
                                                <option value="other">Other financial need</option>
                                            </select>
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-semibold mb-2">Amount needed:</label>
                                            <input type="number" id="ethical-amount" class="w-full p-3 border rounded" 
                                                   placeholder="Enter amount" min="1" max="2000">
                                            <p class="text-sm text-gray-600 mt-1">We'll show you the true cost and best alternatives</p>
                                        </div>
                                        
                                        <div>
                                            <label class="block text-sm font-semibold mb-2">When do you need the money?</label>
                                            <select class="w-full p-3 border rounded">
                                                <option value="today">Today (explore emergency assistance)</option>
                                                <option value="week">Within a week (time for credit union application)</option>
                                                <option value="month">Within a month (time for payment plan negotiation)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Transparent Cost Calculator -->
                            <div class="bg-white rounded-lg shadow-lg p-8 mb-8">
                                <h3 class="text-2xl font-bold mb-6">True Cost Comparison</h3>
                                <div id="cost-comparison" class="grid md:grid-cols-3 gap-6">
                                    <!-- Will be populated by JavaScript -->
                                </div>
                            </div>
                            
                            <!-- Informed Consent Process -->
                            <div class="bg-white rounded-lg shadow-lg p-8">
                                <h3 class="text-2xl font-bold mb-6">Informed Decision Framework</h3>
                                <div class="space-y-6">
                                    <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                                        <h4 class="font-bold text-yellow-800 mb-2">⚠️ Important Considerations</h4>
                                        <ul class="text-yellow-700 space-y-1 text-sm">
                                            <li>• Have you explored all alternatives listed above?</li>
                                            <li>• Do you understand the total cost of this loan?</li>
                                            <li>• Can you afford to repay without borrowing again?</li>
                                            <li>• Are you being pressured to make this decision quickly?</li>
                                        </ul>
                                    </div>
                                    
                                    <div id="alternatives-explorer" class="bg-blue-50 p-6 rounded-lg">
                                        <h4 class="font-bold text-blue-800 mb-4">📞 Get Help Now</h4>
                                        <div class="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <p class="font-semibold">National Foundation for Credit Counseling</p>
                                                <p class="text-blue-600">1-800-388-2227</p>
                                            </div>
                                            <div>
                                                <p class="font-semibold">211 Community Resources</p>
                                                <p class="text-blue-600">Dial 2-1-1</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div id="transparency-container" class="mt-6"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        };
        
        return components[componentName] || '<div>Component not found</div>';
    }
    
    updateModeButtons(activeMode) {
        this.elements.modeButtons?.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.mode === activeMode) {
                button.classList.add('active');
            }
        });
    }
    
    updateURL(mode) {
        const url = new URL(window.location);
        if (mode === 'neutral') {
            url.searchParams.delete('mode');
        } else {
            url.searchParams.set('mode', mode);
        }
        window.history.pushState({}, '', url);
    }
    
    handleURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        
        if (mode && ['predatory', 'ethical'].includes(mode)) {
            // Delay to ensure DOM is ready
            setTimeout(() => {
                this.switchMode(mode);
            }, 100);
        }
    }
    
    trackInteraction(type, data) {
        this.state.userInteractions.push({
            type,
            timestamp: Date.now(),
            ...data
        });
        
        // Log to analytics
        this.analytics.recordDecisionPoint('user_interaction', [type], type, 0);
        
        // Check for dark patterns
        if (type === 'click' && this.currentMode === 'predatory') {
            this.checkForDarkPatternInteraction(data);
        }
    }
    
    checkForDarkPatternInteraction(data) {
        // Detect interactions with dark pattern elements
        const darkPatternClasses = [
            'countdown-timer', 'fake-testimonial', 'fake-approval-rate',
            'pre-checked', 'hidden-consent', 'urgent-cta'
        ];
        
        const isDarkPattern = darkPatternClasses.some(pattern => 
            data.className?.includes(pattern)
        );
        
        if (isDarkPattern) {
            this.darkPatternFlags.flagPattern(
                'user_interaction_with_dark_pattern',
                'HIGH',
                `User interacted with ${data.className}`,
                data
            );
            
            this.analytics.recordDarkPattern(
                'interaction_based',
                `User clicked on ${data.className}`,
                'high'
            );
        }
    }
    
    trackScrollBehavior() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        // Trigger educational content based on scroll
        if (scrollPercent > 50 && !this.state.educationalModulesShown.has('scroll_50')) {
            this.showEducationalTrigger('scroll_50');
        }
        
        if (scrollPercent > 80 && !this.state.educationalModulesShown.has('scroll_80')) {
            this.showEducationalTrigger('scroll_80');
        }
    }
    
    showEducationalTrigger(triggerType) {
        this.state.educationalModulesShown.add(triggerType);
        
        // Show contextual educational content
        const educationalContent = this.getEducationalContent(triggerType);
        if (educationalContent) {
            this.showEducationalModal(educationalContent);
        }
    }
    
    getEducationalContent(triggerType) {
        const content = {
            'scroll_50': {
                title: '📚 Learning Checkpoint',
                content: 'Notice how different the two approaches feel? This demonstrates how interface design can influence financial decisions.',
                type: 'info'
            },
            'scroll_80': {
                title: '🎯 Research Insight',
                content: 'Your engagement level suggests high interest in financial education. Would you like to explore advanced topics?',
                type: 'question'
            }
        };
        
        return content[triggerType];
    }
    
    showEducationalModal(content) {
        // Create and show educational modal
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-6 max-w-md mx-4">
                <h3 class="text-xl font-bold mb-4">${content.title}</h3>
                <p class="text-gray-700 mb-6">${content.content}</p>
                <div class="flex gap-2 justify-end">
                    <button onclick="this.closest('.fixed').remove()" 
                            class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                        Close
                    </button>
                    ${content.type === 'question' ? 
                        '<button onclick="window.LotusApp.showAdvancedEducation(); this.closest(\'.fixed\').remove()" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Learn More</button>' 
                        : ''}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Auto-remove after 10 seconds if not interacted with
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 10000);
    }
    
    showAdvancedEducation() {
        // Show advanced educational content
        this.openEducationalPanel();
        
        // Load advanced modules
        if (this.currentMode === 'ethical') {
            this.ethicalMode.showAdvancedEducationalModules(this.session);
        }
    }
    
    openEducationalPanel() {
        if (this.elements.educationalPanel) {
            this.elements.educationalPanel.classList.remove('hidden');
        }
    }
    
    closeEducationalPanel() {
        if (this.elements.educationalPanel) {
            this.elements.educationalPanel.classList.add('hidden');
        }
    }
    
    handleExitIntent() {
        // Only trigger in predatory mode for educational purposes
        if (this.currentMode === 'predatory' && !this.state.educationalModulesShown.has('exit_intent')) {
            this.state.educationalModulesShown.add('exit_intent');
            
            this.showEducationalModal({
                title: '🚨 Exit Intent Detected',
                content: 'In real predatory lending sites, this would trigger aggressive retention tactics. Notice how this educational simulation respects your choice to leave.',
                type: 'info'
            });
        }
    }
    
    // Accessibility features
    toggleHighContrast() {
        document.body.classList.toggle('high-contrast');
        console.log('🎨 High contrast toggled');
    }
    
    toggleAnimations() {
        document.body.classList.toggle('no-animations');
        console.log('⚡ Animations toggled');
    }
    
    showHelp() {
        this.showEducationalModal({
            title: '❓ Help & Information',
            content: 'This is an educational simulation comparing predatory vs ethical lending. Use the mode buttons to switch between experiences. All interactions are tracked for research purposes.',
            type: 'info'
        });
    }
    
    resetSession() {
        // Reset all session data
        this.session = null;
        this.state.userInteractions = [];
        this.state.educationalModulesShown.clear();
        this.state.darkPatternsDetected.clear();
        
        // Clear UI
        if (this.elements.dynamicContent) {
            this.elements.dynamicContent.innerHTML = '';
        }
        
        // Reset to neutral mode
        this.switchMode('neutral');
        
        console.log('🔄 Session reset');
    }
    
    // Performance monitoring
    mark(name) {
        this.performance.marks.set(name, performance.now() - this.performance.startTime);
    }
    
    measure(name, startMark, endMark) {
        const start = this.performance.marks.get(startMark) || 0;
        const end = this.performance.marks.get(endMark) || performance.now() - this.performance.startTime;
        this.performance.measures.set(name, end - start);
    }
    
    getPerformanceMetrics() {
        return {
            marks: Object.fromEntries(this.performance.marks),
            measures: Object.fromEntries(this.performance.measures),
            totalRuntime: performance.now() - this.performance.startTime
        };
    }
    
    logPerformanceMetrics() {
        const metrics = this.getPerformanceMetrics();
        console.log('📊 Performance Metrics:', metrics);
    }
    
    setupPerformanceMonitoring() {
        // Monitor long tasks
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.duration > 50) {
                        console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`);
                    }
                }
            });
            observer.observe({ entryTypes: ['longtask'] });
        }
    }
    
    initAccessibility() {
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'm') {
                // Alt+M to cycle modes
                this.cycleMode();
            }
            
            if (e.key === 'Escape') {
                // Escape to close modals/panels
                this.closeEducationalPanel();
                document.querySelectorAll('.fixed').forEach(modal => modal.remove());
            }
        });
        
        // Add focus indicators
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .focus-visible:focus {
                    outline: 2px solid #667eea;
                    outline-offset: 2px;
                }
            </style>
        `);
    }
    
    cycleMode() {
        const modes = ['neutral', 'predatory', 'ethical'];
        const currentIndex = modes.indexOf(this.currentMode);
        const nextMode = modes[(currentIndex + 1) % modes.length];
        this.switchMode(nextMode);
    }
    
    // Error handling
    handleInitializationError(error) {
        console.error('Failed to initialize Lotus Platform:', error);
        
        // Show error message to user
        document.body.innerHTML = `
            <div class="error-container bg-red-50 min-h-screen flex items-center justify-center">
                <div class="text-center p-8">
                    <h1 class="text-3xl font-bold text-red-600 mb-4">Initialization Error</h1>
                    <p class="text-red-700 mb-4">Failed to load the Lotus Platform:</p>
                    <code class="bg-red-100 p-2 rounded text-sm">${error.message}</code>
                    <button onclick="location.reload()" 
                            class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Retry
                    </button>
                </div>
            </div>
        `;
    }
    
    handleModeError(mode, error) {
        console.error(`Failed to load ${mode} mode:`, error);
        
        // Show error in dynamic content area
        if (this.elements.dynamicContent) {
            this.elements.dynamicContent.innerHTML = `
                <div class="error-message bg-red-50 border border-red-200 rounded-lg p-6 m-4">
                    <h3 class="text-xl font-bold text-red-600 mb-2">Mode Loading Error</h3>
                    <p class="text-red-700 mb-4">Failed to load ${mode} mode: ${error.message}</p>
                    <button onclick="window.LotusApp.switchMode('neutral')" 
                            class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        Return to Comparison
                    </button>
                </div>
            `;
        }
    }
    
    // Utility function
    throttle(func, delay) {
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
    
    // Export functionality for research
    exportResearchData() {
        const data = {
            session: this.session?.toJSON(),
            analytics: this.analytics.generateResearchReport(),
            darkPatterns: this.darkPatternFlags.getAllFlags(),
            interactions: this.state.userInteractions,
            performance: this.getPerformanceMetrics(),
            timestamp: new Date().toISOString()
        };
        
        // Create download
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lotus_research_data_${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log('📊 Research data exported');
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.LotusApp = new LotusApp();
});

// Global functions for HTML onclick handlers
window.startSimulation = () => window.LotusApp?.switchMode('neutral');
window.loadPredatoryMode = () => window.LotusApp?.switchMode('predatory');
window.loadEthicalMode = () => window.LotusApp?.switchMode('ethical');
window.showEducationalInfo = () => window.LotusApp?.openEducationalPanel();
window.showPerformanceMetrics = () => window.LotusApp?.logPerformanceMetrics();
window.exportData = () => window.LotusApp?.exportResearchData();

export { LotusApp };
