// Builds the two gallery manifests at every Vercel deploy (see vercel.json "buildCommand"). Zero dependencies.
//
// work/social/manifest.json, from work/social/<category>/[<brand>/]*:
//   work/social/healthcare/eid-campaign.jpg          -> category "Healthcare"
//   work/social/ecommerce/lubdok/flash-sale.webp     -> category "Ecommerce", brand "Lubdok"
//   work/social/motion/reel-01.mp4 (+ reel-01.jpg)   -> video, the .jpg is used as its poster
//   Names starting with "top-" are featured first on the home page.
//
// work/ui/manifest.json, from work/ui/<project>/[desktop|mobile/]*  (see work/ui/README.md):
//   work/ui/01-Pocket-Wallet/01-home.png             -> project "Pocket Wallet", screen "Home"
//   work/ui/02-Velvet-Store/desktop/home.jpg         -> website screen (browser frame)
//   work/ui/02-Velvet-Store/mobile/cart.jpg          -> mobile screen (phone frame)
//   work/ui/02-Velvet-Store/cover.jpg                -> optional card image instead of the auto mockup
//   work/ui/02-Velvet-Store/info.txt                 -> optional type, year, tools, link, color, one-line about

import { readdir, readFile, writeFile, mkdir, open } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'work', 'social');
const OUT = path.join(SRC, 'manifest.json');
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif']);
const VIDEO_EXT = new Set(['.mp4', '.webm', '.mov']);

const toPosix = (p) => p.split(path.sep).join('/');
// Folder names become labels: "real-estate" -> "Real Estate". A name with capitals ("CMH-Hospital") keeps them.
const pretty = (slug) => {
  const s = slug.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  return /[A-Z]/.test(s) ? s : s.replace(/\b\w/g, (c) => c.toUpperCase());
};
const natural = new Intl.Collator('en', { numeric: true, sensitivity: 'base' }).compare;

async function walk(dir, depth = 0) {
  let entries = [];
  try { entries = await readdir(dir, { withFileTypes: true }); } catch { return []; }
  const files = [];
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name.startsWith('_')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory() && depth < 3) files.push(...await walk(full, depth + 1));
    else if (e.isFile()) files.push(full);
  }
  return files;
}

async function head(file, bytes) {
  const fh = await open(file, 'r');
  try {
    const buf = Buffer.alloc(bytes);
    const { bytesRead } = await fh.read(buf, 0, bytes, 0);
    return buf.subarray(0, bytesRead);
  } finally { await fh.close(); }
}

// Reads width/height straight from the file header: PNG, GIF, WebP, JPEG, AVIF.
async function imageSize(file) {
  const b = await head(file, 256 * 1024);
  if (b.length < 32) return null;
  if (b.readUInt32BE(0) === 0x89504e47) return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
  if (b.toString('ascii', 0, 3) === 'GIF') return { w: b.readUInt16LE(6), h: b.readUInt16LE(8) };
  if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = b.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const b0 = b[21], b1 = b[22], b2 = b[23], b3 = b[24];
      return { w: 1 + (((b1 & 0x3f) << 8) | b0), h: 1 + (((b3 & 0xf) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)) };
    }
    if (chunk === 'VP8X') return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let off = 2, orientation = 1;
    while (off + 9 < b.length) {
      if (b[off] !== 0xff) { off++; continue; }
      const marker = b[off + 1];
      const len = b.readUInt16BE(off + 2);
      if (marker === 0xe1 && b.toString('ascii', off + 4, off + 8) === 'Exif') orientation = exifOrientation(b, off + 10) || 1;
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        const h = b.readUInt16BE(off + 5), w = b.readUInt16BE(off + 7);
        return orientation >= 5 ? { w: h, h: w } : { w, h };
      }
      off += 2 + len;
    }
  }
  const ispe = b.indexOf('ispe');
  if (ispe > 0 && b.toString('ascii', 4, 8) === 'ftyp') return { w: b.readUInt32BE(ispe + 8), h: b.readUInt32BE(ispe + 12) };
  return null;
}

