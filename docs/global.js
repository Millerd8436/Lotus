/**
 * global.js - Condensed Global State for Lotus Payday Loan Simulator
 * GitHub Pages compatible - All features preserved
 */

// Consolidated configuration
window.LotusConfig = {
    version: '2.0.0',
    debug: false,
    paths: { base: '.', assets: './assets', data: './data' },
    themes: { predatory: 'deceptive', ethical: 'ethical' },
    features: {
        darkPatternDemo: true, ethicalAlternatives: true, educationalModules: true,
        researchMode: true, autonomyTheater: true, behavioralTracking: true,
        enableAnalytics: true, enableGhostMode: true
    },
    // Loan parameters
    apr: 24.0, exploitFeeRate: 0.30, daysToRepay: 14, riskThreshold: 1.5,
    stateRules: {
        'CA': { maxAPR: 36, minTermDays: 31, allowRollover: false },
        'NY': { maxAPR: 25, minTermDays: 30, allowRollover: false }, 
        'TX': { maxAPR: 664, minTermDays: 7, allowRollover: true },
        'FL': { maxAPR: 304, minTermDays: 7, allowRollover: true },
        'GEN': { maxAPR: 400, minTermDays: 14, allowRollover: true }
    }
};

// Condensed utilities combining multiple functions
window.LotusUtils = {
    // Data & Theme Management
    async loadData(filename) {
        try {
            const response = await fetch(`./data/${filename}`);
            return response.ok ? await response.json() : null;
        } catch (error) { console.error(`Error loading ${filename}:`, error); return null; }
    },
    switchTheme(mode) {
        document.body.className = document.body.className.replace(/(deceptive|ethical)-mode/g, '');
        document.body.classList.add(mode === 'predatory' ? 'predatory-mode' : 'ethical-mode');
        localStorage.setItem('lotus-theme', mode);
        this.emit('themeChanged', { mode });
    },
    toggleGhostMode() {
        const isActive = document.body.classList.toggle('ghost-mode');
        document.querySelectorAll('[data-deceptive]').forEach(el => el.classList.toggle('revealed', isActive));
        localStorage.setItem('lotus-ghost-mode', isActive);
        this.emit('ghostModeToggled', { active: isActive });
        return isActive;
    },
    
    // Formatting & Calculations
    formatCurrency: amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount),
    formatPercentage: rate => new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 1 }).format(rate / 100),
    calculateAPR: (principal, fee, termDays) => principal > 0 && termDays > 0 ? ((fee / principal) * (365 / termDays)) * 100 : 0,
    
    // State & Storage
    getUserState: () => localStorage.getItem('lotus-user-state') || 'GEN',
    setUserState: state => localStorage.setItem('lotus-user-state', state),
    getCurrentMode: () => document.body.classList.contains('predatory-mode') ? 'predatory' : 'ethical',
    
    // Interaction Logging & Dark Patterns
    logInteraction(type, data = {}) {
        if (window.LotusApp?.echo) window.LotusApp.echo.logAction(type, data);
        if (window.LotusConfig.debug) console.log('Interaction:', type, data);
        this.emit('userInteraction', { type, data });
    },
    initializeDarkPatterns() {
        if (document.body.classList.contains('predatory-mode') && window.LotusApp?.theater) {
            window.LotusApp.theater.activate();
        }
    },
    
    // Ghost Mode Toggle Creation
    createModeToggle() {
        if (document.getElementById('ghost-toggle')) return;
        const toggle = document.createElement('button');
        Object.assign(toggle, {
            id: 'ghost-toggle',
            innerHTML: '👻 Ghost',
            onclick: () => this.toggleGhostMode()
        });
        Object.assign(toggle.style, {
            position: 'fixed', top: '10px', right: '10px', zIndex: '9999',
            background: 'rgba(0,0,0,0.8)', color: 'white', border: 'none',
            padding: '8px 12px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer'
        });
        document.body.appendChild(toggle);
        document.addEventListener('keydown', e => {
            if (e.ctrlKey && e.shiftKey && e.key === 'G') {
                toggle.style.opacity = toggle.style.opacity === '0' ? '1' : '0';
            }
        });
    },
    
    // Event system (condensed)
    listeners: new Map(),
    on(event, callback) { (this.listeners.get(event) || this.listeners.set(event, []).get(event)).push(callback); },
    emit(event, data = {}) { (this.listeners.get(event) || []).forEach(cb => { try { cb(data); } catch(e) { console.error(e); } }); }
};

// Initialize global state
document.addEventListener('DOMContentLoaded', () => {
    const savedGhostMode = localStorage.getItem('lotus-ghost-mode') === 'true';
    const savedTheme = localStorage.getItem('lotus-theme') || 'predatory';
    
    if (savedGhostMode) document.body.classList.add('ghost-mode');
    window.LotusUtils.switchTheme(savedTheme);
    window.LotusUtils.createModeToggle();
    
    setTimeout(() => window.LotusUtils.initializeDarkPatterns(), 1000);
    
    console.log('🌍 Lotus Global State - Initialized');
    console.log('💡 Press Ctrl+Shift+G to reveal Ghost Mode toggle');
    
    window.LotusUtils.emit('globalInitialized', { theme: savedTheme, ghostMode: savedGhostMode });
});
