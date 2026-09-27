# MACRO

STAR NOVA’s macroeconomics revision site. The violet theme follows the sidebar, typography, course cards and footer used by ECOGROWTH and GAMETHEORY.

Static HTML, CSS and JavaScript; no build step. Serve the repository with `python3 -m http.server` or publish its root through GitHub Pages.

## Adding course material

The site opens directly on Problem Set 1. Exercise 1 follows the supplied AR(1) statement and correction, with one collapsed solution and a reading-progress bar. Add material only from supplied course documents and link the real chapter in the sidebar and chapter list.

- Reuse `assets/styles.css` and `assets/app.js` on each chapter page.
- Mark actual course sections with `data-chapter-section` and an ID. The header's `#chapter-progress` becomes a keyboard-accessible segmented navigation bar automatically.
- Use `.concept-card`, `.section-header`, `.math-display`, `.key-note`, `.var-grid`, `.demo-step` and `.exo-card` for the established revision layout.
- Collapsible derivations use a `.toggle-btn` with `data-disclosure`, `aria-controls`, `aria-expanded="false"`, a `[data-toggle-action]` span containing `Show`, and a corresponding `.collapsible` container with `hidden`.
- Add `data-math` to the body of pages containing formulas. This loads the same MathJax version and notation as ECOGROWTH; the overview does not load it unnecessarily.
- Keep STAR NOVA's original avatar and footer. Preserve course notation and scope.
