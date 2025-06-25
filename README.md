# Lotus CLI Payday Loan Simulator (Enhanced Educational Version)

This project simulates payday lending practices through two distinct, in-depth modes, designed to educate users on consumer rights, ethical considerations, and the tactics used in the lending industry.

- **Realistic Exploitative Mode**: This mode aims to replicate common predatory tactics observed in some segments of the payday lending market. It demonstrates how vulnerable consumers can be subjected to:
    - **Obfuscated Terms & Hidden Fees**: Using confusing language, fine print, and drip pricing where the full cost is not apparent until late in the process.
    - **High-Pressure Sales Tactics**: Employing artificial urgency (e.g., "limited time offers," "few slots left") and fake testimonials to rush decisions.
    - **Misleading Information**: Displaying costs as low weekly/daily fees instead of the legally required APR, or downplaying the total repayment amount.
    - **Aggressive Rollover Strategies**: Defaulting users into costly rollovers with difficult opt-out procedures, leading to debt traps.
    - **Superficial Consent**: Obtaining "consent" through easy-to-click buttons without ensuring genuine understanding or voluntary agreement, often burying critical terms like forced arbitration clauses.
    - **Data Sharing & Upselling**: Using pre-checked boxes for expensive, often unnecessary, add-on services and sharing user data broadly with affiliates.
    The objective is to arm users with the knowledge to identify and critically assess these harmful practices.

- **Regulated Ethical Redesign Mode**: This mode models a payday lending approach that rigorously adheres to strong consumer protection laws (inspired by TILA/Reg Z, CFPB guidelines, and proactive state regulations) and is deeply rooted in core ethical principles. Key features include:
    - **Comprehensive Informed Consent (Kantian Autonomy)**:
        - Full, clear, and conspicuous TILA-like disclosures: Amount Financed, Finance Charge, Annual Percentage Rate (APR), Total of Payments, and Payment Schedule.
        - Prominent display of the Right to Cancel (Rescission Period, e.g., 3 business days).
        - Comprehension Checks/Quizzes to ensure the borrower understands the key terms before proceeding.
        - Explicit, voluntary consent obtained via a typed phrase, logged for audit.
        - No forced arbitration clauses; data sharing only with explicit, separate opt-in.
    - **Ethical Framework Integration**:
        - *Rawlsian Fairness (Justice as Fairness)*: Implementing policies to protect the vulnerable, such as capping loan payments as a percentage of the borrower's income (Payment-to-Income ratio), offering tiered fee structures that are more favorable to lower-income individuals, and imposing strict limits on loan renewals/rollovers to prevent debt traps.
        - *Millian Utilitarianism/Welfare (Harm Reduction)*: Aiming to maximize overall well-being by transparently showing long-term cost implications (e.g., cumulative cost timelines), offering less harmful alternatives like structured installment plans, and issuing clear warnings if loan terms (e.g., fees exceeding principal) indicate a high risk of financial harm.
    - **Rich Educational Components**:
        - Information on usury laws (historical context and modern state-specific APR caps).
        - Data on the documented harms of predatory lending (citing sources like Pew Charitable Trusts, CFPB).
        - Comparisons to safer alternatives (e.g., Credit Union Payday Alternative Loans - PALs).
        - Explanations of common deceptive "dark patterns" to foster consumer awareness.
        - Mini-lectures on the applied ethical philosophies (Kant, Rawls, Mill).
    - **Regulatory Compliance**: Adherence to simulated state-specific rules (e.g., for IL, CO, SD) regarding APR caps, fee structures, term limits, rollover prohibitions/limits, and cooling-off periods.
    This mode serves as an educational tool to illustrate what responsible, ethical, and legally compliant short-term lending can look like.

The simulator allows users to interactively experience these contrasting scenarios, understand the profound impact of different lending practices, and learn about consumer rights, financial literacy, and ethical considerations in financial services. Session details, including disclosures and consent events, can be exported to JSON for review or educational purposes.

## Build
Compile with a C++17 compiler. Example:

```bash
g++ -std=c++17 -I src -o lotus src/*.cpp src/strategies/*.cpp
```

**Important: Compiler Setup**

To build and run this project, you need a C++17 compatible compiler (like GCC) installed and configured correctly.

**Windows:**
1.  **Install MinGW-w64:**
    *   We recommend using MSYS2 ([https://www.msys2.org/](https://www.msys2.org/)).
    *   After installing MSYS2, open the MSYS2 MinGW 64-bit terminal and run:
        ```bash
        pacman -Syu
        pacman -S mingw-w64-x86_64-gcc mingw-w64-x86_64-gdb mingw-w64-x86_64-make
        ```
2.  **Add to PATH:**
    *   Add the MinGW-w64 `bin` directory to your Windows PATH environment variable. This is typically `C:\msys64\mingw64\bin`.
    *   After updating PATH, restart VS Code or your computer.
3.  **VS Code Configuration:**
    *   Ensure the `.vscode/c_cpp_properties.json` file has the correct `compilerPath`. If `gcc` is in your PATH, `"compilerPath": "gcc"` should work. Otherwise, provide the full path (e.g., `"C:/msys64/mingw64/bin/gcc.exe"`).

**Linux (Debian/Ubuntu):**
```bash
sudo apt update
sudo apt install build-essential gdb
```
GCC is usually correctly configured in PATH automatically.

**macOS:**
Install Xcode Command Line Tools:
```bash
xcode-select --install
```
This includes Clang (which is GCC-compatible) and other necessary tools.

After setting up your compiler, if you are using VS Code, the C/C++ extension should be able to find it, and IntelliSense errors like "Unable to resolve configuration" should disappear. You might need to restart VS Code.

## Run
Choose a mode interactively when prompted:
```bash
./lotus 
(You will be prompted to choose: 
  1. Realistic Exploitative Practices
  2. Regulated Ethical Redesign)
```
Or specify the mode and other options via command-line arguments:
```bash
./lotus --mode=exploitative --loan=300
./lotus --mode=regulated_ethical --loan=250 --state=CO --term=30 
```

**Key Command-Line Options:**
- `--mode=<mode_name>`: `exploitative` or `regulated_ethical`.
- `--loan=<amount>`: Pre-fills the desired loan amount.
- `--state=<ST>`: Applies specific regulations for the 2-letter state code (e.g., `CO`, `IL`, `SD`) in Regulated Ethical Redesign mode.
- `--term=<days>`: Sets the loan term in days.
- *(Additional flags can be discovered via `--help` or by reviewing `Config.h` for advanced scenario customization, such as disabling quizzes, forcing specific income caps, etc.)*

Supported states for tailored rules include (but are not limited to): `SD` (South Dakota), `DE` (Delaware), `RI` (Rhode Island), `UT` (Utah), `IL` (Illinois), `CO` (Colorado). The system can be expanded with more state-specific data.

Session logs are written to the working directory (e.g., `exploit_session.json` or `regulated_ethical_redesign_session.json`) if export is enabled.

## Git Configuration
// ...existing code...
## Opening in VS Code
// ...existing code...
