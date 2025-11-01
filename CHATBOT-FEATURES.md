# 🤖 SEOUL BOT - Rich Messages & Analytics

## ✨ Tính Năng Mới

### 1. Rich Messages - Product Cards

Chatbot giờ có thể hiển thị **Product Cards** đẹp mắt với hình ảnh, mô tả và giá khi người dùng hỏi về sản phẩm.

#### Khi Nào Hiển Thị Product Cards?

- Khi hỏi: "sản phẩm", "sản phẩm gì", "xem sản phẩm"
- Khi hỏi: "kimchi", "kim chi"
- Khi hỏi: "tteokbokki", "tteok"
- Khi hỏi: "gia vị", "seasoning", "bột"

#### Tính Năng Product Card:

- ✅ Hình ảnh sản phẩm với fallback emoji
- ✅ Tên sản phẩm + badge (nếu có)
- ✅ Mô tả ngắn gọn (2 dòng)
- ✅ Giá sản phẩm nổi bật
- ✅ Click để điều hướng đến trang sản phẩm
- ✅ Hover effect đẹp mắt

---

### 2. Analytics Tracking

Tất cả interactions trong chatbot đều được track bằng Google Analytics để phân tích hiệu quả.

#### Các Events Được Track:

| Event | Khi Nào | Category |
|-------|---------|----------|
| `chatbot_opened` | Mở chat widget | Chatbot |
| `chatbot_message_sent` | Gửi tin nhắn text | Chatbot |
| `chatbot_quick_reply` | Click quick reply button | Chatbot |
| `chatbot_product_viewed` | Xem product card | Chatbot |
| `chatbot_product_clicked` | Click vào product card | Chatbot + Ecommerce |
| `select_item` | Click product card (Ecommerce) | Ecommerce |

#### Ecommerce Tracking:

Khi click vào product card, bot sẽ track:
- Event: `select_item` (GA4 ecommerce)
- Item ID, Name, Category
- Sử dụng để đo conversion từ chat → product page

---

## 📊 Xem Analytics Trong Google Analytics

1. Đăng nhập Google Analytics
2. Vào **Reports** → **Engagement** → **Events**
3. Filter theo **Event name** bắt đầu bằng `chatbot_`
4. Hoặc vào **Monetization** → **Ecommerce** để xem `select_item` events

### Metrics Quan Trọng:

- **Chatbot open rate**: Số lần mở chatbot
- **Message sent rate**: Số tin nhắn gửi
- **Quick reply usage**: Quick replies được dùng nhiều nhất
- **Product views from chat**: Sản phẩm được xem từ chatbot
- **Chat to product conversion**: Tỷ lệ chuyển đổi từ chat → product page

---

## 🔧 Code Structure

### Analytics Utility (`lib/analytics.js`)

```javascript
import { trackChatbotOpened, trackProductClicked } from '../lib/analytics';

// Track events
trackChatbotOpened();
trackProductClicked(productId, productName);
```

### Chatbot Response Format (`lib/chatbot.js`)

```javascript
// Text response
{
  text: 'Response text',
  type: 'text',
  metadata: {}
}

// Product cards response
{
  text: 'Sản phẩm nổi bật:',
  type: 'products',
  metadata: {
    products: [/* product objects */]
  }
}
```

### Product Card Component (`components/ChatWidget.js`)

Product cards được render tự động khi `msg.type === 'products'` và có `metadata.products`.

---

## 🚀 Usage Examples

### User hỏi: "xem sản phẩm"
→ Bot trả về: Text message + 3 featured product cards

### User hỏi: "kimchi"
→ Bot trả về: Text message + 3 kimchi product cards

### User click vào product card
→ Track: `chatbot_product_clicked` + `select_item` (ecommerce)
→ Navigate: `/products#product-id`

---

## 📈 Best Practices

1. **Monitor Analytics Weekly**
   - Check chatbot open rate
   - Identify popular questions
   - Track product views from chat

2. **Optimize Product Cards**
   - Ensure images load fast
   - Keep descriptions concise
   - Use clear pricing

3. **A/B Test Quick Replies**
   - Test different quick reply options
   - Measure which ones drive more engagement

---

**Cập nhật**: Rich Messages và Analytics Tracking đã được tích hợp vào Seoul Bot! 🎉

