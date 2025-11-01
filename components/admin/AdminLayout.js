import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { logout, isAuthenticated } from '../../lib/adminAuth';
import { toast } from '../Toast';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthenticated()) {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    toast.success('Đã đăng xuất thành công');
    router.push('/admin/login');
  };

  if (!mounted) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '1.125rem',
        color: '#6b7280'
      }}>
        Đang tải...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
    }}>
      {/* Sidebar */}
      <aside style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '260px',
        height: '100vh',
        background: 'white',
        boxShadow: '2px 0 10px rgba(0,0,0,0.05)',
        padding: '2rem 0',
        overflowY: 'auto',
        zIndex: 100
      }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#C8102E',
            marginBottom: '0.5rem'
          }}>
            SEOUL KIMCHI
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Admin Dashboard
          </p>
        </div>

        <nav style={{ padding: '0 1rem' }}>
          <NavLink href="/admin" icon="🏠" label="Tổng Quan" />
          <NavLink href="/admin/images" icon="🖼️" label="Hình Ảnh" />
          <NavLink href="/admin/products" icon="📦" label="Sản Phẩm" />
          <NavLink href="/admin/blog" icon="📝" label="Blog Posts" />
        </nav>

        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: 0,
          right: 0,
          padding: '0 1.5rem'
        }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.9375rem',
              fontWeight: 600,
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#dc2626';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#ef4444';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <i className="fas fa-sign-out-alt"></i>
            Đăng Xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        marginLeft: '260px',
        padding: '2rem',
        minHeight: '100vh'
      }}>
        {children}
      </main>
    </div>
  );
}

function NavLink({ href, icon, label }) {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          padding: '0.75rem 1rem',
          marginBottom: '0.5rem',
          borderRadius: '0.5rem',
          cursor: 'pointer',
          background: isActive ? '#fef2f2' : 'transparent',
          color: isActive ? '#C8102E' : '#4b5563',
          fontWeight: isActive ? 600 : 400,
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          transition: 'all 0.2s',
          borderLeft: isActive ? '3px solid #C8102E' : '3px solid transparent'
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = '#f9fafb';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        <span style={{ fontSize: '1.25rem' }}>{icon}</span>
        <span>{label}</span>
      </div>
    </Link>
  );
}
