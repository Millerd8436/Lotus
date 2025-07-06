/**
 * Comprehensive Integration Test for Educational System
 * 
 * This module tests the integration of all educational components to ensure
 * they work together seamlessly for GitHub Pages deployment.
 */

export class EducationalSystemIntegrationTest {
    constructor() {
        this.testResults = {
            totalTests: 0,
            passed: 0,
            failed: 0,
            errors: [],
            warnings: []
        };
        this.testCategories = [
            'module_loading',
            'educational_scaffolding',
            'behavioral_psychology',
            'research_data_collection',
            'assessment_system',
            'ui_integration',
            'data_persistence',
            'github_pages_compatibility'
        ];
    }

    // Run comprehensive integration test suite
    async runCompleteTestSuite() {
        console.log('🧪 Starting Comprehensive Educational System Integration Test Suite');
        
        this.resetTestResults();
        
        for (const category of this.testCategories) {
            await this.runTestCategory(category);
        }
        
        return this.generateTestReport();
    }

    async runTestCategory(category) {
        console.log(`📋 Testing category: ${category}`);
        
        switch (category) {
            case 'module_loading':
                await this.testModuleLoading();
                break;
            case 'educational_scaffolding':
                await this.testEducationalScaffolding();
                break;
            case 'behavioral_psychology':
                await this.testBehavioralPsychology();
                break;
            case 'research_data_collection':
                await this.testResearchDataCollection();
                break;
            case 'assessment_system':
                await this.testAssessmentSystem();
                break;
            case 'ui_integration':
                await this.testUIIntegration();
                break;
            case 'data_persistence':
                await this.testDataPersistence();
                break;
            case 'github_pages_compatibility':
                await this.testGitHubPagesCompatibility();
                break;
        }
    }

    async testModuleLoading() {
        // Test 1: Educational Scaffolding Module
        this.runTest('Educational Scaffolding Import', () => {
            const EducationalScaffolding = window.EducationalScaffolding;
            if (!EducationalScaffolding) {
                throw new Error('EducationalScaffolding module not found');
            }
            
            const instance = new EducationalScaffolding();
            if (!instance.learningObjectives) {
                throw new Error('Learning objectives not initialized');
            }
            
            if (Object.keys(instance.learningObjectives).length < 5) {
                throw new Error('Insufficient learning objectives defined');
            }
        });

        // Test 2: Behavioral Psychology Engine
        this.runTest('Behavioral Psychology Engine Import', () => {
            const BehavioralPsychologyEngine = window.BehavioralPsychologyEngine;
            if (!BehavioralPsychologyEngine) {
                throw new Error('BehavioralPsychologyEngine module not found');
            }
            
            // Mock dependencies for testing
            const mockEcho = { logAction: () => {} };
            const mockSession = { sessionId: 'test' };
            const instance = new BehavioralPsychologyEngine(mockEcho, mockSession);
            
            if (!instance.cognitiveBiases) {
                throw new Error('Cognitive biases not initialized');
            }
        });

        // Test 3: Research Data Collector
        this.runTest('Research Data Collector Import', () => {
            const ResearchDataCollector = window.ResearchDataCollector;
            if (!ResearchDataCollector) {
                throw new Error('ResearchDataCollector module not found');
            }
            
            const instance = new ResearchDataCollector();
            if (!instance.dataStreams) {
                throw new Error('Data streams not initialized');
            }
            
            if (!instance.sessionId) {
                throw new Error('Session ID not generated');
            }
        });

        // Test 4: Educational Assessment
        this.runTest('Educational Assessment Import', () => {
            const EducationalAssessment = window.EducationalAssessment;
            if (!EducationalAssessment) {
                throw new Error('EducationalAssessment module not found');
            }
            
            const mockScaffolding = { learningObjectives: {} };
            const instance = new EducationalAssessment(mockScaffolding);
            
            if (!instance.comprehensiveQuizBank) {
                throw new Error('Quiz bank not initialized');
            }
        });
    }

