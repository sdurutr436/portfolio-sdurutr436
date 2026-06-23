// Builds an inline SVG sprite (symbols) from simple-icons for the slugs we use.
// Output -> sprite.html (paste into index.html once). Run: node scripts/gen-icons.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const slugs = ['angular','flask','postgresql','docker','railway','springboot','openjdk',
  'mariadb','vite','html5','sass','javascript','typescript','python','reactivex','mysql',
  'mongodb','nginx','digitalocean','githubactions','pytest','vitest','ruff','trivy',
  'swagger','jsonwebtokens','deezer','eleventy','astro'];
const syms = slugs.map(s => {
  const svg = readFileSync(`node_modules/simple-icons/icons/${s}.svg`, 'utf8');
  const d = svg.match(/ d="([^"]+)"/)[1];
  return `<symbol id="si-${s}" viewBox="0 0 24 24"><path d="${d}"/></symbol>`;
}).join('\n');
writeFileSync('scripts/sprite.html',
  `<svg class="u-visually-hidden" aria-hidden="true" focusable="false">\n${syms}\n</svg>\n`);
console.log(`sprite.html written with ${slugs.length} symbols`);
