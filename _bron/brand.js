const PRO = /*P*/true/*/P*//*G*/false/*/G*/;
const $ = id => document.getElementById(id);
const eur = n => new Intl.NumberFormat('nl-BE', { style: 'currency', currency: 'EUR', minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const SVC = [
  { slug: 'ramen-wassen', title: 'Ramen wassen', h1: 'Ramen wassen in het Waasland', short: "Binnen en buiten, ook veranda's en dakvensters", items: ['Osmosewater, geen strepen', 'Eenmalig of op vaste ronde'], from: '€45', unit: 'per beurt, rijwoning', art: 'pane',
    lead: 'Met gezuiverd osmosewater en een telescopische steel tot 12 meter. Geen ladder tegen je gevel, geen strepen en geen kalkvlekken als het daarna regent.',
    incl: ['Glas, kaders en vensterbanken', "Veranda's, dakvensters en lichtstraten", 'Tot 12 meter hoog vanaf de grond', 'Eenmalig of op een vaste ronde'], note: 'buitenkant rijwoning, binnenkant + €2,50 per raam',
    faq: [['Moet ik thuis zijn?', 'Voor de buitenkant niet. Voor de binnenkant spreken we een moment af op je ronde-dag.'], ['Wat als het regent na het wassen?', 'Osmosewater bevat geen kalk of zeep. Een bui achteraf laat dus geen vlekken achter.'], ['Hoe vaak laat ik mijn ramen wassen?', 'De meeste klanten kiezen elke acht weken. Handelszaken met een etalage vaak elke vier weken.']] },
  { slug: 'terrasreiniging', title: 'Terras en oprit', h1: 'Terrasreiniging in het Waasland', short: 'Mos en groene aanslag weg, voegen opnieuw ingeveegd', items: ['Warm water onder hoge druk', 'Anti-mos nabehandeling'], from: '€4', unit: 'per m²', art: 'terrace',
    lead: 'Een glad, groen terras is niet alleen lelijk, het is gevaarlijk. We reinigen met warm water onder hoge druk en behandelen na, zodat het langer proper blijft.',
    incl: ['Betontegels, klinkers en natuursteen', 'Voegen uitgekrabd en opnieuw ingeveegd', 'Anti-mos nabehandeling', 'Ook opritten en tuinpaden'], note: 'inclusief nabehandeling, voegzand + €1 per m²',
    faq: [['Beschadigt hoge druk mijn tegels niet?', 'We stemmen druk en temperatuur af op het materiaal. Natuursteen reinigen we met een vlakreiniger, niet met een losse lans.'], ['Hoe lang blijft het proper?', 'Met de nabehandeling gemiddeld twee tot drie jaar, afhankelijk van schaduw en bomen in de buurt.'], ['Kan ik er meteen weer op?', 'Ja. Alleen na het invegen vragen we om een dag niet te kuisen met water.']] },
  { slug: 'gevelreiniging', title: 'Gevels en dakgoten', h1: 'Gevelreiniging en dakgoten', short: 'Voorgevel weer zijn eigen kleur, dakgoten leeg voor de winter', items: ['Baksteen, crepi en arduin', 'Hoogtewerker tot 3 bouwlagen'], from: '€6', unit: 'per meter dakgoot', art: 'wall',
    lead: 'Groene aanslag en zwarte strepen trekken diep in baksteen. We reinigen zacht maar grondig, en maken je dakgoten leeg voor ze overlopen.',
    incl: ['Dakgoten leegmaken en afvoeren doorspoelen', 'Gevelreiniging baksteen, crepi en arduin', 'Groene aanslag en zwarte strepen', 'Hoogtewerker tot drie bouwlagen'], note: 'gevelreiniging op offerte na foto of plaatsbezoek',
    faq: [['Wanneer laat ik mijn dakgoten best leegmaken?', 'Eind november, als de bladeren gevallen zijn. Dan zit je veilig voor de winterbuien.'], ['Wordt mijn gevel niet nat binnen?', 'Nee. We werken met lage druk en controleren voegen en ramen vooraf.'], ['Heb ik een vergunning nodig voor de hoogtewerker?', 'Voor de meeste straten niet. Als het nodig is, vragen wij de signalisatie aan bij de stad.']] },
  { slug: 'klusjesman', title: 'Klusjes en verbouwing', h1: 'Klusjesman in Sint-Niklaas', short: 'Schilderwerk, laminaat, plinten en herstellingen', items: ['Gratis plaatsbezoek', 'Prijs vooraf afgesproken'], from: '€45', unit: 'per uur, excl. materiaal', art: 'laminate',
    lead: 'Het werk dat blijft liggen: een kamer die geschilderd moet worden, laminaat in de slaapkamer, plinten, een deur die klemt. We komen eerst kijken en spreken de prijs vooraf af.',
    incl: ['Muren en plafonds schilderen', 'Laminaat en plinten leggen', 'Kleine herstellingen in en rond huis', 'Monteren, ophangen en afwerken'], note: 'of een vaste prijs per klus na plaatsbezoek',
    faq: [['Brengen jullie zelf materiaal mee?', 'Als je wil wel. We rekenen het aan tegen aankoopprijs, met de bon erbij.'], ['Hoe snel kunnen jullie starten?', 'Klusjes plannen we op zaterdag of tussen de rondes, meestal binnen twee weken.'], ['Ruimen jullie zelf op?', 'Altijd. Afval en restmateriaal nemen we mee.']] }
];
const TOWNS = [
  { n: 'Sint-Niklaas', slug: 'sint-niklaas', pc: '9100', x: 205, y: 150, home: 1 },
  { n: 'Belsele', slug: 'belsele', pc: '9111', x: 148, y: 170 },
  { n: 'Sinaai', slug: 'sinaai', pc: '9112', x: 92, y: 178 },
  { n: 'Nieuwkerken', slug: 'nieuwkerken', pc: '9100', x: 250, y: 108 },
  { n: 'Beveren', slug: 'beveren', pc: '9120', x: 318, y: 88 },
  { n: 'Kruibeke', slug: 'kruibeke', pc: '9150', x: 372, y: 160 },
  { n: 'Temse', slug: 'temse', pc: '9140', x: 330, y: 236 },
  { n: 'Waasmunster', slug: 'waasmunster', pc: '9250', x: 190, y: 268 },
  { n: 'Lokeren', slug: 'lokeren', pc: '9160', x: 92, y: 262 },
  { n: 'Stekene', slug: 'stekene', pc: '9190', x: 120, y: 76 }
];
const DAGEN = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
const RONDE = { 1: ['Sint-Niklaas', 'Belsele', 'Sinaai'], 2: ['Temse', 'Waasmunster'], 3: ['Beveren', 'Kruibeke', 'Nieuwkerken'], 4: ['Stekene', 'Lokeren'], 5: ['Sint-Niklaas', 'Temse'] };
const daysFor = n => Object.keys(RONDE).filter(d => RONDE[d].includes(n)).map(d => DAGEN[d]);
const tlink = t => PRO ? `<a href="#${t.slug}">${t.n}</a>` : t.n;

/* hero: gevel + vegen */
(() => {
  const f = $('fac'), g = $('grime');
  const rects = Art.facade(f);
  g.width = f.width; g.height = f.height;
  Art.grime(g, rects);
  const done = () => { $('hint').innerHTML = '<span class="done-msg">Zo laten we elk raam achter.</span>'; };
  const api = Art.wiper(g, rects, p => { $('bar').style.width = p + '%'; $('pct').textContent = p + '%'; if (p >= 92) done(); });
  Art.autoWipe(api, rects[0], g);
})();

/* tarieven */
$('tarief').innerHTML = SVC.map(s => `<a class="trow" href="#${s.slug}"><canvas data-art="${s.art}" aria-hidden="true"></canvas><div><h3>${s.title}</h3><p>${s.short}</p></div><ul>${s.items.map(i => `<li>${i}</li>`).join('')}</ul><div class="price"><small>vanaf</small><b>${s.from}</b><small>${s.unit}</small></div></a>`).join('');
const drawArt = (cv, kind, dirty, seed) => { if (kind === 'pane') Art.pane(cv, dirty, seed); else if (kind === 'terrace') Art.terrace(cv, dirty, seed); else if (kind === 'wall') Art.wall(cv, dirty, seed); else Art.laminate(cv, seed); };
document.querySelectorAll('.trow canvas').forEach((c, i) => drawArt(c, c.dataset.art, false, 50 + i));

/* voor/na */
function baBind(root) {
  const r = root.querySelector('input'); r.addEventListener('input', () => root.style.setProperty('--p', r.value + '%'));
}
function baDraw(root, kind, seed) {
  const [a, b] = root.querySelectorAll('canvas'); drawArt(a, kind, false, seed); drawArt(b, kind, true, seed);
}
baBind($('ba'));
let baDone = false;
setTimeout(() => { if (!baDone) { baDone = true; baDraw($('ba'), 'terrace', 11); } }, 60);
document.querySelectorAll('.job').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.job').forEach(x => x.setAttribute('aria-pressed', x === b));
  baDone = true; baDraw($('ba'), b.dataset.job, { terrace: 11, wall: 21, pane: 41 }[b.dataset.job]);
}));

