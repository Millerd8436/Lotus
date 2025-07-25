# 🔬 Payday Loan Simulator Study — A Scientific & Practical Plan

This project is a research platform designed to scientifically measure the impact of deceptive user experience (UX) and API design in fintech products. It uses a three-phase experimental structure to compare user comprehension and ethical judgment when exposed to both an exploitative and an ethical payday loan simulator.

## 🎯 Research Mission

The primary goal is to investigate how interface design and data transparency affect user understanding of loan terms, hidden fees, and data collection practices. By measuring comprehension differences between an exploitative simulator (`EasyLend`) and a transparent one (`FairLend`), this study aims to provide empirical evidence for advocating stricter UX/API design regulations and promoting more ethical financial technology.

## 🏗️ Experimental Architecture

The study uses a within-subject design where each participant experiences all phases in a fixed order to measure changes in their comprehension and perception.

### Phase 1: EasyLend (Exploitative Simulator)
- **Goal**: Measure baseline user comprehension with a deceptively designed loan application.
- **Implementation**: A realistic simulator that includes common predatory dark patterns:
    - Hidden fees and obfuscated APR.
    - Vague language and buried terms.
    - Implicit consent for aggressive data collection via API calls.
- **Data Collected**: User interaction logs, click paths, time spent on each section.

### Quiz 1: Baseline Comprehension
- **Goal**: Assess the user's natural understanding after the `EasyLend` experience.
- **Measures**: Total repayment amount, effective APR, awareness of hidden fees, and perception of data usage. Includes confidence ratings.

### Phase 2: FairLend (Ethical Simulator)
- **Goal**: Provide a contrast to the exploitative model with a focus on transparency and user agency.
- **Implementation**: The same loan scenario as `EasyLend` but with:
    - Clear, explicit disclosures of all fees and terms.
    - Explicit consent steps for data collection.
    - UI elements (e.g., fee sliders) that empower the user.
- **Data Collected**: Same metrics as Phase 1 for direct comparison.

### Quiz 2: Comprehension Post-Ethical Exposure
- **Goal**: Measure the change in user comprehension after experiencing a transparent interface.
- **Measures**: Parallel questions to Quiz 1 to quantify the "comprehension delta" attributable to ethical design.

### Delta Calculation
The quantitative difference between Quiz 1 and Quiz 2 scores is calculated to measure the precise comprehension gain from transparent design.

### Phase 3: Echo Mode (Annotated Replay & Comparison)
- **Goal**: Educate the user and gather qualitative feedback by making the previous deception explicit.
- **Implementation**:
    - Replays the user's `EasyLend` interaction step-by-step.
    - Displays side-by-side annotations explaining the misleading tactics, hidden API calls, and exploited legal loopholes.
    - Contrasts each deceptive pattern with the clear alternative from `FairLend`.
    - Prompts the user with reflective questions.
    - Recommends safer financial alternatives.

### Quiz 3: Final Reflection & Policy Opinion
- **Goal**: Assess the final shift in user perception and opinion.
- **Measures**: Perception of being misled, support for stricter regulations, and opinions on mandatory data disclosures.

## 🔬 Scientific Method & Variables

-   **Independent Variable**: The simulator condition (Exploitative vs. Ethical). All other factors (loan amount, flow, layout, tone) are controlled.
-   **Dependent Variables**:
    1.  Comprehension of loan terms.
    2.  Trust and willingness to transact.
    3.  Ethical judgments and policy support (post-Echo Mode).
-   **Blindness**: Participants are not told about the study's goals until the final Echo Mode phase to minimize demand characteristics.

## 📁 Project Structure

The project is organized to support the research flow. The file structure will be refactored to match this plan.

```
Lotus/
├── 📄 README.md                           # This research plan
│
├── 🏠 app/                                # Next.js 14+ App Router
│   ├── 😈 easylend/                     # Phase 1: Predatory simulation
│   │   └── 📄 page.tsx
│   ├── ✨ fairlend/                      # Phase 2: Ethical alternative
│   │   └── 📄 page.tsx
│   ├── 📢 echo/                         # Phase 3: Annotated replay
│   │   └── 📄 page.tsx
│   ├── 📝 quiz/[id]/                    # Quizzes 1, 2, and 3
│   │   └── 📄 page.tsx
│   └── 📊 debrief/                      # Post-study educational summary
│       └── 📄 page.tsx
│
├── 🧩 components/                         # React components library
│   ├── 😈 easylend/                     # Components for the exploitative simulator
│   ├── ✨ fairlend/                      # Components for the ethical simulator
│   ├── 📢 echo/                         # Components for Echo Mode replay
│   ├── 📝 quiz/                         # Reusable quiz components
│   └── 📊 debrief/                      # Components for the debriefing page
│
├── 🗃️ lib/                               # Core business logic & utilities
│   ├── core/                           # Core simulation engines (loan calculation, session management)
│   ├── research/                       # Research-specific logic (data logging, delta calculation)
│   └── utils.ts                        # Shared utility functions
│
├── 🗄️ data/                              # Quiz questions, scenarios, and educational content
│
└── 📋 scripts/                           # Scripts for validation, data analysis, and deployment
```

## 🛠️ Development & Deployment

The project uses a standard Next.js and Vercel stack.

### Quick Start Commands
```bash
# Install all dependencies
npm install

# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Deploy to Vercel
vercel deploy --prod
```

### Automation
Quizzes and data collection are automated to ensure consistency, integrity, and scalability. All user interactions, quiz responses, and timestamps are logged to a backend for statistical analysis.

## 🎓 Research Write-Up Structure

The findings from this study will be structured for academic publication, focusing on:
1.  **Introduction**: The problem of predatory lending and deceptive design.
2.  **Part 1: Website Practices**: Analysis of real-world examples that informed the simulator design.
3.  **Part 2: User Study**: Methods, demographics, and results from the three-phase experiment.
4.  **Discussion**: Synthesis of findings and implications for consumer protection.
5.  **Conclusion**: The role of the simulator in advocacy and suggestions for policy reform.

---

> **🌸 Lotus Research Platform** - Using scientific simulation to advocate for a more transparent and ethical financial future.
