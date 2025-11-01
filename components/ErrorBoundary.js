'use client';

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log to external service if needed (e.g., Sentry)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    // Force page reload if needed
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: 'linear-gradient(135deg, #fef2f2 0%, #fff 100%)'
        }}>
          <div style={{
            maxWidth: '600px',
            textAlign: 'center',
            background: 'white',
            padding: '3rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#C8102E',
              marginBottom: '1rem'
            }}>
              Đã xảy ra lỗi
            </h1>
            <p style={{
              color: '#6b7280',
              marginBottom: '2rem',
              lineHeight: '1.7'
            }}>
              Xin lỗi, đã có lỗi xảy ra khi tải trang. Vui lòng thử lại sau.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: '#C8102E',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#a00'}
                onMouseLeave={(e) => e.target.style.background = '#C8102E'}
              >
                🔄 Tải lại trang
              </button>
              <a
                href="/"
                style={{
                  background: 'white',
                  color: '#C8102E',
                  border: '2px solid #C8102E',
                  padding: '0.75rem 2rem',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#fee2e2';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                }}
              >
                🏠 Về trang chủ
              </a>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{
                marginTop: '2rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '0.5rem',
                textAlign: 'left'
              }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: '#6b7280' }}>
                  Chi tiết lỗi (chỉ hiển thị trong development)
                </summary>
                <pre style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: '#1f2937',
                  color: '#f9fafb',
                  borderRadius: '0.5rem',
                  overflow: 'auto',
                  fontSize: '0.875rem'
                }}>
                  {this.state.error.toString()}
                  {this.state.error.stack && `\n${this.state.error.stack}`}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