/* werkgebied */
function renderMap(svg, hi) {
  const home = TOWNS[0];
  let h = `<path class="river" d="M404 0 C 388 60, 410 120, 396 170 S 352 236, 340 320"/>
  <text class="s" x="384" y="300" text-anchor="end">SCHELDE</text>
  <path class="road" d="M40 300 L205 160 L330 80 L420 26"/><text class="s" x="58" y="282">E17</text>
  <path class="road" d="M205 0 L205 150 L330 236 L420 300"/><text class="s" x="212" y="18">N16</text>
  <circle class="ring" cx="${home.x}" cy="${home.y}" r="132"/><text class="s" x="${home.x + 96}" y="${home.y - 100}">15 KM</text>`;
  TOWNS.forEach(t => {
    const on = hi && t.slug === hi, r = t.home ? 9 : 6, right = t.x < 330;
    const dot = t.home ? `<circle class="home" cx="${t.x}" cy="${t.y}" r="${r}"/>` : `<circle class="t" cx="${t.x}" cy="${t.y}" r="${r}" ${on ? 'style="fill:var(--brick);stroke:var(--brick)"' : ''}/>`;
    const label = `<text x="${right ? t.x + 13 : t.x - 13}" y="${t.y + 4}" text-anchor="${right ? 'start' : 'end'}" ${t.home || on ? 'style="font-weight:750;font-size:14px"' : ''}>${t.n}</text>`;
    h += PRO ? `<a href="#${t.slug}">${dot}${label}</a>` : dot + label;
  });
  svg.innerHTML = h;
}
renderMap($('map'));
$('rondes').innerHTML = Object.keys(RONDE).map(d => `<tr><th>${DAGEN[d][0].toUpperCase() + DAGEN[d].slice(1)}</th><td>${RONDE[d].map(n => tlink(TOWNS.find(t => t.n === n))).join(', ')}</td></tr>`).join('') + '<tr><th>Zaterdag</th><td>Klusjes en plaatsbezoeken</td></tr>';
$('fsvc').innerHTML = SVC.map(s => `<li><a href="#${s.slug}">${s.title}</a></li>`).join('');
$('ftown').innerHTML = TOWNS.slice(0, 6).map(t => `<li>${PRO ? `<a href="#${t.slug}">${t.n}</a>` : t.n}</li>`).join('') + '<li>en omliggende</li>';

