import { Phone, Video, Info, ChevronLeft } from "lucide-react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";

const ChatHeader = ({ showRightSidebar, setShowRightSidebar }) => {
  const { selectedUser, setSelectedUser } = useChat();
  const { onlineUsers } = useAuth();

  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="chat-header">
      <div className="chat-header-info">
        {/* Nút quay lại dành cho mobile */}
        <button 
          className="header-icon-btn mobile-only" 
          onClick={() => setSelectedUser(null)}
          style={{ display: "none" }} // Class mobile-only sẽ được kích hoạt ở css responsive nếu cần, ở đây tạm để inline ẩn trên desktop
        >
          <ChevronLeft size={20} />
        </button>

        <div className="avatar-wrapper header-avatar">
          <img
            src={selectedUser.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=" + selectedUser.username}
            alt={selectedUser.username}
            className="user-avatar"
          />
          {isOnline && <span className="online-indicator"></span>}
        </div>
        <div>
          <h3 className="header-name">{selectedUser.username}</h3>
          <p className="header-status">
            {isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
          </p>
        </div>
      </div>

      <div className="header-actions">
        <button className="header-icon-btn" title="Bắt đầu cuộc gọi thoại">
          <Phone size={18} />
        </button>
        <button className="header-icon-btn" title="Bắt đầu cuộc gọi video">
          <Video size={18} />
        </button>
        <button 
          className={`header-icon-btn ${showRightSidebar ? "active" : ""}`}
          onClick={() => setShowRightSidebar(!showRightSidebar)}
          title="Thông tin về cuộc trò chuyện"
        >
          <Info size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
