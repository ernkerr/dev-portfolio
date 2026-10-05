// affinity-map.js — an interactive affinity map of what designer job posts ask
// a portfolio to show. Framework-free, so the same file runs on erinkerr.me
// (through AffinityMap.tsx) and in the standalone preview.
//
//   const unmount = mountAffinityMap(element, data) // data = affinity.json
//
// Pass { intro: false } to leave out the lede and the stats row, for a page
// that introduces the map itself, and { summary: false } to leave out the
// three written takeaways, so the notes speak for themselves.
//
// affinity.json carries hit lists (indexes into data.jds) instead of
// percentages, so every number recomputes for the chosen role and level.

const LEVELS = [
  ['all', 'All'],
  ['entry', 'Entry'],
  ['mid', 'Mid'],
  ['senior', 'Senior'],
  ['staff+', 'Staff+'],
];
const LEVEL_NAMES = { entry: 'entry-level', mid: 'mid-level', senior: 'senior', 'staff+': 'staff and principal' };
const SHORT_TRACK = { product: 'Product', uiux: 'UI/UX', brand: 'Brand', manager: 'Manager' };
const TRACK_NOUN = { product: 'product designer', uiux: 'UI/UX designer', brand: 'brand designer', manager: 'design manager' };
// Lowercase a cluster name mid-sentence, but leave acronyms like "AI" alone.
const midSentence = (label) => (/^[A-Z]{2}/.test(label) ? label : label[0].toLowerCase() + label.slice(1));

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const pct = (n, d) => (d ? Math.round((n / d) * 100) : 0);
const countIn = (set, pool) => pool.reduce((n, i) => n + (set.has(i) ? 1 : 0), 0);

