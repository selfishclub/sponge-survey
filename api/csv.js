import { kv } from '@vercel/kv';
import { HEADERS, csvEscape, checkAuth } from './_lib/shared.js';

async function listAll() {
  const keys = [];
  let cursor = 0;
  do {
    const [next, batch] = await kv.scan(cursor, { match: 'sub:*', count: 100 });
    keys.push(...batch);
    cursor = Number(next);
  } while (cursor !== 0);

  if (keys.length === 0) return [];
  const items = await kv.mget(...keys);
  return items
    .filter(Boolean)
    .sort((a, b) => (a.submittedAt || '').localeCompare(b.submittedAt || ''));
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  try {
    const items = await listAll();
    const lines = [HEADERS.map(csvEscape).join(',')];
    for (const it of items) {
      lines.push(HEADERS.map((h) => csvEscape(it[h])).join(','));
    }
    const csv = '\uFEFF' + lines.join('\r\n');
    const filename = `sponge-survey-${new Date().toISOString().slice(0, 10)}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(csv);
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
