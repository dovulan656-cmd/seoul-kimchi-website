import Layout from '../components/Layout';

export default function Contact() {
  return (
    <Layout title="Liên Hệ - SEOUL KIMCHI">
      {/* Hero Section */}
      <section style={{
        padding: '80px 0 60px',
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
            📞 Liên Hệ Với Chúng Tôi
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#4b5563',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Chúng tôi luôn sẵn sàng trả lời mọi câu hỏi của bạn
          </p>
        </div>
      </section>

      <section style={{padding: '60px 0 100px', backgroundColor: 'white'}}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem'
          }}>
            {[
              {
                icon: '📱',
                title: 'Gọi Điện Thoại',
                desc: 'Gọi trực tiếp để được hỗ trợ nhanh nhất',
                action: '034 4100 374',
                link: 'tel:0344100374',
                color: '#C8102E'
              },
              {
                icon: '💬',
                title: 'Nhắn Zalo',
                desc: 'Chat nhanh qua Zalo, hỗ trợ 24/7',
                action: 'Nhắn ngay trên Zalo',
                link: 'https://zalo.me/0344100374',
                color: '#0068ff'
              },
              {
                icon: '📧',
                title: 'Email',
                desc: 'Gửi email để có hỗ trợ chi tiết',
                action: 'kimchi27042022@gmail.com',
                link: 'mailto:kimchi27042022@gmail.com',
                color: '#C8102E'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
                padding: '2.5rem',
                borderRadius: '1rem',
                textAlign: 'center',
                transition: 'all 0.4s ease',
                border: '2px solid transparent',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                animation: `fadeInUp 0.6s ease ${idx * 0.15}s forwards`,
                opacity: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                e.currentTarget.style.borderColor = item.color;
                e.currentTarget.style.boxShadow = `0 15px 40px rgba(${item.color === '#C8102E' ? '200,16,46' : '0,104,255'},0.25)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
              >
                <div style={{
                  fontSize: '4.5rem',
                  marginBottom: '1.5rem',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>{item.icon}</div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '0.75rem',
                  color: '#1f2937'
                }}>{item.title}</h3>
                <p style={{
                  color: '#4b5563',
                  marginBottom: '1.5rem',
                  lineHeight: '1.7'
                }}>{item.desc}</p>
                <a href={item.link} target={item.link.startsWith('http') ? '_blank' : undefined}
                  rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    fontSize: item.title === 'Gọi Điện Thoại' ? '1.75rem' : '1.125rem',
                    fontWeight: 'bold',
                    color: item.color,
                    textDecoration: 'none',
                    display: 'inline-block',
                    transition: 'all 0.3s ease',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    background: item.title === 'Gọi Điện Thoại' ? 'rgba(200, 16, 46, 0.1)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.textDecoration = 'underline';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.textDecoration = 'none';
                  }}
                >
                  {item.action}
                </a>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #fef2f2 0%, #fff 100%)',
            padding: '3rem',
            borderRadius: '1rem',
            borderLeft: '5px solid #C8102E',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            animation: 'fadeInUp 0.8s ease 0.45s forwards',
            opacity: 0
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5rem'
              }}>
                📍
              </div>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 'bold',
                color: '#C8102E'
              }}>
                ĐỊA CHỈ CÔNG TY
              </h3>
            </div>
            <p style={{
              color: '#374151',
              marginBottom: '2rem',
              lineHeight: '1.8',
              fontWeight: 600,
              fontSize: '1.125rem'
            }}>
              B4/118M Đường Tân Liêm, Ấp 2<br/>
              Xã Bình Hưng, H. Bình Chánh<br/>
              TP. Hồ Chí Minh, Việt Nam
            </p>
            <a 
              href="https://maps.google.com/?q=B4/118M+Tân+Liêm,+Bình+Chánh,+HCM" 
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                fontSize: '1.125rem'
              }}
            >
              <i className="fas fa-map-marker-alt"></i> Xem Trên Google Maps
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
