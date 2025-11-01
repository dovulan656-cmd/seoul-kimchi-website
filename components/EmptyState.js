'use client';

import Link from 'next/link';

/**
 * Empty State Component
 * Hiển thị khi không có content (products, blog posts, etc.)
 */

export default function EmptyState({
  icon = '📦',
  title = 'Không tìm thấy',
  description = 'Hiện tại chưa có nội dung nào.',
  actionLabel = null,
  actionLink = null,
  onAction = null,
  className = ''
}) {
  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state-icon">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-description">{description}</p>
      {actionLabel && (
        actionLink ? (
          <Link href={actionLink} className="btn-primary">
            {actionLabel}
          </Link>
        ) : onAction ? (
          <button onClick={onAction} className="btn-primary">
            {actionLabel}
          </button>
        ) : null
      )}
    </div>
  );
}

/**
 * Empty Products State
 */
export function EmptyProducts({ searchQuery = null, onClearSearch = null }) {
  if (searchQuery) {
    return (
      <EmptyState
        icon="🔍"
        title="Không tìm thấy sản phẩm"
        description={`Không có sản phẩm nào khớp với "${searchQuery}". Hãy thử tìm kiếm với từ khóa khác.`}
        actionLabel="Xóa bộ lọc"
        onAction={onClearSearch}
      />
    );
  }
  
  return (
    <EmptyState
      icon="🌶️"
      title="Chưa có sản phẩm"
      description="Chúng tôi đang cập nhật danh sách sản phẩm. Vui lòng quay lại sau!"
      actionLabel="Xem trang chủ"
      actionLink="/"
    />
  );
}

/**
 * Empty Blog State
 */
export function EmptyBlog() {
  return (
    <EmptyState
      icon="📝"
      title="Chưa có bài viết"
      description="Chúng tôi đang chuẩn bị các bài viết hữu ích về Kimchi. Hãy quay lại sau!"
      actionLabel="Xem sản phẩm"
      actionLink="/products"
    />
  );
}

