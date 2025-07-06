# GitHub Pages Deployment Guide

<!-- Copilot: Complete deployment guide for GitHub Pages -->

## Overview

This guide provides step-by-step instructions for deploying the Lotus Payday Lending Simulation to GitHub Pages. The application is optimized for static hosting and includes all necessary configurations.

## Prerequisites

- GitHub account
- Git installed locally
- Basic familiarity with command line
- Repository with the Lotus project files

## Deployment Steps

### 1. Repository Setup

```bash
# Clone or create your repository
git clone https://github.com/yourusername/lotus-simulation.git
cd lotus-simulation

# Ensure all files are present
ls -la
```

### 2. GitHub Pages Configuration

1. **Navigate to Repository Settings**
   - Go to your repository on GitHub
   - Click "Settings" tab
   - Scroll down to "Pages" section

2. **Configure Source**
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch
   - Select "/ (root)" folder
   - Click "Save"

3. **Custom Domain (Optional)**
   - Add custom domain if desired
   - Configure DNS settings with your domain provider

### 3. Jekyll Configuration

The project includes `_config.yml` for Jekyll configuration:

```yaml
# Site settings
title: "Lotus Payday Lending Simulation"
description: "Educational simulation demonstrating predatory vs ethical lending"
url: "https://yourusername.github.io"
baseurl: "/lotus-simulation"

# Build settings
markdown: kramdown
plugins:
  - jekyll-feed
  - jekyll-sitemap
  - jekyll-seo-tag

# Exclude files from build
exclude:
  - node_modules/
  - .gitignore
  - README.md
  - package.json
  - archive/
  - tests/
```

### 4. File Optimization

The project includes multiple optimized index files:

- **`index.html`** - Main production file
- **`index_optimized.html`** - Performance optimized
- **`index_enhanced.html`** - Feature rich with PWA support

Choose the appropriate version for your needs:

```bash
# Use optimized version as main index
cp index_optimized.html index.html

# Or use enhanced version for full features
cp index_enhanced.html index.html
```

### 5. Asset Configuration

Ensure all assets are properly referenced:

```html
<!-- Relative paths work best for GitHub Pages -->
<link rel="stylesheet" href="assets/global.css">
<script src="app_optimized.js"></script>

<!-- Update any absolute paths -->
<link rel="manifest" href="manifest.json">
```

### 6. Service Worker Configuration

Update `sw.js` for GitHub Pages:

```javascript
// Update cache names for your deployment
const CACHE_NAME = 'lotus-v1.0.0';
const STATIC_CACHE = 'lotus-static-v1.0.0';

// Update asset paths if using subdirectory
const CORE_ASSETS = [
    '/lotus-simulation/',  // Add base path if needed
    '/lotus-simulation/index.html',
    '/lotus-simulation/app_optimized.js',
    // ... other assets
];
```

### 7. Deploy to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Initial deployment to GitHub Pages"

# Push to GitHub
git push origin main
```

### 8. Verification

After deployment (usually takes 5-10 minutes):

1. **Check Deployment Status**
   ```bash
   # Run verification script
   ./verify-deployment.sh
   ```

2. **Test URL**
   - Visit: `https://yourusername.github.io/repository-name/`
   - Test all modes: predatory, ethical, comparison
   - Verify mobile responsiveness
   - Check console for errors

3. **Performance Testing**
   - Run Lighthouse audit
   - Test offline functionality
   - Verify PWA installation

## Troubleshooting

### Common Issues

#### 1. 404 Errors
```bash
# Check file paths in _config.yml
baseurl: "/your-repo-name"

# Update asset references
<link rel="stylesheet" href="{{ '/assets/global.css' | relative_url }}">
```

#### 2. JavaScript Errors
```javascript
// Ensure proper error handling
try {
    // Your code
} catch (error) {
    console.warn('Graceful degradation:', error);
}
```

#### 3. CSS Not Loading
```html
<!-- Use Jekyll liquid tags -->
<link rel="stylesheet" href="{{ '/style.css' | relative_url }}">

<!-- Or ensure correct relative paths -->
<link rel="stylesheet" href="./style.css">
```

#### 4. Service Worker Issues
```javascript
// Update scope for subdirectory deployment
navigator.serviceWorker.register('/your-repo/sw.js', {
    scope: '/your-repo/'
});
```

### Build Failures

Check GitHub Actions tab for build logs:

