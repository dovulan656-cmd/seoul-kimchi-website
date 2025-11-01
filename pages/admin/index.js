import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/admin/AdminLayout';
import { isAuthenticated } from '../../lib/adminAuth';
import Head from 'next/head';

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState({
    products: 0,
    images: 0,
    blogPosts: 0
  });

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated()) {
      router.push('/admin/login');
      return;
    }

    // Load stats from localStorage
    const productsData = localStorage.getItem('admin_products');
    const imagesData = localStorage.getItem('admin_images');
    const blogData = localStorage.getItem('admin_blog');

    setStats({
      products: productsData ? JSON.parse(productsData).length : 0,
      images: imagesData ? JSON.parse(imagesData).length : 0,
      blogPosts: blogData ? JSON.parse(blogData).length : 0
    });
  }, [router]);

  if (!mounted) {
    return null;
  }

  const StatCard = ({ icon, label, value, color }) => (
    <div style={{
      background: 'white',
      borderRadius: '1rem',
      padding: '2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      border: `2px solid ${color}20`,
      transition: 'all 0.3s',
      cursor: 'pointer'
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
        fontSize: '2.5rem',
        marginBottom: '1rem'
      }}>
        {icon}
      </div>
      <div style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        color: color,
        marginBottom: '0.5rem'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '0.9375rem',
        color: '#6b7280',
        fontWeight: 500
      }}>
        {label}
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>Admin Dashboard - SEOUL KIMCHI</title>
      </Head>
      <AdminLayout>
        <div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }}>
            Tổng Quan
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Quản lý nội dung và hình ảnh của website
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <StatCard
              icon="📦"
              label="Sản Phẩm"
              value={stats.products}
              color="#C8102E"
            />
            <StatCard
              icon="🖼️"
              label="Hình Ảnh"
              value={stats.images}
              color="#3b82f6"
            />
            <StatCard
              icon="📝"
              label="Blog Posts"
              value={stats.blogPosts}
              color="#10b981"
            />
          </div>

          <div style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Hướng Dẫn Sử Dụng
            </h2>
            <div style={{ color: '#4b5563', lineHeight: '1.8' }}>
              <p style={{ marginBottom: '1rem' }}>
                <strong>🖼️ Quản Lý Hình Ảnh:</strong> Upload, xem và xóa hình ảnh trong thư mục <code style={{
                  background: '#f3f4f6',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontFamily: 'monospace'
                }}>public/image/</code>
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>📦 Quản Lý Sản Phẩm:</strong> Thêm, sửa, xóa sản phẩm. Dữ liệu được lưu tạm thời trong localStorage và có thể export ra JSON.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                <strong>📝 Quản Lý Blog:</strong> Thêm, sửa, xóa bài viết blog. Dữ liệu được lưu tạm thời và có thể export.
              </p>
              <p style={{
                padding: '1rem',
                background: '#fef2f2',
                borderRadius: '0.5rem',
                color: '#991b1b',
                marginTop: '1rem'
              }}>
                <strong>⚠️ Lưu ý:</strong> Vì website sử dụng static export, dữ liệu chỉ được lưu tạm thời trong localStorage. 
                Bạn cần export dữ liệu và cập nhật vào các file trong thư mục <code style={{
                  background: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontFamily: 'monospace'
                }}>data/</code> sau khi chỉnh sửa.
              </p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
