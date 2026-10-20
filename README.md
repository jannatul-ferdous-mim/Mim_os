# MimOS

The "operating system" that runs on the monitor in Jannatul Ferdous Mim's 3D portfolio. It is a normal React site: the 3D scene (`../portfolio-website`) loads it in an `<iframe>`, and it also works on its own.

Built from scratch with Vite, React, TypeScript and Framer Motion.

## Editing content

**All text lives in [`src/content/cv.ts`](src/content/cv.ts)**: CV data at the top, window titles, buttons and form labels in the `site` block at the bottom. Components contain no copy. Empty strings (`''`) hide the matching link, button or line.

Search the project for `TODO(mim)` to find values that still need real information.

The CV download is `public/Jannatul_Ferdous_Mim_CV.pdf`. Replace that file to update it. A photo goes in `public/` (e.g. `public/me.jpg`), with `profile.photo` set to `'/me.jpg'`.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

Port 3000 is fixed (`vite.config.ts`) because the 3D scene loads `http://localhost:3000/` when opened with `?dev`.

```bash
npm run build      # type-check + production build into dist/
npm run preview    # serve dist/ on port 3000
```

## Routes

| Route | What it shows |
|---|---|
| `/` | The MimOS desktop: boot animation, icons, windows, taskbar |
| `/simple` | Everything on one scrolling page, for recruiters |

Screens narrower than 768px always get the simple page.

## How it talks to the 3D scene

Mouse and keyboard events inside an iframe don't reach the parent page. [`src/lib/bridge.ts`](src/lib/bridge.ts) forwards `mousemove`, `mousedown`, `mouseup`, `keydown` and `keyup` to the parent with `postMessage`, which keeps the camera on the monitor and plays the keyboard sounds.

## Deploying (Vercel)

Import the repo in Vercel; the Vite preset is detected (build `npm run build`, output `dist`). `vercel.json` rewrites unknown paths to `index.html` so `/simple` works on reload. Put the resulting URL into `OS_URL` in `portfolio-website/src/Application/World/MonitorScreen.ts`.

## Credits

The 3D scene this runs inside is based on Henry Heffernan's [portfolio-website](https://github.com/henryjeff/portfolio-website) (MIT License). MimOS itself contains no code or assets from his inner-site project.
