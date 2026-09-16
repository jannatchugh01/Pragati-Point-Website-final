# Pragati Point Coaching Classes Website

A responsive static website for Pragati Point Coaching Classes.

## Files

```text
Pragati-Point/
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── logo.jpeg
    ├── fee-reference.jpeg
    └── gallery/
```

## Run locally

No framework or build tool is required.

### Option 1
Open `index.html` directly in a browser.

### Option 2 — recommended
Use VS Code + the Live Server extension.

1. Open this folder in VS Code.
2. Right-click `index.html`.
3. Choose **Open with Live Server**.

## Important editable information

Open `script.js` and edit:

```js
const CONFIG = {
  email: "tanejajyoti884@gmail.com",
  phone: "",
  mapsUrl: "https://maps.app.goo.gl/QxMoi981RV9bBLxZA?g_st=aw"
};
```

Add the real phone/WhatsApp number when available.

## Changing the logo

Replace:

```text
images/logo.jpeg
```

with the new logo, or change the image path in `index.html`.

## Adding gallery photos

Put photos inside:

```text
images/gallery/
```

Then replace the placeholder gallery blocks in `index.html` with `<img>` elements.

## Changing fees

The current fee table is in `index.html` inside the section:

```html
<section class="section fees-section" id="fees">
```

## Changing courses

The course cards are in `index.html` inside:

```html
<section class="section courses-section" id="courses">
```

## Changing colors

The main colors are at the top of `style.css` inside `:root`.

The most important variables are:

```css
--navy
--navy-2
--gold
--gold-bright
--cream
--ink
--muted
```

## Contact form

The form currently prepares a `mailto:` email to:

`tanejajyoti884@gmail.com`

For a form that submits directly to a server without opening the visitor's email app, connect the form to a service such as Formspree, Web3Forms, EmailJS, or your own backend later.

## Deploying

This is a static HTML/CSS/JS site, so it can be hosted on:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Any normal web server

## Notes

The gallery and testimonials intentionally use placeholders because no real classroom photos or genuine testimonials were supplied. Replace them with real information before publishing.
