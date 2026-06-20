import { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = ({ showRightSidebar, setShowRightSidebar }) => {
  const { messages, getMessages, isMessagesLoading, selectedUser } = useChat();
  const { authUser } = useAuth();
  const feedRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id]);

  // Tự động cuộn xuống cuối khi có tin nhắn mới hoặc đổi hội thoại
  useEffect(() => {
    if (feedRef.current && messages) {
      feedRef.current.scrollTo({
        top: feedRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const formatMessageTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chat-container">
      <ChatHeader showRightSidebar={showRightSidebar} setShowRightSidebar={setShowRightSidebar} />

      <div className="messages-feed" ref={feedRef}>
        {isMessagesLoading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            Đang tải tin nhắn...
          </div>
        ) : messages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
            Bắt đầu cuộc trò chuyện. Hãy gửi lời chào đầu tiên!
          </div>
        ) : (
          messages.map((message) => {
            const isSentByMe = message.sender === authUser._id;

            return (
              <div
                key={message._id}
                className={`message-row ${isSentByMe ? "sent" : "received"}`}
              >
                {!isSentByMe && (
                  <img
                    src={selectedUser.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=" + selectedUser.username}
                    alt={selectedUser.username}
                    className="message-avatar"
                  />
                )}
                <div className="message-bubble-wrapper">
                  <div className="message-bubble">
                    {message.text && <p>{message.text}</p>}
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Hình ảnh tin nhắn"
                        className="message-image"
                        onClick={() => window.open(message.image, "_blank")}
                      />
                    )}
                  </div>
                  <span className="message-time">
                    {formatMessageTime(message.createdAt)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
