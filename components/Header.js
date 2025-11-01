import Link from 'next/link';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { CONTACT, getPhoneLink } from '../lib/config';

// Dynamic import DarkModeToggle to avoid SSR issues (uses localStorage)
const DarkModeToggle = dynamic(() => import('./DarkModeToggle'), {
  ssr: false
});

export default function Header({ onContactClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="header-sticky" role="banner">
      <div className="header-top">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <a href={getPhoneLink()} style={{color: 'white', textDecoration: 'none', fontSize: '0.875rem', marginRight: '1rem'}}>
                <i className="fas fa-phone" aria-hidden="true"></i> {CONTACT.phoneDisplay}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="hidden md:inline" style={{color: 'white', textDecoration: 'none', fontSize: '0.875rem'}}>
                <i className="fas fa-envelope" aria-hidden="true"></i> {CONTACT.email}
              </a>
            </div>
            <div className="flex" style={{gap: '0.75rem', fontSize: '1.125rem'}}>
              <a href="https://facebook.com/seoulkimchi" target="_blank" rel="noopener" aria-label="Facebook" style={{color: 'white', textDecoration: 'none'}}>
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://instagram.com/seoulkimchi" target="_blank" rel="noopener" aria-label="Instagram" style={{color: 'white', textDecoration: 'none'}}>
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com/@seoulkimchi" target="_blank" rel="noopener" aria-label="YouTube" style={{color: 'white', textDecoration: 'none'}}>
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container">
          <div className="flex justify-between items-center">
            <Link href="/" className="logo-brand">
              <div className="text-2xl">
                <div className="text-red-700 font-display">SEOUL KIMCHI</div>
                <div className="text-xs" style={{color: '#4b5563'}}>🌶️ Since 1968 | HAN FOOD VINA</div>
              </div>
            </Link>

            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <DarkModeToggle />
            </div>
            
            <nav className="desktop-nav" role="navigation" aria-label="Main">
              <Link href="/" className="nav-link font-semibold"><i className="fas fa-home" aria-hidden="true"></i> Trang Chủ</Link>
              <Link href="/products" className="nav-link font-semibold"><i className="fas fa-shopping-bag" aria-hidden="true"></i> Sản Phẩm</Link>
              <Link href="/blog" className="nav-link font-semibold"><i className="fas fa-blog" aria-hidden="true"></i> Blog</Link>
              <Link href="/process" className="nav-link font-semibold"><i className="fas fa-flask" aria-hidden="true"></i> Quy Trình</Link>
              <Link href="/certifications" className="nav-link font-semibold"><i className="fas fa-certificate" aria-hidden="true"></i> Chứng Nhận</Link>
              <button 
                onClick={onContactClick} 
                className="nav-link font-semibold" 
                style={{
                  background: 'linear-gradient(135deg, var(--red), #ff6b6b)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '0.5rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(200, 16, 46, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                aria-label="Liên hệ với chúng tôi"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(200, 16, 46, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(200, 16, 46, 0.3)';
                }}
              >
                <i className="fas fa-phone" aria-hidden="true"></i> Liên Hệ
              </button>
            </nav>

            <button 
              className="mobile-menu-btn" 
              style={{fontSize: '1.5rem', padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', display: 'block'}}
              aria-label="Toggle menu" 
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <nav 
            className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}
            role="navigation" 
            aria-label="Mobile"
          >
            <Link href="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}><i className="fas fa-home" aria-hidden="true"></i> Trang Chủ</Link>
            <Link href="/products" className="nav-link" onClick={() => setMobileMenuOpen(false)}><i className="fas fa-shopping-bag" aria-hidden="true"></i> Sản Phẩm</Link>
            <Link href="/blog" className="nav-link" onClick={() => setMobileMenuOpen(false)}><i className="fas fa-blog" aria-hidden="true"></i> Blog</Link>
            <Link href="/process" className="nav-link" onClick={() => setMobileMenuOpen(false)}><i className="fas fa-flask" aria-hidden="true"></i> Quy Trình</Link>
            <Link href="/certifications" className="nav-link" onClick={() => setMobileMenuOpen(false)}><i className="fas fa-certificate" aria-hidden="true"></i> Chứng Nhận</Link>
            <button 
              onClick={() => { onContactClick(); setMobileMenuOpen(false); }} 
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'linear-gradient(135deg, var(--red), #ff6b6b)',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                padding: '1rem',
                borderRadius: '0.5rem',
                fontWeight: 600,
                marginTop: '0.5rem'
              }}
              aria-label="Liên hệ với chúng tôi"
            >
              <i className="fas fa-phone" aria-hidden="true"></i> Liên Hệ
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
