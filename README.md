# Iris: UX Showcase

A showcase and directory of the UX team's POCs, Figma files and prototypes. It's plain HTML, CSS and JavaScript with **no npm and no build step**, hosted on GitHub Pages.

**Live site:** https://keerthithejaswi.github.io/Iris/

## Adding your work

1. Click **+ Submit work** on the site, or open [a new submission issue](https://github.com/Keerthithejaswi/Iris/issues/new?template=submit-project.yml).
2. Fill in the form. You can drag a screenshot into the **Cover image** field.
3. Submit. A GitHub Action adds your entry to `data/projects.json` and redeploys the site within a minute or two.

To update an entry later, **edit the issue**. The site updates automatically.
To remove an entry, **remove the `submission` label** from its issue.

> Submissions from repo collaborators go live straight away. Anyone else's submission waits until a maintainer adds the `approved` label.
> Add teammates under **Settings → Collaborators** so their submissions skip the review step.

## How it works

```
index.html               page shell
assets/style.css         styles (light and dark)
assets/app.js            loads data, search, filters, detail view
data/projects.json       the directory data (one object per project)
.github/ISSUE_TEMPLATE/  the "Submit work" form
.github/scripts/         parses issue form into projects.json
.github/workflows/       add-project.yml (issue → data) and pages.yml (deploy)
```

### Project fields

| field | notes |
|---|---|
| `id` | unique; used for deep links (`/#id`) |
| `title`, `description`, `designer`, `team` | text |
| `type` | `prototype`, `poc`, `figma`, `case-study`, `other` |
| `status` | `Exploring`, `In progress`, `In review`, `Shipped`, `Archived` |
| `figma`, `prototype`, `repo`, `thumbnail`, `issue` | http(s) URLs or `""` |
| `tags` | array of strings |
| `createdAt` | ISO date |

To edit or remove an entry by hand, change `data/projects.json` on GitHub (✏️ Edit) and commit. The site redeploys on every push to `main`.

## Running locally (no npm needed)

`fetch()` doesn't work from `file://`, so serve the folder with any static server, for example:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

You can also use the VS Code **Live Server** extension.

## Setup (one-time, already done)

- **Settings → Pages → Source:** GitHub Actions
- Labels `submission` and `approved` exist
