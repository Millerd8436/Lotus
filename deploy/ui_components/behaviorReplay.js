// ui_components/behaviorReplay.js

/**
 * UI Behavior Replay System
 * Records and replays user interactions to demonstrate manipulation techniques
 */

class BehaviorReplay {
    constructor() {
        this.interactions = [];
        this.isRecording = false;
        this.isReplaying = false;
        this.currentReplayIndex = 0;
        this.manipulationHighlights = [];
        this.replaySpeed = 1.0;
        this.startTime = null;
    }

    /**
     * Start recording user interactions
     */
    startRecording() {
        this.isRecording = true;
        this.startTime = Date.now();
        this.interactions = [];
        this.manipulationHighlights = [];
        
        console.log('🎬 Started recording user behavior...');
        
        // Record various interaction types
        this._attachEventListeners();
        
        return {
            recording_id: `session_${this.startTime}`,
            start_time: new Date().toISOString()
        };
    }

    /**
     * Stop recording interactions
     */
    stopRecording() {
        this.isRecording = false;
        this._detachEventListeners();
        
        console.log(`🛑 Recording stopped. Captured ${this.interactions.length} interactions.`);
        
        return {
            total_interactions: this.interactions.length,
            recording_duration: Date.now() - this.startTime,
            manipulation_points: this.manipulationHighlights.length
        };
    }

