// narrator/ghost.js

import { UI } from '../ui.js';

class Ghost {
    constructor() {
        this.lastPromptTime = null;
    }

    observe(event, data, session) {
        switch(event) {
            case 'prompt_shown':
                this.lastPromptTime = Date.now();
                break;
            case 'prompt_answered':
                if (this.lastPromptTime) {
                    const timeToAnswer = (Date.now() - this.lastPromptTime) / 1000;
                    if (timeToAnswer < 2) {
                        this.narrate(`You answered in ${timeToAnswer.toFixed(1)} seconds. The system thanks you for your compliance.`);
                    }
                }
                break;
            case 'consent_given_exploit':
                this.narrate("You clicked 'Agree'. The disclosure was 289 words. You did not read it. You were optimized.");
                break;
            case 'dark_pattern_encountered':
                if (data && data.pattern === 'RolloverAccepted_AutoRenew' && session) {
                    this.narrate(`You have now paid $${session.totalFeesPaid.toFixed(2)} in fees on a loan of $${session.amount.toFixed(2)}. You still owe the full principal.`);
                }
                if (data && data.pattern.startsWith('NSFAttempt') && session) {
                    this.narrate(`Another fee, another failure. The system is designed to charge you for not having money. The debt deepens.`);
                }
                if (data && data.pattern === 'TribalCharterLoophole') {
                    this.narrate("A legal fiction. The lender rents a tribe's sovereignty to ignore state laws. A loophole you fall through.");
                }
                break;
            case 'simulation_end':
                if (session && session.aprCalculated > 200) {
                    this.narrate(`The final APR was ${session.aprCalculated.toFixed(0)}%. A number so high, it becomes abstract. But the cost is real.`);
                }
                break;
        }
    }

    narrate(text) {
        UI.show(`\n\n    --- 👻 GHOST ---`);
        UI.show(`    > "${text}"`);
        UI.show(`    ----------------\n`);
    }
}

export { Ghost };
