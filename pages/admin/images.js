import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/AdminLayout';
import { isAuthenticated } from '../../lib/adminAuth';
import { toast } from '../../components/Toast';
import Head from 'next/head';

export default function AdminImages() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('products');
  const [uploading, setUploading] = useState(false);

  const folders = [
    { value: 'products', label: 'Sản Phẩm', icon: '📦' },
    { value: 'banners', label: 'Banners', icon: '🖼️' },
    { value: 'blog', label: 'Blog', icon: '📝' },
    { value: 'certificates', label: 'Chứng Nhận', icon: '🏆' },
    { value: 'process', label: 'Quy Trình', icon: '⚙️' },
    { value: 'icons', label: 'Icons', icon: '🎨' },
    { value: 'backgrounds', label: 'Backgrounds', icon: '🎬' }
  ];

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }
    loadImages();
  }, [router, selectedFolder]);

  const loadImages = () => {
    // Load images from localStorage
    const stored = localStorage.getItem(`admin_images_${selectedFolder}`);
    if (stored) {
      setImages(JSON.parse(stored));
    } else {
      setImages([]);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);

    const newImages = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      folder: selectedFolder,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString()
    }));

    const updated = [...images, ...newImages];
    setImages(updated);
    localStorage.setItem(`admin_images_${selectedFolder}`, JSON.stringify(updated));
    localStorage.setItem('admin_images', JSON.stringify(
      JSON.parse(localStorage.getItem('admin_images') || '[]').concat(newImages)
    ));

    toast.success(`Đã upload ${files.length} hình ảnh!`);
    setUploading(false);
    e.target.value = ''; // Reset input
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc muốn xóa hình ảnh này?')) {
      const updated = images.filter(img => img.id !== id);
      setImages(updated);
      localStorage.setItem(`admin_images_${selectedFolder}`, JSON.stringify(updated));
      
      const allImages = JSON.parse(localStorage.getItem('admin_images') || '[]');
      const updatedAll = allImages.filter(img => img.id !== id);
      localStorage.setItem('admin_images', JSON.stringify(updatedAll));

      toast.success('Đã xóa hình ảnh!');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Quản Lý Hình Ảnh - Admin Dashboard</title>
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
                Quản Lý Hình Ảnh
              </h1>
              <p style={{ color: '#6b7280' }}>
                Upload, xem và quản lý hình ảnh
              </p>
            </div>
            <label style={{
              padding: '0.75rem 1.5rem',
              background: '#C8102E',
              color: 'white',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontWeight: 600,
              display: 'inline-flex',
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
              <i className="fas fa-upload"></i>
              {uploading ? 'Đang upload...' : 'Upload Hình Ảnh'}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
                disabled={uploading}
              />
            </label>
          </div>

          {/* Folder Selector */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {folders.map(folder => (
              <button
                key={folder.value}
                onClick={() => setSelectedFolder(folder.value)}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: selectedFolder === folder.value ? '#C8102E' : 'white',
                  color: selectedFolder === folder.value ? 'white' : '#4b5563',
                  border: `2px solid ${selectedFolder === folder.value ? '#C8102E' : '#e5e7eb'}`,
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontWeight: selectedFolder === folder.value ? 600 : 400,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (selectedFolder !== folder.value) {
                    e.currentTarget.style.borderColor = '#C8102E';
                    e.currentTarget.style.color = '#C8102E';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedFolder !== folder.value) {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.color = '#4b5563';
                  }
                }}
              >
                <span>{folder.icon}</span>
                <span>{folder.label}</span>
              </button>
            ))}
          </div>

          {/* Images Grid */}
          {images.length === 0 ? (
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '4rem',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📸</div>
              <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                Chưa có hình ảnh nào
              </p>
              <p>Hãy upload hình ảnh để bắt đầu</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.5rem'
            }}>
              {images.map(image => (
                <div
                  key={image.id}
                  style={{
                    background: 'white',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s',
                    position: 'relative'
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
                    width: '100%',
                    paddingTop: '100%',
                    position: 'relative',
                    background: '#f3f4f6'
                  }}>
                    <img
                      src={image.url}
                      alt={image.name}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <button
                      onClick={() => handleDelete(image.id)}
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        width: '2rem',
                        height: '2rem',
                        background: 'rgba(239, 68, 68, 0.9)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#dc2626';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.9)';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <p style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: '#1f2937',
                      marginBottom: '0.25rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {image.name}
                    </p>
                    <p style={{
                      fontSize: '0.75rem',
                      color: '#6b7280'
                    }}>
                      {formatFileSize(image.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </AdminLayout>
    </>
  );
}