// Small seeded shuffle so the unsorted wall looks random but stays stable.
function shuffled(list) {
  const a = [...list];
  let seed = 7;
  for (let i = a.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;
    const j = Math.floor((seed / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function mountAffinityMap(root, data, { intro = true, summary = true } = {}) {
  const { meta } = data;
  const tracks = meta.tracks;
  const trackLabel = Object.fromEntries(tracks.map((t) => [t.id, t.label]));
  const jdIndex = new Map(data.jds.map((j, i) => [j.id, i]));
  const clusters = data.groups.flatMap((g, gi) =>
    g.clusters.map((c) => ({ ...c, group: g, tone: gi + 1, hs: new Set(c.h), phs: new Set(c.ph) })),
  );
  const terms = clusters.flatMap((c) =>
    c.terms.map((t) => ({ ...t, cluster: c, re: new RegExp(t.pattern, t.flags || 'i'), hs: new Set(t.h), phs: new Set(t.ph) })),
  );
  const notes = clusters.flatMap((c) =>
    c.notes.map((n) => {
      const idx = n.jds.map((id) => jdIndex.get(id)).filter((i) => i !== undefined);
      return { ...n, cluster: c, idx, sources: idx.map((i) => data.jds[i]) };
    }),
  );

  const fromHash = () => {
    const h = (typeof location !== 'undefined' && location.hash.slice(1)) || '';
    return tracks.some((t) => t.id === h) ? h : 'all';
  };
  const state = { view: 'map', track: fromHash(), level: 'all', query: '', word: null, sorted: true, sortWords: 'portfolio' };
  const reduceMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  root.classList.add('am');
  root.innerHTML = `
    <header class="am-head">
      <p class="am-eyebrow">Affinity map · ${meta.jdCount} designer job posts · ${esc(meta.fetched)}</p>
      <h2 class="am-title">What design teams want to see in a portfolio</h2>
      ${intro ? `<p class="am-lede">${meta.jdCount} live product, UI/UX, brand, and design manager posts from ${meta.companyCount} companies.
        Every line about portfolios became a sticky note, and the notes were sorted until the patterns showed.
        Pick the role you are hiring for to see what posts like yours ask for.</p>
      <dl class="am-stats">
        <div><dt>Posts read</dt><dd>${meta.jdCount}</dd></div>
        <div><dt>Companies</dt><dd>${meta.companyCount}</dd></div>
        <div><dt>Ask for a portfolio by name</dt><dd>${meta.portfolioJdCount}</dd></div>
        <div><dt>Sticky notes</dt><dd>${notes.length}</dd></div>
        <div><dt>Words tracked</dt><dd>${terms.length}</dd></div>
      </dl>` : ''}
    </header>
    ${summary ? '<ol class="am-takeaways" aria-live="polite"></ol>' : ''}
    <div class="am-toolbar">
      <div class="am-control">
        <span class="am-control-label" id="am-role-label">Role</span>
        <div class="am-seg" role="group" aria-labelledby="am-role-label">
          <button type="button" data-track="all" aria-pressed="true">All</button>
          ${tracks.map((t) => `<button type="button" data-track="${t.id}" aria-pressed="false">${esc(SHORT_TRACK[t.id] || t.label)}</button>`).join('')}
        </div>
      </div>
      <div class="am-control">
        <span class="am-control-label" id="am-level-label">Level</span>
        <div class="am-seg" role="group" aria-labelledby="am-level-label">
          ${LEVELS.map(([v, l]) => `<button type="button" data-level="${v}" aria-pressed="${v === 'all'}">${l}</button>`).join('')}
        </div>
      </div>
      <div class="am-control">
        <span class="am-control-label" id="am-view-label">View</span>
        <div class="am-seg" role="group" aria-labelledby="am-view-label">
          <button type="button" data-view="map" aria-pressed="true">Map</button>
          <button type="button" data-view="words" aria-pressed="false">Words</button>
        </div>
      </div>
      <label class="am-search">
        <span class="am-vh">Search the notes</span>
        <input id="am-query" type="search" placeholder="Search notes" autocomplete="off" />
      </label>
      <button type="button" class="am-btn" data-action="sort">Unsort the notes</button>
    </div>
    <div class="am-status" aria-live="polite"></div>
    <div class="am-legend">
      <span><i class="am-key am-key-portfolio"></i>Portfolio ask: share of posts that describe a portfolio and use these words to do it</span>
      <span><i class="am-key am-key-role"></i>Whole post: share of all posts that use these words anywhere</span>
    </div>
    <div class="am-board-nav">
      <p class="am-board-hint"></p>
      <div class="am-board-arrows">
        <button type="button" class="am-arrow" data-action="left" aria-label="Scroll the map left">←</button>
        <button type="button" class="am-arrow" data-action="right" aria-label="Scroll the map right">→</button>
      </div>
    </div>
    <div class="am-board-wrap">
      <div class="am-board" tabindex="0" role="region" aria-label="Affinity map. Scrolls sideways."></div>
    </div>
    <p class="am-empty" hidden>No notes match these filters. <button type="button" class="am-clear" data-action="clear">Clear filters</button></p>
    <div class="am-raw" hidden></div>
    <div class="am-words" hidden></div>
    <footer class="am-method">
      <h3>How it was made</h3>
      <ol>${meta.method.map((m) => `<li>${esc(m)}</li>`).join('')}</ol>
      <details>
        <summary>All ${meta.jdCount} posts</summary>
        <p class="am-snapshot">A snapshot taken ${esc(meta.fetched)}. Postings close over time, so some links will stop working; the quotes on the notes are the record.</p>
        <ul class="am-sources">
          ${data.jds
            .map(
              (j) =>
                `<li><a href="${esc(j.url)}" target="_blank" rel="noopener noreferrer">${esc(j.company)}</a> ${esc(j.title)} <span>${esc(SHORT_TRACK[j.track])} · ${esc(j.level)}</span></li>`,
            )
            .join('')}
        </ul>
      </details>
    </footer>`;

  const $ = (sel) => root.querySelector(sel);
  const board = $('.am-board');
  const boardWrap = $('.am-board-wrap');
  const boardNav = $('.am-board-nav');
  const raw = $('.am-raw');
  const words = $('.am-words');
  const status = $('.am-status');
  const legend = $('.am-legend');
  const takeaways = $('.am-takeaways');

  // ---- board: one column per theme, one pile per cluster
  board.innerHTML = data.groups
    .map(
      (g, gi) => `
      <section class="am-theme" style="--tone:var(--am-t${gi + 1});--tone-strong:var(--am-t${gi + 1}-strong)">
        <header class="am-theme-head">
          <h3 class="am-theme-label">${esc(g.label)}</h3>
          <p class="am-theme-q">${esc(g.question)}</p>
        </header>
        <div class="am-theme-cols">
        ${g.clusters
          .map(
            (c) => `
          <article class="am-cluster" data-cluster="${c.id}">
            <div class="am-cluster-card" style="--rot:${(((c.id.slice(1) * 37) % 5) - 2) * 0.3}deg">
              <h4>${esc(c.label)}</h4>
              <div class="am-meters">
                <div class="am-meter" data-kind="portfolio"><span class="am-meter-label">Portfolio ask</span><span class="am-meter-track"><span class="am-meter-fill"></span></span><span class="am-meter-val"></span></div>
                <div class="am-meter" data-kind="role"><span class="am-meter-label">Whole post</span><span class="am-meter-track"><span class="am-meter-fill"></span></span><span class="am-meter-val"></span></div>
              </div>
              <p class="am-insight">${esc(c.insight)}</p>
              <p class="am-cluster-words"></p>
            </div>
            <div class="am-notes"></div>
          </article>`,
          )
          .join('')}
        </div>
      </section>`,
    )
    .join('');

  // ---- notes are built once and moved between the board and the raw wall,
  // so the sort can animate each note from where it was to where it lands.
  const noteEls = new Map();
  notes.forEach((n, i) => {
    const el = document.createElement('figure');
    el.className = 'am-note';
    el.style.setProperty('--rot', `${(((i * 37) % 7) - 3) * 0.45}deg`);
    el.style.setProperty('--tone', `var(--am-t${n.cluster.tone})`);
    const first = n.sources[0];
    const roles = [...new Set(n.sources.map((s) => SHORT_TRACK[s.track]))].join(', ');
    const levels = [...new Set(n.sources.map((s) => s.level))].join(', ');
    const more = n.sources.length > 1 ? ` + ${n.sources.length - 1} more` : '';
    el.innerHTML = `
      <div class="am-paper">
        <blockquote>${esc(n.quote)}</blockquote>
        <figcaption>
          <a href="${esc(first.url)}" target="_blank" rel="noopener noreferrer"
             title="${esc(n.sources.map((s) => `${s.company}: ${s.title}`).join('\n'))}">${esc(first.company)}</a>
          <span>${esc(first.title)}${more}</span>
          <span class="am-note-level">${esc(roles)} · ${esc(levels)}</span>
        </figcaption>
      </div>`;
    noteEls.set(n.id, el);
    board.querySelector(`[data-cluster="${n.cluster.id}"] .am-notes`).append(el);
  });
  const rawOrder = shuffled(notes.map((n) => n.id));

  // ---- the filtered set of posts every number is computed over
  function pools() {
    const all = [];
    data.jds.forEach((j, i) => {
      if ((state.track === 'all' || j.track === state.track) && (state.level === 'all' || j.level === state.level)) all.push(i);
    });
    return { all, set: new Set(all), port: all.filter((i) => data.jds[i].p) };
  }
  const cov = (item, pool) => ({ role: pct(countIn(item.hs, pool.all), pool.all.length), portfolio: pct(countIn(item.phs, pool.port), pool.port.length) });

  const activeTerm = () => terms.find((t) => t.word === state.word);
  // Every filter takes non-matching notes off the wall, and a cluster or theme
  // left with no notes goes too, so a filtered wall reads as a smaller wall.
  const inPool = (n, pool) => n.idx.some((i) => pool.set.has(i));
  function matches(n) {
    if (state.query && !n.quote.toLowerCase().includes(state.query.toLowerCase())) return false;
    const t = activeTerm();
    return !t || t.re.test(n.quote);
  }

  function poolName() {
    const role = state.track === 'all' ? 'designer' : TRACK_NOUN[state.track] || trackLabel[state.track];
    return state.level === 'all' ? role : `${LEVEL_NAMES[state.level]} ${role}`;
  }

  function renderTakeaways(pool) {
    if (!takeaways) return;
    if (pool.port.length < 3) {
      takeaways.innerHTML = `<li><strong>Too few posts to read.</strong> Only ${pool.all.length} ${esc(poolName())} posts are in the sample. Widen the role or level to see patterns.</li>`;
      return;
    }
    const ranked = clusters
      .map((c) => ({ c, ...cov(c, pool) }))
      .sort((a, b) => b.portfolio - a.portfolio || b.role - a.role);
    const topWord = terms
      .map((t) => ({ t, ...cov(t, pool) }))
      .sort((a, b) => b.portfolio - a.portfolio)[0];
    const gap = ranked
      .filter((r) => r.role >= 50 && r.portfolio <= 10)
      .sort((a, b) => b.role - b.portfolio - (a.role - a.portfolio))
      .slice(0, 3);
    const name = (r) => midSentence(r.c.label);
    const items = [
      {
        head: `${topWord.t.word[0].toUpperCase()}${topWord.t.word.slice(1)} is the word.`,
        body: `When a ${poolName()} post describes the portfolio it wants, ${topWord.portfolio}% of the time it uses the word “${topWord.t.word}”. ${ranked[0].c.label} (${ranked[0].portfolio}%) and ${name(ranked[1])} (${ranked[1].portfolio}%) lead every other cluster.`,
      },
      {
        head: 'What comes next.',
        body: `${ranked[2].c.label} (${ranked[2].portfolio}%), ${name(ranked[3])} (${ranked[3].portfolio}%), and ${name(ranked[4])} (${ranked[4].portfolio}%) round out the top five.`,
      },
    ];
    if (gap.length >= 2) {
      const lo = Math.min(...gap.map((g) => g.role));
      const hi = Math.max(...gap.map((g) => g.role));
      const list = gap.length === 3 ? `${gap[0].c.label}, ${name(gap[1])}, and ${name(gap[2])}` : `${gap[0].c.label} and ${name(gap[1])}`;
      items.push({
        head: 'The gap is the opening.',
        body: `${list} show up in ${lo === hi ? lo : `${lo} to ${hi}`}% of these posts, yet almost never in the portfolio ask. A portfolio that shows them anyway stands out.`,
      });
    }
    takeaways.innerHTML = items.map((t) => `<li><strong>${esc(t.head)}</strong> ${esc(t.body)}</li>`).join('');
  }

  function renderStatus(count, pool) {
    const bits = [];
    if (state.word) bits.push(`use “${esc(state.word)}”`);
    if (state.query) bits.push(`contain “${esc(state.query)}”`);
    const scoped = state.track !== 'all' || state.level !== 'all';
    const filtered = scoped || bits.length > 0;
    const head = filtered
      ? `${count} of ${notes.length} notes${scoped ? ` come from ${esc(poolName())} posts` : ''}${bits.length ? `${scoped ? ' and' : ''} ${bits.join(' and ')}` : ''}`
      : `Showing all ${notes.length} notes`;
    const sample = scoped
      ? `. Percentages use those ${pool.all.length} posts (${pool.port.length} describe a portfolio)${pool.all.length <= 20 ? ', a small sample' : ''}`
      : '';
    status.innerHTML = `<span>${head}${sample}.</span>${filtered ? '<button type="button" class="am-clear" data-action="clear">Clear filters</button>' : ''}`;
  }

  function setMeter(meter, value) {
    if (!meter) return;
    meter.querySelector('.am-meter-fill').style.width = `${value}%`;
    meter.querySelector('.am-meter-val').textContent = `${value}%`;
  }

  function renderWords(pool) {
    const rows = terms.map((t) => ({ t, ...cov(t, pool) }));
    if (state.sortWords !== 'cluster') rows.sort((a, b) => b[state.sortWords] - a[state.sortWords] || b.role - a.role);
    const sortBtn = (key, label) =>
      `<button type="button" data-sort="${key}" aria-pressed="${state.sortWords === key}">${label}</button>`;
    words.innerHTML = `
      <p class="am-words-intro">The ${terms.length} words that define the clusters, counted across the ${pool.all.length} ${esc(poolName())} posts. Pick a word to see the notes that use it.</p>
      <div class="am-seg am-words-sort" role="group" aria-label="Sort words">
        ${sortBtn('portfolio', 'Portfolio ask')}${sortBtn('role', 'Whole post')}${sortBtn('cluster', 'By cluster')}
      </div>
      <div class="am-table-wrap">
        <table class="am-table">
          <thead><tr><th scope="col">Word</th><th scope="col">Cluster</th><th scope="col">Portfolio ask</th><th scope="col">Whole post</th></tr></thead>
          <tbody>
            ${rows
              .map(({ t, portfolio, role }) => {
                const pCell = `<td><span class="am-bar am-key-portfolio" style="width:${portfolio}%"></span><span class="am-num">${portfolio}%</span></td>`;
                return `<tr style="--tone:var(--am-t${t.cluster.tone})">
                  <th scope="row"><button type="button" class="am-chip" data-word="${esc(t.word)}">${esc(t.word)}</button></th>
                  <td class="am-cluster-name">${esc(t.cluster.label)}</td>
                  ${pCell}
                  <td><span class="am-bar am-key-role" style="width:${role}%"></span><span class="am-num">${role}%</span></td>
                </tr>`;
              })
              .join('')}
          </tbody>
        </table>
      </div>`;
  }

  function apply() {
    const pool = pools();
    let count = 0;
    for (const n of notes) {
      const on = inPool(n, pool) && matches(n);
      if (on) count++;
      noteEls.get(n.id).hidden = !on;
    }
    for (const c of clusters) {
      board.querySelector(`[data-cluster="${c.id}"]`).hidden = !c.notes.some((n) => !noteEls.get(n.id).hidden);
    }
    for (const theme of board.querySelectorAll('.am-theme')) {
      theme.hidden = !theme.querySelector('.am-cluster:not([hidden])');
    }
    reorderClusters(pool);
    for (const c of clusters) {
      const el = board.querySelector(`[data-cluster="${c.id}"]`);
      const v = cov(c, pool);
      setMeter(el.querySelector('[data-kind="portfolio"]'), v.portfolio);
      setMeter(el.querySelector('[data-kind="role"]'), v.role);
      // The cluster's top words for this role, by how often they describe the portfolio.
      const top = c.terms
        .map((t) => terms.find((x) => x.cluster === c && x.word === t.word))
        .map((t) => ({ t, ...cov(t, pool) }))
        .sort((a, b) => b.portfolio - a.portfolio || b.role - a.role)
        .slice(0, 5);
      el.querySelector('.am-cluster-words').innerHTML = top
        // Labels, not buttons: they name the cluster's words. Filtering by a
        // word lives in the Words view, where the table says what it does.
        .map(({ t }) => `<span class="am-tag${t.word === state.word ? ' is-on' : ''}">${esc(t.word)}</span>`)
        .join('');
    }
    for (const b of root.querySelectorAll('[data-track]')) b.setAttribute('aria-pressed', String(b.dataset.track === state.track));
    for (const b of root.querySelectorAll('[data-level]')) b.setAttribute('aria-pressed', String(b.dataset.level === state.level));
    for (const b of root.querySelectorAll('[data-view]')) b.setAttribute('aria-pressed', String(b.dataset.view === state.view));
    for (const b of root.querySelectorAll('.am-chip')) b.classList.toggle('is-on', b.dataset.word === state.word);
    const onMap = state.view === 'map';
    board.hidden = !onMap || !state.sorted;
    boardWrap.hidden = board.hidden;
    boardNav.hidden = board.hidden;
    $('.am-empty').hidden = !onMap || count > 0;
    raw.hidden = !onMap || state.sorted;
    words.hidden = onMap;
    legend.hidden = !onMap;
    $('[data-action="sort"]').hidden = !onMap;
    root.classList.toggle('is-raw', !state.sorted);
    if (!onMap) renderWords(pool);
    renderTakeaways(pool);
    renderStatus(count, pool);
    updateEdges();
  }

  // Which edges still have more wall past them: drives the fades and arrows.
  const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;
  function updateEdges() {
    const max = board.scrollWidth - board.clientWidth;
    const overflows = max > 4;
    const shownClusters = board.querySelectorAll('.am-cluster:not([hidden])').length;
    const shownThemes = board.querySelectorAll('.am-theme:not([hidden])').length;
    $('.am-board-hint').textContent = `${plural(shownClusters, 'cluster')} in ${plural(shownThemes, 'theme')}. Within each theme, the cluster this role asks for most comes first.${overflows ? ' Scroll sideways for the rest.' : ''}`;
    $('.am-board-arrows').hidden = !overflows;
    const left = board.scrollLeft > 4;
    const right = board.scrollLeft < max - 4;
    boardWrap.toggleAttribute('data-more-left', left);
    boardWrap.toggleAttribute('data-more-right', right);
    $('[data-action="left"]').disabled = !left;
    $('[data-action="right"]').disabled = !right;
  }
  function scrollBoard(dir) {
    board.scrollBy({ left: dir * board.clientWidth * 0.8, behavior: reduceMotion() ? 'auto' : 'smooth' });
  }

  // Within each theme, the cluster this role asks for most rises to the top.
  // FLIP-animated, so the wall visibly reorganizes when the role changes.
  function reorderClusters(pool) {
    const animate = !reduceMotion() && !board.hidden;
    const cards = [...board.querySelectorAll('.am-cluster')];
    const before = animate ? new Map(cards.map((el) => [el, el.getBoundingClientRect()])) : null;
    const scrolled = board.scrollLeft;
    let moved = false;
    for (const theme of board.querySelectorAll('.am-theme-cols')) {
      const els = [...theme.querySelectorAll('.am-cluster')];
      const score = (el) => {
        const c = clusters.find((x) => x.id === el.dataset.cluster);
        const v = cov(c, pool);
        return v.portfolio * 1000 + v.role;
      };
      const sorted = [...els].sort((a, b) => score(b) - score(a));
      if (sorted.some((el, i) => el !== els[i])) {
        moved = true;
        theme.append(...sorted);
      }
    }
    // Reordering must not drag the wall sideways under the reader.
    if (moved) board.scrollLeft = scrolled;
    if (!animate || !moved) return;
    for (const el of cards) {
      const a = before.get(el);
      const b = el.getBoundingClientRect();
      if (a.top === b.top && a.left === b.left) continue;
      el.animate([{ transform: `translate(${a.left - b.left}px, ${a.top - b.top}px)` }, { transform: 'translate(0, 0)' }], {
        duration: 550,
        easing: 'cubic-bezier(.2,.75,.2,1)',
      });
    }
  }

  // FLIP: measure every note, move it, measure again, animate the difference.
  function setSorted(sorted) {
    const els = [...noteEls.values()];
    const animate = !reduceMotion() && state.view === 'map';
    const before = animate ? new Map(els.map((el) => [el, el.getBoundingClientRect()])) : null;
    state.sorted = sorted;
    if (sorted) for (const n of notes) board.querySelector(`[data-cluster="${n.cluster.id}"] .am-notes`).append(noteEls.get(n.id));
    else for (const id of rawOrder) raw.append(noteEls.get(id));
    $('[data-action="sort"]').textContent = sorted ? 'Unsort the notes' : 'Sort into clusters';
    apply();
    if (!animate) return;
    els.forEach((el, i) => {
      const a = before.get(el);
      const b = el.getBoundingClientRect();
      const dx = a.left - b.left;
      const dy = a.top - b.top;
      if (!dx && !dy) return;
      el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }], {
        duration: 700,
        delay: (i % 24) * 12,
        easing: 'cubic-bezier(.2,.75,.2,1)',
        fill: 'backwards',
      });
    });
  }

  function setTrack(track) {
    state.track = track;
    // A bare #brand style hash lets a link open the map on one role.
    try {
      history.replaceState(null, '', track === 'all' ? location.pathname + location.search : `#${track}`);
    } catch {
      /* sandboxed frames may refuse; the filter still works */
    }
  }

  // ---- events (one delegated listener)
  function onClick(e) {
    const t = e.target.closest('button');
    if (!t || !root.contains(t)) return;
    if (t.dataset.view) state.view = t.dataset.view;
    else if (t.dataset.track) setTrack(t.dataset.track);
    else if (t.dataset.level) state.level = t.dataset.level;
    else if (t.dataset.sort) state.sortWords = t.dataset.sort;
    else if (t.dataset.word) {
      state.word = state.word === t.dataset.word ? null : t.dataset.word;
      if (state.word && state.view === 'words') {
        state.view = 'map';
        apply();
        board.scrollIntoView?.({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    } else if (t.dataset.action === 'sort') return setSorted(!state.sorted);
    else if (t.dataset.action === 'left') return scrollBoard(-1);
    else if (t.dataset.action === 'right') return scrollBoard(1);
    else if (t.dataset.action === 'clear') {
      state.word = null;
      state.query = '';
      state.level = 'all';
      setTrack('all');
      $('#am-query').value = '';
    } else return;
    apply();
  }
  function onInput(e) {
    if (e.target.id !== 'am-query') return;
    state.query = e.target.value.trim();
    apply();
  }
  function onHash() {
    state.track = fromHash();
    apply();
  }
  root.addEventListener('click', onClick);
  root.addEventListener('input', onInput);
  window.addEventListener('hashchange', onHash);
  board.addEventListener('scroll', updateEdges, { passive: true });
  window.addEventListener('resize', updateEdges);
  apply();
  // Open at the start of the wall, after the first reorder and font load.
  board.scrollLeft = 0;
  updateEdges();
  document.fonts?.ready.then(() => {
    board.scrollLeft = 0;
    updateEdges();
  });

  return () => {
    root.removeEventListener('click', onClick);
    root.removeEventListener('input', onInput);
    window.removeEventListener('hashchange', onHash);
    window.removeEventListener('resize', updateEdges);
    root.classList.remove('am', 'is-raw');
    root.innerHTML = '';
  };
}
