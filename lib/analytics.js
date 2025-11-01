/**
 * Analytics utility for tracking chatbot interactions
 */

// Check if gtag is available
function gtagAvailable() {
  return typeof window !== 'undefined' && typeof window.gtag !== 'undefined';
}

/**
 * Track chatbot events
 */
export const trackChatbotEvent = (action, label = '', value = null) => {
  if (!gtagAvailable()) {
    // Fallback: log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', action, label, value);
    }
    return;
  }

  try {
    window.gtag('event', action, {
      event_category: 'Chatbot',
      event_label: label,
      value: value,
      non_interaction: false
    });
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

/**
 * Track chatbot opened
 */
export const trackChatbotOpened = () => {
  trackChatbotEvent('chatbot_opened', 'Chat Widget Opened');
};

/**
 * Track message sent
 */
export const trackMessageSent = (messageText) => {
  trackChatbotEvent('chatbot_message_sent', messageText, null);
};

/**
 * Track quick reply clicked
 */
export const trackQuickReply = (replyText) => {
  trackChatbotEvent('chatbot_quick_reply', replyText);
};

/**
 * Track product card viewed
 */
export const trackProductViewed = (productId, productName) => {
  trackChatbotEvent('chatbot_product_viewed', productName, null);
};

/**
 * Track product card clicked
 */
export const trackProductClicked = (productId, productName) => {
  trackChatbotEvent('chatbot_product_clicked', productName, null);
  // Also track as ecommerce event
  if (gtagAvailable()) {
    try {
      window.gtag('event', 'select_item', {
        event_category: 'Ecommerce',
        event_label: productName,
        items: [{
          item_id: productId,
          item_name: productName,
          item_category: 'Product'
        }]
      });
    } catch (error) {
      console.error('Ecommerce tracking error:', error);
    }
  }
};

/**
 * Track contact action from chatbot
 */
export const trackContactFromChatbot = (method) => {
  trackChatbotEvent('chatbot_contact_action', method);
};

/**
 * Track conversation flow
 */
export const trackConversationFlow = (flow, step) => {
  trackChatbotEvent('chatbot_conversation_flow', `${flow}_${step}`);
};

