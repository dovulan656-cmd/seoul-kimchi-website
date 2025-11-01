'use client';

/**
 * Loading Skeleton Component
 * Hiển thị skeleton loader khi đang load content
 */

export function ProductCardSkeleton() {
  return (
    <div className="skeleton-card product-card" style={{opacity: 0.7}}>
      <div className="skeleton skeleton-image" style={{marginBottom: '1rem'}}></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text" style={{width: '80%'}}></div>
      <div className="skeleton skeleton-text" style={{width: '40%', height: '1.5rem', marginTop: '1rem'}}></div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="skeleton-card" style={{marginBottom: '2rem'}}>
      <div className="skeleton skeleton-image" style={{marginBottom: '1rem', height: '200px'}}></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text" style={{width: '90%'}}></div>
      <div className="skeleton skeleton-text" style={{width: '70%'}}></div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="skeleton-card stats-card">
      <div className="skeleton" style={{width: '4rem', height: '4rem', borderRadius: '50%', margin: '0 auto 1rem'}}></div>
      <div className="skeleton" style={{width: '60%', height: '2rem', margin: '0 auto 0.5rem'}}></div>
      <div className="skeleton skeleton-text" style={{width: '80%', margin: '0 auto'}}></div>
      <div className="skeleton skeleton-text" style={{width: '60%', margin: '0.5rem auto 0'}}></div>
    </div>
  );
}

export function Spinner({ size = 'normal', className = '' }) {
  return (
    <div 
      className={`spinner ${size === 'large' ? 'spinner-large' : ''} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span style={{position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', border: 0}}>Loading...</span>
    </div>
  );
}

export default function LoadingSkeleton({ type = 'product', count = 1 }) {
  const skeletons = [];
  
  for (let i = 0; i < count; i++) {
    switch (type) {
      case 'product':
        skeletons.push(<ProductCardSkeleton key={i} />);
        break;
      case 'blog':
        skeletons.push(<BlogCardSkeleton key={i} />);
        break;
      case 'stats':
        skeletons.push(<StatsCardSkeleton key={i} />);
        break;
      default:
        skeletons.push(<ProductCardSkeleton key={i} />);
    }
  }
  
  return <>{skeletons}</>;
}

