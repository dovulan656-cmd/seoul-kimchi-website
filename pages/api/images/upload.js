import { put } from '@vercel/blob';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
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
    const form = new IncomingForm({
      maxFileSize: 10 * 1024 * 1024, // 10MB
      keepExtensions: true,
    });

    const [fields, files] = await form.parse(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const folder = Array.isArray(fields.folder) ? fields.folder[0] : (fields.folder || 'products');

    if (!file) {
      return res.status(400).json({ error: 'No file provided' });
    }

    // Read file
    const fileBuffer = fs.readFileSync(file.filepath);
    const fileName = file.originalFilename || `image-${Date.now()}.${file.mimetype?.split('/')[1] || 'jpg'}`;

    // Upload to Vercel Blob
    const blob = await put(`images/${folder}/${fileName}`, fileBuffer, {
      access: 'public',
      contentType: file.mimetype || 'image/jpeg',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Clean up temp file
    try {
      fs.unlinkSync(file.filepath);
    } catch (e) {
      // Ignore cleanup errors
    }

    return res.status(200).json({
      success: true,
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      uploadedAt: blob.uploadedAt,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Failed to upload image', 
      details: error.message 
    });
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