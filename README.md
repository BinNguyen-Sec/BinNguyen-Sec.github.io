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

The portfolio provides one downloadable resume:

- English: `/resume/Nguyen-Ngoc-Khai-Resume-English.pdf`

## Competition certificate images

The Achievements section has two image slots. Upload the certificate images to these exact paths to make them appear on the live portfolio:

- Google SecOps Chronicle CTF — Cymbal Investigation: `public/certificates/google-secops-cymbal.png`
- Pointer Overflow CTF 2026: `public/certificates/pointer-overflow-ctf.png`

Use PNG files with the exact filenames above. The placeholders remain visible until the images are present.

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
