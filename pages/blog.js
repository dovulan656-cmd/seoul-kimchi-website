import Layout from '../components/Layout';
import Link from 'next/link';
import Banner from '../components/Banner';
import { EmptyBlog } from '../components/EmptyState';

const blogPosts = [
  {
    id: 1,
    title: 'Lợi Ích Sức Khỏe Của Kimchi',
    excerpt: 'Khám phá những lợi ích tuyệt vời của Kimchi cho sức khỏe, tiêu hóa. Từ vitamin đến lợi khuẩn, Kimchi là siêu thực phẩm.',
    date: '15/01/2025',
    emoji: '🥬',
    slug: '/blog-post-1'
  },
  {
    id: 2,
    title: 'Cách Nấu Tteokbokki Tại Nhà',
    excerpt: 'Hướng dẫn chi tiết cách làm Tteokbokki ngon như ngoài hàng. Công thức chuẩn vị Hàn Quốc với các bước đơn giản.',
    date: '10/01/2025',
    emoji: '🍳',
    slug: '/blog-post-2'
  },
  {
    id: 3,
    title: 'Công Thức Gia Vị Hàn Quốc',
    excerpt: 'Tìm hiểu về các loại gia vị truyền thống Hàn Quốc. Cách sử dụng Gochugaru, Doenjang, Gochujang để tạo hương vị chuẩn.',
    date: '05/01/2025',
    emoji: '🌶️',
    slug: '/blog-post-3'
  },
  {
    id: 4,
    title: 'Muối Biển & Lên Men Tự Nhiên',
    excerpt: 'Hiểu rõ về quá trình lên men tự nhiên và vai trò của muối biển chất lượng cao trong sản xuất Kimchi.',
    date: '01/01/2025',
    emoji: '🧂',
    slug: '/blog-post-4'
  },
  {
    id: 5,
    title: 'Cách Bảo Quản Kimchi Lâu Dài',
    excerpt: 'Mẹo bảo quản Kimchi lâu dài để duy trì hương vị và giá trị dinh dưỡng tối đa trong thời gian dài.',
    date: '25/12/2024',
    emoji: '❄️',
    slug: '/blog-post-5'
  },
  {
    id: 6,
    title: '5 Cách Nấu Với Kimchi',
    excerpt: 'Khám phá 5 cách sáng tạo để sử dụng Kimchi trong nấu ăn hàng ngày, từ cơm chiên đến canh và kimbap.',
    date: '20/12/2024',
    emoji: '🍲',
    slug: '/blog-post-6'
  }
];

export default function Blog() {
  return (
    <Layout title="Blog & Kiến Thức - SEOUL KIMCHI">
      {/* Banner Section */}
      <section style={{
        padding: '20px 0',
        background: 'linear-gradient(135deg, #fef2f2 0%, #fff 100%)'
      }}>
        <div className="container">
          <Banner 
            src="/image/banners/blog-banner.jpg"
            alt="SEOUL KIMCHI - Blog & Kiến Thức"
            priority={true}
            style={{margin: '0 auto', maxWidth: '1200px'}}
          />
        </div>
      </section>

      {/* Hero Section */}
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
            📚 Blog & Kiến Thức
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#4b5563',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Chia sẻ kiến thức về Kimchi, ẩm thực Hàn Quốc và sức khỏe
          </p>
        </div>
      </section>

      <section style={{padding: '60px 0 100px', backgroundColor: '#f9fafb'}}>
        <div className="container">
          {blogPosts.length === 0 ? (
            <EmptyBlog />
          ) : (
            <div className="grid-cols-auto">
              {blogPosts.map((post, idx) => (
              <article key={post.id} style={{
                background: 'white',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                border: '1px solid rgba(200, 16, 46, 0.1)',
                animation: `fadeInUp 0.6s ease ${idx * 0.1}s forwards`,
                opacity: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(200, 16, 46, 0.2)';
                e.currentTarget.style.borderColor = 'var(--red)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(200, 16, 46, 0.1)';
              }}
              >
                <div style={{
                  width: '100%',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '5rem',
                  background: `linear-gradient(135deg, ${idx % 2 === 0 ? '#fee2e2' : '#fef2f2'} 0%, ${idx % 2 === 0 ? '#fecaca' : '#fee2e2'} 100%)`,
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-50%',
                    right: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(200,16,46,0.1) 0%, transparent 70%)',
                    animation: 'pulse 3s ease-in-out infinite'
                  }}></div>
                  <div style={{position: 'relative', zIndex: 1}}>{post.emoji}</div>
                </div>
                <div style={{padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#C8102E',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <i className="fas fa-calendar-alt"></i> {post.date}
                  </p>
                  <h3 style={{
                    fontSize: '1.375rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: '#1f2937',
                    lineHeight: '1.4'
                  }}>{post.title}</h3>
                  <p style={{
                    color: '#4b5563',
                    marginBottom: '1.5rem',
                    lineHeight: '1.7',
                    flex: 1
                  }}>{post.excerpt}</p>
                  <Link href={post.slug} style={{
                    color: '#C8102E',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.gap = '0.75rem';
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.gap = '0.5rem';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                  >
                    Đọc thêm <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
