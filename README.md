# Ember & Sage — Restaurant Website

A cinematic, editorial-style restaurant website for **Ember & Sage** (Lakeside, Pokhara, Nepal), built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step.

---

## 1. Project structure

```
ember-sage/
├── index.html          Homepage — hero, 3D carousel, dish cards, scroll story
├── about.html           Our Story — history, timeline, chef profile
├── menu.html             Full interactive menu (filter, search, modal)
├── experience.html    The Ember Experience — 4 experience pillars
├── gallery.html          Irregular photo grid + fullscreen lightbox
├── reservation.html   Reservation form (frontend-only, backend-ready)
├── contact.html          Address, hours, map placeholder
│
├── css/
│   ├── style.css           Design tokens, layout, components (load first)
│   ├── responsive.css   Breakpoints (320 → 1920px+)
│   └── animations.css  Keyframes & transition-only rules
│
├── js/
│   ├── main.js             Loader, nav, custom cursor, scroll reveal, ember particles
│   ├── slider.js            Hero parallax, 3D dish carousel, drag strip, scroll story
│   ├── menu.js              Menu data, filtering, search, detail modal
│   ├── gallery.js           Lightbox (keyboard, swipe, 3D hover)
│   └── reservation.js    Form validation + demo submission flow
│
├── assets/
│   ├── images/    Drop real photography here (see naming convention below)
│   ├── icons/
│   └── logo/
│
└── README.md
```

## 2. Running it locally

No build tools, no npm install. Any static file server works:

```bash
cd ember-sage
python3 -m http.server 8080
# then open http://localhost:8080
```

Or in VS Code: install the **Live Server** extension, right-click `index.html` → "Open with Live Server."

Opening the HTML files directly via `file://` mostly works too, but a local server is recommended (some browsers restrict `fetch`/relative-asset behavior over `file://`).

## 3. The image system — adding real photography

No stock photography is bundled. Instead, every photo slot is a **named placeholder** with an art-directed gradient background (the "Ember" palette) and a graceful fallback — nothing ever breaks if an image is missing.

To add real photos, just save files into `assets/images/` using these exact names (referenced throughout the HTML):

```
hero-01.jpg … hero-03.jpg      Hero slider backgrounds (optional — hero uses CSS art direction by default)
dish-01.jpg … dish-20.jpg       Menu item photography (see js/menu.js for the id → filename map)
chef.jpg                                  Chef Aarav Sharma portrait
interior-01.jpg, interior-02.jpg  Dining room / terrace
ingredient-01.jpg                 Ingredients / produce
gallery-01.jpg … gallery-03.jpg    Gallery-specific shots
```

Recommended: 2000px on the long edge, JPEG quality ~80, roughly the aspect ratio implied by each `.img-frame` (most are 4:5 or 1:1). No markup changes are required — just drop in files with matching names.

## 4. Editing restaurant information

- **Contact details, hours, address:** appear in the footer of every page and on `contact.html`. Update both `<dl class="contact-list">` (contact.html) and each `.footer-col` block.
- **JSON-LD structured data:** at the bottom of `<head>` in `index.html` — keep this in sync with the visible contact info for SEO.

## 5. Editing the menu

All menu data lives in **one place**: the `MENU` array near the top of `js/menu.js`. Each item:

```js
{ id:1, name:"...", cat:"starters", price:"NPR 780", desc:"...",
  ingredients:"...", tags:["Vegetarian"], rec:false, img:"dish-05.jpg" }
```

- `cat` must match one of: `starters`, `soups`, `mains`, `vegetarian`, `seafood`, `desserts`, `beverages`.
- `tags` can include `Vegetarian`, `Vegan`, `Gluten-Free`, `Chef's Special`, `Spicy`.
- `rec: true` adds a "Chef's recommendation" note inside the detail modal.

The homepage's "From Our Kitchen" cards and "The Taste of Ember" carousel are static HTML in `index.html` (by design, so the homepage highlights a curated subset) — update those `<article>` blocks directly if the featured dishes change.

## 6. Connecting a real backend later

The site is **frontend-only today** — the reservation form and newsletter signup do not send data anywhere, and say so honestly in the UI. The code is structured so a backend can be added without touching the UI:

**Reservation form** (`js/reservation.js`): the `payload` object built inside the `submit` handler is exactly what you'd `POST` to a reservations endpoint. Replace the `setTimeout(...)` block with a real request, e.g.:

```js
fetch("/api/reservations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
})
  .then(r => r.json())
  .then(() => showSuccess(payload))
  .catch(() => { /* show an error state */ });
```

**Suggested tables** for a Supabase/Postgres backend:

| Table                     | Purpose                                  |
|---------------------------|-------------------------------------------|
| `menu_items`               | Source of truth for `js/menu.js`'s data |
| `reservations`             | Submitted table requests                |
| `contact_messages`         | If a contact form is added               |
| `newsletter_subscribers`   | Footer signup                            |
| `restaurant_settings`      | Hours, address, phone — editable copy   |

No API keys or credentials are present anywhere in this codebase.

## 7. Deploying to GitHub Pages

```bash
git init
git add .
git commit -m "Ember & Sage — initial site"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: `main` branch, `/ (root)`**. The site will publish at `https://<you>.github.io/<repo>/`. Since all links are relative (`index.html`, `css/style.css`, etc.), no path changes are required for a project-page deployment.

## 8. Testing checklist

**Functionality**
- [ ] Desktop + mobile navigation, incl. keyboard (Tab/Enter/Esc) on the mobile menu
- [ ] Hero parallax + auto-rotating captions (desktop); disabled/reduced on touch & reduced-motion
- [ ] "The Taste of Ember" 3D carousel: arrows, drag, swipe, keyboard arrows, autoplay pause on interact
- [ ] Draggable photography strip
- [ ] Menu category filters + live search + empty state
- [ ] Menu item modal: opens, ESC closes, outside-click closes, focus returns on close
- [ ] Gallery lightbox: prev/next, ESC, swipe, keyboard, counter
- [ ] Reservation form: validation states, date minimum, success panel, honest "no backend" note
- [ ] Footer newsletter inline success state

**Responsive** — 320 / 375 / 425 / 768 / 1024 / 1440 / 1920px, incl. no horizontal scroll anywhere.

**Accessibility** — visible focus rings, semantic headings, alt text present on every `<img>`, form labels, `prefers-reduced-motion` disables parallax/autoplay/particles, custom cursor auto-disables on touch and reduced motion.

**Performance** — images `loading="lazy"`, animations use `transform`/`opacity` only, scroll listeners are passive, IntersectionObserver drives reveal animations instead of scroll polling where possible.

---

© 2026 Ember & Sage. All rights reserved.
