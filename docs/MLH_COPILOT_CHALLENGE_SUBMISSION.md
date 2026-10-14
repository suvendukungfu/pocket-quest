# MLH Hacktoberfest Challenge Submission — Pocket Quest

**Challenge:** Use GitHub Copilot to complete any of this week's challenges  
**Event:** Major League Hacking (MLH) Global Hack Week: Hacktoberfest 2026  
**Challenge URL:** [https://www.mlh.com/events/global-hack-week-open-source-90/challenges/01a11b48-8554-f273-f6e4-2ace7ad19a36](https://www.mlh.com/events/global-hack-week-open-source-90/challenges/01a11b48-8554-f273-f6e4-2ace7ad19a36)  
**Submission Form URL:** [https://www.mlh.com/challenges/01a11b48-8554-f273-f6e4-2ace7ad19a36/submissions/new](https://www.mlh.com/challenges/01a11b48-8554-f273-f6e4-2ace7ad19a36/submissions/new)  

---

## Part 1: Official MLH Submission Form Fields

### 1. Project URL (GitHub Repository) *(Required)*
```text
https://github.com/suvendukungfu/pocket-quest
```

### 2. Live Demo URL *(Additional Link)*
```text
https://suvendukungfu.github.io/pocket-quest/
```

### 3. Built With (Technologies Used)
```text
HTML5, CSS3, JavaScript (ES Modules), Node.js Test Runner, GitHub Actions, GitHub Pages, GitHub Copilot
```

### 4. Project Description & Story *(Copy & Paste into the MLH Submission Form)*

```markdown
### Project Overview: What is Pocket Quest?

Pocket Quest is a lightweight, mobile-responsive web application designed to encourage mindfulness, observation, and healthy breaks from screens through tiny outdoor challenges. Whether walking around the block, taking a lunch break in a courtyard, or sitting in a neighborhood park, Pocket Quest gives users a micro-quest they can complete in 2 to 10 minutes.

### The Problem & Purpose

Modern developers and students spend 8 to 14 hours a day glued to screens, leading to mental fatigue, creative blocks, and digital burnout. While many wellness apps require heavy downloads, user accounts, GPS permissions, and constant screen interaction, Pocket Quest takes the opposite philosophy: **"One small quest. A bigger world."** 

Our core innovation is **Pocket Mode**—once a user starts their quest timer, the interface urges them to put the device into their pocket, step away from digital notifications, and focus on their physical surroundings until the timer completes.

---

### Key Features

1. **28 Curated Outdoor Quests:** Spanning four rich categories:
   - **Observation:** Cloud shapes, sound maps, sun path checks, and color hunts.
   - **Nature:** Leaf texture comparison, birdsong counting, and seed searches.
   - **Movement:** Stride loops, curb balance walks, and mindful stair climbing.
   - **Creativity:** Nature haikus, trail sketching, and found pattern identification.
2. **Deterministic Repeat-Aware Selection:** An algorithm that avoids recently viewed challenges while cycling predictably across categories without relying on unpredictable random functions.
3. **Flexible Timer & Pocket Mode:** 2-, 5-, and 10-minute timer presets with timestamp-delta drift prevention, start/pause/reset controls, and active pocket mode status.
4. **Current Session Tracking:** Live counter celebrating completed challenges during the current session without tracking personal data or requiring accounts.
5. **Zero-Dependency Architecture:** Pure semantic HTML5, modern CSS3 custom properties, and vanilla JavaScript ES modules. Loads instantly on any mobile or desktop browser.
6. **Accessibility-First:** Visible labels, keyboard focus styling, ARIA live region announcements, and reduced-motion media query support.

---

### How I Used GitHub Copilot

I used GitHub Copilot as an active pair programmer and technical reviewer throughout the entire project lifecycle:

1. **Architectural Scaffolding:** I used Copilot to plan the directory structure and establish a zero-dependency separation of concerns—keeping data modeling and algorithms in pure ES modules (`src/quests.js`), DOM event management in `src/app.js`, and styling in `styles.css`.
2. **Data Catalog Generation:** Copilot helped brainstorm and systematically construct the 28 unique quest objects, ensuring consistent schema attributes (`id`, `title`, `category`, `difficulty`, `duration`, `instructions`).
3. **Algorithm Design:** When implementing `chooseQuest()`, Copilot suggested using modular arithmetic over the recent quest history array (`recentIds.length % unseen.length`), creating a reproducible, repeat-avoiding selection engine that is easy to unit test.
4. **Code Review & Edge-Case Fortification:** I prompted Copilot to act as an independent reviewer to find bugs and edge cases. Copilot identified case-sensitivity issues in filter parsing and recommended normalizing category inputs with `.toLowerCase()`. Copilot also helped extract `formatDuration(seconds)` as an exported pure helper with boundary protection.
5. **Automated Unit Testing:** Copilot generated comprehensive test suites utilizing the native Node.js test runner (`node --test`), expanding our test coverage to 11 tests verifying metadata integrity, case-insensitivity, category balance, and formatting edge cases.
6. **CI/CD Deployment:** Copilot assisted in writing `.github/workflows/deploy-pages.yml` to automatically run tests and syntax checks on every pull request and push to `main` before deploying to GitHub Pages.

Every suggestion provided by Copilot was reviewed, verified with automated tests, and tested in real browser viewports.

---

### Testing & Verification

- **Automated Tests:** `npm test` runs 11 unit tests via Node.js native test runner (100% pass rate in ~140ms).
- **Syntax Validation:** `npm run check` verifies clean syntax for all ES module scripts (`node --check`).
- **Browser Automation:** Playwright automation verified core workflows across desktop (1200x900) and mobile (390x844) viewports.
- **Production CI/CD:** Verified live deployment on GitHub Pages returning HTTP/2 200 OK at `https://suvendukungfu.github.io/pocket-quest/`.

---

### What I Learned

Pair programming with GitHub Copilot showed me that AI coding assistants are most effective when given clear architectural constraints ("no external libraries, vanilla ES modules, high accessibility"). Rather than simply generating code, Copilot acted as an invaluable sounding board for edge cases, test generation, and review.

---

### Future Enhancements

- Optional `localStorage` persistence toggle for multi-day streak tracking.
- Audio bell notifications (Web Audio API) when the timer reaches zero.
- PWA manifest and service worker for complete offline caching in remote parks.
```

---

## Part 2: Screenshot Evidence Checklist

The following verified screenshots are located in `docs/screenshots/` and embedded in the project README:

- [x] **Desktop Main View (`01_main_desktop.png`):** Default landing screen displaying typography, category/difficulty filters, quest card, timer, and Pocket Mode card.
- [x] **Quest Discovery & Filtering (`02_filtered_discovery.png`):** Filter dropdown applied to "Nature", immediately updating to a Nature quest card with duration badge.
- [x] **Active Timer & Pocket Mode (`03_timer_pocket_mode.png`):** Timer running with active countdown, Pocket Mode banner highlighted, start button disabled, pause button active.
- [x] **Quest Completed Flow (`04_quest_completed.png`):** Session completion counter incremented to `Completed this session: 1`, timer reset, and new quest loaded.
- [x] **Mobile Viewport (`05_mobile_viewport.png`):** iPhone 14 responsive layout (390x844) demonstrating single-column fluid stacking and touch targets.

---

## Part 3: GitHub Discussion / Showcase Post Draft

*Use this Markdown draft to share your build in the MLH GitHub Discussion community:*

```markdown
### 🧭 Pocket Quest — Tiny Outdoor Challenges (Built with GitHub Copilot)

Hey everyone! 👋

For this week's **"Use GitHub Copilot to complete any of this week's challenges"** track in MLH Global Hack Week: Hacktoberfest, I built **Pocket Quest**—a lightweight web application designed to encourage movement, observation, and breaks from screens through micro-challenges in everyday outdoor spaces.

- 🔗 **GitHub Repository:** [https://github.com/suvendukungfu/pocket-quest](https://github.com/suvendukungfu/pocket-quest)
- 🚀 **Live Demo:** [https://suvendukungfu.github.io/pocket-quest/](https://suvendukungfu.github.io/pocket-quest/)

---

#### 🌟 How It Works

1. **Pick a Quest:** Choose from 28 outdoor challenges across Observation, Nature, Movement, and Creativity (e.g. *Tree Count*, *Sound Map*, *Leaf Texture Walk*, *Shadow Step Loop*).
2. **Filter by Difficulty:** Filter between Easy, Medium, and Adventurous.
3. **Turn on Pocket Mode:** Pick a 2, 5, or 10-minute timer and hit Start. The app encourages you to put your phone in your pocket and pay attention to your physical environment until the timer ends.
4. **Track Your Session:** Mark quests complete and track how many micro-challenges you conquered today!

---

#### 🤖 How GitHub Copilot Helped Build It

I used **GitHub Copilot** as my pair programmer throughout the build:
- **Zero-Dependency Architecture:** Scaffolded pure HTML5, CSS3, and vanilla ES modules without heavy frameworks or bundles.
- **Repeat-Avoiding Algorithm:** Copilot helped design a deterministic rotation algorithm (`recentIds.length % unseen.length`) so you don't get the same quest twice in a row.
- **Code Review & Bug Fixes:** Copilot audited the code and caught case-sensitivity issues in dropdown values, and helped modularize `formatDuration()`.
- **Automated Tests:** Copilot generated 11 unit tests using Node.js's built-in test runner (`node --test`), executing in under 150ms!
- **CI/CD:** Copilot helped configure the GitHub Actions workflow to run tests and deploy directly to GitHub Pages.

Check out our full prompt log in [`docs/COPILOT-LOG.md`](https://github.com/suvendukungfu/pocket-quest/blob/main/docs/COPILOT-LOG.md)!

---

#### 🛠️ Tech Stack
- HTML5, CSS3 (Custom properties, reduced motion, fluid typography)
- Vanilla JavaScript (ES Modules, zero dependencies)
- Node.js Built-in Test Runner (`node --test`)
- GitHub Actions & GitHub Pages
- GitHub Copilot

Would love any feedback or ideas for new outdoor challenges to add to the quest catalog! Happy Hacktoberfest! 🍂🍁
```
