import { kv } from '@vercel/kv';
import { checkAuth } from './_lib/shared.js';

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  if (!checkAuth(req)) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const id = body?.id;
    if (!id || !id.startsWith('sub:')) {
      return res.status(400).json({ error: 'invalid id' });
    }
    await kv.del(id);
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: String(err) });
  }
}
