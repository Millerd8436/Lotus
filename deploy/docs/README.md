# Lotus + Autonomy Theater Capstone Final Strategy (Two-Mode Version)

This project is a deployable GitHub Pages website that combines ethical and exploitative payday loan simulator modes with Echo scoring, Kantian autonomy tracking, and Autonomy Theater's philosophical scaffolding. The entire project forms a live, interactive portfolio in interface ethics and applied simulation.

## How to Run

1.  **Open `index.html`:** Simply open the `index.html` file in any modern web browser (like Chrome, Firefox, Edge, or Safari).
2.  **Use the Simulator:** Interact with the application directly on the page.

## How to Deploy to GitHub Pages

1.  **Commit the Files:** Ensure all files are committed to your Git repository.
2.  **Enable GitHub Pages:**
    *   In your GitHub repository settings, go to the "Pages" section.
    *   Under "Build and deployment" -> "Source," select "Deploy from a branch".
    *   Under "Branch", select your `main` branch and the `/ (root)` folder.
    *   Click "Save". Your simulator will be live at `https://<your-username>.github.io/<your-repo-name>/` in a few minutes.

## Project Structure

-   `index.html`: The main UI container for the simulator.
-   `style.css`: The stylesheet for the simulator.
-   `app.js`: The main application logic that orchestrates the simulation.
-   `core/loan_core.js`: Contains the core loan calculation logic, and the `Config` and `LoanSession` classes.
-   `modes/exploitative.js`: The exploitative simulation mode.
-   `modes/ethical.js`: The ethical simulation mode.
-   `engine/echo.js`: The Echo engine for tracking user interactions and calculating an autonomy score.
-   `engine/kant.js`: The Kantian judge for flagging ethical violations.
-   `components/reflection.js`: The reflection component for displaying the end-of-session analysis.
-   `narrator/ghost.js`: The optional Ghost narrator for providing judgmental commentary.
-   `docs/`: Contains the project documentation.
    -   `README.md`: This file.
    -   `philosophy.md`: The philosophical underpinnings of the project.
    -   `design_notes.md`: The design notes and justifications for the UI/UX decisions.
