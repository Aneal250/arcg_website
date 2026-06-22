# ARCG Website

A static website for the **Assembly of Redeemed Church of God (ARCG)** — built to celebrate the church’s **50th anniversary** and share service times, community values, and ways to connect.

Designed by **Engr. Nnaemeka** (member, planning committee).

## Features

- **Home** — Hero section, values grid, and worship schedule
- **Events**, **Gallery**, **About**, and **Contact** — Multi-page layout with shared navigation
- **Responsive navigation** — Mobile menu with accessible toggle controls
- **Shared footer** — Loaded from `partials/footer.html` via JavaScript (service times, contact info, social links)
- **Google Fonts** — Rubik, Nunito, and Lato

## Tech stack

- HTML5.
- CSS3 (modular stylesheets in `style/`)
- Vanilla JavaScript (`script.js`)

No build step or package manager is required.

## Project structure

```
arcg/
├── index.html          # Home page
├── about.html
├── contact.html
├── event.html
├── gallery.html
├── script.js           # Footer loader, mobile nav
├── partials/
│   └── footer.html     # Shared footer partial
├── style/
│   ├── global.css
│   ├── nav.css
│   ├── home.css
│   └── footer.css
└── assests/
    └── imgs/           # Images and logo
```

## Getting started

Because the footer is loaded with `fetch()`, open the site through a **local web server** (not `file://` directly), or the footer may not appear.

**Option 1 — VS Code Live Server**

Open the project folder and use the Live Server extension; start from `index.html`.

**Option 2 — Python**

```bash
cd arcg
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

**Option 3 — Node.js**

```bash
npx serve .
```

## Pages

| Page    | File           | Status                         |
| ------- | -------------- | ------------------------------ |
| Home    | `index.html`   | Hero, values grid, worship CTA |
| Events  | `event.html`   | Placeholder                    |
| Gallery | `gallery.html` | Placeholder                    |
| About   | `about.html`   | Placeholder                    |
| Contact | `contact.html` | Placeholder                    |

## Development log

| Date       | Work                               |
| ---------- | ---------------------------------- |
| 17/05/2026 | Hero section                       |
| 21/05/2026 | Grid layout (values cards)         |
| 24/05/2026 | Schedule content (worship section) |

## Contact (church)

- **Address:** 170b Douglas road, Owerri, Nigeria 1254
- **Phone:** +234 806 893 6274
- **Email:** Assemblyredeem@gmail.com

## License

All rights reserved — Assembly of Redeemed Church of God.
