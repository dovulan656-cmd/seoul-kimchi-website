import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { login, isAuthenticated } from '../../lib/adminAuth';
import { toast } from '../../components/Toast';
import Head from 'next/head';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isAuthenticated()) {
      router.push('/admin');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (login(password)) {
      toast.success('Đăng nhập thành công!');
      setTimeout(() => {
        router.push('/admin');
      }, 500);
    } else {
      toast.error('Mật khẩu không đúng!');
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Admin Login - SEOUL KIMCHI</title>
      </Head>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
        padding: '2rem'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          padding: '3rem',
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '1rem'
            }}>
              🌶️
            </div>
            <h1 style={{
              fontSize: '1.875rem',
              fontWeight: 'bold',
              color: '#C8102E',
              marginBottom: '0.5rem'
            }}>
              SEOUL KIMCHI
            </h1>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>
              Admin Dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                Mật Khẩu
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#C8102E';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(200, 16, 46, 0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#d1d5db';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                placeholder="Nhập mật khẩu"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '0.875rem',
                background: loading ? '#d1d5db' : '#C8102E',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#991b1b';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.background = '#C8102E';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: '1rem', height: '1rem', borderWidth: '2px' }}></span>
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Đăng Nhập
                </>
              )}
            </button>
          </form>

          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#fef2f2',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            color: '#991b1b'
          }}>
            <strong>Lưu ý:</strong> Mật khẩu mặc định là <code style={{
              background: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontFamily: 'monospace'
            }}>admin123</code>. Vui lòng đổi mật khẩu trong <code style={{
              background: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontFamily: 'monospace'
            }}>lib/adminAuth.js</code>
          </div>
        </div>
      </div>
    </>
  );
}
