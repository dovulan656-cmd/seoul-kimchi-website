import Link from 'next/link';
import { CONTACT, getPhoneLink } from '../lib/config';

export default function Footer({ onContactClick }) {
  return (
    <footer>
      <div className="container">
        <div className="grid">
          <div>
            <h3>SEOUL KIMCHI</h3>
            <p style={{marginBottom: '1rem', fontSize: '1rem', fontWeight: 600}}>Kimchi chính hiệu từ 1968</p>
            <p style={{marginBottom: '0.75rem'}}>
              <i className="fas fa-phone" style={{marginRight: '0.5rem', color: 'var(--yellow)'}}></i>
              <a href={getPhoneLink()}>{CONTACT.phoneDisplay}</a>
            </p>
            <p>
              <i className="fas fa-envelope" style={{marginRight: '0.5rem', color: 'var(--yellow)'}}></i>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </div>

          <div>
            <h3>Điều Hướng</h3>
            <ul>
              <li><Link href="/">Trang Chủ</Link></li>
              <li><Link href="/products">Sản Phẩm</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/process">Quy Trình</Link></li>
              <li><Link href="/certifications">Chứng Nhận</Link></li>
              <li><button onClick={onContactClick} style={{background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0, textAlign: 'left'}}>Liên Hệ</button></li>
            </ul>
          </div>

          <div>
            <h3>Địa Chỉ</h3>
            <address>
              B4/118M Đường Tân Liêm<br/>
              Xã Bình Hưng, H. Bình Chánh<br/>
              TP. Hồ Chí Minh
            </address>
          </div>

          <div>
            <h3>Theo Dõi</h3>
            <div className="flex">
              <a href="https://facebook.com/seoulkimchi" target="_blank" rel="noopener">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com/seoulkimchi" target="_blank" rel="noopener">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://youtube.com/@seoulkimchi" target="_blank" rel="noopener">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t">
          © {new Date().getFullYear()} SEOUL KIMCHI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
