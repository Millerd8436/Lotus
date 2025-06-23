# Lotus CLI Simulator

This project demonstrates how payday lending can vary depending on ethics and regulation. Three selectable modes show distinct philosophies:

- **ethical** – represents an ideal lender guided by bioethical principles of **autonomy**, **beneficence**, **non‑maleficence** and **justice**.  It opens with a brief primer on these Belmont Report values and asks a *meta‑consent* question to ensure the borrower feels no pressure.  Fees are itemised in a cost–benefit ledger (e.g. part of the interest goes to an education fund) and a short debrief cites Kant, Mill and Rawls.  This mode intentionally borders on utopian: to offer such low rates and generous rights a lender would need subsidies or a non‑profit mission, and it may even clash with real payday‑loan statutes.
- **exploitative** – mirrors documented practices from payday sites and FTC cases.  The CLI fakes ZIP‑based personalisation, buries data‑sharing in tiny text and requires agreeing to arbitration.  A scarcity countdown pressures quick acceptance and a rollover prompt defaults to recurring extensions, reflecting how real lenders trap borrowers in debt.  Extra "tips" and fees are layered on, while the program threatens credit‑bureau reports if payments fail.  All these tricks reduce the *consent score* recorded in the session log.
- **regulated** – demonstrates consumer‑protection laws in action.  Interest is capped according to state (e.g. 36% in SD and DE).  The borrower must read a plain‑language Truth‑in‑Lending box and correctly answer an APR quiz before continuing.  A one‑time 0% extension and 24‑hour cancellation right model reforms such as Delaware's rescission rule and South Dakota's pilot program.  Rollovers are banned and a compliance report shows which safeguards were applied.  This mode strikes a compromise: lenders can still profit but are restrained from the most harmful practices.

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