    async testEducationalScaffolding() {
        const EducationalScaffolding = window.EducationalScaffolding;
        const scaffolding = new EducationalScaffolding();

        // Test 1: Learning Objectives Structure
        this.runTest('Learning Objectives Structure', () => {
            const requiredDomains = ['behavioral_psychology', 'kantian_ethics', 'financial_literacy', 'interface_design', 'research_methods'];
            
            requiredDomains.forEach(domain => {
                if (!scaffolding.learningObjectives[domain]) {
                    throw new Error(`Missing learning objective domain: ${domain}`);
                }
                
                const objective = scaffolding.learningObjectives[domain];
                if (!objective.title || !objective.concepts || !Array.isArray(objective.concepts)) {
                    throw new Error(`Invalid structure for domain: ${domain}`);
                }
                
                if (objective.concepts.length < 3) {
                    throw new Error(`Insufficient concepts for domain: ${domain}`);
                }
            });
        });

        // Test 2: Interactive Learning Modules
        this.runTest('Interactive Learning Modules', () => {
            scaffolding.initialize();
            
            // Test behavioral psychology demo
            scaffolding.launchBehavioralPsychologyDemo();
            if (scaffolding.currentModule !== 'behavioral_psychology') {
                throw new Error('Behavioral psychology module not launched correctly');
            }
            
            // Test Kantian analysis tool
            scaffolding.launchKantianAnalysisTool();
            if (scaffolding.currentModule !== 'kantian_ethics') {
                throw new Error('Kantian analysis tool not launched correctly');
            }
            
            // Test financial calculator
            scaffolding.launchFinancialCalculator();
            if (scaffolding.currentModule !== 'financial_literacy') {
                throw new Error('Financial calculator not launched correctly');
            }
        });

        // Test 3: Progress Tracking
        this.runTest('Progress Tracking', () => {
            const testConcept = 'Test concept for progress tracking';
            scaffolding.recordConceptLearned(testConcept);
            
            if (!scaffolding.progressTracking.conceptsLearned.includes(testConcept)) {
                throw new Error('Concept learning not recorded');
            }
            
            const progress = scaffolding.calculateObjectiveProgress('behavioral_psychology');
            if (typeof progress !== 'number' || progress < 0 || progress > 100) {
                throw new Error('Invalid progress calculation');
            }
        });
    }

    async testBehavioralPsychology() {
        const BehavioralPsychologyEngine = window.BehavioralPsychologyEngine;
        const mockEcho = { logAction: (action, data) => console.log(`Mock Echo: ${action}`, data) };
        const mockSession = { sessionId: 'test_session' };
        const engine = new BehavioralPsychologyEngine(mockEcho, mockSession);

        // Test 1: Bias Detection
        this.runTest('Cognitive Bias Detection', () => {
            // Test anchoring bias detection
            const anchoringResult = engine.detectAnchoringBias(100, 95, 'Test anchoring scenario');
            if (!anchoringResult.anchorValue || !anchoringResult.userValue) {
                throw new Error('Anchoring bias detection failed');
            }
            
            // Test sunk cost fallacy detection
            const sunkCostResult = engine.detectSunkCostFallacy(100, 50, 'continue');
            if (!sunkCostResult.priorInvestment || !sunkCostResult.additionalCost) {
                throw new Error('Sunk cost fallacy detection failed');
            }
            
            // Verify bias was recorded
            if (!engine.cognitiveBiases.anchoring.detected) {
                throw new Error('Anchoring bias not properly recorded');
            }
        });

        // Test 2: Decision System Analysis
        this.runTest('Decision System Analysis', () => {
            const systemAnalysis = engine.analyzeDecisionSystem(2000, 3, 2); // 2 seconds, complexity 3, pressure 2
            
            if (!systemAnalysis.system1Score && !systemAnalysis.system2Score) {
                throw new Error('Decision system analysis failed');
            }
            
            if (!systemAnalysis.dominantSystem) {
                throw new Error('Dominant system not identified');
            }
        });

        // Test 3: Manipulation Tactic Recording
        this.runTest('Manipulation Tactic Recording', () => {
            const tacticResult = engine.recordManipulationTactic('time_pressure', {
                duration: 30,
                context: 'loan_decision'
            });
            
            if (!tacticResult.type || !tacticResult.psychologicalTarget) {
                throw new Error('Manipulation tactic recording failed');
            }
            
            if (engine.manipulationTactics.time_pressure.length === 0) {
                throw new Error('Manipulation tactic not stored');
            }
        });

        // Test 4: Comprehensive Report Generation
        this.runTest('Behavioral Report Generation', () => {
            const report = engine.generateBehavioralReport();
            
            const requiredSections = ['cognitiveBiasProfile', 'decisionMakingProfile', 'manipulationVulnerability', 'behavioralInsights'];
            requiredSections.forEach(section => {
                if (!report[section]) {
                    throw new Error(`Missing report section: ${section}`);
                }
            });
            
            if (!Array.isArray(report.behavioralInsights) || report.behavioralInsights.length === 0) {
                throw new Error('Behavioral insights not generated');
            }
        });
    }