    /**
     * Record a user interaction
     */
    recordInteraction(type, element, data = {}) {
        if (!this.isRecording) return;

        const interaction = {
            id: `interaction_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            timestamp: Date.now() - this.startTime,
            real_timestamp: new Date().toISOString(),
            type: type,
            element: {
                tag: element?.tagName || 'unknown',
                id: element?.id || null,
                class: element?.className || null,
                text: element?.textContent?.substring(0, 100) || null,
                position: this._getElementPosition(element)
            },
            data: data,
            manipulation_detected: this._detectManipulation(type, element, data),
            user_state: this._captureUserState()
        };

        this.interactions.push(interaction);

        // Highlight manipulation if detected
        if (interaction.manipulation_detected) {
            this._highlightManipulation(interaction);
        }
    }

    /**
     * Attach event listeners for recording
     */
    _attachEventListeners() {
        // Mouse interactions
        document.addEventListener('click', this._handleClick.bind(this), true);
        document.addEventListener('mouseover', this._handleMouseover.bind(this), true);
        document.addEventListener('mouseout', this._handleMouseout.bind(this), true);
        
        // Form interactions
        document.addEventListener('input', this._handleInput.bind(this), true);
        document.addEventListener('change', this._handleChange.bind(this), true);
        document.addEventListener('focus', this._handleFocus.bind(this), true);
        document.addEventListener('blur', this._handleBlur.bind(this), true);
        
        // Scroll and resize
        document.addEventListener('scroll', this._handleScroll.bind(this), true);
        window.addEventListener('resize', this._handleResize.bind(this));
        
        // Page visibility
        document.addEventListener('visibilitychange', this._handleVisibilityChange.bind(this));
        
        // Key interactions
        document.addEventListener('keydown', this._handleKeydown.bind(this), true);
        
        // Custom events for manipulation tracking
        document.addEventListener('darkPatternTriggered', this._handleDarkPattern.bind(this));
        document.addEventListener('consentBypass', this._handleConsentBypass.bind(this));
    }

    /**
     * Detach event listeners
     */
    _detachEventListeners() {
        document.removeEventListener('click', this._handleClick.bind(this), true);
        document.removeEventListener('mouseover', this._handleMouseover.bind(this), true);
        document.removeEventListener('mouseout', this._handleMouseout.bind(this), true);
        document.removeEventListener('input', this._handleInput.bind(this), true);
        document.removeEventListener('change', this._handleChange.bind(this), true);
        document.removeEventListener('focus', this._handleFocus.bind(this), true);
        document.removeEventListener('blur', this._handleBlur.bind(this), true);
        document.removeEventListener('scroll', this._handleScroll.bind(this), true);
        window.removeEventListener('resize', this._handleResize.bind(this));
        document.removeEventListener('visibilitychange', this._handleVisibilityChange.bind(this));
        document.removeEventListener('keydown', this._handleKeydown.bind(this), true);
        document.removeEventListener('darkPatternTriggered', this._handleDarkPattern.bind(this));
        document.removeEventListener('consentBypass', this._handleConsentBypass.bind(this));
    }

    /**
     * Event handlers
     */
    _handleClick(event) {
        this.recordInteraction('click', event.target, {
            x: event.clientX,
            y: event.clientY,
            button: event.button,
            ctrl_key: event.ctrlKey,
            shift_key: event.shiftKey
        });
    }

    _handleMouseover(event) {
        this.recordInteraction('mouseover', event.target, {
            x: event.clientX,
            y: event.clientY
        });
    }

    _handleMouseout(event) {
        this.recordInteraction('mouseout', event.target);
    }

    _handleInput(event) {
        this.recordInteraction('input', event.target, {
            value_length: event.target.value?.length || 0,
            input_type: event.target.type
        });
    }

    _handleChange(event) {
        this.recordInteraction('change', event.target, {
            value: event.target.type === 'checkbox' ? event.target.checked : 
                   event.target.value?.substring(0, 50),
            input_type: event.target.type
        });
    }

    _handleFocus(event) {
        this.recordInteraction('focus', event.target);
    }

    _handleBlur(event) {
        this.recordInteraction('blur', event.target);
    }

    _handleScroll(event) {
        this.recordInteraction('scroll', event.target, {
            scroll_top: window.pageYOffset,
            scroll_left: window.pageXOffset
        });
    }

    _handleResize(event) {
        this.recordInteraction('resize', document.body, {
            window_width: window.innerWidth,
            window_height: window.innerHeight
        });
    }

    _handleVisibilityChange(event) {
        this.recordInteraction('visibility_change', document, {
            hidden: document.hidden
        });
    }

    _handleKeydown(event) {
        this.recordInteraction('keydown', event.target, {
            key: event.key,
            code: event.code,
            ctrl_key: event.ctrlKey,
            shift_key: event.shiftKey,
            alt_key: event.altKey
        });
    }

    _handleDarkPattern(event) {
        this.recordInteraction('dark_pattern', event.target, {
            pattern_type: event.detail.type,
            manipulation_level: event.detail.level,
            pattern_data: event.detail.data
        });
    }

    _handleConsentBypass(event) {
        this.recordInteraction('consent_bypass', event.target, {
            bypass_type: event.detail.type,
            consent_level: event.detail.level
        });
    }

    /**
     * Get element position
     */
    _getElementPosition(element) {
        if (!element || !element.getBoundingClientRect) return null;
        
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height
        };
    }

    /**
     * Detect manipulation in interactions
     */
    _detectManipulation(type, element, data) {
        const manipulationPatterns = {
            'click': this._detectClickManipulation,
            'input': this._detectInputManipulation,
            'focus': this._detectFocusManipulation,
            'scroll': this._detectScrollManipulation
        };

        const detector = manipulationPatterns[type];
        if (detector) {
            return detector.call(this, element, data);
        }

        return null;
    }

    /**
     * Detect click-based manipulation
     */
    _detectClickManipulation(element, data) {
        const manipulations = [];

        // Hidden buttons or misleading labels
        if (element.style.opacity < 0.1 || element.style.visibility === 'hidden') {
            manipulations.push('hidden_clickable');
        }

        // Buttons that look like links or vice versa
        if (element.tagName === 'BUTTON' && element.textContent.includes('http')) {
            manipulations.push('button_disguised_as_link');
        }

        // Urgency-based buttons
        if (element.textContent.match(/now|urgent|limited|expires|hurry/i)) {
            manipulations.push('urgency_pressure');
        }

        // Pre-selected options
        if (element.type === 'checkbox' && element.checked && !data.user_initiated) {
            manipulations.push('pre_selected_option');
        }

        return manipulations.length > 0 ? manipulations : null;
    }

    /**
     * Detect input-based manipulation
     */
    _detectInputManipulation(element, data) {
        const manipulations = [];

        // Auto-filled values
        if (element.value && !data.user_typed) {
            manipulations.push('auto_filled_value');
        }

        // Misleading placeholders
        if (element.placeholder && element.placeholder.includes('$') && element.type !== 'number') {
            manipulations.push('misleading_placeholder');
        }

        // Hidden required fields
        if (element.required && element.style.display === 'none') {
            manipulations.push('hidden_required_field');
        }

        return manipulations.length > 0 ? manipulations : null;
    }

    /**
     * Detect focus-based manipulation
     */
    _detectFocusManipulation(element, data) {
        const manipulations = [];

        // Forced focus to specific fields
        if (element.id?.includes('amount') || element.name?.includes('loan')) {
            manipulations.push('guided_to_loan_amount');
        }

        return manipulations.length > 0 ? manipulations : null;
    }

    /**
     * Detect scroll-based manipulation
     */
    _detectScrollManipulation(element, data) {
        const manipulations = [];

        // Rapid scrolling past terms
        if (data.scroll_top > 1000 && this._getLastScrollTime() < 2000) {
            manipulations.push('rapid_terms_scroll');
        }

        return manipulations.length > 0 ? manipulations : null;
    }

    /**
     * Get last scroll interaction time
     */
    _getLastScrollTime() {
        const lastScroll = this.interactions
            .filter(i => i.type === 'scroll')
            .slice(-2)[0];
        
        return lastScroll ? Date.now() - lastScroll.timestamp : Infinity;
    }

    /**
     * Capture user state
     */
    _captureUserState() {
        return {
            page_url: window.location.href,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            scroll_position: {
                x: window.pageXOffset,
                y: window.pageYOffset
            },
            active_element: document.activeElement?.tagName || null,
            form_completion: this._calculateFormCompletion()
        };
    }

    /**
     * Calculate form completion percentage
     */
    _calculateFormCompletion() {
        const formElements = document.querySelectorAll('input, select, textarea');
        const filledElements = Array.from(formElements).filter(el => el.value);
        
        return formElements.length > 0 ? (filledElements.length / formElements.length) * 100 : 0;
    }

    /**
     * Highlight manipulation during recording
     */
    _highlightManipulation(interaction) {
        const highlight = {
            id: `highlight_${interaction.id}`,
            timestamp: interaction.timestamp,
            manipulation_types: interaction.manipulation_detected,
            element_info: interaction.element
        };

        this.manipulationHighlights.push(highlight);

        // Visual highlight for live demonstration
        if (interaction.element.id) {
            const element = document.getElementById(interaction.element.id);
            if (element) {
                element.style.boxShadow = '0 0 10px red';
                element.style.border = '2px solid red';
                
                setTimeout(() => {
                    element.style.boxShadow = '';
                    element.style.border = '';
                }, 3000);
            }
        }
    }

    /**
     * Start replay of recorded interactions
     */
    startReplay(options = {}) {
        if (this.interactions.length === 0) {
            console.warn('No interactions to replay');
            return;
        }

        this.isReplaying = true;
        this.currentReplayIndex = 0;
        this.replaySpeed = options.speed || 1.0;
        
        console.log(`🎬 Starting replay of ${this.interactions.length} interactions...`);
        
        // Create replay UI
        this._createReplayUI();
        
        // Start replay
        this._replayNext();
    }

    /**
     * Replay next interaction
     */
    _replayNext() {
        if (!this.isReplaying || this.currentReplayIndex >= this.interactions.length) {
            this._endReplay();
            return;
        }

        const interaction = this.interactions[this.currentReplayIndex];
        const nextInteraction = this.interactions[this.currentReplayIndex + 1];
        
        // Highlight current interaction
        this._highlightReplayInteraction(interaction);
        
        // Calculate delay to next interaction
        const delay = nextInteraction ? 
            (nextInteraction.timestamp - interaction.timestamp) / this.replaySpeed : 1000;
        
        // Update replay UI
        this._updateReplayUI(interaction);
        
        this.currentReplayIndex++;
        
        setTimeout(() => this._replayNext(), Math.max(delay, 100));
    }

    /**
     * Create replay UI
     */
    _createReplayUI() {
        const replayUI = document.createElement('div');
        replayUI.id = 'behavior-replay-ui';
        replayUI.innerHTML = `
            <div style="position: fixed; top: 10px; right: 10px; z-index: 10000; background: rgba(0,0,0,0.9); color: white; padding: 15px; border-radius: 8px; font-family: monospace; min-width: 300px;">
                <div style="font-weight: bold; margin-bottom: 10px;">🎬 Behavior Replay</div>
                <div>Progress: <span id="replay-progress">0</span>/${this.interactions.length}</div>
                <div>Current: <span id="current-interaction">Starting...</span></div>
                <div>Manipulations: <span id="manipulation-count">0</span></div>
                <div style="margin-top: 10px;">
                    <button id="pause-replay" style="margin-right: 5px;">⏸️ Pause</button>
                    <button id="speed-replay">⏩ ${this.replaySpeed}x</button>
                    <button id="stop-replay" style="margin-left: 5px;">⏹️ Stop</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(replayUI);
        
        // Add event listeners
        document.getElementById('pause-replay').addEventListener('click', () => this._pauseReplay());
        document.getElementById('speed-replay').addEventListener('click', () => this._changeReplaySpeed());
        document.getElementById('stop-replay').addEventListener('click', () => this._stopReplay());
    }

    /**
     * Update replay UI
     */
    _updateReplayUI(interaction) {
        const progressEl = document.getElementById('replay-progress');
        const currentEl = document.getElementById('current-interaction');
        const manipulationEl = document.getElementById('manipulation-count');
        
        if (progressEl) progressEl.textContent = this.currentReplayIndex;
        if (currentEl) currentEl.textContent = `${interaction.type} on ${interaction.element.tag}`;
        if (manipulationEl) {
            const manipulationCount = this.manipulationHighlights.length;
            manipulationEl.textContent = manipulationCount;
            manipulationEl.style.color = manipulationCount > 0 ? 'red' : 'white';
        }
    }

    /**
     * Highlight interaction during replay
     */
    _highlightReplayInteraction(interaction) {
        // Remove previous highlights
        document.querySelectorAll('.replay-highlight').forEach(el => {
            el.classList.remove('replay-highlight');
            el.style.outline = '';
        });

        // Find and highlight current element
        let element = null;
        if (interaction.element.id) {
            element = document.getElementById(interaction.element.id);
        } else if (interaction.element.class) {
            element = document.querySelector(`.${interaction.element.class.split(' ')[0]}`);
        }

        if (element) {
            element.classList.add('replay-highlight');
            element.style.outline = '3px solid #00ff00';
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Show manipulation info if detected
            if (interaction.manipulation_detected) {
                this._showManipulationTooltip(element, interaction.manipulation_detected);
            }
        }
    }

    /**
     * Show manipulation tooltip
     */
    _showManipulationTooltip(element, manipulations) {
        const tooltip = document.createElement('div');
        tooltip.className = 'manipulation-tooltip';
        tooltip.innerHTML = `
            <div style="position: absolute; background: red; color: white; padding: 8px; border-radius: 4px; font-size: 12px; z-index: 10001; max-width: 200px;">
                ⚠️ Manipulation Detected:<br>
                ${manipulations.map(m => `• ${m.replace(/_/g, ' ')}`).join('<br>')}
            </div>
        `;
        
        const rect = element.getBoundingClientRect();
        tooltip.style.position = 'fixed';
        tooltip.style.left = rect.right + 10 + 'px';
        tooltip.style.top = rect.top + 'px';
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 3000);
    }

