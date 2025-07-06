/**
 * ui_components/darkPatternFlags.js - Real-time Dark Pattern Detection
 * 
 * Detects UI traps and flags them in real time for educational purposes
 */

export class DarkPatternFlags {
    constructor() {
        this.flags = [];
        this.detectionRules = {
            timeBasedUrgency: /urgent|hurry|limited time|expires|now or never/i,
            socialProof: /others are viewing|x people|customers in your area|most popular/i,
            scarcityTactics: /only \d+ left|last chance|running out|limited spots/i,
            hiddenFees: /processing fee|convenience fee|express fee|tip|gratuity/i,
            preCheckedBoxes: /checked\s*=\s*["\']true["\']|defaultchecked/i,
            misleadingButtons: /free|no cost|instant|guaranteed/i,
            fakeProgress: /\d+% complete|\d+ of \d+ steps|almost done/i
        };
        this.realTimeDetection = true;
    }

    // Flag a dark pattern when detected
    flagPattern(patternType, severity, description, context = {}) {
        const flag = {
            id: `flag_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            patternType,
            severity, // LOW, MODERATE, HIGH, EXTREME
            description,
            context,
            timestamp: new Date().toISOString(),
            detected: true
        };

        this.flags.push(flag);
        
        if (this.realTimeDetection) {
            this.displayRealTimeFlag(flag);
        }
        
        return flag;
    }

    // Analyze text content for dark patterns
    analyzeContent(content, contentType = "text") {
        const detectedPatterns = [];

        Object.entries(this.detectionRules).forEach(([ruleType, regex]) => {
            if (regex.test(content)) {
                const flag = this.flagPattern(
                    ruleType,
                    this.getSeverityForRule(ruleType),
                    `Detected ${ruleType} in ${contentType}`,
                    { content: content.substring(0, 100), contentType }
                );
                detectedPatterns.push(flag);
            }
        });

        return detectedPatterns;
    }

    // Analyze DOM elements for dark patterns
    analyzeDOMElement(element) {
        const detectedPatterns = [];
        
        // Check for pre-checked checkboxes
        if (element.type === 'checkbox' && element.checked && !element.dataset.userSet) {
            detectedPatterns.push(this.flagPattern(
                "preCheckedDefaults",
                "HIGH",
                "Pre-checked checkbox detected",
                { elementType: element.type, elementId: element.id }
            ));
        }

        // Check for hidden input fields
        if (element.type === 'hidden' && element.value) {
            detectedPatterns.push(this.flagPattern(
                "hiddenInputs",
                "MODERATE",
                "Hidden input field with value",
                { elementType: element.type, value: element.value }
            ));
        }

        // Check button text for misleading language
        if (element.tagName === 'BUTTON' || element.type === 'submit') {
            const buttonText = element.textContent || element.value;
            const textPatterns = this.analyzeContent(buttonText, "button");
            detectedPatterns.push(...textPatterns);
        }

        return detectedPatterns;
    }

    // Analyze form structure for dark patterns
    analyzeForm(formElement) {
        const detectedPatterns = [];
        const inputs = formElement.querySelectorAll('input, select, textarea');
        
        let preCheckedCount = 0;
        let hiddenFieldCount = 0;
        
        inputs.forEach(input => {
            const elementPatterns = this.analyzeDOMElement(input);
            detectedPatterns.push(...elementPatterns);
            
            if (input.type === 'checkbox' && input.checked) preCheckedCount++;
            if (input.type === 'hidden') hiddenFieldCount++;
        });

        // Flag forms with excessive pre-checked options
        if (preCheckedCount >= 3) {
            detectedPatterns.push(this.flagPattern(
                "excessivePreChecked",
                "EXTREME",
                `Form has ${preCheckedCount} pre-checked options`,
                { formId: formElement.id, preCheckedCount }
            ));
        }

        // Flag forms with many hidden fields
        if (hiddenFieldCount >= 5) {
            detectedPatterns.push(this.flagPattern(
                "excessiveHiddenFields",
                "HIGH",
                `Form has ${hiddenFieldCount} hidden fields`,
                { formId: formElement.id, hiddenFieldCount }
            ));
        }

        return detectedPatterns;
    }

    // Display real-time flag notification
    displayRealTimeFlag(flag) {
        if (typeof window !== 'undefined' && window.document) {
            // Create flag notification element
            const notification = document.createElement('div');
            notification.className = `dark-pattern-flag severity-${flag.severity.toLowerCase()}`;
            notification.innerHTML = `
                <div class="flag-header">
                    🚩 Dark Pattern Detected: ${flag.patternType}
                </div>
                <div class="flag-description">
                    ${flag.description}
                </div>
                <div class="flag-severity">
                    Severity: ${flag.severity}
                </div>
            `;
            
            // Style the notification
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${this.getSeverityColor(flag.severity)};
                color: white;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
                z-index: 10000;
                max-width: 300px;
                font-size: 12px;
                margin-bottom: 5px;
            `;
            
            document.body.appendChild(notification);
            
            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 5000);
        }
    }

    // Get severity level for detection rule
    getSeverityForRule(ruleType) {
        const severityMap = {
            timeBasedUrgency: "HIGH",
            socialProof: "MODERATE",
            scarcityTactics: "HIGH",
            hiddenFees: "EXTREME",
            preCheckedBoxes: "HIGH",
            misleadingButtons: "MODERATE",
            fakeProgress: "MODERATE"
        };
        return severityMap[ruleType] || "LOW";
    }

    // Get color for severity level
    getSeverityColor(severity) {
        const colorMap = {
            LOW: "#4CAF50",
            MODERATE: "#FF9800",
            HIGH: "#FF5722",
            EXTREME: "#F44336"
        };
        return colorMap[severity] || "#9E9E9E";
    }

    // Generate detection report
    generateDetectionReport() {
        const flagsByType = {};
        const flagsBySeverity = { LOW: 0, MODERATE: 0, HIGH: 0, EXTREME: 0 };
        
        this.flags.forEach(flag => {
            // Count by type
            if (!flagsByType[flag.patternType]) {
                flagsByType[flag.patternType] = 0;
            }
            flagsByType[flag.patternType]++;
            
            // Count by severity
            flagsBySeverity[flag.severity]++;
        });

        return {
            totalFlags: this.flags.length,
            flagsByType,
            flagsBySeverity,
            flags: this.flags,
            riskScore: this.calculateRiskScore(),
            timestamp: new Date().toISOString()
        };
    }

    // Calculate overall risk score
    calculateRiskScore() {
        let score = 0;
        this.flags.forEach(flag => {
            switch (flag.severity) {
                case "LOW": score += 1; break;
                case "MODERATE": score += 3; break;
                case "HIGH": score += 5; break;
                case "EXTREME": score += 10; break;
            }
        });
        return Math.min(score, 100); // Cap at 100
    }

    // Get all flags
    getAllFlags() {
        return this.flags;
    }

    // Clear all flags (for new session)
    clearFlags() {
        this.flags = [];
    }

    // Enable/disable real-time detection
    setRealTimeDetection(enabled) {
        this.realTimeDetection = enabled;
    }
}

export default DarkPatternFlags;
