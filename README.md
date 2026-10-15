# Wikipedia — Web Technology Project (WTL)

An authentic, responsive Wikipedia replica built with pure HTML5, vanilla JavaScript (ES6+), and Tailwind CSS (CDN).

Designed specifically for **GitHub Pages** (100% static client-side, zero build tools, zero backend required).

## Features

- **Vector 2022 Wikipedia Layout**: Authentic header, search bar, collapsible sidebar, table of contents, article tabs, and infobox.
- **Client-Side Hash Routing**: Navigates between articles seamlessly (`#Web_Technology`, `#HTML`, etc.) without page reloads or 404s on GitHub Pages.
- **Live Search & Autocomplete**: Instant search with keyboard navigation (`/` or `Ctrl+K`, arrows, enter).
- **Wikipedia Link Previews**: Hovering any internal link opens a rich preview card with snippet and thumbnail.
- **Live Editor & Revisions**: Edit sections or entire articles with a toolbar; changes and revision history persist in `localStorage`.
- **Discussion / Talk Page**: Interactive forum for editorial comments and feedback.
- **Theme & Reading Controls**: Switch between Light, Sepia, and Dark modes; adjust font size, serif/sans-serif, and page width.
- **Text-to-Speech (TTS)**: Built-in voice synthesizer reads articles aloud.
- **Print & PDF Styling**: Clean media print stylesheet for paper or PDF export.

## Deployment to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "WTL Web Technology Wikipedia Project"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Branch**, select `main` and root `/`
   - Click **Save**
3. Your website will be live at `https://<your-username>.github.io/<repo-name>/`.
