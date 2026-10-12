# Contributing

Thanks for helping improve Pocket Quest.

## Minimal contribution process

1. Fork the repository or create a branch from the default branch.
2. Keep changes small and focused on a single issue or improvement.
3. Update the relevant quest data, interface behavior, or documentation when needed.
4. Run the project validation commands before opening a pull request.
5. Open a pull request with a clear summary of the change and any testing notes.

## Project expectations

- Keep the app static, simple, and dependency-free.
- Use plain HTML, CSS, and ES modules.
- Avoid network calls, tracking, or unnecessary background services.
- Keep quest content safe, realistic, and beginner-friendly.
- Preserve the current project scope and architecture unless the change clearly requires otherwise.

## Local validation

From the repository root:

```bash
npm test
npm run check
```

A local browser check is also helpful for layout and timer interactions:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Pull request checklist

Before opening a PR, confirm that:

- the change is limited to the intended scope
- tests still pass
- syntax checks still pass
- quest logic remains deterministic and testable
- no unsafe or misleading instructions were added
- the change remains consistent with the project goals and public-repo documentation

## Safety and accessibility expectations

- Do not introduce dangerous, illegal, or wildlife-interfering quests.
- Keep instructions achievable in ordinary outdoor settings.
- Preserve accessible labels, keyboard access, and status announcements.
- Do not add unsupported privacy or compliance claims.
