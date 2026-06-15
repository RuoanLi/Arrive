# Arrive — Relocation & Travel Planner

> Know exactly what to do, from the moment you land.

**Arrive** turns a few details about a trip — destination, length of stay, nationality, age, and purpose — into a prioritized, day-by-day action plan. Instead of a generic checklist, it ranks tasks by **urgency and importance** (Eisenhower Matrix) and maps each one onto a concrete timeline relative to your arrival and departure.

Built as a single-page app with **vanilla JavaScript, HTML, and CSS** — no frameworks, no build step, no dependencies.

---

## 🌐 Live Demo

> Add your link here after enabling GitHub Pages (Settings → Pages → deploy from `main`):
>
> **https://<your-username>.github.io/<repo-name>/**

## 📸 Screenshot

> Replace with a real screenshot once deployed:
>
> `![Arrive screenshot](docs/screenshot.png)`

---

## ✨ Features

- **Personalized task generation** — tasks are filtered by trip purpose (tourism, work, study, permanent move) and by optional "bundles" the user selects (pets, medication, driving, banking, housing, family/dependents, high-value belongings, freelance).
- **Eisenhower Matrix view** — every task is placed into one of four quadrants based on its urgency and importance: *Do first*, *Schedule*, *Delegate / automate*, and *Limit / optional*.
- **Priority scoring** — tasks are ranked with a weighted score (`importance × 2 + urgency + time bonus`) so the most consequential, time-sensitive items rise to the top.
- **Dynamic timeline** — symbolic timings (e.g. "14 days before departure", "day 1", "week 2") are converted into real day numbers, scaled to the trip length and purpose, then grouped into a chronological checklist.
- **Context-aware rules** — minors automatically get guardian-consent paperwork added at top priority, and the entered nationality generates a tailored passport/entry-rules task.
- **Responsive design** — fluid typography with `clamp()`, CSS Grid layouts, and a mobile breakpoint.

---

## ⚙️ How It Works

The core logic lives in `app.js` and runs entirely in the browser when the form is submitted.

1. **Filter** — `buildPlan()` selects relevant tasks from a template library by matching the chosen purpose and any selected bundles.
2. **Map timing** — `mapDay()` translates each task's symbolic timing into a numeric day, scaling lead time and milestones to the actual trip length.
3. **Classify** — `pickQuadrant()` assigns each task to an Eisenhower quadrant from its `urgency` and `importance` values.
4. **Score & sort** — each task gets a priority score (earlier deadlines receive a bonus via `urgencyBonus()`), and the list is sorted highest-first.
5. **Render** — results are drawn into the matrix and a day-grouped timeline using DOM APIs and an HTML `<template>`.

The task library is fully data-driven: adding a new task is just a matter of appending one object to the `taskTemplates` array — no UI changes required.

---

## 🛠️ Tech Stack

| Layer        | Details                                                                 |
|--------------|-------------------------------------------------------------------------|
| Markup       | Semantic HTML5, `<template>` element, accessible form fields            |
| Styling      | Modern CSS — custom properties, CSS Grid, `clamp()`, `backdrop-filter`  |
| Logic        | Vanilla JavaScript (ES6+): no framework, no bundler, no dependencies    |
| Fonts        | Google Fonts (Baloo 2, Inter)                                           |

---

## 🚀 Getting Started

No build tools required — it's static files.

### Option 1: Open directly

Download or clone the repo and open `index.html` in any modern browser.

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
open index.html      # macOS
# or just double-click index.html
```

### Option 2: Run a local server (recommended)

A local server avoids any browser quirks and matches the deployed environment.

```bash
# Python 3
python -m http.server 8000

# or Node
npx serve
```

Then visit `http://localhost:8000`.

---

## 📁 Project Structure

```
.
├── index.html    # App shell, form, and result containers
├── styles.css    # Theme, layout, and responsive rules
└── app.js        # Task library + planning logic + rendering
```

---

## 🧭 Possible Improvements

A few directions this could grow, useful as talking points or next steps:

- Persist generated plans with `localStorage` and allow checking tasks off.
- Add real entry-requirement data via a country/visa API instead of generic rules.
- Export the plan to PDF or calendar (`.ics`) files.
- Add automated tests for the scoring and day-mapping logic.
- Internationalization (i18n) for multi-language support.

---

## 📄 License

Released under the [MIT License](LICENSE). Feel free to use, modify, and share.
