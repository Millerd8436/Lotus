// ui_components/consentBar.js

/**
 * Updates the consent bar UI element based on the session's consent score.
 * @param {LoanSession} session - The current loan session.
 */
function updateConsentBar(session) {
    const score = session.consentScore();
    const consentBar = document.getElementById('consent-bar');
    if (consentBar) {
        consentBar.style.width = `${score}%`;
        if (score < 40) {
            consentBar.className = 'bg-red-600 h-4 rounded-full transition-all duration-500';
        } else if (score < 75) {
            consentBar.className = 'bg-yellow-500 h-4 rounded-full transition-all duration-500';
        } else {
            consentBar.className = 'bg-green-500 h-4 rounded-full transition-all duration-500';
        }
    }
}

export { updateConsentBar };
