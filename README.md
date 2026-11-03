# BINNGUYEN-SEC Portfolio

Cybersecurity portfolio focused on Network Security, SOC Operations, Threat Hunting and Detection Engineering.

## Stack

- React
- TypeScript
- Vite
- Framer Motion
- React Router
- GitHub Pages
- GitHub Actions

## Resume

The portfolio provides one downloadable English resume:

- English: `/resume/Nguyen_Ngoc_Khai_Cybersecurity_Resume_2026_Balanced.pdf`

## Competition certificates

The Achievements section embeds both completion certificates as PDFs:

- Google SecOps Chronicle CTF — Cymbal Investigation: `public/certificates/Certificate-Khysdns.pdf`
- Pointer Overflow CTF 2026: `public/certificates/POCTF-2026-01702.pdf`

The PDF files are served from the `/certificates/` path and displayed in embedded document frames on the portfolio.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Deployment

Pushes to `main` trigger the GitHub Pages workflow in `.github/workflows/deploy-pages.yml`.
