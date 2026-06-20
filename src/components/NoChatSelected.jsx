import { MessageSquare, Sparkles } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="no-chat-container">
      <div className="no-chat-icon-box">
        <MessageSquare size={48} style={{ position: "relative" }} />
        <Sparkles 
          size={20} 
          style={{ 
            position: "absolute", 
            top: "20px", 
            right: "20px", 
            color: "var(--color-accent)",
            animation: "pulse 2s infinite" 
          }} 
        />
      </div>
      <h2 className="no-chat-title">Chào mừng đến với Mya app!</h2>
      <p className="no-chat-desc">
        Chọn một người bạn bên cột trái để kết nối và bắt đầu cuộc trò chuyện.
      </p>
    </div>
  );
};

export default NoChatSelected;
