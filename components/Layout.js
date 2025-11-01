import Head from 'next/head';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import ContactModal from './ContactModal';
import ContactToggle from './ContactToggle';
import ChatWidget from './ChatWidget';
import { GA_ID } from '../lib/config';

export default function Layout({ children, title, description, image }) {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{title || 'SEOUL KIMCHI - Kimchi Chính Hiệu Hàn Quốc | Han Food Vina'}</title>
        <meta name="description" content={description || 'Seoul Kimchi - Thương hiệu Kimchi chính hiệu từ 1968. Sản phẩm 100% tự nhiên, chứng nhận HACCP.'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/image/icons/favicon-32x32.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        {image && <meta property="og:image" content={image} />}
      </Head>
      <Header onContactClick={() => setContactModalOpen(true)} />
      <main>{children}</main>
      <Footer onContactClick={() => setContactModalOpen(true)} />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
      <ContactToggle onClick={() => setContactModalOpen(true)} />
      <ChatWidget />
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
