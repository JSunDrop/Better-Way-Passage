
# Better Way Passage — Static Site (Prototype)

This is a lightweight, **static** prototype that matches your new IA/design so you can open it directly in **VS Code** (use the Live Server extension for best results). It’s organized to migrate easily to WordPress later.

## What's inside

- 6 pages: `index.html`, `initiatives.html`, `resources.html`, `about.html`, `donate.html`, `contact.html`
- Responsive CSS in `css/style.css` (neutral + peach palette, cursive accent)
- Small JS in `js/main.js` for nav, counters, forms, donate handler
- Resource data in `js/resources.js` with filters and a premium lock
- Logos placed in `/img` (copied from the files you shared)

## Quick start

1. Unzip and open the folder in VS Code.
2. Right‑click `index.html` → **Open with Live Server** (or just open in your browser).
3. Edit text/images directly in the HTML. Styles in `css/style.css`.

## Plug in your tools

- **Survey**: set your Typeform/Qualtrics link in `js/main.js`:

  ```js
  window.SURVEY_URL = "https://example.typeform.com/to/your-id";
  ```

- **Donations**: drop your Stripe Checkout, PayPal, or GiveWP donate link in `js/main.js`:

  ```js
  window.DONATION_LINK = "https://donate.stripe.com/your_link_here";
  ```

  The amount chips will append `?prefilled_amount=XX` automatically.

- **Resources**: edit/expand items in `js/resources.js`. Use `access: "Premium"` to show the lock until paywall is connected.

## Notes

- This is a static prototype (no backend). For a production site, you’ll likely move to **WordPress** + GiveWP + MemberPress/Restrict Content Pro + Gravity Forms as discussed. The structure and copy here map directly to those templates.
- Accessibility: includes skip link, focusable controls, and AA‑friendly color contrast.
- SEO: base meta tags and social cards set; update `og:image` to your preferred logo.
- Performance: single CSS file and tiny JS (no frameworks).

## License

You’re free to use and modify this for Better Way Passage.
