/* Procedurele beelden: gevel, ramen, terras, muur, laminaat. Geen externe foto's nodig. */
const Art = (() => {
  const rng = s => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  function noise(seed) {
    const r = rng(seed), P = new Float32Array(65536);
    for (let i = 0; i < 65536; i++) P[i] = r();
    const g = (x, y) => P[((y & 255) << 8) | (x & 255)], sm = t => t * t * (3 - 2 * t);
    const n = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), u = sm(x - xi), v = sm(y - yi), a = g(xi, yi), b = g(xi + 1, yi), c = g(xi, yi + 1), d = g(xi + 1, yi + 1); return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v; };
    return (x, y, o = 4) => { let t = 0, a = .5, f = 1, m = 0; for (let i = 0; i < o; i++) { t += a * n(x * f, y * f); m += a; a *= .5; f *= 2; } return t / m; };
  }
  const sst = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  function size(cv, ratio, max = 1400) {
    const w = Math.max(200, Math.min(max, Math.round((cv.clientWidth || cv.parentNode.clientWidth || 600) * Math.min(window.devicePixelRatio || 1, 2))));
    cv.width = w; cv.height = Math.round(w * ratio);
    return cv.getContext('2d', { willReadFrequently: true });
  }
  function grain(ctx, w, h, amt, seed) {
    const r = rng(seed), id = ctx.getImageData(0, 0, w, h), d = id.data;
    for (let i = 0; i < d.length; i += 4) { const v = (r() - .5) * amt; d[i] += v; d[i + 1] += v; d[i + 2] += v; }
    ctx.putImageData(id, 0, 0);
  }
  function bricks(ctx, x0, y0, w, h, s, seed) {
    const r = rng(seed);
    ctx.save(); ctx.beginPath(); ctx.rect(x0, y0, w, h); ctx.clip();
    ctx.fillStyle = '#b3ab9d'; ctx.fillRect(x0, y0, w, h);
    const bw = 21 * s, bh = 6.5 * s, m = 1.3 * s; let row = 0;
    for (let y = y0; y < y0 + h; y += bh + m, row++) {
      const off = row % 2 ? (bw + m) / 2 : 0;
      for (let x = x0 - off; x < x0 + w; x += bw + m) {
        const burnt = r() < .1, L = burnt ? 18 + r() * 6 : 26 + r() * 12, H = 6 + r() * 12, S = 30 + r() * 16;
        ctx.fillStyle = `hsl(${H},${S}%,${L}%)`; ctx.fillRect(x, y, bw, bh);
        ctx.fillStyle = `rgba(255,240,230,${r() * .07})`; ctx.fillRect(x, y, bw, bh * .3);
        ctx.fillStyle = `rgba(0,0,0,${.08 + r() * .08})`; ctx.fillRect(x, y + bh * .82, bw, bh * .18);
      }
    }
    ctx.restore();
  }
  function soldier(ctx, x, y, w, s, seed) {
    const r = rng(seed), bw = 6.5 * s, h = 10 * s, m = 1.2 * s;
    ctx.fillStyle = '#bfb5a4'; ctx.fillRect(x, y, w, h);
    for (let px = x; px < x + w - 1; px += bw + m) { ctx.fillStyle = `hsl(${9 + r() * 10},${40 + r() * 15}%,${26 + r() * 10}%)`; ctx.fillRect(px, y, Math.min(bw, x + w - px), h); }
  }
  function glass(ctx, x, y, w, h, seed) {
    const r = rng(seed);
    const g = ctx.createLinearGradient(x, y, x + w * .3, y + h);
    g.addColorStop(0, '#6f9cbf'); g.addColorStop(.55, '#bcd5e6'); g.addColorStop(1, '#e6eff4');
    ctx.fillStyle = g; ctx.fillRect(x, y, w, h);
    ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    for (let i = 0; i < 5; i++) { const cx = x + r() * w, cy = y + r() * h * .5, rr = w * (.18 + r() * .3); const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr); cg.addColorStop(0, 'rgba(255,255,255,.5)'); cg.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = cg; ctx.fillRect(cx - rr, cy - rr, rr * 2, rr * 2); }
    ctx.fillStyle = 'rgba(70,48,40,.32)'; ctx.beginPath(); ctx.moveTo(x, y + h); let px = x; ctx.lineTo(x, y + h * .8);
    while (px < x + w) { const ww = w * (.22 + r() * .3), hh = h * (.6 + r() * .2); ctx.lineTo(px, y + hh); ctx.lineTo(px + ww, y + hh); px += ww; }
    ctx.lineTo(x + w, y + h); ctx.fill();
    const sg = ctx.createLinearGradient(x, y, x + w, y + h); sg.addColorStop(.32, 'rgba(255,255,255,0)'); sg.addColorStop(.42, 'rgba(255,255,255,.38)'); sg.addColorStop(.5, 'rgba(255,255,255,0)'); sg.addColorStop(.58, 'rgba(255,255,255,.18)'); sg.addColorStop(.62, 'rgba(255,255,255,0)');
    ctx.fillStyle = sg; ctx.fillRect(x, y, w, h); ctx.restore();
  }
  function win(ctx, x, y, w, h, s, seed, out, split = true) {
    const f = 3.4 * s;
    ctx.fillStyle = 'rgba(0,0,0,.4)'; ctx.fillRect(x - 2 * s, y - 2 * s, w + 4 * s, h + 3 * s);
    ctx.fillStyle = '#f2f3ef'; ctx.fillRect(x, y, w, h);
    const pw = split ? (w - 3 * f) / 2 : w - 2 * f;
    const panes = split ? [[x + f, y + f, pw, h - 2 * f], [x + 2 * f + pw, y + f, pw, h - 2 * f]] : [[x + f, y + f, pw, h - 2 * f]];
    panes.forEach((p, i) => { glass(ctx, ...p, seed + i * 7); ctx.strokeStyle = 'rgba(0,0,0,.15)'; ctx.lineWidth = Math.max(1, s * .4); ctx.strokeRect(p[0], p[1], p[2], p[3]); out && out.push(p); });
    ctx.fillStyle = '#39434d'; ctx.fillRect(x - 5 * s, y + h, w + 10 * s, 3.6 * s);
    ctx.fillStyle = '#66717b'; ctx.fillRect(x - 5 * s, y + h, w + 10 * s, 1 * s);
    ctx.fillStyle = 'rgba(0,0,0,.25)'; ctx.fillRect(x - 3 * s, y + h + 3.6 * s, w + 6 * s, 2 * s);
  }
  /* Vlaamse rijwoning, 320 x 384 ontwerp-eenheden */
  function facade(cv, seed = 3) {
    const ctx = size(cv, 1.2), W = cv.width, H = cv.height, s = W / 320, out = [];
    const sky = ctx.createLinearGradient(0, 0, 0, 16 * s); sky.addColorStop(0, '#a9c6da'); sky.addColorStop(1, '#d9e6ee');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, 16 * s);
    bricks(ctx, 0, 30 * s, W, 330 * s, s, seed);
    ctx.fillStyle = '#2b3036'; ctx.fillRect(0, 19 * s, W, 12 * s);
    ctx.fillStyle = '#3a4047'; ctx.fillRect(0, 19 * s, W, 3 * s);
    ctx.fillStyle = '#9ea7ad'; ctx.fillRect(0, 13 * s, W, 6 * s);
    ctx.fillStyle = '#c3cacf'; ctx.fillRect(0, 13 * s, W, 1.6 * s);
    ctx.fillStyle = '#868f96'; ctx.fillRect(296 * s, 19 * s, 5 * s, 342 * s);
    ctx.fillStyle = '#a6aeb4'; ctx.fillRect(296 * s, 19 * s, 1.5 * s, 342 * s);
    [[36, 66, 100, 104], [168, 66, 100, 104]].forEach(([x, y, w, h], i) => { soldier(ctx, (x - 4) * s, (y - 12) * s, (w + 8) * s, s, seed + 20 + i); win(ctx, x * s, y * s, w * s, h * s, s, seed + 40 + i * 13, out); });
    soldier(ctx, 128 * s, 212 * s, 148 * s, s, seed + 30);
    win(ctx, 132 * s, 224 * s, 140 * s, 108 * s, s, seed + 70, out, true);
    soldier(ctx, 32 * s, 212 * s, 72 * s, s, seed + 31);
    ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.fillRect(34 * s, 222 * s, 68 * s, 138 * s);
    ctx.fillStyle = '#26323c'; ctx.fillRect(36 * s, 224 * s, 64 * s, 136 * s);
    ctx.fillStyle = '#2f3d49'; for (let i = 0; i < 4; i++) ctx.fillRect(44 * s, (276 + i * 20) * s, 48 * s, 14 * s);
    glass(ctx, 44 * s, 232 * s, 48 * s, 36 * s, seed + 90); out.push([44 * s, 232 * s, 48 * s, 36 * s]);
    ctx.fillStyle = '#c7ccd0'; ctx.fillRect(88 * s, 300 * s, 4 * s, 14 * s);
    ctx.fillStyle = '#f2f3ef'; ctx.font = `600 ${9 * s}px sans-serif`; ctx.fillText('27', 62 * s, 228 * s - 2 * s);
    ctx.fillStyle = '#3c464f'; ctx.fillRect(0, 356 * s, W, 16 * s);
    ctx.fillStyle = '#56616a'; ctx.fillRect(0, 356 * s, W, 2 * s);
    ctx.fillStyle = '#4a545d'; ctx.fillRect(28 * s, 358 * s, 80 * s, 10 * s);
    ctx.fillStyle = '#b5b2aa'; ctx.fillRect(0, 372 * s, W, 12 * s);
    ctx.fillStyle = 'rgba(0,0,0,.12)'; for (let x = 0; x < 320; x += 30) ctx.fillRect(x * s, 372 * s, 1 * s, 12 * s);
    const sh = ctx.createLinearGradient(0, 0, W, 0); sh.addColorStop(0, 'rgba(0,0,0,.18)'); sh.addColorStop(.25, 'rgba(0,0,0,0)'); sh.addColorStop(.8, 'rgba(255,230,200,.05)'); sh.addColorStop(1, 'rgba(0,0,0,.12)');
    ctx.fillStyle = sh; ctx.fillRect(0, 0, W, H);
    grain(ctx, W, H, 14, seed + 99);
    return out;
  }
  /* Vuile film over glasvlakken, op een aparte canvas */
  function grime(cv, rects, seed = 5) {
    const ctx = cv.getContext('2d', { willReadFrequently: true }), n = noise(seed), r = rng(seed), W = cv.width;
    ctx.clearRect(0, 0, cv.width, cv.height);
    const k = 600 / W;
    rects.forEach(([x, y, w, h]) => {
      x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h);
      const id = ctx.createImageData(w, h), d = id.data;
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
        const X = (x + i) * k, Y = (y + j) * k, a = n(X * .035, Y * .035), drip = n(X * .16, Y * .012, 3), o = (j * w + i) * 4;
        const al = .5 + .38 * a + sst(.58, .75, drip) * .3 + (j / h) * .12;
        d[o] = 118 + a * 30; d[o + 1] = 110 + a * 24; d[o + 2] = 88 + a * 14; d[o + 3] = Math.min(235, al * 255);
      }
      ctx.putImageData(id, x, y);
      for (let i = 0; i < w * h / 900; i++) { ctx.fillStyle = `rgba(90,78,60,${.25 + r() * .4})`; ctx.beginPath(); ctx.arc(x + r() * w, y + r() * h, (.5 + r() * 1.6) * W / 600, 0, 7); ctx.fill(); }
    });
  }
  function wiper(cv, rects, onProgress) {
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    let last = null, down = false;
    const pts = []; rects.forEach(([x, y, w, h]) => { for (let j = y + 4; j < y + h; j += 8) for (let i = x + 4; i < x + w; i += 8) pts.push([i | 0, j | 0]); });
    const id0 = ctx.getImageData(0, 0, cv.width, cv.height).data;
    const base = pts.filter(([i, j]) => id0[(j * cv.width + i) * 4 + 3] > 40).length || 1;
    const measure = () => { const d = ctx.getImageData(0, 0, cv.width, cv.height).data; const left = pts.filter(([i, j]) => d[(j * cv.width + i) * 4 + 3] > 40).length; onProgress && onProgress(Math.round(100 * (1 - left / base))); };
    const pos = e => { const b = cv.getBoundingClientRect(); return [(e.clientX - b.left) * cv.width / b.width, (e.clientY - b.top) * cv.height / b.height]; };
    const stroke = (a, b) => { ctx.save(); ctx.globalCompositeOperation = 'destination-out'; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = cv.width * .075; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke(); ctx.restore(); };
    let t = 0;
    cv.addEventListener('pointerdown', e => { down = true; last = pos(e); cv.setPointerCapture(e.pointerId); stroke(last, last); });
    cv.addEventListener('pointermove', e => { if (!down) return; const p = pos(e); stroke(last, p); last = p; if (++t % 6 === 0) measure(); });
    const up = () => { if (down) { down = false; measure(); } };
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    return { stroke, measure };
  }
  function autoWipe(api, rect, cv) {
    const [x, y, w, h] = rect, path = [];
    for (let k = 0; k <= 3; k++) { const yy = y + h * (.15 + k * .22); path.push(k % 2 ? [x + w * .9, yy] : [x + w * .1, yy], k % 2 ? [x + w * .1, yy] : [x + w * .9, yy]); }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { for (let i = 1; i < path.length; i++) api.stroke(path[i - 1], path[i]); api.measure(); return; }
    let i = 0, f = 0, prev = path[0];
    const step = () => { const a = path[i], b = path[i + 1]; if (!b) { api.measure(); return; } f += .06; const p = [a[0] + (b[0] - a[0]) * Math.min(f, 1), a[1] + (b[1] - a[1]) * Math.min(f, 1)]; api.stroke(prev, p); prev = p; if (f >= 1) { f = 0; i++; } requestAnimationFrame(step); };
    setTimeout(() => requestAnimationFrame(step), 500);
  }
  /* Terras in betontegels 60x60 */
  function terrace(cv, dirty, seed = 11) {
    const ctx = size(cv, .62, 1100), W = cv.width, H = cv.height, r = rng(seed), n = noise(seed);
    const T = W / 5.2, jw = Math.max(2, T * .03), ox = -T * .3, oy = -T * .2;
    ctx.fillStyle = '#7d7a73'; ctx.fillRect(0, 0, W, H);
    for (let y = oy; y < H; y += T) for (let x = ox; x < W; x += T) { const L = 64 + r() * 9; ctx.fillStyle = `hsl(36,${5 + r() * 5}%,${L}%)`; ctx.fillRect(x + jw / 2, y + jw / 2, T - jw, T - jw); ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(x + jw / 2, y + jw / 2, T - jw, jw); }
    const id = ctx.getImageData(0, 0, W, H), d = id.data, k = 900 / W;
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
      const o = (j * W + i) * 4, X = i * k, Y = j * k, sp = (r() - .5) * 26;
      d[o] += sp; d[o + 1] += sp; d[o + 2] += sp;
      if (!dirty) continue;
      const mx = ((i - ox) % T + T) % T, my = ((j - oy) % T + T) % T, dj = Math.min(mx, T - mx, my, T - my);
      const stain = sst(.38, .72, n(X * .012, Y * .012)), moss = sst(jw * (1.2 + 2.6 * n(X * .03 + 7, Y * .03)), 0, dj) * sst(.25, .6, n(X * .06, Y * .06)) * .85, lich = sst(.7, .78, n(X * .05 + 50, Y * .05));
      const a = Math.min(1, stain * .7 + .18);
      d[o] = d[o] * (1 - a) + 62 * a; d[o + 1] = d[o + 1] * (1 - a) + 66 * a; d[o + 2] = d[o + 2] * (1 - a) + 48 * a;
      if (moss > .05) { d[o] = d[o] * (1 - moss) + 66 * moss; d[o + 1] = d[o + 1] * (1 - moss) + 84 * moss; d[o + 2] = d[o + 2] * (1 - moss) + 36 * moss; }
      if (lich > .1) { d[o] = d[o] * (1 - lich * .6) + 170 * lich * .6; d[o + 1] = d[o + 1] * (1 - lich * .6) + 168 * lich * .6; d[o + 2] = d[o + 2] * (1 - lich * .6) + 140 * lich * .6; }
    }
    ctx.putImageData(id, 0, 0);
    if (!dirty) { const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, 'rgba(255,255,255,.08)'); g.addColorStop(1, 'rgba(0,0,0,.05)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
  }
  /* Gevel close-up met groene aanslag */
  function wall(cv, dirty, seed = 21) {
    const ctx = size(cv, .62, 1100), W = cv.width, H = cv.height, s = W / 190, n = noise(seed);
    bricks(ctx, 0, 0, W, H, s, seed);
    ctx.fillStyle = '#39434d'; ctx.fillRect(W * .5, H * .12, W * .45, 4.2 * s); ctx.fillStyle = '#66717b'; ctx.fillRect(W * .5, H * .12, W * .45, 1.2 * s);
    if (dirty) {
      const id = ctx.getImageData(0, 0, W, H), d = id.data, k = 900 / W;
      for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
        const o = (j * W + i) * 4, X = i * k, Y = j * k;
        const streak = sst(.5, .85, n(X * .025, Y * .004, 3)) * (j > H * .14 ? 1 : .3), algae = sst(.5, .8, n(X * .01 + 9, Y * .01)) * (1 - j / H * .4), soot = sst(.55, .8, n(X * .02 + 30, Y * .02)) * .5;
        const g = Math.min(.8, algae * .6 + streak * .45 + .08);
        d[o] = d[o] * (1 - g) + 58 * g; d[o + 1] = d[o + 1] * (1 - g) + 82 * g; d[o + 2] = d[o + 2] * (1 - g) + 38 * g;
        d[o] *= 1 - soot * .5; d[o + 1] *= 1 - soot * .5; d[o + 2] *= 1 - soot * .5;
      }
      ctx.putImageData(id, 0, 0);
    }
    grain(ctx, W, H, 12, seed + 5);
  }
  /* Laminaat eik */
  function laminate(cv, seed = 31) {
    const ctx = size(cv, .62, 1100), W = cv.width, H = cv.height, r = rng(seed), n = noise(seed);
    const ph = H / 5.5, pl = W * .72;
    const id = ctx.createImageData(W, H), d = id.data, k = 900 / W;
    const tone = []; for (let i = 0; i < 80; i++) tone.push([.92 + r() * .16, r() * 1000]);
    for (let j = 0; j < H; j++) {
      const row = Math.floor(j / ph), off = (row * 0.37 % 1) * pl, yj = j - row * ph;
      for (let i = 0; i < W; i++) {
        const col = Math.floor((i + off) / pl), t = tone[(row * 7 + col) % 80], X = i * k, Y = j * k;
        const grainv = n((X + t[1]) * .012, Y * .35, 3), knot = sst(.78, .86, n(X * .04 + t[1], Y * .09));
        let R = 196 * t[0] - grainv * 52 - knot * 40, G = 160 * t[0] - grainv * 46 - knot * 38, B = 112 * t[0] - grainv * 34 - knot * 26;
        const ex = (i + off) % pl;
        if (yj < 1.6 || ex < 1.6) { R *= .55; G *= .55; B *= .55; } else if (yj < 4) { R *= 1.05; G *= 1.05; B *= 1.05; }
        const o = (j * W + i) * 4; d[o] = R; d[o + 1] = G; d[o + 2] = B; d[o + 3] = 255;
      }
    }
    ctx.putImageData(id, 0, 0);
    const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, 'rgba(255,245,225,.18)'); g.addColorStop(.6, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,.18)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  /* Raam close-up: kader + glas, optioneel vuil */
  function pane(cv, dirty, seed = 41) {
    const ctx = size(cv, .62, 1100), W = cv.width, H = cv.height, s = W / 190, out = [];
    bricks(ctx, 0, 0, W, H, s, seed);
    soldier(ctx, 22 * s, 4 * s, 146 * s, s, seed + 2);
    win(ctx, 26 * s, 16 * s, 138 * s, 92 * s, s, seed + 3, out);
    grain(ctx, W, H, 10, seed + 4);
    if (dirty) { const c2 = document.createElement('canvas'); c2.width = W; c2.height = H; grime(c2, out, seed + 9); ctx.drawImage(c2, 0, 0); }
  }
  return { facade, grime, wiper, autoWipe, terrace, wall, laminate, pane, size };
})();
