import Layout from '../components/Layout';

export default function Process() {
  return (
    <Layout title="Quy Trình Sản Xuất - SEOUL KIMCHI">
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
            🏭 Quy Trình Sản Xuất
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#4b5563',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Quy trình sản xuất khép kín, đảm bảo chất lượng và an toàn thực phẩm
          </p>
        </div>
      </section>

      <section style={{padding: '60px 0 100px', backgroundColor: 'white'}}>
        <div className="container">
          <article style={{marginBottom: '4rem'}}>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#C8102E',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
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
                <i className="fas fa-leaf"></i>
              </div>
              Nguyên Liệu Chính
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem'
            }}>
              {[
                { icon: '🥬', title: 'Bắp Cải Hàn Quốc', desc: 'Sử dụng giống bắp cải Hàn Quốc được trồng tại Đà Lạt, đảm bảo chất lượng tốt nhất' },
                { icon: '🧂', title: 'Muối Biển 2 Năm', desc: 'Muối biển tự nhiên (Thiên nhật diêm) được rửa, khử nước, ủ 2 năm để loại bỏ tạp chất' },
                { icon: '🌶️', title: 'Ớt Bột Nhập Khẩu', desc: 'Ớt bột nhập khẩu từ Hàn Quốc (Gochugaru), đảm bảo hương vị chuẩn Hàn Quốc' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '2rem',
                  borderLeft: '5px solid #C8102E',
                  background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.4s ease',
                  animation: `fadeInUp 0.6s ease ${idx * 0.2}s forwards`,
                  opacity: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(200, 16, 46, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
                >
                  <div style={{fontSize: '3.5rem', marginBottom: '1rem'}}>{item.icon}</div>
                  <h3 style={{
                    fontWeight: 'bold',
                    fontSize: '1.25rem',
                    marginBottom: '0.75rem',
                    color: '#C8102E'
                  }}>{item.title}</h3>
                  <p style={{color: '#374151', lineHeight: '1.7'}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </article>

          <article>
            <h2 style={{
              fontSize: 'clamp(1.875rem, 4vw, 2.5rem)',
              fontWeight: 'bold',
              marginBottom: '2.5rem',
              color: '#C8102E',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              textAlign: 'center',
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
                <i className="fas fa-industry"></i>
              </div>
              6 Bước Sản Xuất
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {[
                { step: '1️⃣', title: 'Chuẩn Bị Nguyên Liệu', desc: 'Bắp cải → Rửa sạch → Cắt từng phần hợp lý' },
                { step: '2️⃣', title: 'Ngâm Muối', desc: 'Ngâm bắp cải với muối biển 2 năm để khử nước và tạo hương vị' },
                { step: '3️⃣', title: 'Khử Muối', desc: 'Rửa sạch bắp cải để khử bớt muối, thoát nước kỹ lưỡng' },
                { step: '4️⃣', title: 'Trộn Gia Vị', desc: 'Trộn ớt bột, tỏi, gừng, tôm và các gia vị Hàn Quốc' },
                { step: '5️⃣', title: 'Đóng Gói', desc: 'Đóng gói vào hộp hoặc túi theo tiêu chuẩn HACCP' },
                { step: '6️⃣', title: 'Lên Men & Ủ', desc: 'Để ủ ở 4-5°C để phát triển lợi khuẩn và hương vị' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '2rem',
                  borderLeft: '5px solid #C8102E',
                  background: 'linear-gradient(135deg, #fff 0%, #fef2f2 100%)',
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  animation: `fadeInUp 0.6s ease ${idx * 0.1}s forwards`,
                  opacity: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateX(10px)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(200, 16, 46, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateX(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    fontSize: '2rem',
                    opacity: 0.1
                  }}>{item.step}</div>
                  <h3 style={{
                    fontWeight: 'bold',
                    fontSize: '1.125rem',
                    color: '#C8102E',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <span style={{fontSize: '1.5rem'}}>{item.step}</span>
                    {item.title}
                  </h3>
                  <p style={{color: '#374151', lineHeight: '1.7'}}>{item.desc}</p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  );
}
