'use client';

import { useState } from 'react';

export default function BlogImage({ 
  src, 
  alt = 'Blog Seoul Kimchi',
  priority = false,
  className = '',
  style = {},
  thumbnail = false
}) {
  const [imageError, setImageError] = useState(false);
  const imageStyle = thumbnail 
    ? {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '0.75rem 0.75rem 0 0'
      }
    : {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '0.75rem',
        display: 'block'
      };

  if (imageError) {
    return (
      <div 
        className={`blog-image-container ${className}`}
        style={{
          width: '100%',
          overflow: 'hidden',
          borderRadius: thumbnail ? '0.75rem 0.75rem 0 0' : '0.75rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          margin: thumbnail ? '0' : '2rem 0',
          position: 'relative',
          background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
          color: '#C8102E',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          ...(thumbnail ? { height: '200px' } : { padding: '80px 20px' }),
          ...style
        }}
      >
        {alt || 'Blog SEOUL KIMCHI'}
      </div>
    );
  }

  return (
    <div 
      className={`blog-image-container ${className}`}
      style={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: thumbnail ? '0.75rem 0.75rem 0 0' : '0.75rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        margin: thumbnail ? '0' : '2rem 0',
        position: 'relative',
        transition: 'all 0.4s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        if (!thumbnail) {
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(200, 16, 46, 0.2)';
          e.currentTarget.style.transform = 'translateY(-5px)';
        }
      }}
      onMouseLeave={(e) => {
        if (!thumbnail) {
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          ...imageStyle,
          transition: 'transform 0.6s ease'
        }}
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setImageError(true)}
        onMouseEnter={(e) => {
          if (!thumbnail) {
            e.target.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      />
    </div>
  );
}

