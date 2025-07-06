# Lotus Payday Loan Simulator - GitHub Pages Deployment

This is the complete GitHub Pages deployment of the Lotus payday loan simulation project, integrating all 96+ files into a seamless static site experience.

## Features Included

### 🎭 Dual Interface Modes
- **Predatory Mode**: Dark patterns, urgency tactics, behavioral manipulation
- **Ethical Mode**: Transparency, education, informed choice

### 🧠 Research Components
- Autonomy theater engine
- Behavioral psychology tracking
- Real-time analytics collection
- User behavior replay system

### 🔧 Technical Implementation
- Dynamic content loading for GitHub Pages compatibility
- Module-based architecture
- Real-time mode switching
- Analytics terminal overlay
- Responsive design

## File Structure

```
├── index_github_pages.html    # Main GitHub Pages entry point
├── assets/
│   ├── global.css            # Core styling
│   └── global.js             # Core JavaScript
├── predatory/                # Predatory interface partials
│   ├── hero.html
│   ├── slider.html
│   ├── form.html
│   ├── faq.html
│   ├── trust-signals.html
│   ├── terms.html
│   ├── countdown.js
│   └── styles.css
├── ethical/                  # Ethical interface partials
│   ├── hero.html
│   ├── form-step1.html
│   ├── form-step2.html
│   ├── apr-display.html
│   ├── education.html
│   └── styles.css
├── partials/ethical/         # Additional ethical components
│   ├── calculator.html
│   ├── alternatives.html
│   └── footer.html
├── engine/                   # Core simulation engines
│   ├── autonomy_theater.js
│   ├── behavioralPsychology.js
│   ├── echo.js
│   └── kant.js
├── research/                 # Analytics and research
│   ├── research_analytics.js
│   └── researchDataCollector.js
├── ui_components/            # Reusable UI components
│   ├── aprCalculator.js
│   ├── aprTransparencyMeter.js
│   ├── behaviorReplay.js
│   ├── consentBar.js
│   ├── darkPatternEngine.js
│   ├── educationalAssessment.js
│   └── [20+ other components]
└── modes/                    # Mode-specific logic
    ├── ethical.js
    └── exploitative.js
```

## Deployment Steps

1. **Upload to GitHub Repository**
   ```bash
   git add .
   git commit -m "Complete Lotus GitHub Pages integration"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select source: Deploy from a branch
   - Choose branch: main
   - Select folder: / (root)

3. **Set Entry Point**
   - Rename `index_github_pages.html` to `index.html` or
   - Configure GitHub Pages to use `index_github_pages.html` as the entry point

## Technical Details

### Dynamic Content Loading
The system uses fetch() to dynamically load HTML partials, making it compatible with GitHub Pages' static hosting while preserving the modular structure.

### Mode Switching
Real-time interface switching without page reload:
- CSS stylesheet toggling
- Content container show/hide
- Analytics tracking
- Behavioral pattern recording

### Analytics Integration
- Real-time behavior tracking
- Terminal overlay for debug info
- Research data collection
- Cross-mode comparison metrics

### Mobile Responsive
- Adaptive layout for all screen sizes
- Touch-friendly mode switching
- Optimized loading for mobile connections

## Research Applications

This deployment enables:
- A/B testing between predatory and ethical interfaces
- User behavior pattern analysis
- Educational research on dark patterns
- Financial literacy assessment
- Regulatory compliance demonstration

## Content Preservation

All original content has been preserved:
- ✅ Predatory interface dark patterns
- ✅ Ethical redesign components  
- ✅ Autonomy theater simulation
- ✅ Behavioral psychology tracking
- ✅ Research analytics collection
- ✅ Educational scaffolding
- ✅ Legal compliance checking
- ✅ APR transparency tools
- ✅ Debt cycle simulation
- ✅ Consent management

## Performance Optimizations

- Module preloading for faster startup
- Progressive content loading
- Efficient script execution
- Optimized asset delivery
- Minimal render blocking

## Browser Compatibility

Tested and compatible with:
- Chrome/Chromium 90+
- Firefox 85+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**Note**: This implementation preserves all Copilot guard comments and follows the 73-file scaffold requirements while ensuring GitHub Pages compatibility.
