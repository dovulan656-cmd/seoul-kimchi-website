import { del } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check authentication
  const session = req.headers.authorization;
  if (!session || !isValidSession(session)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(500).json({ 
      error: 'BLOB_READ_WRITE_TOKEN not configured. Please add it in Vercel environment variables.' 
    });
  }

  try {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({ error: 'No URL provided' });
    }

    // Delete from Vercel Blob
    await del(url, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return res.status(200).json({ success: true, message: 'Image deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ error: 'Failed to delete image', details: error.message });
  }
}

function isValidSession(session) {
  try {
    const decoded = JSON.parse(Buffer.from(session, 'base64').toString());
    return decoded.authenticated === true;
  } catch {
    return false;
  }
}