function exifOrientation(b, tiff) {
  try {
    const le = b.toString('ascii', tiff, tiff + 2) === 'II';
    const u16 = (o) => (le ? b.readUInt16LE(o) : b.readUInt16BE(o));
    const u32 = (o) => (le ? b.readUInt32LE(o) : b.readUInt32BE(o));
    const ifd = tiff + u32(tiff + 4);
    const n = u16(ifd);
    for (let i = 0; i < n; i++) {
      const e = ifd + 2 + i * 12;
      if (u16(e) === 0x0112) return u16(e + 8);
    }
  } catch { /* malformed EXIF */ }
  return 0;
}

// Video size from the first video track header (tkhd) of an MP4/MOV.
async function videoSize(file) {
  const b = await readFile(file);
  let from = 0;
  while (true) {
    const i = b.indexOf('tkhd', from);
    if (i < 0) return null;
    const v = b[i + 4];
    const at = i + 4 + (v === 1 ? 88 : 76);
    if (at + 8 <= b.length) {
      const w = Math.round(b.readUInt32BE(at) / 65536), h = Math.round(b.readUInt32BE(at + 4) / 65536);
      if (w > 0 && h > 0) return { w, h };
    }
    from = i + 4;
  }
}

const squash = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '');

// "eid-mubarak-campaign.jpg" -> "Eid mubarak campaign". Camera names, counters, "SMD" and a
// name that only repeats the category ("Ecommerce-SMD-4.jpg" in ecommerce/) give "".
function titleFrom(name, cat = '') {
  let t = name.replace(/\.[^.]+$/, '').replace(/^top[-_ ]+|^featured[-_ ]+/i, '');
  t = t.replace(/^\d{4}[-_.]?\d{2}[-_.]?\d{2}[-_ ]*/, '').replace(/^\d+[-_ ]+/, '');
  t = t.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  for (let prev = ''; prev !== t;) { prev = t; t = t.replace(/\s+(\(\d+\)|copy|final|v\d+|\d+)$/i, '').trim(); }
  t = t.replace(/\b(smd|social media (design|post)s?)\b/gi, ' ').replace(/\s+/g, ' ').trim();
  if (cat && squash(t) === squash(cat)) return '';
  if (!/[a-z].*[a-z].*[a-z]/i.test(t) || /^(img|dsc|pxl|untitled|artboard|copy|final|post|design|screenshot)\b/i.test(t) || /^[a-f0-9 ]{12,}$/i.test(t)) return '';
  return t.charAt(0).toUpperCase() + t.slice(1);
}

const files = (await walk(SRC)).sort((a, b) => natural(a, b));
const byPath = new Map(files.map((f) => [f.toLowerCase(), f]));
const catNames = new Map();
const posterOf = new Set();
const items = [];
let skipped = 0;

// Pass 1: find which images are posters for a same-named video.
for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!VIDEO_EXT.has(ext)) continue;
  const base = file.replace(/\.[^.]+$/, '').toLowerCase();
  const poster = ['.jpg', '.jpeg', '.png', '.webp'].map((e) => byPath.get(base + e)).find(Boolean);
  if (poster) posterOf.add(poster);
}

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!IMAGE_EXT.has(ext) && !VIDEO_EXT.has(ext)) continue;
  const rel = toPosix(path.relative(SRC, file));
  const parts = rel.split('/');
  if (parts.length < 2) { skipped++; continue; }
  const cat = parts[0].toLowerCase();
  if (!catNames.has(cat)) catNames.set(cat, pretty(parts[0]));
  const brand = parts.length > 2 ? pretty(parts[1]) : '';
  const name = parts[parts.length - 1];
  const base = file.replace(/\.[^.]+$/, '').toLowerCase();
  const item = { src: '/' + toPosix(path.relative(ROOT, file)), cat, brand, title: titleFrom(name, parts[0]) };
  if (/^(top|featured)[-_ ]/i.test(name)) item.top = 1;

  if (VIDEO_EXT.has(ext)) {
    const poster = ['.jpg', '.jpeg', '.png', '.webp'].map((e) => byPath.get(base + e)).find(Boolean);
    let size = null;
    if (poster) { size = await imageSize(poster).catch(() => null); item.poster = '/' + toPosix(path.relative(ROOT, poster)); }
    size ||= await videoSize(file).catch(() => null);
    Object.assign(item, size || { w: 1080, h: 1080 }, { video: 1 });
    items.push(item);
  } else if (IMAGE_EXT.has(ext) && !posterOf.has(file)) {
    const size = await imageSize(file).catch(() => null);
    if (!size || !size.w || !size.h) { skipped++; continue; }
    Object.assign(item, size);
    items.push(item);
  }
}

