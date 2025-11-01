// Chatbot responses database
export const chatResponses = {
  'language': 'vi',
  
  'track|theo dõi|đơn hàng|tracking': [
    '📦 THEO DÕI ĐƠN HÀNG:\nNhập mã đơn hàng (VD: SK12345)\nHoặc số điện thoại đặt hàng.',
    '🔍 Kiểm tra đơn hàng:\n1. Mã đơn\n2. SĐT\n3. Email\nChọn cách bạn muốn kiểm tra!'
  ],

  'gợi ý|recommend|suggestion': [
    '🎯 GỢI Ý CHO BẠN:\n1. Mới dùng: Kimchi Cải Thảo Cắt\n2. Cay nhẹ: Kimchi Củ Cải\n3. Ăn liền: Tteokbokki Cheese\nThích loại nào?',
    '👨‍🍳 TOP BÁN CHẠY:\n• Kimchi Cải Thảo\n• Tteokbokki Cheese\n• Ớt Bột Hàn Quốc\nMuốn tư vấn chi tiết?'
  ],
  
  'xem sản phẩm|sản phẩm gì': [
    '🌶️ Chúng tôi có 12 loại sản phẩm:\n• Kimchi Cải Thảo (145K)\n• Tteokbokki Cheese (110K)\n• Gia vị Hàn Quốc\nBạn quan tâm loại nào?',
    'Sản phẩm bán chạy nhất: Kimchi Cải Thảo Cắt 🥬\nGiá: 145K | 100% tự nhiên, HACCP'
  ],

  'giá|bao nhiêu|price': [
    '💰 Giá kim chi từ 65K-155K\n• Miễn phí vận chuyển từ 500K\n• Giảm 10% nếu mua từ 3 lọ\nBạn muốn biết sản phẩm nào cụ thể?',
    'Tteokbokki: 95-110K\nKimchi: 65-155K\nGia vị: 65-85K\nLiên hệ để biết khuyến mãi! 🎉'
  ],

  'giao hàng|ship|delivery': [
    '🚚 Giao toàn quốc 1-3 ngày\n• Miễn phí từ 500K\n• Hỗ trợ: GHN, GHTK, COD\n• Đóng gói cẩn thận, an toàn',
    'Địa chỉ giao của bạn là ở đâu? Tôi sẽ tính phí vận chuyển.'
  ],

  'liên hệ|phone|số điện thoại': [
    '☎️ 034 4100 374 (VN)\n📱 077 7358 188 (Korea)\n📧 hanfoodvinahjc@gmail.com\n🏢 B4/118M Tân Liêm, HCM\nGiờ: Thứ 2-7: 07:00-17:00',
    'Liên hệ tôi qua:\n• Chat: Nhắn ở đây\n• Phone: 034 4100 374\n• Email: hanfoodvinahjc@gmail.com'
  ],

  'sức khỏe|health|lợi ích': [
    '💪 Lợi Ích Kimchi:\n✅ Hỗ trợ tiêu hóa\n✅ Tăng miễn dịch\n✅ Giàu probiotics\n✅ Chống viêm\n✅ Bảo vệ tim mạch',
    'Kimchi có: Vitamin, Khoáng chất, Probiotics\nTốt cho: Đường ruột, Hệ miễn dịch, Cân nặng'
  ],

  'đặt hàng|order|mua': [
    '🛒 Cách đặt hàng:\n1️⃣ Chọn sản phẩm\n2️⃣ Gọi hoặc nhắn\n3️⃣ Xác nhận đơn\n4️⃣ Thanh toán\n5️⃣ Giao hàng\n\n📞 034 4100 374',
    'Bạn muốn đặt bao nhiêu sản phẩm? Tôi sẽ tính tiền cho bạn!'
  ],

  'bảo quản|storage': [
    '❄️ Bảo quản Kimchi:\n• Tủ lạnh 2-8°C: 2-3 tháng\n• Nhiệt độ phòng: 1 tháng\n• Dùng công cụ sạch\n• Không để gần thực ăn khác',
    'Để tủ lạnh ngăn mát, lọ đóng kín. Sẽ tươi 2-3 tháng!'
  ],

  'chứng nhận|haccp|certificate': [
    '🏆 Chứng nhận:\n✅ HACCP CODEX 2020\n✅ An toàn thực phẩm\n✅ QCVN 01:2011/BYT\nTất cả từ Bộ Y Tế!',
    '100% sản phẩm tự nhiên, không hóa chất tổng hợp'
  ],

  'chào|hello|xin chào': [
    'Xin chào! 👋 Mình là Seoul Bot\nHỗ trợ 24/7 - Có gì tôi có thể giúp?',
    'Chào bạn! 😊 Cần giúp gì không?'
  ],

  'cảm ơn|thanks|thank you': [
    'Không có gì! 😊 Còn gì khác tôi có thể giúp?',
    'Vui lòng! Hỗ trợ thêm bất kỳ lúc nào 💬'
  ],

  'tạm biệt|bye|goodbye': [
    'Tạm biệt! 👋 Cảm ơn đã ghé thăm Seoul Kimchi 🌶️',
    'Hẹn gặp bạn lần sau! 😊'
  ]
};

export function matchKeywords(userMessage) {
  const lowerMsg = userMessage.toLowerCase();
  
  for (const [keywords, responses] of Object.entries(chatResponses)) {
    if (keywords === 'language') continue;
    
    const patterns = keywords.split('|');
    if (patterns.some(p => lowerMsg.includes(p.toLowerCase()))) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  return `Tôi chưa hiểu rõ. 🤔\n\nCâu hỏi phổ biến:\n1️⃣ Xem sản phẩm\n2️⃣ Kiểm tra giá\n3️⃣ Theo dõi đơn hàng\n4️⃣ Gợi ý món ngon\n\nHoặc gọi 034 4100 374 để được hỗ trợ trực tiếp!`;
}

