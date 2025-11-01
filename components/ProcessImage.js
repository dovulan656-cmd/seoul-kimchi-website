'use client';

import { useState } from 'react';

export default function ProcessImage({ 
  src, 
  alt = 'Quy trình sản xuất Seoul Kimchi',
  stepNumber = null,
  stepTitle = null,
  priority = false,
  className = '',
  style = {},
  orientation = 'landscape' // 'landscape' or 'portrait'
}) {
  const [imageError, setImageError] = useState(false);
  const aspectRatio = orientation === 'portrait' ? '2/3' : '16/9';
  
  return (
    <div 
      className={`process-image-container ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        borderRadius: '1rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
        border: '1px solid rgba(200, 16, 46, 0.1)',
        transition: 'all 0.4s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(200, 16, 46, 0.2)';
        e.currentTarget.style.borderColor = '#C8102E';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        e.currentTarget.style.borderColor = 'rgba(200, 16, 46, 0.1)';
      }}
    >
      {/* Step Number Badge */}
      {stepNumber && (
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: '#C8102E',
          color: 'white',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 2,
          border: '3px solid white'
        }}>
          {stepNumber}
        </div>
      )}

      <div style={{
        position: 'relative',
        width: '100%',
        paddingBottom: `${(parseFloat(aspectRatio.split('/')[1]) / parseFloat(aspectRatio.split('/')[0])) * 100}%`,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #fee2e2 0%, #fef2f2 100%)'
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
            {alt || 'Quy trình SEOUL KIMCHI'}
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
              objectFit: 'cover',
              transition: 'transform 0.6s ease'
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
        )}
      </div>

      {stepTitle && (
        <div style={{
          padding: '1.25rem',
          background: 'white',
          borderTop: '1px solid rgba(200, 16, 46, 0.1)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: '#C8102E',
            margin: 0,
            textAlign: 'center'
          }}>
            {stepTitle}
          </h3>
        </div>
      )}
    </div>
  );
}