const list = items;

// Categories, biggest first.
const counts = new Map();
list.forEach((it) => counts.set(it.cat, (counts.get(it.cat) || 0) + 1));
const categories = [...counts].sort((a, b) => b[1] - a[1] || natural(a[0], b[0])).map(([slug, count]) => ({ slug, name: catNames.get(slug) || pretty(slug), count }));

// "All" order: featured first, then categories interleaved so the feed stays varied.
const buckets = categories.map((c) => list.filter((it) => it.cat === c.slug && !it.top));
const mixed = list.filter((it) => it.top);
for (let i = 0; buckets.some((bk) => i < bk.length); i++) buckets.forEach((bk) => { if (i < bk.length) mixed.push(bk[i]); });

await mkdir(SRC, { recursive: true });
await writeFile(OUT, JSON.stringify({ generated: new Date().toISOString(), total: mixed.length, categories, items: mixed }));
console.log(`[gallery] ${mixed.length} designs in ${categories.length} categories${skipped ? `, ${skipped} skipped (put files inside a category folder)` : ''} -> ${toPosix(path.relative(ROOT, OUT))}`);

/* ================= UI/UX projects ================= */
const UI_SRC = path.join(ROOT, 'work', 'ui');
const UI_OUT = path.join(UI_SRC, 'manifest.json');
const MOBILE_HINT = /(^|[^a-z])(mobile|ios|android|phone|iphone)([^a-z]|$)/i;
const WEB_HINT = /(^|[^a-z])(desktop|web|website|landing|dashboard|tablet|macbook)([^a-z]|$)/i;
const INFO_KEYS = new Set(['name', 'title', 'type', 'year', 'tools', 'link', 'color', 'device', 'client']);
const slugify = (s) => s.toLowerCase().replace(/^\d+[-_ .]+/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'project';

// info.txt: "key: value" lines (type, year, tools, link, color, device, client, name); any other line is the one-line about.
async function readInfo(dir) {
  for (const n of ['info.txt', 'Info.txt', 'info.md', 'about.txt']) {
    let txt;
    try { txt = await readFile(path.join(dir, n), 'utf8'); } catch { continue; }
    const info = {}, about = [];
    for (const raw of txt.replace(/^﻿/, '').split(/\r?\n/)) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;
      const m = line.match(/^([a-z]+)\s*:\s*(.+)$/i);
      if (m && INFO_KEYS.has(m[1].toLowerCase())) info[m[1].toLowerCase()] = m[2].trim();
      else about.push(line);
    }
    if (about.length) info.about = about.join(' ');
    return info;
  }
  return {};
}

// Screen names from Figma ("Frame 427", "iPhone 14 - 3", "Desktop - 1") say nothing, so they give "".
function screenTitle(file) {
  let t = path.basename(file).replace(/\.[^.]+$/, '').replace(/^\d+[-_ .]+/, '');
  t = t.replace(MOBILE_HINT, ' ').replace(WEB_HINT, ' ').replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  for (let prev = ''; prev !== t;) { prev = t; t = t.replace(/\s+(\(\d+\)|copy|final|v\d+|\d+)$/i, '').trim(); }
  if (!/^[a-z].*[a-z]/i.test(t) || /^(frame|screen|screenshot|artboard|group|untitled|image|img|page|slide|pixel|galaxy|pro|max|plus|mini|large|medium|small)\b/i.test(t)) return '';
  return t.charAt(0).toUpperCase() + t.slice(1);
}

