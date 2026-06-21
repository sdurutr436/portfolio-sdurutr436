// Self-check: every data-i18n* key used in index.html must have an EN string.
// Guards the "no untranslated text" acceptance criterion. Run: node scripts/check-i18n.mjs
import { readFileSync } from 'node:fs';
import assert from 'node:assert';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const js = readFileSync(new URL('../js/main.js', import.meta.url), 'utf8');

const htmlKeys = [...html.matchAll(/data-i18n(?:-placeholder|-aria-label)?="([^"]+)"/g)].map(m => m[1]);

const enBlock = js.slice(js.indexOf('var EN = {'), js.indexOf('};', js.indexOf('var EN = {')));
const enKeys = new Set([...enBlock.matchAll(/(\w+):/g)].map(m => m[1]));

const missing = [...new Set(htmlKeys)].filter(k => !enKeys.has(k));
assert.strictEqual(missing.length, 0, `Missing EN translations for: ${missing.join(', ')}`);

console.log(`OK — ${new Set(htmlKeys).size} i18n keys, all translated.`);
