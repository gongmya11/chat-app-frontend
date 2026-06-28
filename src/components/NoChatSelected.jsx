import { MessageSquare, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="no-chat-container">
      <div className="no-chat-icon-box" style={{ background: "transparent", boxShadow: "none", padding: "0" }}>
        <img 
          src="/logo.png" 
          alt="Mya App Logo" 
          style={{ 
            width: "96px", 
            height: "96px", 
            objectFit: "contain", 
            borderRadius: "20px",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)"
          }} 
        />
      </div>
      <h2 className="no-chat-title" style={{ marginTop: "16px" }}>Chào mừng đến với Mya app!</h2>
      <p className="no-chat-desc">
        Chọn một người bạn bên cột trái để kết nối và bắt đầu cuộc trò chuyện.
      </p>
    </div>
  );
};

export default NoChatSelected;
