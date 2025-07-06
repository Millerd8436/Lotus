// Copilot: Service Worker for Lotus Payday Lending Simulation
// Progressive Web App functionality with caching and offline support

const CACHE_NAME = 'lotus-payday-v1.2.1';
const STATIC_CACHE = 'lotus-static-v1.2.1';
const DYNAMIC_CACHE = 'lotus-dynamic-v1.2.1';

// Core files to cache immediately (GitHub Pages compatible)
const CORE_ASSETS = [
    './',
    './index.html',
    './app.js',
    './ui.js',
    './style.css',
    './assets/global.css',
    './assets/global.js',
    './core/loan_core.js',
    './modes/ethical.js',
    './modes/exploitative.js',
    './engine/autonomy_theater.js',
    './manifest.json'
];

// CSS and JS files that exist as separate files
const STATIC_ASSETS = [
    './predatory/styles.css',
    './ethical/styles.css',
    './predatory/countdown.js',
    './predatory/terms.html',
    './predatory/trust-signals.html'
];

// Ethical mode assets
const ETHICAL_ASSETS = [
    './partials/ethical/hero.html',
    './partials/ethical/alternatives.html',
    './partials/ethical/calculator.html',
    './partials/ethical/footer.html'
];

// UI Components
const UI_COMPONENTS = [
    './ui_components/aprCalculator.js',
    './ui_components/aprTransparencyMeter.js',
    './ui_components/behavioralTriggers.js',
    './ui_components/darkPatterns.js',
    './ui_components/ethicalAlternatives.js',
    './ui_components/ethicalSafeguards.js',
    './ui_components/feeObfuscator.js',
    './ui_components/promptEngine.js',
    './ui_components/riskAssessment.js',
    './ui_components/trapUIEngine.js',
    './ui_components/urgencyEngine.js'
];

// All assets to cache
const ALL_ASSETS = [
    ...CORE_ASSETS,
    ...PREDATORY_ASSETS,
    ...ETHICAL_ASSETS,
    ...UI_COMPONENTS
];

// Service Worker Installation
self.addEventListener('install', event => {
    console.log('[SW] Installing Service Worker...');
    
    event.waitUntil(
        Promise.all([
            // Cache core static assets
            caches.open(STATIC_CACHE).then(cache => {
                console.log('[SW] Caching static assets');
                return cache.addAll(ALL_ASSETS.map(url => new Request(url, {
                    cache: 'no-cache'
                })));
            }),
            
            // Initialize analytics cache
            caches.open(DYNAMIC_CACHE).then(cache => {
                console.log('[SW] Initializing dynamic cache');
                return cache.put('/analytics/session', new Response(JSON.stringify({
                    timestamp: Date.now(),
                    mode: 'unknown',
                    interactions: []
                })));
            })
        ]).then(() => {
            console.log('[SW] Installation complete');
            return self.skipWaiting();
        }).catch(error => {
            console.error('[SW] Installation failed:', error);
        })
    );
});

// Service Worker Activation
self.addEventListener('activate', event => {
    console.log('[SW] Activating Service Worker...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            }),
            
            // Take control of all clients
            self.clients.claim()
        ]).then(() => {
            console.log('[SW] Activation complete');
        })
    );
});

// Network Requests Handling
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(request).then(cachedResponse => {
            // Return cached version if available
            if (cachedResponse) {
                // Update cache in background for dynamic content
                if (isDynamicContent(url.pathname)) {
                    updateCacheInBackground(request);
                }
                return cachedResponse;
            }
            
            // Fetch from network
            return fetch(request).then(response => {
                // Don't cache if not successful
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }
                
                // Cache the response
                const responseToCache = response.clone();
                const cacheKey = isStaticContent(url.pathname) ? STATIC_CACHE : DYNAMIC_CACHE;
                
                caches.open(cacheKey).then(cache => {
                    cache.put(request, responseToCache);
                });
                
                return response;
            }).catch(error => {
                console.error('[SW] Fetch failed:', error);
                
                // Return offline fallback for navigation requests
                if (request.destination === 'document') {
                    return caches.match('/offline.html') || 
                           caches.match('/index.html') ||
                           new Response('Offline', { status: 503 });
                }
                
                throw error;
            });
        })
    );
});

// Background Messages from App
self.addEventListener('message', event => {
    const { type, data } = event.data;
    
    switch (type) {
        case 'TRACK_INTERACTION':
            trackUserInteraction(data);
            break;
            
        case 'CACHE_UPDATE':
            updateSpecificCache(data.url, data.content);
            break;
            
        case 'CLEAR_CACHE':
            clearAllCaches();
            break;
            
        case 'GET_CACHE_STATUS':
            getCacheStatus().then(status => {
                event.ports[0].postMessage({ type: 'CACHE_STATUS', data: status });
            });
            break;
            
        default:
            console.warn('[SW] Unknown message type:', type);
    }
});

// Helper Functions
function isDynamicContent(pathname) {
    const dynamicPatterns = [
        '/api/',
        '/analytics/',
        '/user-data/',
        '/session/'
    ];
    return dynamicPatterns.some(pattern => pathname.includes(pattern));
}

function isStaticContent(pathname) {
    const staticPatterns = [
        '.css',
        '.js',
        '.html',
        '.png',
        '.jpg',
        '.svg',
        '.ico'
    ];
    return staticPatterns.some(pattern => pathname.includes(pattern));
}

function updateCacheInBackground(request) {
    fetch(request).then(response => {
        if (response && response.status === 200) {
            caches.open(DYNAMIC_CACHE).then(cache => {
                cache.put(request, response);
            });
        }
    }).catch(error => {
        console.warn('[SW] Background update failed:', error);
    });
}

function trackUserInteraction(data) {
    caches.open(DYNAMIC_CACHE).then(cache => {
        cache.match('/analytics/session').then(response => {
            if (response) {
                response.json().then(session => {
                    session.interactions.push({
                        timestamp: Date.now(),
                        ...data
                    });
                    
                    cache.put('/analytics/session', new Response(JSON.stringify(session)));
                });
            }
        });
    });
}

function updateSpecificCache(url, content) {
    const cacheKey = isStaticContent(url) ? STATIC_CACHE : DYNAMIC_CACHE;
    caches.open(cacheKey).then(cache => {
        cache.put(url, new Response(content));
    });
}

function clearAllCaches() {
    caches.keys().then(cacheNames => {
        Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
    });
}

function getCacheStatus() {
    return Promise.all([
        caches.open(STATIC_CACHE).then(cache => cache.keys()),
        caches.open(DYNAMIC_CACHE).then(cache => cache.keys())
    ]).then(([staticKeys, dynamicKeys]) => ({
        static: staticKeys.length,
        dynamic: dynamicKeys.length,
        version: CACHE_NAME
    }));
}

// Performance monitoring
self.addEventListener('sync', event => {
    if (event.tag === 'analytics-sync') {
        event.waitUntil(syncAnalytics());
    }
});

function syncAnalytics() {
    return caches.open(DYNAMIC_CACHE).then(cache => {
        return cache.match('/analytics/session').then(response => {
            if (response) {
                return response.json().then(data => {
                    // In a real app, this would sync to analytics service
                    console.log('[SW] Analytics sync:', data);
                });
            }
        });
    });
}

console.log('[SW] Service Worker script loaded');