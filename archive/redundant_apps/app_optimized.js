// Copilot: Optimized version of app.js with performance enhancements
// Minified, lazy-loaded, and performance-optimized for production deployment

(function() {
    'use strict';
    
    // Performance monitoring
    const perf = {
        start: performance.now(),
        marks: {},
        measure: function(name) {
            this.marks[name] = performance.now() - this.start;
        }
    };
    
    // Optimized module loader with caching
    const ModuleLoader = {
        cache: new Map(),
        loadQueue: new Set(),
        
        async load(path, priority = 'normal') {
            if (this.cache.has(path)) {
                return this.cache.get(path);
            }
            
            if (this.loadQueue.has(path)) {
                return new Promise(resolve => {
                    const check = () => {
                        if (this.cache.has(path)) {
                            resolve(this.cache.get(path));
                        } else {
                            setTimeout(check, 10);
                        }
                    };
                    check();
                });
            }
            
            this.loadQueue.add(path);
            
            try {
                const response = await fetch(path, {
                    cache: 'force-cache',
                    priority: priority
                });
                
                if (!response.ok) throw new Error(`Failed to load ${path}`);
                
                const content = path.endsWith('.js') 
                    ? await this.loadScript(response)
                    : await response.text();
                
                this.cache.set(path, content);
                this.loadQueue.delete(path);
                return content;
                
            } catch (error) {
                console.error(`Module load failed: ${path}`, error);
                this.loadQueue.delete(path);
                throw error;
            }
        },
        
        async loadScript(response) {
            const text = await response.text();
            const script = document.createElement('script');
            script.textContent = text;
            document.head.appendChild(script);
            return text;
        }
    };
    
    // Optimized DOM utilities
    const DOM = {
        cache: new Map(),
        
        $(selector) {
            if (this.cache.has(selector)) {
                return this.cache.get(selector);
            }
            const element = document.querySelector(selector);
            if (element) this.cache.set(selector, element);
            return element;
        },
        
        $$(selector) {
            return document.querySelectorAll(selector);
        },
        
        create(tag, props = {}, children = []) {
            const el = document.createElement(tag);
            Object.assign(el, props);
            children.forEach(child => {
                if (typeof child === 'string') {
                    el.appendChild(document.createTextNode(child));
                } else {
                    el.appendChild(child);
                }
            });
            return el;
        }
    };
    
    // Optimized state management
    const StateManager = {
        state: {},
        listeners: new Map(),
        
        set(key, value) {
            const oldValue = this.state[key];
            this.state[key] = value;
            
            if (this.listeners.has(key)) {
                this.listeners.get(key).forEach(callback => {
                    callback(value, oldValue);
                });
            }
        },
        
        get(key) {
            return this.state[key];
        },
        
        subscribe(key, callback) {
            if (!this.listeners.has(key)) {
                this.listeners.set(key, new Set());
            }
            this.listeners.get(key).add(callback);
            
            // Return unsubscribe function
            return () => this.listeners.get(key).delete(callback);
        }
    };
    
    // Optimized event system
    const EventBus = {
        events: new Map(),
        
        on(event, callback, options = {}) {
            if (!this.events.has(event)) {
                this.events.set(event, new Set());
            }
            
            const wrapper = options.once 
                ? (...args) => {
                    callback(...args);
                    this.off(event, wrapper);
                }
                : callback;
                
            this.events.get(event).add(wrapper);
            return wrapper;
        },
        
        off(event, callback) {
            if (this.events.has(event)) {
                this.events.get(event).delete(callback);
            }
        },
        
        emit(event, ...args) {
            if (this.events.has(event)) {
                this.events.get(event).forEach(callback => {
                    try {
                        callback(...args);
                    } catch (error) {
                        console.error(`Event callback error (${event}):`, error);
                    }
                });
            }
        }
    };
    
    // Main Application
    class LotusApp {
        constructor() {
            this.mode = null;
            this.initialized = false;
            this.components = new Map();
            this.analytics = null;
        }
        
        async init() {
            if (this.initialized) return;
            
            perf.measure('init_start');
            
            try {
                // Critical path rendering
                await this.loadCriticalResources();
                
                // Initialize core systems
                this.setupServiceWorker();
                this.initializeState();
                this.setupEventListeners();
                
                // Lazy load non-critical components
                requestIdleCallback(() => this.loadNonCriticalResources());
                
                // Mode detection and initialization
                await this.detectAndInitializeMode();
                
                this.initialized = true;
                perf.measure('init_complete');
                
                EventBus.emit('app:initialized', {
                    performance: perf.marks,
                    mode: this.mode
                });
                
            } catch (error) {
                console.error('App initialization failed:', error);
                this.handleInitError(error);
            }
        }
        
        async loadCriticalResources() {
            const critical = [
                '/core/loan_core.js',
                '/assets/global.js',
                '/ui.js'
            ];
            
            await Promise.all(
                critical.map(path => ModuleLoader.load(path, 'high'))
            );
        }
        
        async loadNonCriticalResources() {
            const nonCritical = [
                '/engine/autonomy_theater.js',
                '/research/research_analytics.js',
                '/ui_components/promptEngine.js'
            ];
            
            for (const path of nonCritical) {
                try {
                    await ModuleLoader.load(path, 'low');
                } catch (error) {
                    console.warn(`Non-critical resource failed: ${path}`, error);
                }
            }
        }
        
        setupServiceWorker() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered:', registration);
                        StateManager.set('serviceWorker', registration);
                    })
                    .catch(error => {
                        console.warn('SW registration failed:', error);
                    });
            }
        }
        
        initializeState() {
            StateManager.set('mode', this.detectMode());
            StateManager.set('user_interaction_count', 0);
            StateManager.set('session_start', Date.now());
            StateManager.set('page_load_time', perf.marks.init_complete || 0);
        }
        
        setupEventListeners() {
            // Optimized scroll handler
            let scrollTimeout;
            window.addEventListener('scroll', () => {
                if (scrollTimeout) return;
                scrollTimeout = setTimeout(() => {
                    EventBus.emit('scroll:throttled', window.scrollY);
                    scrollTimeout = null;
                }, 16); // ~60fps
            }, { passive: true });
            
            // Optimized resize handler
            let resizeTimeout;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(() => {
                    EventBus.emit('resize:debounced', {
                        width: window.innerWidth,
                        height: window.innerHeight
                    });
                }, 250);
            }, { passive: true });
            
            // Click tracking with delegation
            document.addEventListener('click', this.handleClick.bind(this), true);
            
            // Form submission tracking
            document.addEventListener('submit', this.handleSubmit.bind(this), true);
        }
        
        handleClick(event) {
            const target = event.target;
            const clickData = {
                tag: target.tagName,
                class: target.className,
                id: target.id,
                timestamp: Date.now()
            };
            
            // Increment interaction count
            const count = StateManager.get('user_interaction_count') + 1;
            StateManager.set('user_interaction_count', count);
            
            EventBus.emit('user:click', clickData);
            
            // Send to service worker for analytics
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'TRACK_INTERACTION',
                    data: { type: 'click', ...clickData }
                });
            }
        }
        
        handleSubmit(event) {
            const form = event.target;
            const submitData = {
                formId: form.id,
                formClass: form.className,
                timestamp: Date.now()
            };
            
            EventBus.emit('user:submit', submitData);
        }
        
        detectMode() {
            const url = new URL(window.location);
            const params = url.searchParams;
            
            if (params.has('mode')) {
                return params.get('mode');
            }
            
            if (url.pathname.includes('predatory') || url.hash.includes('predatory')) {
                return 'predatory';
            }
            
            if (url.pathname.includes('ethical') || url.hash.includes('ethical')) {
                return 'ethical';
            }
            
            return 'neutral';
        }
        
        async detectAndInitializeMode() {
            const mode = this.detectMode();
            this.mode = mode;
            
            StateManager.set('mode', mode);
            document.body.className = `mode-${mode}`;
            
            // Load mode-specific resources
            switch (mode) {
                case 'predatory':
                    await this.initializePredatoryMode();
                    break;
                case 'ethical':
                    await this.initializeEthicalMode();
                    break;
                default:
                    await this.initializeNeutralMode();
            }
        }
        
        async initializePredatoryMode() {
            const predatoryAssets = [
                '/modes/exploitative.js',
                '/predatory/countdown.js',
                '/ui_components/trapUIEngine.js',
                '/ui_components/urgencyEngine.js'
            ];
            
            await Promise.all(
                predatoryAssets.map(asset => ModuleLoader.load(asset))
            );
            
            EventBus.emit('mode:predatory:loaded');
        }
        
        async initializeEthicalMode() {
            const ethicalAssets = [
                '/modes/ethical.js',
                '/ui_components/ethicalSafeguards.js',
                '/ui_components/ethicalAlternatives.js'
            ];
            
            await Promise.all(
                ethicalAssets.map(asset => ModuleLoader.load(asset))
            );
            
            EventBus.emit('mode:ethical:loaded');
        }
        
        async initializeNeutralMode() {
            // Load minimal assets for neutral/comparison mode
            await ModuleLoader.load('/ui_components/aprCalculator.js');
            EventBus.emit('mode:neutral:loaded');
        }
        
        handleInitError(error) {
            // Fallback initialization
            document.body.innerHTML = `
                <div class="error-container">
                    <h1>Loading Error</h1>
                    <p>There was a problem loading the application.</p>
                    <button onclick="location.reload()">Retry</button>
                </div>
            `;
            
            // Report error
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    type: 'TRACK_INTERACTION',
                    data: { type: 'error', error: error.message }
                });
            }
        }
        
        // Public API
        switchMode(newMode) {
            if (newMode === this.mode) return;
            
            const url = new URL(window.location);
            url.searchParams.set('mode', newMode);
            history.pushState({}, '', url);
            
            this.detectAndInitializeMode();
        }
        
        getPerformanceMetrics() {
            return {
                ...perf.marks,
                navigation: performance.getEntriesByType('navigation')[0],
                resources: performance.getEntriesByType('resource').length
            };
        }
    }
    
    // Initialize app when DOM is ready
    const app = new LotusApp();
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => app.init());
    } else {
        app.init();
    }
    
    // Global API
    window.LotusApp = app;
    window.Lotus = {
        app,
        StateManager,
        EventBus,
        ModuleLoader,
        DOM,
        perf
    };
    
})();