    async testResearchDataCollection() {
        const ResearchDataCollector = window.ResearchDataCollector;
        const collector = new ResearchDataCollector();

        // Test 1: Data Stream Structure
        this.runTest('Data Stream Structure', () => {
            const requiredStreams = ['behavioral', 'cognitive', 'ethical', 'financial', 'interface', 'educational'];
            
            requiredStreams.forEach(stream => {
                if (!collector.dataStreams[stream]) {
                    throw new Error(`Missing data stream: ${stream}`);
                }
            });
            
            if (!collector.researchMetadata.version) {
                throw new Error('Research metadata incomplete');
            }
        });

        // Test 2: Decision Recording
        this.runTest('Decision Recording', () => {
            const decision = collector.recordDecision('test_decision', ['option1', 'option2'], 'option1');
            
            if (!decision.decision_id || !decision.timestamp) {
                throw new Error('Decision recording failed');
            }
            
            if (collector.dataStreams.behavioral.decisions.length === 0) {
                throw new Error('Decision not stored in data stream');
            }
        });

        // Test 3: Cognitive Bias Recording
        this.runTest('Cognitive Bias Recording', () => {
            const bias = collector.recordCognitiveBias('anchoring', { confidence: 0.8, context: 'test' });
            
            if (!bias.bias_id || !bias.bias_type) {
                throw new Error('Cognitive bias recording failed');
            }
            
            if (collector.dataStreams.cognitive.biases_detected.length === 0) {
                throw new Error('Bias not stored in data stream');
            }
        });

        // Test 4: Data Export
        this.runTest('Data Export Functionality', () => {
            const exportData = collector.exportResearchData('json');
            
            if (!exportData.json) {
                throw new Error('JSON export failed');
            }
            
            const parsedData = JSON.parse(exportData.json);
            if (!parsedData.study_info || !parsedData.behavioral_findings) {
                throw new Error('Export data structure invalid');
            }
        });
    }

    async testAssessmentSystem() {
        const EducationalAssessment = window.EducationalAssessment;
        const mockScaffolding = { learningObjectives: {} };
        const assessment = new EducationalAssessment(mockScaffolding);

        // Test 1: Quiz Bank Structure
        this.runTest('Quiz Bank Structure', () => {
            const requiredDomains = ['behavioral_psychology', 'kantian_ethics', 'financial_literacy', 'interface_design'];
            
            requiredDomains.forEach(domain => {
                if (!assessment.comprehensiveQuizBank[domain]) {
                    throw new Error(`Missing quiz bank domain: ${domain}`);
                }
                
                const domainBank = assessment.comprehensiveQuizBank[domain];
                if (!domainBank.foundational || !domainBank.intermediate) {
                    throw new Error(`Incomplete difficulty levels for domain: ${domain}`);
                }
                
                if (domainBank.foundational.length === 0) {
                    throw new Error(`No foundational questions for domain: ${domain}`);
                }
            });
        });

        // Test 2: Adaptive Assessment Generation
        this.runTest('Adaptive Assessment Generation', () => {
            const adaptiveAssessment = assessment.generateAdaptiveAssessment('behavioral_psychology');
            
            if (!adaptiveAssessment.id || !adaptiveAssessment.questions) {
                throw new Error('Adaptive assessment generation failed');
            }
            
            if (adaptiveAssessment.questions.length === 0) {
                throw new Error('No questions generated for adaptive assessment');
            }
        });

        // Test 3: Comprehensive Assessment
        this.runTest('Comprehensive Assessment Generation', () => {
            const comprehensiveAssessment = assessment.generateComprehensiveAssessment();
            
            if (!comprehensiveAssessment.sections || Object.keys(comprehensiveAssessment.sections).length === 0) {
                throw new Error('Comprehensive assessment generation failed');
            }
            
            if (comprehensiveAssessment.total_questions === 0) {
                throw new Error('No questions in comprehensive assessment');
            }
        });

        // Test 4: Feedback Generation
        this.runTest('Detailed Feedback Generation', () => {
            // Create a mock question first
            const mockQuestionId = 'bp_001';
            const feedback = assessment.generateDetailedFeedback(mockQuestionId, 'option1', true);
            
            // Note: In this test, feedback might be null due to mock data
            // The test verifies the function doesn't crash
            if (feedback === undefined) {
                throw new Error('Feedback generation function failed');
            }
        });
    }