/* social templates */
(() => {
  const el = $('posts'); if (!el) return;
  const mk = '<svg class="mk" style="color:#e8eef2"><use href="#mark"/></svg>';
  el.innerHTML = `
  <div class="post split"><div class="half"><canvas></canvas></div><div class="half r"><canvas></canvas></div>
    <span class="lbl" style="left:12px">VOOR</span><span class="lbl" style="right:12px">NA</span>
    <div class="ov" style="justify-content:flex-end;background:linear-gradient(transparent 55%,rgba(10,20,30,.75))"><div class="ft"><span>Terras · Sinaai</span>${mk}</div></div></div>
  <div class="post plain"><div class="ov"><span class="tg" style="color:#8fb6d3">Dienst in de kijker</span><span class="big">Dakgoten leeg vóór de winter</span><div class="ft"><span>duofixservice.be</span>${mk}</div></div></div>
  <div class="post cream"><div class="ov"><span class="st">★★★★★</span><span class="q">"Op tijd, proper gewerkt en eerlijk geprijsd. Volgend jaar opnieuw."</span><div class="ft"><span>Kristof · Sint-Niklaas</span><svg class="mk" style="color:#0f2238"><use href="#mark"/></svg></div></div></div>
  <div class="post brickbg"><div class="ov"><span class="tg">Actie november</span><span class="big">−10% op ramen + dakgoten</span><div class="ft"><span>Boek voor 30/11</span>${mk}</div></div></div>`;
  const [a, b] = el.querySelectorAll('.split canvas');
  [a, b].forEach(c => c.style.objectFit = 'cover');
  Art.terrace(a, true, 11); Art.terrace(b, false, 11);
})();

