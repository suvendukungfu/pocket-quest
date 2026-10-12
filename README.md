# Pocket Quest — Tiny Outdoor Challenges

**One small quest. A bigger world.**

Pocket Quest is a lightweight web application that helps people step away from their screens and complete small, safe outdoor activities.

## Why Pocket Quest?

Technology should help people act in the world, not only spend more time looking at a screen. Pocket Quest offers a simple physical activity and then gets out of the way.

## Features

- Random outdoor quests
- Category and difficulty filters
- Optional 2-, 5- and 10-minute timers
- Pocket Mode
- Current-session completion summary
- Responsive and accessible interface

## Technology

HTML, CSS, vanilla JavaScript, ES modules and Node.js's built-in test runner.

GitHub Copilot was used as a coding assistant during development. Its changes were reviewed and tested by the developer. The actual tasks and prompts are documented in `docs/COPILOT-LOG.md`.

## Run locally

Requirements: a recent version of Python 3 and Node.js.

Start the static server:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in your browser.

Run the tests:

```bash
npm test
npm run check
```

## Project structure

- `index.html`: page structure
- `styles.css`: presentation and responsive layout
- `src/quests.js`: quest data and selection logic
- `src/app.js`: user interaction and session state
- `tests/quests.test.js`: automated tests

## Privacy and safety

The application is designed without a backend, account system, location access or camera access. Quest completions are held in the current page session and reset when the page is reloaded.

Quest instructions should be followed only when the surroundings are safe and the activity is appropriate.

## Limitations

This is a small educational project, not a medical, safety-monitoring, or navigation system. Automated tests do not replace manual browser and accessibility checks.

## License

Released under the MIT License. See `LICENSE`.

