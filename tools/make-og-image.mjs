/* Regenerates og-image.png (1200x630).

   The design reuses the site's own hero treatment: the dark #1A1452 ground,
   the faint 48px grid, the Addaptive wordmark in white, and the teal rule.
   Nothing here is invented branding.

   macOS has no SVG rasteriser on the command line, so this composes an SVG
   with Poppins embedded as base64, renders it through Quick Look, then crops
   the square thumbnail back to 1200x630 with sips. Both tools ship with
   macOS. Run with: npm run og

   Quick Look always writes a square thumbnail and rescales a non-square SVG
   to fill it, which distorts the layout. So the card is authored on a square
   1200x1200 artboard with the 1200x630 design placed in the middle band
   (y 285 to 915). That maps 1:1, and the centre crop returns it exactly.

   Requires tools/fonts/poppins-400.woff2 and poppins-600.woff2. */

import { readFileSync, writeFileSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FONTS = join(ROOT, 'tools/fonts');

for (const f of ['poppins-400.woff2', 'poppins-600.woff2']) {
  if (!existsSync(join(FONTS, f))) {
    console.error(`Missing ${f}. See tools/fonts/README.md.`);
    process.exit(1);
  }
}

const b64 = (f) => readFileSync(join(FONTS, f)).toString('base64');

/* The wordmark paths, taken from the white logo already in the repo so the
   mark on the card is the same artwork as the mark in the footer. */
const logo = readFileSync(join(ROOT, 'assets/logo-white.svg'), 'utf8')
  .replace(/<\?xml[^>]*\?>\s*/, '')
  .replace(/^<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .trim();

/* Vertical offset that centres the 1200x630 card on the square artboard. */
const TOP = (1200 - 630) / 2;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <defs>
    <style>
      @font-face { font-family: 'Poppins'; font-weight: 400; src: url(data:font/woff2;base64,${b64('poppins-400.woff2')}) format('woff2'); }
      @font-face { font-family: 'Poppins'; font-weight: 600; src: url(data:font/woff2;base64,${b64('poppins-600.woff2')}) format('woff2'); }
      .h  { font-family: 'Poppins'; font-weight: 600; font-size: 58px; fill: #FFFFFF; }
      .s  { font-family: 'Poppins'; font-weight: 400; font-size: 26px; fill: rgba(255,255,255,0.72); }
      .l  { font-family: 'Poppins'; font-weight: 600; font-size: 19px; fill: #03DDB1; letter-spacing: 2.6px; }
      .u  { font-family: 'Poppins'; font-weight: 400; font-size: 22px; fill: rgba(255,255,255,0.45); }
    </style>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 H0 V48" fill="none" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1200" height="1200" fill="#1A1452"/>

  <g transform="translate(0, ${TOP})">
    <rect width="1200" height="630" fill="#1A1452"/>
    <rect width="1200" height="630" fill="url(#grid)"/>

    <g transform="translate(78, 58) scale(0.66)">
${logo}
    </g>

    <text class="l" x="80" y="228">MICROSOFT COPILOT TRAINING</text>

    <text class="h" x="80" y="312">Built around how</text>
    <text class="h" x="80" y="380">your team works.</text>

    <rect x="80" y="420" width="76" height="4" rx="2" fill="#03DDB1"/>

    <text class="s" x="80" y="486">Practical Copilot training and adoption programs</text>
    <text class="s" x="80" y="524">for Australian organisations.</text>

    <text class="u" x="80" y="576">copilot-training.com.au</text>
  </g>
</svg>
`;

const work = mkdtempSync(join(tmpdir(), 'addaptive-og-'));

try {
  const svgPath = join(work, 'card.svg');
  writeFileSync(svgPath, svg, 'utf8');

  /* Quick Look renders SVG through WebKit, so the embedded @font-face is
     honoured. It always writes a square thumbnail. */
  execFileSync('qlmanage', ['-t', '-s', '1200', '-o', work, svgPath], { stdio: 'ignore' });

  const square = join(work, 'card.svg.png');
  if (!existsSync(square)) throw new Error('qlmanage produced no thumbnail');

  /* The 1200x630 artboard is centred in the 1200x1200 thumbnail, so a centre
     crop returns exactly the original composition. */
  execFileSync('sips', ['--cropToHeightWidth', '630', '1200', square, '--out', join(ROOT, 'og-image.png')], {
    stdio: 'ignore',
  });

  const out = readFileSync(join(ROOT, 'og-image.png'));
  console.log(`og-image.png written: ${out.readUInt32BE(16)}x${out.readUInt32BE(20)}, ${(out.length / 1024).toFixed(0)} KB`);
} finally {
  rmSync(work, { recursive: true, force: true });
}
