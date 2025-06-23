# Lotus CLI Simulator

This project demonstrates how payday lending can vary depending on ethics and regulation. Three selectable modes show distinct philosophies:

- **ethical** – represents an ideal lender guided by bioethical principles (Belmont Report). It begins with a short ethics primer, checks for "meta-consent" to avoid nudging, breaks down every fee in a cost–benefit ledger and ends with philosophical quotes. This mode is intentionally unrealistic: beyond low profit, its generous terms would often require subsidies and may conflict with current payday regulations.
- **exploitative** – mirrors the worst behaviour found on real payday websites. It personalizes offers by ZIP code, hides data‑sharing consent in tiny text, forces arbitration, adds layered fees, encourages automatic rollovers and even threatens credit reporting. These tactics reflect documented dark patterns and business practices.
- **regulated** – follows common consumer‑protection rules such as a 36% APR cap, mandatory disclosures and a 24‑hour cancellation window. A quiz confirms the borrower sees the APR, rollovers are banned and a compliance report is printed. This mode illustrates a practical middle ground where lenders remain profitable while obeying law.

The simulator offers features like an amortization schedule and early‑payoff incentive in ethical mode, and a one‑time 0% extension in regulated mode. Sessions can be exported to JSON for research. Each output line references either philosophical ideals or real policy so users understand why the behaviour occurs.

## Build
Compile with a C++17 compiler. Example:

```bash
g++ -std=c++17 -I src -o lotus src/*.cpp src/strategies/*.cpp
```

## Run
Choose a mode interactively or pass `--mode=` on the command line:

```bash
./lotus --mode=ethical
./lotus --mode=exploitative --loan=300
```

The optional `--loan=` flag pre-fills the desired loan amount so you can skip
interactive entry.

You can also select a state to demonstrate local usury rules. Example:

```bash
./lotus --mode=regulated --state=SD --loan=200
```

Supported states include `SD` (South Dakota, 36% cap with pilot extension), `DE`
(Delaware), `RI` (Rhode Island, permissive cap) and `UT` (Utah, very high cap).

Session logs are written to the working directory when export is enabled.