1. **Jekyll Build Errors**
   - Check `_config.yml` syntax
   - Ensure all required files are present
   - Remove any invalid frontmatter

2. **File Size Limits**
   - GitHub Pages has 1GB repository limit
   - Individual files should be < 100MB
   - Optimize images and assets

## Performance Optimization

### 1. Asset Optimization

```bash
# Minify CSS and JavaScript
npm install -g clean-css-cli uglify-js

# Minify CSS
cleancss -o style.min.css style.css

# Minify JavaScript
uglifyjs app.js -o app.min.js
```

### 2. Image Optimization

```bash
# Use optimized image formats
# PNG for graphics, JPG for photos, SVG for icons
# Compress images before upload
```

### 3. Caching Strategy

```javascript
// Service worker caching for performance
const CACHE_STRATEGY = {
    static: 'cache-first',
    dynamic: 'network-first',
    images: 'cache-first'
};
```

## Security Considerations

### 1. Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

### 2. No Sensitive Data

- No API keys in client code
- No personal data collection
- All data processing client-side only

### 3. Educational Disclaimers

Ensure prominent disclaimers:

```html
<div class="disclaimer">
    <strong>Educational Simulation Only</strong>
    This is not a real lending service.
</div>
```

## Monitoring & Analytics

### 1. GitHub Pages Analytics

Monitor via GitHub repository insights:
- Traffic overview
- Popular content
- Referring sites

### 2. Custom Analytics

```javascript
// Simple privacy-friendly analytics
const analytics = {
    trackEvent: (event, data) => {
        // Store locally only, no external tracking
        const events = JSON.parse(localStorage.getItem('analytics') || '[]');
        events.push({ event, data, timestamp: Date.now() });
        localStorage.setItem('analytics', JSON.stringify(events));
    }
};
```

### 3. Performance Monitoring

```javascript
// Track performance metrics
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime}ms`);
    
    // Report to local storage for analysis
    localStorage.setItem('performance', JSON.stringify({
        loadTime,
        timestamp: Date.now()
    }));
});
```

## Maintenance

### Regular Updates

1. **Security Updates**
   - Monitor for security advisories
   - Update dependencies regularly
   - Review and update CSP headers

2. **Content Updates**
   - Update educational resources
   - Refresh statistical data
   - Review regulatory changes

3. **Performance Reviews**
   - Monthly Lighthouse audits
   - User feedback collection
   - Mobile experience testing

### Backup Strategy

```bash
# Regular backups
git tag v1.0.0  # Tag releases
git push --tags

# Export analytics data
node export-analytics.js
```

## Advanced Features

### Custom Domain Setup

1. **Add CNAME file**
   ```
   echo "yourdomain.com" > CNAME
   ```

2. **Configure DNS**
   ```
   Type: CNAME
   Name: www
   Value: yourusername.github.io
   ```

3. **Enable HTTPS**
   - GitHub Pages provides free SSL
   - Automatically enabled for custom domains

### Multiple Environments

```bash
# Development branch
git checkout -b development
# Make changes, test locally

# Staging branch  
git checkout -b staging
# Deploy to staging environment

# Production
git checkout main
git merge staging
git push origin main
```

## Support Resources

- **GitHub Pages Documentation**: https://docs.github.com/en/pages
- **Jekyll Documentation**: https://jekyllrb.com/docs/
- **GitHub Community Forum**: https://github.community/
- **Lighthouse Performance Tool**: https://developers.google.com/web/tools/lighthouse

## Deployment Checklist

- [ ] Repository configured for GitHub Pages
- [ ] `_config.yml` properly configured
- [ ] All asset paths relative or properly configured
- [ ] Service worker updated for deployment path
- [ ] Educational disclaimers prominent
- [ ] Performance optimized (Lighthouse score > 90)
- [ ] Mobile responsive
- [ ] Accessibility tested (WCAG 2.1 AA)
- [ ] All modes functional (predatory, ethical, comparison)
- [ ] Error handling implemented
- [ ] Privacy policy and terms added
- [ ] Analytics and monitoring configured
- [ ] Backup and maintenance plan in place

## Post-Deployment

After successful deployment:

1. **Announce to stakeholders**
2. **Document the live URL**
3. **Set up monitoring alerts**
4. **Schedule regular maintenance**
5. **Collect user feedback**
6. **Plan future enhancements**

---

*This deployment guide ensures a successful GitHub Pages deployment of the Lotus Payday Lending Simulation with optimal performance and security.*