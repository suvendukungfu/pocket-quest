# Pocket Quest

Tiny Outdoor Challenges for everyday moments outside.

## Problem statement

Many people spend a large share of the day looking at screens, even when a simple outdoor break could help reset attention, reduce sedentary time, and encourage curiosity. Pocket Quest is designed as a lightweight, beginner-friendly experience that suggests safe, achievable challenges that can be done in ordinary outdoor spaces without requiring accounts, apps, or external services.

## Features

- 26 small, safe outdoor quests across four categories: Observation, Nature, Movement, and Creativity
- Filters for Easy, Medium, and Adventurous difficulty
- Deterministic quest selection that avoids immediate repeats when possible
- 2-, 5-, and 10-minute timer presets
- Start, pause, reset, and completion flows
- Pocket Mode messaging that encourages attention away from the device
- Current-session completion tracking
- Responsive, semantic interface with visible labels, keyboard access, and reduced-motion handling
- Static deployment for GitHub Pages without a backend or runtime dependencies

## Screenshot

Placeholder screenshot: this section will be updated once a real project screenshot is added.

![Pocket Quest screenshot placeholder](https://placehold.co/1200x700/244d3a/f2efe7?text=Pocket+Quest+Screenshot+Placeholder)

## Technology stack

- HTML for structure
- CSS for layout and styling
- Vanilla JavaScript using ES modules
- Node.js built-in test runner for automated checks
- GitHub Actions for static site deployment

## Local setup and run

From the project root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

If you prefer to work from the browser without a local server, the app also loads as a static file in a browser, but a local server is the safer default for project usage.

## Testing

Run the project checks:

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
├── .gitignore
└── .github/
```

## GitHub Pages deployment

This repository includes a GitHub Pages deployment workflow in [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml).

To publish the site:

1. Push the project to a GitHub repository.
2. In GitHub, open the repository settings.
3. Navigate to Pages.
4. Set the source to GitHub Actions.
5. Push to the default branch to trigger the workflow.

Once the workflow has completed, the project site will be available at a URL in the format:

```text
https://<username>.github.io/<repository-name>/
```

This project is designed as a static site and does not need a backend.

## Accessibility and safety considerations

- The app uses semantic HTML and visible labels for controls.
- Focus styles are present for keyboard use.
- Status changes are announced through an aria-live region.
- The project includes reduced-motion support through the prefers-reduced-motion media query.
- Quest instructions are intentionally safe, achievable, and do not require risky behavior, trespassing, wildlife interaction, or sensitive personal data.
- The app does not request camera, GPS, biometric, account, notification, or analytics permissions.

This project has not been formally audited to full WCAG or regulatory standards, and that should be treated as a limitation rather than a compliance claim.

## Known limitations

- This is a static, frontend-only app with no backend or persistent storage.
- Quest completion is tracked only for the current browser page session.
- The project does not include browser automation or formal visual regression testing.
- The screenshot placeholder is intentionally temporary until a real screenshot is added.
- The app has not been benchmarked against production traffic or large-scale usage scenarios.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
