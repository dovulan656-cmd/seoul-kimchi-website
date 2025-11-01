import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'blog.js');

function isValidSession(session) {
  try {
    const decoded = JSON.parse(Buffer.from(session, 'base64').toString());
    return decoded.authenticated === true;
  } catch {
    return false;
  }
}

function readBlogPosts() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      // Create default file
      writeBlogPosts([]);
      return [];
    }
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    const match = fileContent.match(/export const blogPosts = (\[[\s\S]*\]);/);
    if (match) {
      return JSON.parse(match[1]);
    }
    return [];
  } catch (error) {
    console.error('Read error:', error);
    return [];
  }
}

function writeBlogPosts(posts) {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const content = `export const blogPosts = ${JSON.stringify(posts, null, 2)};\n`;
    fs.writeFileSync(dataFilePath, content, 'utf8');
    return true;
  } catch (error) {
    console.error('Write error:', error);
    return false;
  }
}

export default function handler(req, res) {
  const session = req.headers.authorization;

  if (req.method === 'GET') {
    const posts = readBlogPosts();
    return res.status(200).json({ posts });
  }

  if (!session || !isValidSession(session)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const post = req.body;
    const posts = readBlogPosts();
    
    const newPost = {
      ...post,
      id: post.id || Date.now(),
    };
    
    posts.push(newPost);
    
    if (writeBlogPosts(posts)) {
      return res.status(201).json({ success: true, post: newPost });
    }
    return res.status(500).json({ error: 'Failed to save post' });
  }

  if (req.method === 'PUT') {
    const { id, ...updates } = req.body;
    const posts = readBlogPosts();
    const index = posts.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    posts[index] = { ...posts[index], ...updates };
    
    if (writeBlogPosts(posts)) {
      return res.status(200).json({ success: true, post: posts[index] });
    }
    return res.status(500).json({ error: 'Failed to update post' });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const posts = readBlogPosts();
    const filtered = posts.filter(p => p.id !== id);
    
    if (filtered.length === posts.length) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    if (writeBlogPosts(filtered)) {
      return res.status(200).json({ success: true });
    }
    return res.status(500).json({ error: 'Failed to delete post' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
