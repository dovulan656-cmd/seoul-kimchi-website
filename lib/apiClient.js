/**
 * API client for admin dashboard
 * Handles authentication and API calls
 */

export function getAuthHeader() {
  if (typeof window === 'undefined') return '';
  
  const session = localStorage.getItem('admin_session');
  if (!session) return '';
  
  try {
    const parsed = JSON.parse(session);
    if (parsed.authenticated) {
      return Buffer.from(JSON.stringify(parsed)).toString('base64');
    }
  } catch {
    return '';
  }
  
  return '';
}

export async function apiRequest(url, options = {}) {
  const authHeader = getAuthHeader();
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': authHeader,
      'Content-Type': options.headers?.['Content-Type'] || 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

export async function uploadImage(file, folder = 'products') {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', folder);
  
  const authHeader = getAuthHeader();
  
  const response = await fetch('/api/images/upload', {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Upload failed' }));
    throw new Error(error.error || 'Upload failed');
  }

  return response.json();
}

export async function deleteImage(url) {
  return apiRequest(`/api/images/delete?url=${encodeURIComponent(url)}`, {
    method: 'DELETE',
  });
}

export async function getProducts() {
  const response = await fetch('/api/products');
  const data = await response.json();
  return data.products || [];
}

export async function createProduct(product) {
  return apiRequest('/api/products', {
    method: 'POST',
    body: JSON.stringify(product),
  });
}

export async function updateProduct(product) {
  return apiRequest('/api/products', {
    method: 'PUT',
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id) {
  return apiRequest(`/api/products?id=${id}`, {
    method: 'DELETE',
  });
}

export async function getBlogPosts() {
  const response = await fetch('/api/blog');
  const data = await response.json();
  return data.posts || [];
}

export async function createBlogPost(post) {
  return apiRequest('/api/blog', {
    method: 'POST',
    body: JSON.stringify(post),
  });
}

export async function updateBlogPost(post) {
  return apiRequest('/api/blog', {
    method: 'PUT',
    body: JSON.stringify(post),
  });
}

export async function deleteBlogPost(id) {
  return apiRequest(`/api/blog?id=${id}`, {
    method: 'DELETE',
  });
}
