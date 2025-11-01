import Head from 'next/head';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from './Header';
import Footer from './Footer';
import ContactModal from './ContactModal';
import ContactToggle from './ContactToggle';
import DarkModeToggle from './DarkModeToggle';
import { useToast } from './Toast';
import { GA_ID } from '../lib/config';

// Dynamic import ChatWidget to reduce initial bundle size
const ChatWidget = dynamic(() => import('./ChatWidget'), {
  ssr: false // Only load client-side since it uses localStorage
});

export default function Layout({ children, title, description, image }) {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const { ToastContainer } = useToast();

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a href="#main-content" className="skip-to-content">
        Bỏ qua đến nội dung chính
      </a>
      
      <Head>
        <title>{title || 'SEOUL KIMCHI - Kimchi Chính Hiệu Hàn Quốc | Han Food Vina'}</title>
        <meta name="description" content={description || 'Seoul Kimchi - Thương hiệu Kimchi chính hiệu từ 1968. Sản phẩm 100% tự nhiên, chứng nhận HACCP.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/image/icons/favicon-32x32.svg" />
        
        {/* Resource Hints - DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical fonts - Using media="print" trick to load asynchronously */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" 
          as="style" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" 
          rel="stylesheet" 
          media="print"
          onLoad="this.media='all'" 
        />
        <noscript>
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
        </noscript>
        
        {/* Font Awesome - Load asynchronously to not block rendering */}
        <link 
          rel="preload" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          as="style" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          media="print"
          onLoad="this.media='all'" 
        />
        <noscript>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </noscript>
        
        {image && <meta property="og:image" content={image} />}
      </Head>
      <Header onContactClick={() => setContactModalOpen(true)} />
      <main id="main-content">{children}</main>
      <Footer onContactClick={() => setContactModalOpen(true)} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      <ContactToggle onClick={() => setContactModalOpen(true)} />
      <ChatWidget />
      <ToastContainer />
      {GA_ID && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `
            }}
          />
        </>
      )}
    </>
  );
}
