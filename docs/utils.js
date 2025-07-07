/**
 * utils.js - Condensed utilities for Lotus Payday Loan Simulator
 * Combines all utility functions for GitHub Pages deployment
 */

// Currency and formatting utilities
export const formatCurrency = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
export const formatPercentage = (rate, decimals = 1) => `${rate.toFixed(decimals)}%`;
export const calculateAPR = (principal, fee, termDays) => principal > 0 && termDays > 0 ? ((fee / principal) * (365 / termDays)) * 100 : 0;

// Performance utilities
export const debounce = (func, wait, immediate = false) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { timeout = null; if (!immediate) func.apply(this, args); };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
};

export const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) { func.apply(this, args); inThrottle = true; setTimeout(() => inThrottle = false, limit); }
    };
};

// Date utilities
export const formatDate = date => new Intl.DateTimeFormat('en-US').format(new Date(date));
export const addDays = (date, days) => new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
export const daysBetween = (date1, date2) => Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));

// Simple logger
export const logger = {
    logs: [],
    sessionId: 'log_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
    log(level, message, data = {}) {
        const entry = { timestamp: new Date().toISOString(), sessionId: this.sessionId, level, message, data };
        this.logs.push(entry);
        if (window.LotusConfig?.debug) console[level](`[${level.toUpperCase()}] ${message}`, data);
    },
    info: function(msg, data) { this.log('info', msg, data); },
    warn: function(msg, data) { this.log('warn', msg, data); },
    error: function(msg, data) { this.log('error', msg, data); },
    exportLogs: function() { return JSON.stringify(this.logs, null, 2); }
};
