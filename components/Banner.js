'use client';

import { useState } from 'react';

export default function Banner({ 
  src, 
  alt = 'Banner Seoul Kimchi',
  priority = false,
  className = '',
  style = {}
}) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div 
        className={`banner-container ${className}`}
        style={{
          width: '100%',
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          color: '#C8102E',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          borderRadius: '0.75rem',
          margin: '2rem 0',
          ...style
        }}
      >
        {alt || 'Banner SEOUL KIMCHI'}
      </div>
    );
  }

  return (
    <div 
      className={`banner-container ${className}`}
      style={{
        width: '100%',
        overflow: 'hidden',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        margin: '2rem 0',
        position: 'relative',
        ...style
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'cover',
          transition: 'transform 0.6s ease'
        }}
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setImageError(true)}
      />
    </div>
  );
}

