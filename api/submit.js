import { kv } from '@vercel/kv';
import { normalize } from './_lib/shared.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'method not allowed' });
  }
  try {
    const raw = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const record = normalize(raw);
    const id = `sub:${record.submittedAt}:${Math.random().toString(36).slice(2, 10)}`;
    await kv.set(id, record);
    return res.status(200).json({ success: true, id });
  } catch (err) {
    return res.status(500).json({ success: false, error: String(err) });
  }
}
