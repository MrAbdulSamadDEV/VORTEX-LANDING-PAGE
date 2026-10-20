# VORTEX — Cinematic Landing Page

A cinematic, responsive landing page built around six looping background videos. The design uses a minimal black-and-white interface, immersive visuals, smooth scroll reveals, and a compact navigation system.

## Features

- **Six video scenes** with separate backgrounds.
- **Scroll-triggered reveals** for text, headings, buttons, and cards; the background footage itself is not scroll-animated.
- **Responsive navigation** with Home, Story, Worlds, and Let's Begin links, plus a mobile menu.
- **Clean footer** with section links, a back-to-top link, and six direct social/portfolio links (GitHub, portfolio, LinkedIn, YouTube, X, and Instagram).
- **Video playback optimization**: background videos play when near the viewport and pause when offscreen.
- **Hero sound toggle** (the hero video starts muted by default, in line with common browser autoplay rules).
- **Scene preview cards**, active-section navigation state, scroll progress, and back-to-top control.
- **Accessibility considerations**, including keyboard focus and reduced-motion preferences.
- **Custom favicon** using `assets/logo.png`.
- No build step or framework required — plain HTML, CSS, and JavaScript.

## Creator links

The footer includes these external links, each opening in a new tab:

- GitHub: <https://github.com/MrAbdulSamadDEV>
- Portfolio: <https://samad.vexr.dev>
- LinkedIn: <https://www.linkedin.com/in/MRABDULSAMADDEV>
- YouTube: <https://www.youtube.com/@epicflixplus>
- X: <https://x.com/ABDULSAMAD8492>
- Instagram: <https://www.instagram.com/samad_boy.dev>

To edit them, find the `footer-socials` navigation in `index.html`.

## Project structure

```text
vortex-cinematic-landing/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── 1.mp4
    ├── 2.mp4
    ├── 3.mp4
    ├── 4.mp4
    ├── 5.mp4
    ├── 6.mp4
    └── logo.png
```

## Video-to-section mapping

| Section | Video | Visual treatment |
| --- | --- | --- |
| Home / Hero | `assets/1.mp4` | Original color |
| Story / Manifesto | `assets/2.mp4` | Black and white |
| Vision | `assets/3.mp4` | Original color |
| Craft | `assets/4.mp4` | Original color |
| Worlds / Sequence | `assets/5.mp4` | Black and white |
| Finale | `assets/6.mp4` | Original color |

The visual treatment is controlled by CSS. If you replace a video, keep the same filename or update its path in `index.html` and `script.js`.

## Run locally

### Option 1: VS Code Live Server

1. Extract the ZIP archive.
2. Open the `vortex-cinematic-landing` folder in Visual Studio Code.
3. Install the **Live Server** extension if needed.
4. Right-click `index.html` and choose **Open with Live Server**.

### Option 2: Python local server

Open a terminal inside the project folder and run:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Customize

- **Page content and sections:** `index.html`
- **Colors, layout, responsive styles, and scroll-reveal states:** `style.css`
- **Navigation, video playback, sound toggle, scroll reveals, and interactions:** `script.js`
- **Video backgrounds and favicon:** `assets/`

Keep the video names `1.mp4` through `6.mp4` and `logo.png` unchanged unless you also update the matching references in the code.

## Deployment

This is a static website and can be hosted on GitHub Pages, Netlify, or Vercel without a backend or build step. Upload the project files while preserving the folder structure. Because the videos are large, check the host's file-size, bandwidth, and storage limits before deploying. For faster loading on slower connections, consider compressing the MP4 files while retaining acceptable visual quality.

## Browser notes

- Browsers may block autoplay with sound, so background videos are muted by default.
- Video playback and loading behavior can vary by device, browser, and connection speed.
- The project files and JavaScript syntax can be checked locally, but the final appearance should be verified in your target browsers and screen sizes.

---

Made for a clean, immersive VORTEX experience.
