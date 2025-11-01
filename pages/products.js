'use client';

import { useState } from 'react';
import Layout from '../components/Layout';
import { products } from '../data/products';
import Banner from '../components/Banner';
import { EmptyProducts } from '../components/EmptyState';
import ScrollAnimation from '../components/ScrollAnimation';

export default function Products() {
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  const handleOrder = (product) => {
    const message = `Tôi muốn đặt hàng:\n${product.name}\nGiá: ${product.price}\n\nVui lòng liên hệ với tôi!`;
    if (window.confirm(`${product.name}\n${product.price}\n\nGọi ngay: 034 4100 374?`)) {
      window.location.href = 'tel:0344100374';
    }
  };

  return (
    <Layout title="Sản Phẩm - SEOUL KIMCHI">
      {/* Banner Section */}
      <section style={{
        padding: '20px 0',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fff 100%)'
      }}>
        <div className="container">
          <Banner 
            src="/image/banners/products-banner.jpg"
            alt="SEOUL KIMCHI - Sản Phẩm Kimchi Đa Dạng"
            priority={true}
            style={{margin: '0 auto', maxWidth: '1200px'}}
          />
        </div>
      </section>

      {/* Hero Section for Products */}
      <section style={{
        padding: '60px 0 40px',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fff 100%)',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 className="font-display" style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#1f2937'
          }}>
            🌶️ Sản Phẩm Chất Lượng
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#4b5563',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            12+ loại sản phẩm Kimchi, Tteokbokki, Gia vị Hàn Quốc chất lượng cao
          </p>
        </div>
      </section>

      <section style={{padding: '40px 0 100px', backgroundColor: 'white'}}>
        <div className="container">
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '4rem'
          }} role="group" aria-label="Product Filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
              aria-pressed={filter === 'all'}
            >
              <i className="fas fa-th"></i> Tất Cả
            </button>
            <button 
              className={`filter-btn ${filter === 'kimchi' ? 'active' : ''}`}
              onClick={() => setFilter('kimchi')}
              aria-pressed={filter === 'kimchi'}
            >
              <i className="fas fa-leaf"></i> Kimchi
            </button>
            <button 
              className={`filter-btn ${filter === 'tteok' ? 'active' : ''}`}
              onClick={() => setFilter('tteok')}
              aria-pressed={filter === 'tteok'}
            >
              <i className="fas fa-utensils"></i> Tteokbokki
            </button>
            <button 
              className={`filter-btn ${filter === 'seasonings' ? 'active' : ''}`}
              onClick={() => setFilter('seasonings')}
              aria-pressed={filter === 'seasonings'}
            >
              <i className="fas fa-pepper-hot"></i> Gia Vị
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <EmptyProducts 
              searchQuery={filter !== 'all' ? filter : null}
              onClearSearch={() => setFilter('all')}
            />
          ) : (
            <div className="grid-cols-auto" role="region" aria-live="polite" aria-label="Products list">
              {filteredProducts.map((product, idx) => (
                <ScrollAnimation key={product.id} className="product-card" animationDelay={idx * 0.1}>
                  <article style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }}>
                    <div className="product-img" style={{position: 'relative', overflow: 'hidden'}}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease'}}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`;
                      }}
                    />
                    {product.badge && (
                      <span className="badge">{product.badge}</span>
                    )}
                    <div style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                      padding: '1rem',
                      transform: 'translateY(100%)',
                      transition: 'transform 0.3s ease'
                    }} className="product-overlay">
                      <p style={{color: 'white', fontSize: '0.875rem'}}>
                        <i className="fas fa-shipping-fast"></i> Giao hàng nhanh
                      </p>
                    </div>
                  </div>
                  <div className="product-content">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-desc" style={{flex: 1}}>{product.description}</p>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid #e5e7eb'
                    }}>
                      <div className="product-price" style={{margin: 0}}>{product.price}</div>
                      <button
                        onClick={() => handleOrder(product)}
                        className="btn-primary"
                        style={{
                          padding: '0.75rem 1.5rem',
                          fontSize: '0.9375rem'
                        }}
                      >
                        <i className="fas fa-shopping-cart"></i> Đặt Ngay
                      </button>
                    </div>
                  </div>
                  </article>
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Banner Section - Product Benefits */}
      <section style={{padding: '40px 0', backgroundColor: '#f9fafb'}}>
        <div className="container">
          <Banner 
            src="/image/banners/products-benefits-banner.jpg"
            alt="SEOUL KIMCHI - Lợi Ích Sức Khỏe"
            style={{margin: '0 auto', maxWidth: '1200px'}}
          />
        </div>
      </section>
    </Layout>
  );
}
