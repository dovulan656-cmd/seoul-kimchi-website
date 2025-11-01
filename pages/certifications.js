import Layout from '../components/Layout';

export default function Certifications() {
  return (
    <Layout title="Chứng Nhận & Tiêu Chuẩn - SEOUL KIMCHI">
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
            🏆 Chứng Nhận & Tiêu Chuẩn
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#4b5563',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Cam kết chất lượng và an toàn thực phẩm với các chứng nhận uy tín
          </p>
        </div>
      </section>

      <section style={{padding: '60px 0 100px', backgroundColor: '#f9fafb'}}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            marginBottom: '4rem'
          }}>
            {[
              {
                icon: 'fas fa-check-circle',
                emoji: '🏆',
                title: 'HACCP CODEX 2020',
                desc: 'Hệ thống phân tích mối nguy và điểm kiểm soát tới hạn (HACCP CODEX 2020)',
                details: [
                  { label: 'Phạm vi', value: 'Sản xuất và kinh doanh Kimchi, Tteokbokki, Ớt bột' },
                  { label: 'Hiệu lực', value: '20/01/2022 - 19/01/2025' },
                  { label: 'Cấp Bởi', value: 'Bộ Y Tế Việt Nam' }
                ]
              },
              {
                icon: 'fas fa-shield-alt',
                emoji: '✅',
                title: 'Giấy Chứng Nhận An Toàn Thực Phẩm',
                desc: 'Giấy chứng nhận cơ sở đủ điều kiện An toàn Thực phẩm',
                details: [
                  { label: 'Tiêu Chuẩn', value: 'Việt Nam QCVN 01:2011/BYT' },
                  { label: 'Phạm Vi', value: 'Sản xuất, chế biến thực phẩm' },
                  { label: 'Cấp Bởi', value: 'Sở Y Tế TP.HCM' }
                ]
              }
            ].map((cert, idx) => (
              <article key={idx} style={{
                background: 'white',
                padding: '2.5rem',
                borderRadius: '1rem',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                borderTop: '5px solid #C8102E',
                transition: 'all 0.4s ease',
                animation: `fadeInUp 0.6s ease ${idx * 0.2}s forwards`,
                opacity: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(200, 16, 46, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
              }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  marginBottom: '1.5rem'
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
                    {cert.emoji}
                  </div>
                  <i className={cert.icon} style={{
                    fontSize: '2.5rem',
                    color: '#C8102E',
                    opacity: 0.8
                  }}></i>
                </div>
                <h3 style={{
                  fontWeight: 'bold',
                  fontSize: '1.375rem',
                  marginBottom: '1rem',
                  color: '#1f2937'
                }}>{cert.title}</h3>
                <p style={{
                  color: '#374151',
                  marginBottom: '1.5rem',
                  lineHeight: '1.7'
                }}>{cert.desc}</p>
                <dl style={{
                  fontSize: '0.9375rem',
                  color: '#4b5563'
                }}>
                  {cert.details.map((detail, i) => (
                    <div key={i} style={{
                      marginBottom: '0.75rem',
                      paddingBottom: '0.75rem',
                      borderBottom: i < cert.details.length - 1 ? '1px solid #e5e7eb' : 'none'
                    }}>
                      <dt style={{
                        fontWeight: 700,
                        color: '#C8102E',
                        marginBottom: '0.25rem'
                      }}>{detail.label}:</dt>
                      <dd style={{color: '#6b7280'}}>{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>

          <article style={{
            background: 'white',
            padding: '3rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            marginBottom: '3rem',
            animation: 'fadeInUp 0.8s ease 0.4s forwards',
            opacity: 0
          }}>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#C8102E',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #fee2e2, #fecaca)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                <i className="fas fa-star"></i>
              </div>
              Tiêu Chuẩn Chất Lượng
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { icon: '🌿', title: '100% Tự Nhiên', desc: 'Không sử dụng hóa chất tổng hợp, chất bảo quản nhân tạo hoặc axit citric' },
                { icon: '🔬', title: 'Kiểm Soát Chất Lượng', desc: 'Kiểm tra từng lô sản phẩm trước khi xuất kho' },
                { icon: '❄️', title: 'Bảo Quản Tối Ưu', desc: 'Bảo quản ở 4-5°C để duy trì tươi tui và lợi khuẩn' },
                { icon: '📦', title: 'Đóng Gói An Toàn', desc: 'Sử dụng vật liệu thân thiện môi trường, đóng gói vô trùng' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  borderLeft: '4px solid #C8102E',
                  paddingLeft: '1.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px)';
                  e.currentTarget.style.borderLeftWidth = '6px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.borderLeftWidth = '4px';
                }}
                >
                  <div style={{fontSize: '2.5rem', marginBottom: '0.75rem'}}>{item.icon}</div>
                  <h3 style={{
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    marginBottom: '0.75rem',
                    color: '#1f2937'
                  }}>{item.title}</h3>
                  <p style={{
                    color: '#374151',
                    lineHeight: '1.7'
                  }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
}
