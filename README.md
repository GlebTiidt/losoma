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
npm run build
npm run audit:classes:strict
npm run audit:seo
```

`dist/` is generated output. Edit source files, rebuild, then deploy the contents of `dist/` by
following `HOSTINGER_LAUNCH_CHECKLIST.md`. Never commit secrets or place them in the public web root.
