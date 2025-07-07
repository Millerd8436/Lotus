# Lotus Payday Loan Simulator

A comprehensive educational platform demonstrating predatory vs ethical lending practices with interactive simulations and Ghost Mode ethical guidance.

## 🚀 GitHub Pages Deployment

1. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` (or `gh-pages`)
   - Folder: `/ (root)`

2. **Access your site**: `https://yourusername.github.io/Lotus/`

3. **Files GitHub Pages serves automatically**:
   - `index.html` - Main entry point (automatically loads)
   - `apply.html` - Loan application simulation
   - `reflect.html` - Educational reflection and quizzes
   - All `.js` files (ES6 modules supported)
   - All `.css` files in `/assets/styles/`
   - All `.json` data files in `/data/`
   - `manifest.json` - PWA support
   - `sw.js` - Service worker

## 📁 Project Structure

```
lotus-frontend/
├── index.html                 ← Predatory homepage (landing UI)
├── apply.html                 ← Loan application flow  
├── reflect.html               ← Ethical reflection / quiz page
├── app.js                     ← Main coordinator (imports all modules)
├── global.js                  ← Global state & mode toggles
├── lotus_core.js              ← Loan math, APR, rollover logic
├── autonomy_theater.js        ← Psychological manipulation triggers
├── ui-components.js           ← All UI components (includes ethics, quiz, consent bar, etc.)
├── utils.js                   ← Utility functions and formatting
├── data/                      ← Mock "backend" JSON
│   ├── usury_laws.json
│   ├── trap_scenarios.json
│   └── quiz_bank.json
├── assets/                    ← Static assets served by GHP
│   ├── styles/
│   │   ├── deceptive.css      ← Flashy payday styles
│   │   └── ethical.css        ← Calm, accessible ethical styles
├── manifest.json              ← PWA support
├── sw.js                      ← Service worker
└── README.md
```

## 🎯 Features

- **Dual Mode Interface**: Switch between predatory and ethical lending experiences
- **Ghost Mode**: Reveals hidden dark patterns and provides educational overlays
- **Interactive Simulations**: Real APR calculations, rollover traps, and debt cycles
- **Side-by-Side Calculator**: Compare predatory vs ethical loan costs in real-time
- **Comprehensive Cost Analysis**: See all fees, APR, and true total costs
- **Educational Quizzes**: Built-in assessment and reflection tools
- **Debt Cycle Visualization**: Chart.js powered debt trap simulations
- **Alternative Options**: Compare credit unions, employer advances, and other options
- **Mobile Responsive**: Works on all devices
- **GitHub Pages Ready**: No build process, deploy directly

## 🧠 Ghost Mode ("Ethical Toggle")

- Click the 👻 Ghost Mode button in the header
- Reveals all hidden `[data-deceptive]` elements
- Switches CSS from predatory → ethical styling
- Shows educational overlays with quiz prompts
- Persists mode choice in localStorage

## 💻 Local Development

```bash
# Serve locally (Python)
python -m http.server 8000

# Or use Node.js serve
npx serve . --live --port 8080
```

Visit `http://localhost:8000` or `http://localhost:8080`

## 🔧 Technical Details

- **Static Site**: No backend required - all logic in client-side JS
- **ES6 Modules**: Modern JavaScript with clean imports
- **JSON Data**: Mock server responses via fetch('./data/...')
- **GitHub Pages Ready**: All paths relative, no build step needed

## 📚 Educational Purpose

This simulator is designed for academic research and consumer education about predatory lending practices. It demonstrates real-world dark patterns in a controlled environment with ethical guardrails.
