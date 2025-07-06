# Design Notes for the Lotus Simulator

This document outlines the design decisions and justifications for the UI/UX of the Lotus Simulator.

## Two-Mode Design

The simulator is designed with two distinct modes to provide a clear contrast between ethical and exploitative design practices.

-   **Exploitative Mode:** This mode is designed to be as realistic as possible, mimicking the dark patterns used by real-world payday lenders. This includes:
    -   **Urgency:** The use of countdown timers and urgent language to pressure the user into making a quick decision.
    -   **Framing:** The use of positive language to frame the loan as a "great deal" or an "exclusive offer."
    -   **Vague Fee Structures:** The use of vague language to describe the fees and costs of the loan.
    -   **Hidden APR:** The APR is hidden or downplayed, with the focus instead on the "low" flat fee.
    -   **Skipped/Hidden Consent:** The user is asked to consent to the loan without being given the opportunity to read the full terms and conditions.

-   **Ethical Mode:** This mode is designed to be as transparent and user-friendly as possible. This includes:
    -   **Transparent Fee Breakdown:** The fees and costs of the loan are clearly broken down and explained.
    -   **Slowed Decision Flow:** The user is given time to read and understand the terms of the loan before being asked to consent.
    -   **Full Disclosure:** The full terms and conditions of the loan are displayed by default.
    -   **Mandatory Confirmation:** The user is required to confirm that they have read and understood the terms of the loan before they can proceed.

## Alpine.js

Alpine.js was chosen for its simplicity and ease of use. It allows for the creation of a reactive, single-page application without the need for a complex build process or a large framework like React or Vue.

## Tailwind CSS

Tailwind CSS was chosen for its utility-first approach, which allows for rapid prototyping and development. It also allows for the creation of a consistent and modern UI with minimal effort.