/*G*/
/* offerte */
document.querySelectorAll('[data-multi] .chip').forEach(c => c.addEventListener('click', () => c.setAttribute('aria-pressed', c.getAttribute('aria-pressed') !== 'true')));
(() => {
  const th = $('thumbs');
  ['IMG_2041.jpg', 'IMG_2042.jpg'].forEach((n, i) => { const f = document.createElement('figure'); f.innerHTML = `<canvas></canvas><figcaption>${n}</figcaption>`; th.appendChild(f); const c = f.querySelector('canvas'); c.style.width = '84px'; Art.terrace(c, true, 60 + i * 9); });
  const add = files => { [...files].filter(f => f.type.startsWith('image/')).slice(0, 8).forEach(file => { const r = new FileReader(); r.onload = e => { const f = document.createElement('figure'); f.innerHTML = `<img alt=""><figcaption>${esc(file.name)}</figcaption>`; f.querySelector('img').src = e.target.result; th.appendChild(f); }; r.readAsDataURL(file); }); };
  $('qf-files').addEventListener('change', e => add(e.target.files));
  const d = $('drop');
  d.addEventListener('dragover', e => { e.preventDefault(); d.classList.add('over'); });
  d.addEventListener('dragleave', () => d.classList.remove('over'));
  d.addEventListener('drop', e => { e.preventDefault(); d.classList.remove('over'); add(e.dataTransfer.files); });
  $('qf').addEventListener('submit', e => { e.preventDefault(); $('qok').hidden = false; });
})();
/*/G*/

