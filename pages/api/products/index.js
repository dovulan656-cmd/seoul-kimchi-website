import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'products.js');

function isValidSession(session) {
  try {
    const decoded = JSON.parse(Buffer.from(session, 'base64').toString());
    return decoded.authenticated === true;
  } catch {
    return false;
  }
}

function readProducts() {
  try {
    const fileContent = fs.readFileSync(dataFilePath, 'utf8');
    // Extract products array from file
    const match = fileContent.match(/export const products = (\[[\s\S]*\]);/);
    if (match) {
      return JSON.parse(match[1]);
    }
    return [];
  } catch (error) {
    console.error('Read error:', error);
    return [];
  }
}

function writeProducts(products) {
  try {
    const content = `export const products = ${JSON.stringify(products, null, 2)};\n`;
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
    const products = readProducts();
    return res.status(200).json({ products });
  }

  if (!session || !isValidSession(session)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const product = req.body;
    const products = readProducts();
    
    const newProduct = {
      ...product,
      id: product.id || `product-${Date.now()}`,
    };
    
    products.push(newProduct);
    
    if (writeProducts(products)) {
      return res.status(201).json({ success: true, product: newProduct });
    }
    return res.status(500).json({ error: 'Failed to save product' });
  }

  if (req.method === 'PUT') {
    const { id, ...updates } = req.body;
    const products = readProducts();
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    products[index] = { ...products[index], ...updates };
    
    if (writeProducts(products)) {
      return res.status(200).json({ success: true, product: products[index] });
    }
    return res.status(500).json({ error: 'Failed to update product' });
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    const products = readProducts();
    const filtered = products.filter(p => p.id !== id);
    
    if (filtered.length === products.length) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    if (writeProducts(filtered)) {
      return res.status(200).json({ success: true });
    }
    return res.status(500).json({ error: 'Failed to delete product' });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
