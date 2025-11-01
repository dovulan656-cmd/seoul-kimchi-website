import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/AdminLayout';
import { isAuthenticated } from '../../lib/adminAuth';
import { products as defaultProducts } from '../../data/products';
import { toast } from '../../components/Toast';
import Head from 'next/head';

export default function AdminProducts() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'kimchi',
    badge: ''
  });

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadProducts();
  }, [router]);

  const loadProducts = () => {
    const stored = localStorage.getItem('admin_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem('admin_products', JSON.stringify(defaultProducts));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      const updated = products.map(p =>
        p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p
      );
      setProducts(updated);
      localStorage.setItem('admin_products', JSON.stringify(updated));
      toast.success('Đã cập nhật sản phẩm!');
    } else {
      const newProduct = {
        ...formData,
        id: formData.id || `product-${Date.now()}`
      };
      const updated = [...products, newProduct];
      setProducts(updated);
      localStorage.setItem('admin_products', JSON.stringify(updated));
      toast.success('Đã thêm sản phẩm mới!');
    }

    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      id: '',
      name: '',
      description: '',
      price: '',
      image: '',
      category: 'kimchi',
      badge: ''
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem('admin_products', JSON.stringify(updated));
      toast.success('Đã xóa sản phẩm!');
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.json';
    link.click();
    toast.success('Đã export dữ liệu!');
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Quản Lý Sản Phẩm - Admin Dashboard</title>
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
                Quản Lý Sản Phẩm
              </h1>
              <p style={{ color: '#6b7280' }}>
                Thêm, sửa và xóa sản phẩm ({products.length} sản phẩm)
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
                  setEditingProduct(null);
                  setFormData({
                    id: '',
                    name: '',
                    description: '',
                    price: '',
                    image: '',
                    category: 'kimchi',
                    badge: ''
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
                Thêm Sản Phẩm
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Hình Ảnh</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Tên</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Giá</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Danh Mục</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Badge</th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontWeight: 600, color: '#374151' }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem' }}>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '0.5rem'
                          }}
                        />
                      </td>
                      <td style={{ padding: '1rem', fontWeight: 600, color: '#1f2937' }}>
                        {product.name}
                      </td>
                      <td style={{ padding: '1rem', color: '#C8102E', fontWeight: 600 }}>
                        {product.price}
                      </td>
                      <td style={{ padding: '1rem', color: '#6b7280' }}>
                        {product.category}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {product.badge && (
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            background: '#fef2f2',
                            color: '#C8102E',
                            borderRadius: '999px',
                            fontSize: '0.75rem',
                            fontWeight: 600
                          }}>
                            {product.badge}
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleEdit(product)}
                            style={{
                              padding: '0.5rem',
                              background: '#eff6ff',
                              color: '#3b82f6',
                              border: 'none',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#dbeafe';
                              e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#eff6ff';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            style={{
                              padding: '0.5rem',
                              background: '#fef2f2',
                              color: '#ef4444',
                              border: 'none',
                              borderRadius: '0.375rem',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#fee2e2';
                              e.currentTarget.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#fef2f2';
                              e.currentTarget.style.transform = 'scale(1)';
                            }}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal */}
          {showModal && (
            <ProductModal
              formData={formData}
              setFormData={setFormData}
              editingProduct={editingProduct}
              onClose={() => {
                setShowModal(false);
                setEditingProduct(null);
              }}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </AdminLayout>
    </>
  );
}

function ProductModal({ formData, setFormData, editingProduct, onClose, onSubmit }) {
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
        maxHeight: '90vh',
        overflowY: 'auto',
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
            {editingProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}
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
                Tên Sản Phẩm *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                Mô Tả *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  Giá *
                </label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  placeholder="145.000đ"
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
                  Danh Mục *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                >
                  <option value="kimchi">Kimchi</option>
                  <option value="tteok">Tteokbokki</option>
                  <option value="seasonings">Gia Vị</option>
                </select>
              </div>
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
                  URL Hình Ảnh *
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  placeholder="https://..."
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
                  Badge (tùy chọn)
                </label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Bán Chạy, Mới, Premium..."
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
                  fontWeight: 600,
                  transition: 'all 0.2s'
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
                  fontWeight: 600,
                  transition: 'all 0.2s'
                }}
              >
                {editingProduct ? 'Cập Nhật' : 'Thêm Mới'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