    /**
     * Pause replay
     */
    _pauseReplay() {
        this.isReplaying = !this.isReplaying;
        const button = document.getElementById('pause-replay');
        if (button) {
            button.textContent = this.isReplaying ? '⏸️ Pause' : '▶️ Resume';
        }
        
        if (this.isReplaying) {
            this._replayNext();
        }
    }

    /**
     * Change replay speed
     */
    _changeReplaySpeed() {
        const speeds = [0.5, 1.0, 2.0, 4.0];
        const currentIndex = speeds.indexOf(this.replaySpeed);
        this.replaySpeed = speeds[(currentIndex + 1) % speeds.length];
        
        const button = document.getElementById('speed-replay');
        if (button) {
            button.textContent = `⏩ ${this.replaySpeed}x`;
        }
    }

    /**
     * Stop replay
     */
    _stopReplay() {
        this.isReplaying = false;
        this._endReplay();
    }

    /**
     * End replay
     */
    _endReplay() {
        this.isReplaying = false;
        
        // Remove replay UI
        const replayUI = document.getElementById('behavior-replay-ui');
        if (replayUI) {
            replayUI.parentNode.removeChild(replayUI);
        }
        
        // Remove highlights
        document.querySelectorAll('.replay-highlight').forEach(el => {
            el.classList.remove('replay-highlight');
            el.style.outline = '';
        });
        
        console.log('🛑 Replay ended');
    }

