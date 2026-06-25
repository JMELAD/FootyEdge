// api/stats.js
// Returns a player's recent game disposals scraped from AFL Tables.
// Response: { player, games: [ { opp: "<your team name>", di: <disposals> }, ... ] }
// games are chronological — MOST RECENT LAST. The app slices last 5 + last 5 vs opponent.
//
// CALIBRATION: if a player returns no games, hit the URL with &debug=1 to see the
// detected header + first parsed rows, e.g.
//   /api/stats?player=Marcus Bontempelli&team=Western Bulldogs&debug=1

function normaliseTeam(text) {
  const t = (text || '').toLowerCase();
  if (t.includes('greater western') || t.includes('gw sydney')) return 'GWS Giants';
  if (t.includes('north melbourne') || t.includes('kangaroo')) return 'North Melbourne';
  if (t.includes('gold coast')) return 'Gold Coast Suns';
  if (t.includes('west coast')) return 'West Coast Eagles';
  if (t.includes('port adelaide')) return 'Port Adelaide';
  if (t.includes('western bulldog') || t.includes('footscray') || t.includes('bulldog')) return 'Western Bulldogs';
  if (t.includes('kilda')) return 'St Kilda';
  if (t.includes('adelaide')) return 'Adelaide Crows';
  if (t.includes('brisbane')) return 'Brisbane Lions';
  if (t.includes('geelong')) return 'Geelong Cats';
  if (t.includes('sydney')) return 'Sydney Swans';
  if (t.includes('carlton')) return 'Carlton';
  if (t.includes('collingwood')) return 'Collingwood';
  if (t.includes('essendon')) return 'Essendon';
  if (t.includes('fremantle')) return 'Fremantle';
  if (t.includes('hawthorn')) return 'Hawthorn';
  if (t.includes('melbourne')) return 'Melbourne';
  if (t.includes('richmond')) return 'Richmond';
  return text;
}

// AFL Tables stores players at /players/<FirstNameInitial>/<First_Last>.html
function playerUrl(name) {
  const clean = String(name).trim();
  const initial = clean.charAt(0).toUpperCase();
  const slug = clean.replace(/\s+/g, '_'); // keeps hyphens & apostrophes
  return `https://afltables.com/afl/stats/players/${initial}/${encodeURI(slug)}.html`;
}

function stripTags(s) {
  return s.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
}

export default async function handler(req, res) {
  const name = (req.query.player || '').toString();
  const debug = req.query.debug;
  if (!name) return res.status(400).json({ error: 'missing player' });

  const url = playerUrl(name);
  let html;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (FootyEdge)' } });
    if (!r.ok) return res.status(200).json({ player: name, url, games: [], note: `page ${r.status}` });
    html = await r.text();
  } catch (e) {
    return res.status(200).json({ player: name, url, games: [], note: 'fetch failed' });
  }

  const rows = html.match(/<tr[\s\S]*?<\/tr>/gi) || [];
  let diIdx = -1, oppIdx = -1;
  const games = [];
  const debugRows = [];

  for (const row of rows) {
    const cells = row.match(/<t[dh][\s\S]*?<\/t[dh]>/gi) || [];
    const text = cells.map(stripTags);
    if (!text.length) continue;

    // Header row: has a standalone "DI" cell. Lock the column indices.
    const di = text.findIndex(c => c === 'DI');
    if (di !== -1) {
      diIdx = di;
      oppIdx = text.findIndex(c => /^opp/i.test(c));
      if (debug && !debugRows.some(d => d.type === 'header')) debugRows.push({ type: 'header', cells: text });
      continue;
    }

    // Data row: real games link to a game page. Skip season-summary rows.
    if (!/\/afl\/stats\/games\//i.test(row) || diIdx === -1) continue;

    const diVal = parseInt(text[diIdx], 10);
    if (isNaN(diVal)) continue;

    let oppText = '';
    const teamLink = row.match(/\/afl\/teams\/[^"']*?\.html"[^>]*>([^<]+)</i);
    if (teamLink) oppText = teamLink[1];
    else if (oppIdx !== -1 && text[oppIdx]) oppText = text[oppIdx];

    if (debug && debugRows.filter(d => d.type === 'game').length < 3) debugRows.push({ type: 'game', cells: text });

    games.push({ opp: normaliseTeam(oppText), di: diVal });
  }

  if (debug) {
    return res.status(200).json({ player: name, url, diIdx, oppIdx, totalGames: games.length, sampleRows: debugRows });
  }

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
  return res.status(200).json({ player: name, games: games.slice(-20) });
}
