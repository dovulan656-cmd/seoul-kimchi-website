'use client';

import { useState } from 'react';

export default function CertificateImage({ 
  src, 
  alt = 'Chứng nhận Seoul Kimchi',
  title = null,
  priority = false,
  className = '',
  style = {},
  downloadable = false
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <div 
      className={`certificate-image-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '1rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        background: 'white',
        border: '1px solid rgba(200, 16, 46, 0.1)',
        transition: 'all 0.4s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(200, 16, 46, 0.2)';
        e.currentTarget.style.borderColor = '#C8102E';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = 'rgba(200, 16, 46, 0.1)';
      }}
    >
      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: '75%', // 4:3 aspect ratio
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fff 100%)'
      }}>
        {imageError ? (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            padding: '80px 20px',
            background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
            color: '#C8102E',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '1rem'
          }}>
            {alt || 'Chứng nhận SEOUL KIMCHI'}
          </div>
        ) : (
          <img
            src={src}
            alt={alt}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              padding: '1rem',
              transition: 'transform 0.6s ease'
            }}
            loading={priority ? 'eager' : 'lazy'}
            onError={() => setImageError(true)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          />
        )}
      </div>

      {title && (
        <div style={{
          padding: '1.5rem',
          borderTop: '1px solid rgba(200, 16, 46, 0.1)',
          background: 'white'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0,
            textAlign: 'center'
          }}>
            {title}
          </h3>
        </div>
      )}

      {downloadable && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'rgba(200, 16, 46, 0.9)',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '50%',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 2
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#C8102E';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(200, 16, 46, 0.9)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        onClick={() => {
          const link = document.createElement('a');
          link.href = src;
          link.download = alt || 'certificate';
          link.click();
        }}
        title="Tải xuống"
        >
          <i className="fas fa-download"></i>
        </div>
      )}
    </div>
  );
}

