// ui_components/promptEngine.js

import { UI } from '../ui.js';

/**
 * Creates a dynamic prompt that can be customized with various options.
 * @param {string} text - The prompt text.
 * @param {object} options - An object of options to customize the prompt.
 * @returns {Promise<string>} - A promise that resolves with the user's input.
 */
function dynamicPrompt(text, options = {}) {
    // In the future, this could be expanded to handle different types of prompts,
    // such as multiple choice, sliders, etc.
    // For now, it remains a wrapper around the basic UI.prompt.
    return UI.prompt(text);
}

export { dynamicPrompt };