/*P*/
/* calculator */
const S = { ramen: 12, terras: 30, goot: 16, kant: 'beide', hoog: .15, freq: .1, slot: 'Voormiddag, 8u tot 12u', gem: 'Sint-Niklaas', day: null };
let TOTAL = 0, WORK = '';
document.querySelectorAll('.stepper').forEach(st => {
  const k = st.dataset.k, step = +st.dataset.step, min = +st.dataset.min, max = +st.dataset.max, u = st.dataset.u || '', out = st.querySelector('output');
  const [m, p] = st.querySelectorAll('button');
  const set = v => { S[k] = Math.max(min, Math.min(max, v)); out.textContent = S[k] + u; calc(); };
  m.addEventListener('click', () => set(S[k] - step)); p.addEventListener('click', () => set(S[k] + step));
});
document.querySelectorAll('[data-g]').forEach(g => { if (g.dataset.multi) return; g.querySelectorAll('.chip').forEach(c => c.addEventListener('click', e => {
  e.preventDefault(); g.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === c));
  const v = c.dataset.v; S[g.dataset.g] = isNaN(+v) ? v : +v; calc();
})); });
['cT', 'cD'].forEach(id => $(id).addEventListener('change', calc));
function calc() {
  const L = [], n = S.ramen, T = $('cT').checked, D = $('cD').checked;
  $('cT').closest('.grp').querySelector('.stepper').style.opacity = T ? 1 : .4;
  $('cD').closest('.grp').querySelector('.stepper').style.opacity = D ? 1 : .4;
  let sub = 0, ramen = n * 3.5;
  if (n) L.push([`${n} ramen buitenkant × ${eur(3.5)}`, ramen]);
  if (n && S.kant === 'beide') { L.push([`${n} ramen binnenkant × ${eur(2.5)}`, n * 2.5]); ramen += n * 2.5; }
  if (n && S.hoog) { L.push([`Toeslag verdieping +${Math.round(S.hoog * 100)}%`, ramen * S.hoog]); ramen *= 1 + S.hoog; }
  sub += ramen;
  if (T) { L.push([`Terras ${S.terras} m² × ${eur(4)}`, S.terras * 4]); sub += S.terras * 4; }
  if (D) { L.push([`Dakgoten ${S.goot} m × ${eur(6)}`, S.goot * 6]); sub += S.goot * 6; }
  if (sub < 45) { L.push(['Aangevuld tot minimumbedrag', 45 - sub]); sub = 45; }
  let tot = sub;
  if (S.freq) { const d = sub * S.freq; L.push([`Korting abonnement −${Math.round(S.freq * 100)}%`, -d, 1]); tot -= d; }
  TOTAL = tot;
  $('lines').innerHTML = L.map(([a, v, disc]) => `<div class="${disc ? 'disc' : ''}"><span>${a}</span><b>${disc ? '−' + eur(-v) : eur(v)}</b></div>`).join('');
  $('tot').textContent = eur(Math.round(tot));
  $('totlbl').textContent = S.freq ? 'Per beurt, incl. btw' : 'Eenmalig, incl. btw';
  const w = []; if (n) w.push(`${n} ramen ${S.kant === 'beide' ? 'binnen en buiten' : 'buiten'}`); if (T) w.push(`terras ${S.terras} m²`); if (D) w.push(`dakgoten ${S.goot} m`);
  WORK = w.join(', ') || 'Nog niets gekozen';
  summary();
}
/* boeken */
const FULL = ['2026-10-26', '2026-10-30'];
$('gem').innerHTML = TOWNS.map(t => `<option ${t.n === S.gem ? 'selected' : ''}>${t.n}</option>`).join('');
$('dows').innerHTML = ['ma', 'di', 'wo', 'do', 'vr', 'za'].map(d => `<span class="dow">${d}</span>`).join('');
const TODAY = new Date(2026, 9, 21);
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
function days() {
  const el = $('days'); el.innerHTML = ''; S.day = null;
  const start = new Date(2026, 9, 19);
  for (let i = 0; i < 21; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i); const wd = d.getDay(); if (wd === 0) continue;
    const b = document.createElement('button'); b.className = 'day'; b.setAttribute('aria-pressed', 'false');
    const past = d <= TODAY, full = FULL.includes(iso(d)), on = RONDE[wd] && RONDE[wd].includes(S.gem);
    let note = past ? 'voorbij' : wd === 6 ? 'klusjes' : full && on ? 'volzet' : on ? 'jouw ronde' : (RONDE[wd] || [''])[0];
    b.disabled = past || !on || full; if (on && !past && !full) b.classList.add('on');
    b.innerHTML = `<b>${d.getDate()}</b><small>${note}</small>`;
    b.setAttribute('aria-label', `${DAGEN[wd]} ${d.getDate()} ${d.toLocaleString('nl-BE', { month: 'long' })}, ${note}`);
    b.addEventListener('click', () => { el.querySelectorAll('.day').forEach(x => x.setAttribute('aria-pressed', x === b)); S.day = `${DAGEN[wd]} ${d.getDate()} ${d.toLocaleString('nl-BE', { month: 'long' })}`; summary(); });
    el.appendChild(b);
  }
  const first = el.querySelector('.day:not(:disabled)'); first && first.click();
  summary();
}
$('gem').addEventListener('change', e => { S.gem = e.target.value; $('conf').hidden = true; days(); });
function summary() {
  if (!$('sum')) return;
  const fr = { 0: 'Eenmalig', .1: 'Elke 8 weken', .15: 'Elke 4 weken' }[S.freq];
  $('sum').innerHTML = [['Werk', WORK], ['Ritme', fr], ['Gemeente', S.gem], ['Datum', S.day || 'Kies een dag'], ['Moment', S.slot], ['Richtprijs', TOTAL ? eur(Math.round(TOTAL)) : '']].map(([a, b]) => `<div><dt>${a}</dt><dd>${esc(b)}</dd></div>`).join('');
}
$('bf').addEventListener('submit', e => { e.preventDefault(); $('conf').hidden = false; });
calc(); days();
/*/P*/

