'use client';

import { useState } from 'react';

export default function ProductImage({ 
  src, 
  alt = 'Sản phẩm Seoul Kimchi',
  badge = null,
  priority = false,
  className = '',
  style = {},
  showOverlay = true,
  onHover = null
}) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div 
        className={`product-img ${className}`}
        style={{
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          height: '250px',
          borderRadius: '0.75rem 0.75rem 0 0',
          background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#C8102E',
          fontWeight: 'bold',
          fontSize: '1.25rem',
          ...style
        }}
      >
        {alt || 'Sản phẩm SEOUL KIMCHI'}
      </div>
    );
  }

  return (
    <div 
      className={`product-img ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        borderRadius: '0.75rem 0.75rem 0 0',
        ...style
      }}
      onMouseEnter={onHover}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.6s ease',
          minHeight: '250px'
        }}
        loading={priority ? 'eager' : 'lazy'}
        onError={() => setImageError(true)}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
        }}
      />
      
      {badge && (
        <span 
          className="badge"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: '#C8102E',
            color: 'white',
            padding: '0.375rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            zIndex: 2
          }}
        >
          {badge}
        </span>
      )}

      {showOverlay && (
        <div 
          className="product-overlay"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
            padding: '1rem',
            transform: 'translateY(100%)',
            transition: 'transform 0.3s ease',
            zIndex: 1
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(100%)';
          }}
        >
          <p style={{color: 'white', fontSize: '0.875rem', margin: 0}}>
            <i className="fas fa-shipping-fast"></i> Giao hàng nhanh
          </p>
        </div>
      )}
    </div>
  );
}