let uiEntries = [];
try { uiEntries = (await readdir(UI_SRC, { withFileTypes: true })).filter((e) => e.isDirectory() && !/^[._]/.test(e.name)); } catch { /* no ui folder yet */ }
uiEntries.sort((a, b) => natural(a.name, b.name));

const projects = [];
const slugs = new Set();
let uiLoose = 0;
for (const entry of uiEntries) {
  const dir = path.join(UI_SRC, entry.name);
  const info = await readInfo(dir);
  const forced = /^m/i.test(info.device || '') ? 'm' : /^(w|d)/i.test(info.device || '') ? 'w' : '';
  const screens = [];
  let cover = null;
  for (const file of (await walk(dir)).sort((a, b) => natural(a, b))) {
    if (!IMAGE_EXT.has(path.extname(file).toLowerCase())) continue;
    const size = await imageSize(file).catch(() => null);
    if (!size || !size.w || !size.h) continue;
    const src = '/' + toPosix(path.relative(ROOT, file));
    const rel = toPosix(path.relative(dir, file));
    if (/^cover([-_ .]|$)/i.test(path.basename(rel))) { cover = { src, ...size }; continue; }
    // Device: info.txt "device:", then a desktop/ or mobile/ folder or file name, then the shape.
    // Phones are narrow and tall at any export scale (375 to 1290 px wide); desktop frames are 1366 px and up.
    const hint = MOBILE_HINT.test(rel) ? 'm' : WEB_HINT.test(rel) ? 'w' : '';
    const d = forced || hint || (size.w <= 1300 && size.h / size.w >= 1.5 ? 'm' : 'w');
    screens.push({ src, ...size, d, title: screenTitle(file) });
  }
  if (!screens.length && !cover) continue;
  const m = screens.filter((s) => s.d === 'm').length, w = screens.length - m;
  const longWeb = screens.some((s) => s.d === 'w' && s.h / s.w > 1.25);
  const type = (info.type || (!w ? 'Mobile app' : longWeb ? 'Website' : 'Web app')).slice(0, 40);
  let slug = slugify(entry.name);
  for (let n = 2; slugs.has(slug); n++) slug = slugify(entry.name) + '-' + n;
  slugs.add(slug);
  const p = { slug, name: info.name || info.title || pretty(entry.name.replace(/^\d+[-_ .]+/, '')), type, tslug: slugify(type), screens };
  if (/^\d{4}$/.test(info.year || '')) p.year = info.year;
  if (info.tools) p.tools = info.tools.split(/\s*[,/|]\s*/).filter(Boolean).slice(0, 6);
  if (/^https?:\/\/\S+$/i.test(info.link || '')) p.link = info.link;
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(info.color || '')) p.color = info.color;
  if (info.client) p.client = info.client.slice(0, 60);
  if (info.about) p.about = info.about.slice(0, 240);
  if (cover) p.cover = cover;
  projects.push(p);
}
try { uiLoose = (await readdir(UI_SRC, { withFileTypes: true })).filter((e) => e.isFile() && IMAGE_EXT.has(path.extname(e.name).toLowerCase())).length; } catch { /* none */ }

const typeCounts = new Map();
projects.forEach((p) => { const t = typeCounts.get(p.tslug) || { slug: p.tslug, name: p.type, count: 0 }; t.count++; typeCounts.set(p.tslug, t); });
const screensTotal = projects.reduce((n, p) => n + p.screens.length, 0);
await mkdir(UI_SRC, { recursive: true });
await writeFile(UI_OUT, JSON.stringify({ generated: new Date().toISOString(), total: projects.length, screens: screensTotal, types: [...typeCounts.values()].sort((a, b) => b.count - a.count), projects }));
console.log(`[ui] ${projects.length} projects, ${screensTotal} screens${uiLoose ? `, ${uiLoose} skipped (put screens inside a project folder)` : ''} -> ${toPosix(path.relative(ROOT, UI_OUT))}`);