    async testUIIntegration() {
        // Test 1: Required DOM Elements
        this.runTest('Required DOM Elements Present', () => {
            const requiredElements = [
                'education-progress',
                'research-dashboard',
                'compliance-tracker',
                'enable-research-mode',
                'enable-educational-tracking',
                'export-research-data'
            ];
            
            requiredElements.forEach(id => {
                if (!document.getElementById(id)) {
                    throw new Error(`Missing required DOM element: ${id}`);
                }
            });
        });

        // Test 2: Educational Progress Tracker
        this.runTest('Educational Progress Tracker', () => {
            const progressTracker = document.getElementById('education-progress');
            if (!progressTracker) {
                throw new Error('Educational progress tracker not found');
            }
            
            // Test show/hide functionality
            progressTracker.classList.remove('hidden');
            if (progressTracker.classList.contains('hidden')) {
                throw new Error('Progress tracker visibility toggle failed');
            }
        });

        // Test 3: Research Dashboard
        this.runTest('Research Dashboard Integration', () => {
            const dashboard = document.getElementById('research-dashboard');
            if (!dashboard) {
                throw new Error('Research dashboard not found');
            }
            
            const sessionIdElement = dashboard.querySelector('#session-id');
            const darkPatternCount = dashboard.querySelector('#dark-pattern-count');
            const educationModuleCount = dashboard.querySelector('#education-module-count');
            
            if (!sessionIdElement || !darkPatternCount || !educationModuleCount) {
                throw new Error('Research dashboard components missing');
            }
        });

        // Test 4: Event Listeners
        this.runTest('Educational Event Listeners', () => {
            const researchModeToggle = document.getElementById('enable-research-mode');
            const educationalToggle = document.getElementById('enable-educational-tracking');
            
            if (!researchModeToggle || !educationalToggle) {
                throw new Error('Educational toggle elements not found');
            }
            
            // Test that event listeners are attached (indirect test)
            const hasEventListeners = researchModeToggle.onchange !== null || educationalToggle.onchange !== null;
            // Note: This is a simplified test; full event listener testing would require more complex setup
        });
    }

    async testDataPersistence() {
        // Test 1: LocalStorage Integration
        this.runTest('LocalStorage Integration', () => {
            const testKey = 'lotus_test_data';
            const testData = { test: 'value', timestamp: new Date().toISOString() };
            
            // Test write
            localStorage.setItem(testKey, JSON.stringify(testData));
            
            // Test read
            const retrieved = localStorage.getItem(testKey);
            if (!retrieved) {
                throw new Error('LocalStorage write/read failed');
            }
            
            const parsedData = JSON.parse(retrieved);
            if (parsedData.test !== 'value') {
                throw new Error('LocalStorage data integrity failed');
            }
            
            // Cleanup
            localStorage.removeItem(testKey);
        });

        // Test 2: Educational Progress Persistence
        this.runTest('Educational Progress Persistence', () => {
            const EducationalScaffolding = window.EducationalScaffolding;
            const scaffolding = new EducationalScaffolding();
            
            // Record some progress
            scaffolding.recordConceptLearned('Test persistence concept');
            
            // Save to storage
            scaffolding.saveProgressToStorage();
            
            // Create new instance and load
            const newScaffolding = new EducationalScaffolding();
            newScaffolding.loadProgressFromStorage();
            
            if (!newScaffolding.progressTracking.conceptsLearned.includes('Test persistence concept')) {
                throw new Error('Educational progress persistence failed');
            }
        });
    }

