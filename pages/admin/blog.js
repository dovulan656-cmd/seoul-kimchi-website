import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/AdminLayout';
import { isAuthenticated } from '../../lib/adminAuth';
import { toast } from '../../components/Toast';
import Head from 'next/head';

const defaultBlogPosts = [
  {
    id: 1,
    title: 'Lợi Ích Sức Khỏe Của Kimchi',
    excerpt: 'Khám phá những lợi ích tuyệt vời của Kimchi cho sức khỏe, tiêu hóa.',
    date: '15/01/2025',
    emoji: '🥬',
    slug: '/blog-post-1'
  },
  {
    id: 2,
    title: 'Cách Nấu Tteokbokki Tại Nhà',
    excerpt: 'Hướng dẫn chi tiết cách làm Tteokbokki ngon như ngoài hàng.',
    date: '10/01/2025',
    emoji: '🍳',
    slug: '/blog-post-2'
  }
];

export default function AdminBlog() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    date: new Date().toLocaleDateString('vi-VN'),
    emoji: '📝',
    slug: ''
  });

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadPosts();
  }, [router]);

  const loadPosts = () => {
    const stored = localStorage.getItem('admin_blog');
    if (stored) {
      setPosts(JSON.parse(stored));
    } else {
      setPosts(defaultBlogPosts);
      localStorage.setItem('admin_blog', JSON.stringify(defaultBlogPosts));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingPost) {
      const updated = posts.map(p =>
        p.id === editingPost.id ? { ...formData, id: editingPost.id } : p
      );
      setPosts(updated);
      localStorage.setItem('admin_blog', JSON.stringify(updated));
      toast.success('Đã cập nhật bài viết!');
    } else {
      const newPost = {
        ...formData,
        id: Date.now()
      };
      const updated = [...posts, newPost];
      setPosts(updated);
      localStorage.setItem('admin_blog', JSON.stringify(updated));
      toast.success('Đã thêm bài viết mới!');
    }

    setShowModal(false);
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      date: new Date().toLocaleDateString('vi-VN'),
      emoji: '📝',
      slug: ''
    });
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData(post);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
      const updated = posts.filter(p => p.id !== id);
      setPosts(updated);
      localStorage.setItem('admin_blog', JSON.stringify(updated));
      toast.success('Đã xóa bài viết!');
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(posts, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blog.json';
    link.click();
    toast.success('Đã export dữ liệu!');
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Quản Lý Blog - Admin Dashboard</title>
      </Head>
      <AdminLayout>
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                Quản Lý Blog Posts
              </h1>
              <p style={{ color: '#6b7280' }}>
                Thêm, sửa và xóa bài viết blog ({posts.length} bài viết)
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleExport}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'white',
                  color: '#374151',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C8102E';
                  e.currentTarget.style.color = '#C8102E';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.color = '#374151';
                }}
              >
                <i className="fas fa-download"></i>
                Export JSON
              </button>
              <button
                onClick={() => {
                  setEditingPost(null);
                  setFormData({
                    title: '',
                    excerpt: '',
                    date: new Date().toLocaleDateString('vi-VN'),
                    emoji: '📝',
                    slug: ''
                  });
                  setShowModal(true);
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#C8102E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#991b1b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#C8102E';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <i className="fas fa-plus"></i>
                Thêm Bài Viết
              </button>
            </div>
          </div>

          {/* Posts Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {posts.map(post => (
              <div
                key={post.id}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{
                  fontSize: '3rem',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {post.emoji}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '0.75rem',
                  lineHeight: '1.4'
                }}>
                  {post.title}
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  color: '#6b7280',
                  marginBottom: '1rem',
                  lineHeight: '1.6'
                }}>
                  {post.excerpt}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#9ca3af'
                  }}>
                    {post.date}
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleEdit(post)}
                      style={{
                        padding: '0.5rem',
                        background: '#eff6ff',
                        color: '#3b82f6',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{
                        padding: '0.5rem',
                        background: '#fef2f2',
                        color: '#ef4444',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal */}
          {showModal && (
            <BlogModal
              formData={formData}
              setFormData={setFormData}
              editingPost={editingPost}
              onClose={() => {
                setShowModal(false);
                setEditingPost(null);
              }}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </AdminLayout>
    </>
  );
}

function BlogModal({ formData, setFormData, editingPost, onClose, onSubmit }) {
  const emojis = ['📝', '🥬', '🍳', '🌶️', '🧂', '❄️', '🍲', '🍱', '🥘', '🥗'];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}
    onClick={onClose}
    >
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '2rem',
        width: '100%',
        maxWidth: '600px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}
      onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            {editingPost ? 'Sửa Bài Viết' : 'Thêm Bài Viết Mới'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0.25rem'
            }}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Tiêu Đề *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Mô Tả Ngắn *
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Ngày Đăng *
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  placeholder="15/01/2025"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#374151',
                  marginBottom: '0.5rem'
                }}>
                  Slug *
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  required
                  placeholder="/blog-post-1"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Emoji
              </label>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '0.5rem'
              }}>
                {emojis.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormData({ ...formData, emoji })}
                    style={{
                      width: '3rem',
                      height: '3rem',
                      fontSize: '1.5rem',
                      border: formData.emoji === emoji ? '2px solid #C8102E' : '2px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      background: formData.emoji === emoji ? '#fef2f2' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={formData.emoji}
                onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '0.75rem',
              marginTop: '1rem',
              justifyContent: 'flex-end'
            }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'white',
                  color: '#374151',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Hủy
              </button>
              <button
                type="submit"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#C8102E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                {editingPost ? 'Cập Nhật' : 'Thêm Mới'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
