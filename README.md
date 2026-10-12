# Pocket Quest — Tiny Outdoor Challenges

**One small quest. A bigger world.**

Pocket Quest is a lightweight web application for small outdoor challenges that encourage movement, observation, creativity, and a break from screens. It is designed for everyday outdoor spaces and works as a static site without an account, backend, or external services.

## Features

- 28 short quests across Observation, Nature, Movement, and Creativity
- Filters for Easy, Medium, and Adventurous difficulty
- Repeat-aware, deterministic quest selection that avoids recent quests when possible
- Optional 2-, 5-, and 10-minute timers with start, pause, and reset controls
- A completion flow and current-page-session completion summary
- Pocket Mode messaging that encourages putting the device away and focusing on the activity
- Responsive, semantic interface with visible labels, keyboard focus styles, live status announcements, and reduced-motion support
- Static GitHub Pages deployment with no runtime dependencies

## Technology

- HTML and CSS
- Vanilla JavaScript using ES modules
- Node.js built-in test runner
- GitHub Actions for GitHub Pages deployment

## Local setup and run

Requirements: Python 3 to serve the site locally, and Node.js with npm to run the checks. The project has no runtime dependencies to install.

From the project root, start a local static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Testing

Run the automated tests and JavaScript syntax checks:

```bash
npm test
npm run check
```

## File structure

```text
pocket-quest/
├── .github/
│   └── workflows/
│       └── deploy-pages.yml
├── docs/
│   └── COPILOT-LOG.md
├── src/
│   ├── app.js
│   └── quests.js
├── tests/
│   └── quests.test.js
├── index.html
├── styles.css
├── package.json
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

## GitHub Pages deployment

This repository includes a [GitHub Pages deployment workflow](.github/workflows/deploy-pages.yml). It runs on pushes to `main` and can also be started manually from the repository's Actions tab. The workflow runs the tests and syntax checks before deploying the static site.

To enable deployment:

1. Push the project to a GitHub repository.
2. In repository Settings, open Pages and set the build and deployment source to **GitHub Actions**.
3. Push to `main`, or run the deployment workflow manually from the Actions tab.

GitHub Pages and the completed Actions run show the published site URL; no deployment URL is listed here because one has not been verified for this repository.

## Accessibility, privacy, and safety

- The interface uses semantic HTML and visible labels, provides keyboard focus styles, announces status updates with live regions, and respects the `prefers-reduced-motion` setting.
- The app does not use a backend or account system and does not request location, camera, notification, or analytics access.
- Choose only activities and locations that are safe and permitted for you. Skip or adapt any quest that does not suit your surroundings, abilities, or conditions; do not disturb wildlife or enter restricted areas.

## Known limitations

- The app is frontend-only. Completion tracking lasts only for the current page session and resets when the page is reloaded; there is no persistent storage.
- The project does not include automated browser or visual regression tests, and has not been formally audited for WCAG or other regulatory compliance.
- There is no project screenshot included.
- The app is a small educational project, not a medical, navigation, or safety-monitoring system, and has not been benchmarked for production-scale traffic.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