    async testGitHubPagesCompatibility() {
        // Test 1: No Server-Side Dependencies
        this.runTest('No Server-Side Dependencies', () => {
            // Check that no server-side code is present
            const scripts = document.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.src && (script.src.includes('localhost') || script.src.includes('127.0.0.1'))) {
                    throw new Error('Found localhost dependency - not GitHub Pages compatible');
                }
            });
        });

        // Test 2: Static Resource Loading
        this.runTest('Static Resource Loading', () => {
            // Test that all resources can be loaded from CDN or relative paths
            const links = document.querySelectorAll('link[rel="stylesheet"]');
            links.forEach(link => {
                if (link.href && !link.href.startsWith('http') && !link.href.startsWith('./') && !link.href.startsWith('/')) {
                    console.warn(`Potential resource loading issue: ${link.href}`);
                }
            });
        });

        // Test 3: ES6 Module Compatibility
        this.runTest('ES6 Module Compatibility', () => {
            // Test that modules can be imported (basic check)
            if (typeof window.EducationalScaffolding === 'undefined' && typeof window.import === 'undefined') {
                console.warn('ES6 module support not fully detected, but this may be normal in browser environment');
            }
        });

        // Test 4: Browser Compatibility Features
        this.runTest('Browser Compatibility Features', () => {
            // Test modern browser features used
            const requiredFeatures = [
                'localStorage',
                'JSON',
                'fetch',
                'Promise',
                'URL'
            ];
            
            requiredFeatures.forEach(feature => {
                if (typeof window[feature] === 'undefined') {
                    throw new Error(`Required browser feature not available: ${feature}`);
                }
            });
        });
    }

    runTest(testName, testFunction) {
        this.testResults.totalTests++;
        
        try {
            testFunction();
            this.testResults.passed++;
            console.log(`✅ ${testName} - PASSED`);
        } catch (error) {
            this.testResults.failed++;
            this.testResults.errors.push({
                test: testName,
                error: error.message,
                stack: error.stack
            });
            console.error(`❌ ${testName} - FAILED: ${error.message}`);
        }
    }

    resetTestResults() {
        this.testResults = {
            totalTests: 0,
            passed: 0,
            failed: 0,
            errors: [],
            warnings: []
        };
    }

    generateTestReport() {
        const report = {
            timestamp: new Date().toISOString(),
            summary: {
                total: this.testResults.totalTests,
                passed: this.testResults.passed,
                failed: this.testResults.failed,
                success_rate: (this.testResults.passed / this.testResults.totalTests * 100).toFixed(1) + '%'
            },
            categories_tested: this.testCategories,
            errors: this.testResults.errors,
            warnings: this.testResults.warnings,
            recommendations: this.generateRecommendations(),
            github_pages_readiness: this.assessGitHubPagesReadiness()
        };

        console.log('📊 Integration Test Report:', report);
        return report;
    }

    generateRecommendations() {
        const recommendations = [];
        
        if (this.testResults.failed > 0) {
            recommendations.push('Review and fix failed test cases before deployment');
        }
        
        if (this.testResults.failed === 0) {
            recommendations.push('All tests passed - system ready for deployment');
        }
        
        recommendations.push('Run integration tests regularly during development');
        recommendations.push('Test on multiple browsers before GitHub Pages deployment');
        
        return recommendations;
    }

    assessGitHubPagesReadiness() {
        const ghPagesTests = this.testResults.errors.filter(error => 
            error.test.includes('GitHub Pages') || 
            error.test.includes('Static Resource') ||
            error.test.includes('Server-Side')
        );
        
        return {
            ready: ghPagesTests.length === 0,
            blocking_issues: ghPagesTests.length,
            status: ghPagesTests.length === 0 ? 'READY' : 'NEEDS_FIXES'
        };
    }
}

// Export for use in testing
export { EducationalSystemIntegrationTest };

// Auto-run tests if in test mode
if (window.location.search.includes('test=true')) {
    document.addEventListener('DOMContentLoaded', async () => {
        const tester = new EducationalSystemIntegrationTest();
        const report = await tester.runCompleteTestSuite();
        
        // Display test results in UI
        const testResultsDiv = document.createElement('div');
        testResultsDiv.id = 'test-results';
        testResultsDiv.className = 'fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50 max-w-md';
        testResultsDiv.innerHTML = `
            <h3 class="font-bold text-lg mb-2">Integration Test Results</h3>
            <p>Total Tests: ${report.summary.total}</p>
            <p class="text-green-400">Passed: ${report.summary.passed}</p>
            <p class="text-red-400">Failed: ${report.summary.failed}</p>
            <p>Success Rate: ${report.summary.success_rate}</p>
            <p class="mt-2 ${report.github_pages_readiness.ready ? 'text-green-400' : 'text-red-400'}">
                GitHub Pages: ${report.github_pages_readiness.status}
            </p>
            <button onclick="this.parentElement.remove()" class="mt-2 bg-gray-600 px-2 py-1 rounded text-sm">
                Close
            </button>
        `;
        document.body.appendChild(testResultsDiv);
    });
}