    /**
     * Export recorded data
     */
    exportData(format = 'json') {
        const data = {
            metadata: {
                recording_start: this.startTime,
                total_interactions: this.interactions.length,
                total_manipulations: this.manipulationHighlights.length,
                recording_duration: this.interactions.length > 0 ? 
                    this.interactions[this.interactions.length - 1].timestamp : 0
            },
            interactions: this.interactions,
            manipulation_highlights: this.manipulationHighlights,
            analysis: this._analyzeInteractions()
        };

        if (format === 'csv') {
            return this._convertToCSV(data);
        }

        return JSON.stringify(data, null, 2);
    }

    /**
     * Analyze recorded interactions
     */
    _analyzeInteractions() {
        const analysis = {
            interaction_types: {},
            manipulation_types: {},
            timeline_analysis: {},
            user_behavior_patterns: {}
        };

        // Count interaction types
        this.interactions.forEach(interaction => {
            analysis.interaction_types[interaction.type] = 
                (analysis.interaction_types[interaction.type] || 0) + 1;
        });

        // Count manipulation types
        this.manipulationHighlights.forEach(highlight => {
            highlight.manipulation_types.forEach(type => {
                analysis.manipulation_types[type] = 
                    (analysis.manipulation_types[type] || 0) + 1;
            });
        });

        // Timeline analysis
        analysis.timeline_analysis = {
            peak_activity_periods: this._findPeakActivityPeriods(),
            manipulation_timing: this._analyzeManipulationTiming(),
            user_hesitation_points: this._findHesitationPoints()
        };

        return analysis;
    }

