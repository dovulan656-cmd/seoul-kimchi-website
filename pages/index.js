import Layout from '../components/Layout';
import Link from 'next/link';
import Banner from '../components/Banner';

export default function Home() {
  return (
    <Layout>
      {/* Banner Section */}
      <section style={{padding: '20px 0', backgroundColor: '#fef2f2'}}>
        <div className="container">
          <Banner 
            src="/image/banners/home-banner-1.jpg"
            alt="SEOUL KIMCHI - Kim Chi Hàn Quốc Bán Giá Sỉ"
            priority={true}
            style={{margin: '0 auto', maxWidth: '1200px'}}
          />
        </div>
      </section>

      {/* Hero Section */}
      <section className="hero" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'white',
        position: 'relative',
        zIndex: 10,
        background: 'linear-gradient(135deg, #C8102E 0%, #8B0000 100%)',
        minHeight: '700px',
        width: '100%',
        overflow: 'hidden'
      }}>
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 4s ease-in-out infinite'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'pulse 5s ease-in-out infinite'
        }}></div>

        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 16px', width: '100%', position: 'relative', zIndex: 1}}>
          <div style={{maxWidth: '48rem', width: '100%'}}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #fde047 0%, #facc15 100%)',
              color: '#111827',
              padding: '0.75rem 1.5rem',
              borderRadius: '999px',
              fontSize: '0.9375rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              boxShadow: '0 4px 15px rgba(253, 224, 71, 0.4)',
              animation: 'fadeIn 0.8s ease'
            }} className="fade-in">
              🎖️ CHỨNG NHẬN HACCP CODEX 2020
            </span>
            <h1 className="font-display fade-in-delay-1" style={{
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.2',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
            }}>
              SEOUL KIMCHI
              <br/>
              <span style={{fontSize: 'clamp(1.75rem, 4vw, 2.5rem)'}}>Hương Vị Hàn Quốc</span>
              <br/>
              <span style={{fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#fde047'}}>Chính Hiệu Từ 1968</span>
            </h1>
            <p className="fade-in-delay-2" style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
              marginBottom: '2.5rem',
              color: '#f3f4f6',
              lineHeight: '1.7'
            }}>
              Muối biển 2 năm tuổi + Bắp cải Hàn Quốc + Ớt bột nhập khẩu = <strong>Kim Chi Chuẩn Vị</strong>
            </p>
            <div className="fade-in-delay-3" style={{display: 'flex', gap: '1.25rem', flexWrap: 'wrap'}}>
              <Link href="/products" className="btn-primary" style={{color: 'white', padding: '1.25rem 2.5rem', borderRadius: '0.75rem', fontWeight: 'bold', fontSize: '1.125rem'}}>
                <i className="fas fa-shopping-bag"></i> Xem Sản Phẩm
              </Link>
              <Link href="/contact" style={{
                background: 'white',
                color: '#C8102E',
                padding: '1.25rem 2.5rem',
                borderRadius: '0.75rem',
                fontWeight: 'bold',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(255,255,255,0.2)',
                fontSize: '1.125rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fef2f2';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255,255,255,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,255,255,0.2)';
              }}
              >
                <i className="fas fa-phone"></i> Đặt Hàng Ngay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section 2 */}
      <section style={{padding: '40px 0', backgroundColor: 'white'}}>
        <div className="container">
          <Banner 
            src="/image/banners/home-banner-2.jpg"
            alt="SEOUL KIMCHI - Sản Phẩm Đa Dạng"
            style={{margin: '0 auto', maxWidth: '1200px'}}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section style={{padding: '100px 0', backgroundColor: 'white', width: '100%', position: 'relative'}} aria-label="Company Statistics">
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 16px', width: '100%'}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2.5rem'}}>
            <div className="stats-card fade-in">
              <div style={{fontSize: '4rem', marginBottom: '0.75rem'}}>🏆</div>
              <div className="stats-number">56+</div>
              <p style={{color: '#4b5563', fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem'}}>Năm Kinh Nghiệm</p>
              <p style={{fontSize: '0.9375rem', color: '#6b7280'}}>Từ 1968 đến nay</p>
            </div>
            <div className="stats-card fade-in-delay-1">
              <div style={{fontSize: '4rem', marginBottom: '0.75rem'}}>👥</div>
              <div className="stats-number">100K+</div>
              <p style={{color: '#4b5563', fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem'}}>Khách Hàng</p>
              <p style={{fontSize: '0.9375rem', color: '#6b7280'}}>Tin tưởng trên toàn quốc</p>
            </div>
            <div className="stats-card fade-in-delay-2">
              <div style={{fontSize: '4rem', marginBottom: '0.75rem'}}>🌶️</div>
              <div className="stats-number">12+</div>
              <p style={{color: '#4b5563', fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem'}}>Loại Sản Phẩm</p>
              <p style={{fontSize: '0.9375rem', color: '#6b7280'}}>Đa dạng, phong phú</p>
            </div>
            <div className="stats-card fade-in-delay-3">
              <div style={{fontSize: '4rem', marginBottom: '0.75rem'}}>✅</div>
              <div className="stats-number">100%</div>
              <p style={{color: '#4b5563', fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem'}}>Tự Nhiên</p>
              <p style={{fontSize: '0.9375rem', color: '#6b7280'}}>Không hóa chất độc hại</p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section 3 - Product Showcase */}
      <section style={{padding: '40px 0', backgroundColor: '#f9fafb'}}>
        <div className="container">
          <Banner 
            src="/image/banners/home-banner-3.jpg"
            alt="SEOUL KIMCHI - Sản Phẩm Kimchi Đa Dạng"
            style={{margin: '0 auto', maxWidth: '1200px'}}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        color: 'white',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #991b1b 0%, #b91c1c 50%, #991b1b 100%)',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'rgba(255,255,255,0.02)\'/%3E%3C/svg%3E")',
          opacity: 0.3
        }}></div>
        <div style={{position: 'relative', zIndex: 1}}>
          <h2 className="font-display" style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            Đặt Hàng Ngay! 🛒
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            marginBottom: '2.5rem',
            opacity: 0.95,
            maxWidth: '600px',
            margin: '0 auto 2.5rem'
          }}>
            Miễn phí vận chuyển từ 500K | Giao hàng toàn quốc 1-3 ngày | Đóng gói cẩn thận
          </p>
          <a href="tel:0344100374" style={{
            background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
            color: '#C8102E',
            padding: '1.25rem 3rem',
            borderRadius: '0.75rem',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.2)';
          }}
          >
            <i className="fas fa-phone"></i> Gọi: 034 4100 374
          </a>
        </div>
      </section>

      {/* Banner Section 4 - Export/Wholesale */}
      <section style={{padding: '40px 0', backgroundColor: 'white'}}>
        <div className="container">
          <Banner 
            src="/image/banners/export-banner.jpg"
            alt="SEOUL KIMCHI - Xuất Khẩu và Bán Sỉ"
            style={{margin: '0 auto', maxWidth: '1200px'}}
          />
        </div>
      </section>

      {/* Map Section */}
      <section style={{padding: '100px 0', backgroundColor: 'white', width: '100%'}} aria-label="Bản đồ">
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 16px', width: '100%'}}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 'bold',
            marginBottom: '1rem',
            textAlign: 'center',
            color: '#1f2937'
          }}>
            📍 Tìm Chúng Tôi
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#4b5563',
            marginBottom: '3rem',
            maxWidth: '32rem',
            margin: '0 auto 3rem',
            fontSize: '1.125rem'
          }}>
            Đến trực tiếp cửa hàng hoặc xem trên Google Maps
          </p>
          <div style={{
            position: 'relative',
            width: '100%',
            borderRadius: '1rem',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            paddingBottom: '56.25%',
            height: 0,
            border: '4px solid #fef2f2'
          }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.575560881374!2d106.65315799999999!3d10.690016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317531d4bdfb4533%3A0x3da56416f2766e8a!2zQ8OUTkcgVFkgVE5ISCBT4bqiTiBYVeG6pFQgVsOAIFRIxq_GoE5HIE3huqBJIEhBTiBGT09EIFZJTkE!5e0!3m2!1svi!2s!4v1761880261230!5m2!1svi!2s" 
              width="600" 
              height="450" 
              style={{border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </Layout>
  );
}
