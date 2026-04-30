import { kv } from '@vercel/kv';
import { checkAuth } from './_lib/shared.js';

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
    return res.status(200).json({ count: items.length, items });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
