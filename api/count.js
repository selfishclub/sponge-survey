import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  try {
    let count = 0;
    let cursor = 0;
    do {
      const [next, batch] = await kv.scan(cursor, { match: 'sub:*', count: 100 });
      count += batch.length;
      cursor = Number(next);
    } while (cursor !== 0);
    return res.status(200).json({ count });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