    /**
     * Find peak activity periods
     */
    _findPeakActivityPeriods() {
        const timeWindows = {};
        const windowSize = 30000; // 30 seconds

        this.interactions.forEach(interaction => {
            const window = Math.floor(interaction.timestamp / windowSize);
            timeWindows[window] = (timeWindows[window] || 0) + 1;
        });

        return Object.entries(timeWindows)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([window, count]) => ({
                start_time: parseInt(window) * windowSize,
                interaction_count: count
            }));
    }

    /**
     * Analyze manipulation timing
     */
    _analyzeManipulationTiming() {
        return this.manipulationHighlights.map(highlight => ({
            timestamp: highlight.timestamp,
            types: highlight.manipulation_types,
            context: this._getContextAtTime(highlight.timestamp)
        }));
    }

    /**
     * Find hesitation points
     */
    _findHesitationPoints() {
        const hesitationPoints = [];
        let lastInteraction = null;

        this.interactions.forEach(interaction => {
            if (lastInteraction) {
                const gap = interaction.timestamp - lastInteraction.timestamp;
                if (gap > 10000) { // 10 seconds of inactivity
                    hesitationPoints.push({
                        timestamp: lastInteraction.timestamp,
                        gap_duration: gap,
                        context: this._getContextAtTime(lastInteraction.timestamp)
                    });
                }
            }
            lastInteraction = interaction;
        });

        return hesitationPoints;
    }

    /**
     * Get context at specific time
     */
    _getContextAtTime(timestamp) {
        const interactions = this.interactions.filter(i => 
            i.timestamp <= timestamp && i.timestamp >= timestamp - 5000
        );

        return {
            recent_interactions: interactions.map(i => i.type),
            form_completion: interactions[interactions.length - 1]?.user_state?.form_completion || 0
        };
    }

    /**
     * Convert data to CSV format
     */
    _convertToCSV(data) {
        const headers = [
            'timestamp', 'type', 'element_tag', 'element_id', 'manipulation_detected',
            'user_state_form_completion', 'user_state_scroll_y'
        ];

        const rows = data.interactions.map(interaction => [
            interaction.timestamp,
            interaction.type,
            interaction.element.tag,
            interaction.element.id || '',
            interaction.manipulation_detected ? 'YES' : 'NO',
            interaction.user_state.form_completion,
            interaction.user_state.scroll_position.y
        ]);

        return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    }

    /**
     * Reset replay system
     */
    reset() {
        this.stopRecording();
        this._stopReplay();
        this.interactions = [];
        this.manipulationHighlights = [];
        this.currentReplayIndex = 0;
        this.startTime = null;
    }
}

// Export the class
export { BehaviorReplay };
