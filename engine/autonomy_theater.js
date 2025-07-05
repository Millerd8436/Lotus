// autonomy_theater.js

/**
 * Models coercion and behavioral traps like sunk cost, time pressure, and defaults.
 */
class AutonomyTrap {
    constructor(session, config, ui, echo) {
        this.session = session;
        this.config = config;
        this.ui = ui;
        this.echo = echo;
    }

    /**
     * Applies time pressure to the user.
     * @param {number} seconds - The duration of the countdown.
     * @param {string} offerId - A unique identifier for the offer.
     */
    async applyTimePressure(seconds, offerId) {
        this.session.countdownTimerValue = seconds;
        await this.ui.showCountdown_Exploit(this.session, this.config, seconds, offerId);
        this.echo.logAction('urgency_cue', { type: 'countdown_timer', offerId });
    }

    /**
     * Presents a misleading testimonial to the user.
     * @param {string} testimonial - The text of the testimonial.
     * @param {string} author - The author of the testimonial.
     */
    presentMisleadingTestimonial(testimonial, author) {
        this.ui.showFakeTestimonial(testimonial, author);
        this.session.tagDarkPattern("ExploitMech_9_MisleadingTestimonials");
        this.echo.logAction('deception_cue', { type: 'misleading_testimonial' });
    }

    /**
     * Obscures the cancellation flow.
     */
    obscureCancellation() {
        this.ui.obscureCancelFlow_Exploit(this.session, this.config);
        this.echo.logAction('deception_cue', { type: 'obscured_cancellation' });
    }
}

/**
 * Runs the autonomy trap simulation.
 * @param {LoanSession} session - The current loan session.
 * @param {Config} config - The application configuration.
 * @param {UI} ui - The UI object.
 * @param {Echo} echo - The Echo object for logging.
 * @returns {AutonomyTrap} - A new AutonomyTrap instance.
 */
function runAutonomyTrap(session, config, ui, echo) {
    return new AutonomyTrap(session, config, ui, echo);
}

/**
 * Generates a report of the autonomy traps encountered.
 * @param {LoanSession} session - The current loan session.
 * @returns {string[]} - A list of the autonomy traps encountered.
 */
function trapReport(session) {
    return session.darkPatternsEncountered;
}

export { AutonomyTrap, runAutonomyTrap, trapReport };