/* dienst- en gemeentepagina's */
const home = document.querySelector('[data-view="home"]'), pageV = document.querySelector('[data-view="page"]'), page = $('page');
function baHTML() { return `<div class="ba" style="--p:46%"><canvas></canvas><canvas class="before"></canvas><span class="tag" style="left:14px">Voor</span><span class="tag" style="right:14px">Na</span><span class="bar"></span><span class="knob"><svg><use href="#lr"/></svg></span><input type="range" min="0" max="100" value="46" aria-label="Schuif tussen voor en na"></div>`; }
function svcPage(s) {
  const cta = PRO ? `<a class="btn brick" href="#prijs">Bereken je prijs<svg><use href="#arrow"/></svg></a>` : `<a class="btn brick" href="#offerte">Vraag een offerte<svg><use href="#arrow"/></svg></a>`;
  page.innerHTML = `<div class="crumbs"><a href="#top">Home</a> / <a href="#diensten">Diensten</a> / ${s.title}<code>duofixservice.be/${s.slug}</code></div>
  <div class="svc-hero"><div><span class="kicker">${s.title}</span><h1>${s.h1}</h1><p class="lead" style="margin-top:22px">${s.lead}</p>
  <ul class="incl">${s.incl.map(i => `<li>${i}</li>`).join('')}</ul>
  <div class="pricebox"><b>vanaf ${s.from}</b><span>${s.unit}, ${s.note}</span></div>
  <div class="cta">${cta}<a class="btn ghost" href="#werkgebied">Waar we werken</a></div></div>
  <div>${s.art === 'laminate' ? '<div class="single"><canvas></canvas></div>' : baHTML()}</div></div>
  <section style="padding-block:0 96px"><div class="faq"><span class="kicker">Veelgestelde vragen</span><h2 style="margin-bottom:14px">Goed om te weten.</h2>${s.faq.map(([q, a], i) => `<details ${i ? '' : 'open'}><summary>${q}</summary><p>${a}</p></details>`).join('')}</div>
  <div style="margin-top:64px"><span class="kicker">Andere diensten</span><div class="others">${SVC.filter(x => x !== s).map(x => `<a href="#${x.slug}">${x.title}</a>`).join('')}</div></div></section>`;
  const ba = page.querySelector('.ba');
  if (ba) { baBind(ba); baDraw(ba, s.art, 70); } else Art.laminate(page.querySelector('.single canvas'), 31);
}
function townPage(t) {
  const d = daysFor(t.n);
  page.innerHTML = `<div class="crumbs"><a href="#top">Home</a> / <a href="#werkgebied">Werkgebied</a> / ${t.n}<code>duofixservice.be/ramen-wassen-${t.slug}</code></div>
  <div class="svc-hero"><div><span class="kicker">${t.pc} ${t.n}</span><h1>Ramen wassen in ${t.n}</h1>
  <p class="lead" style="margin-top:22px">${d.length ? `Elke ${d.join(' en ')} rijden we onze ronde in ${t.n}.` : `In ${t.n} komen we op afspraak.`} Ook voor terrassen, gevels, dakgoten en klusjes ben je in ${t.n} aan het juiste adres.</p>
  <ul class="incl">${SVC.map(s => `<li><a href="#${s.slug}">${s.title}</a>&nbsp;vanaf ${s.from}</li>`).join('')}</ul>
  <div class="pricebox"><b>${d.length ? d.map(x => x[0].toUpperCase() + x.slice(1)).join(' + ') : 'Op afspraak'}</b><span>vaste ronde in ${t.n}</span></div>
  <div class="cta"><a class="btn brick" href="#boeken" data-gem="${t.n}">Boek op je ronde-dag<svg><use href="#arrow"/></svg></a></div></div>
  <svg class="map" viewBox="0 0 420 320" role="img" aria-label="Kaart met ${t.n} aangeduid"></svg></div>`;
  renderMap(page.querySelector('svg.map'), t.slug);
  const b = page.querySelector('[data-gem]'); b && b.addEventListener('click', () => { if ($('gem')) { $('gem').value = t.n; S.gem = t.n; days(); } });
}
function route() {
  const h = decodeURIComponent(location.hash.slice(1)), s = SVC.find(x => x.slug === h), t = PRO && TOWNS.find(x => x.slug === h);
  const wasPage = !pageV.hidden;
  if (s || t) { home.hidden = true; pageV.hidden = false; s ? svcPage(s) : townPage(t); window.scrollTo(0, 0); }
  else { pageV.hidden = true; home.hidden = false; if (wasPage) { const el = h && document.getElementById(h); el && h !== 'top' ? el.scrollIntoView() : window.scrollTo(0, 0); } }
}
addEventListener('hashchange', route); route();
