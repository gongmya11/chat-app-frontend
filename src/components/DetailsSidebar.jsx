import { Bell, Search, User, ShieldAlert, Image, FileText, Pin } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DetailsSidebar = ({ user }) => {
  const { onlineUsers } = useAuth();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div className="details-sidebar">
      <div className="details-avatar-wrapper">
        <img
          src={user.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=" + user.username}
          alt={user.username}
          className="details-avatar"
        />
      </div>

      <h3 className="details-name">{user.username}</h3>
      <span className="details-status-badge">
        {isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
      </span>

      <div className="details-quick-actions">
        <div className="quick-action-item">
          <button className="quick-action-icon-btn">
            <User size={18} />
          </button>
          <span>Trang cá nhân</span>
        </div>
        <div className="quick-action-item">
          <button className="quick-action-icon-btn">
            <Bell size={18} />
          </button>
          <span>Tắt thông báo</span>
        </div>
        <div className="quick-action-item">
          <button className="quick-action-icon-btn">
            <Search size={18} />
          </button>
          <span>Tìm kiếm</span>
        </div>
      </div>

      <div className="details-accordion">
        <details className="accordion-item" open>
          <summary className="accordion-header">Thông tin đoạn chat</summary>
          <div className="accordion-content" style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <Pin size={16} />
              <span>Xem tin nhắn đã ghim</span>
            </div>
          </div>
        </details>

        <details className="accordion-item">
          <summary className="accordion-header">File phương tiện & tài liệu</summary>
          <div className="accordion-content" style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <Image size={16} />
              <span>Hình ảnh đã gửi</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <FileText size={16} />
              <span>Tài liệu & liên kết</span>
            </div>
          </div>
        </details>

        <details className="accordion-item">
          <summary className="accordion-header">Quyền riêng tư & hỗ trợ</summary>
          <div className="accordion-content" style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#ff4d4d", cursor: "pointer" }}>
              <ShieldAlert size={16} />
              <span>Báo cáo / Chặn người dùng</span>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};

export default DetailsSidebar;
