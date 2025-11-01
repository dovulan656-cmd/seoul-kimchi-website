/**
 * Configuration constants for the application
 * 
 * To use environment variables, create a .env.local file with:
 * NEXT_PUBLIC_GA_ID=G-HFEJTXEZ79
 * NEXT_PUBLIC_PHONE=0344100374
 * NEXT_PUBLIC_PHONE_DISPLAY=034 4100 374
 * NEXT_PUBLIC_EMAIL=hanfoodvinahjc@gmail.com
 */

// Google Analytics ID
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-HFEJTXEZ79';

// Contact Information
export const CONTACT = {
  phone: process.env.NEXT_PUBLIC_PHONE || '0344100374',
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || '034 4100 374',
  phoneKorea: '0777358188',
  phoneKoreaDisplay: '077 7358 188',
  email: process.env.NEXT_PUBLIC_EMAIL || 'hanfoodvinahjc@gmail.com',
  address: 'B4/118M Tân Liêm, HCM',
  hours: 'Thứ 2-7: 07:00-17:00',
  zalo: process.env.NEXT_PUBLIC_ZALO || '0344100374'
};

// Helper functions
export const getPhoneLink = () => `tel:${CONTACT.phone}`;
export const getZaloLink = () => `https://zalo.me/${CONTACT.zalo}`;

