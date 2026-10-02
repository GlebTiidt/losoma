# Losoma

Static HTML/CSS/JS website for LOSOMA Gebäudeservice in Berlin.

## Production

- URL: `https://losoma.de`
- Hosting: Hostinger
- Web root: `domains/losoma.de/public_html`
- Contact API: `api/contact.php`

## Commands

```bash
npm install
npm run dev
npm run build
npm run audit:classes:strict
npm run audit:seo
```

`npm run dev` serves the source pages at `http://localhost:8765/` without caching.
The footer lives in `components/footer.html`; the local server and production build
insert it into every page's `<!-- LOSOMA_FOOTER -->` marker. Edit the template once,
then rebuild for production.

`dist/` is generated output. Edit source files, rebuild, then follow the release gate in
`CHECKLIST.md`. Never commit secrets or place them in the public web root.
