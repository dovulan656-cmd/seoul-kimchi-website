import { useState } from 'react';
import { CONTACT } from '../lib/config';
import { toast } from './Toast';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    type: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach(key => {
        formDataObj.append(key, formData[key]);
      });
      formDataObj.append('form-name', 'contact');

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataObj).toString()
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', type: '', message: '' });
        toast.success('Cảm ơn! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.', 'Gửi thành công');
        setTimeout(() => {
          setStatus(null);
          onClose();
        }, 2000);
      } else {
        setStatus('error');
        toast.error('Có lỗi xảy ra. Vui lòng thử lại hoặc gọi trực tiếp.', 'Gửi thất bại');
      }
    } catch (error) {
      setStatus('error');
      toast.error('Có lỗi xảy ra. Vui lòng kiểm tra kết nối và thử lại.', 'Lỗi kết nối');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contactModalTitle"
    >
      <div 
        style={{
          background: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '32rem',
          margin: '0 1rem',
          padding: '1.5rem',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: '#6b7280',
            padding: '0.25rem'
          }}
          aria-label="Close contact form"
        >
          <i className="fas fa-times"></i>
        </button>
        
        <h2 id="contactModalTitle" style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#C8102E', marginBottom: '1rem'}}>Liên Hệ</h2>

        {status === 'success' && (
          <div style={{
            background: '#d1fae5', 
            border: '1px solid #10b981', 
            color: '#065f46', 
            padding: '0.75rem 1rem', 
            borderRadius: '0.5rem', 
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span className="success-icon" style={{fontSize: '1.25rem'}}>✅</span>
            <span>Cảm ơn! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</span>
          </div>
        )}
        {status === 'error' && (
          <div style={{background: '#fee2e2', border: '1px solid #ef4444', color: '#991b1b', padding: '0.75rem 1rem', borderRadius: '0.5rem', marginBottom: '1.5rem'}}>
            ❌ Có lỗi xảy ra. Vui lòng thử lại hoặc gọi: {CONTACT.phoneDisplay}
          </div>
        )}

        <form onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <input type="hidden" name="form-name" value="contact" />
          <p style={{display: 'none'}}><label>Don't fill this out: <input name="bot-field" /></label></p>

          <div>
            <label htmlFor="modalName" style={{display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Họ Tên <span style={{color: '#dc2626'}}>*</span>
            </label>
            <input
              type="text"
              id="modalName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nhập họ tên"
              required
              minLength={3}
              style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
            />
          </div>

          <div>
            <label htmlFor="modalEmail" style={{display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Email <span style={{color: '#dc2626'}}>*</span>
            </label>
            <input
              type="email"
              id="modalEmail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
            />
          </div>

          <div>
            <label htmlFor="modalPhone" style={{display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Số Điện Thoại <span style={{color: '#dc2626'}}>*</span>
            </label>
            <input
              type="tel"
              id="modalPhone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0XXXXXXXXX"
              required
              pattern="^(\+84|0)[0-9]{9,10}$"
              style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
            />
          </div>

          <div>
            <label htmlFor="modalSubject" style={{display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Tiêu Đề <span style={{color: '#dc2626'}}>*</span>
            </label>
            <input
              type="text"
              id="modalSubject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Vd: Hỏi về giá, Đặt hàng, ..."
              required
              minLength={5}
              style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
            />
          </div>

          <div>
            <label htmlFor="modalType" style={{display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Loại Yêu Cầu <span style={{color: '#dc2626'}}>*</span>
            </label>
            <select
              id="modalType"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem'}}
            >
              <option value="">-- Chọn Loại Yêu Cầu --</option>
              <option value="thong_tin">Yêu cầu thông tin</option>
              <option value="dat_hang">Đặt hàng</option>
              <option value="kien_tro">Khiếu nại / Khiếu tố</option>
              <option value="phan_hoi">Phản hồi</option>
            </select>
          </div>

          <div>
            <label htmlFor="modalMessage" style={{display: 'block', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>
              Nội Dung <span style={{color: '#dc2626'}}>*</span>
            </label>
            <textarea
              id="modalMessage"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Nhập nội dung ..."
              required
              style={{width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', fontSize: '1rem', fontFamily: 'inherit'}}
            ></textarea>
          </div>

          <div style={{textAlign: 'center'}}>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={status === 'loading'} 
              style={{
                padding: '0.75rem 2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                opacity: status === 'loading' ? 0.7 : 1,
                cursor: status === 'loading' ? 'not-allowed' : 'pointer'
              }}
            >
              {status === 'loading' ? (
                <>
                  <span className="spinner" style={{width: '1rem', height: '1rem', borderWidth: '2px'}}></span>
                  <span>Đang gửi...</span>
                </>
              ) : (
                'Gửi'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
