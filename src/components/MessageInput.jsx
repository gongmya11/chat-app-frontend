import { useState, useRef } from "react";
import { Image, Send, X, PlusCircle, Paperclip } from "lucide-react";
import { useChat } from "../context/ChatContext";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChat();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Vui lòng chọn hình ảnh!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Lỗi khi gửi tin nhắn:", error.message);
    }
  };

  return (
    <div className="message-input-form">
      {imagePreview && (
        <div className="image-preview-container">
          <img src={imagePreview} alt="Xem trước" className="preview-image" />
          <button type="button" onClick={removeImage} className="remove-preview-btn">
            <X size={12} />
          </button>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="input-container">
        {/* Nút đính kèm ảnh bên trái */}
        <button
          type="button"
          className="input-action-btn"
          onClick={() => fileInputRef.current?.click()}
          title="Đính kèm hình ảnh"
        >
          <Image size={20} />
        </button>

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handleImageChange}
        />

        {/* Thanh nhập văn bản kiểu Messenger */}
        <div className="message-text-input-wrapper">
          <input
            type="text"
            className="message-text-input"
            placeholder="Aa"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* Nút gửi bên phải */}
        <button
          type="submit"
          className="send-btn"
          disabled={!text.trim() && !imagePreview}
          title="Gửi"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
