import { createContext, useContext, useState, useEffect } from "react";
import { axiosInstance } from "../lib/axios";
import { useAuth } from "./AuthContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  const { socket } = useAuth();

  // Phát âm thanh thông báo "ping" bằng Web Audio API
  const playNotificationSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); // 600Hz frequency
      gainNode.gain.setValueAtTime(0.06, audioCtx.currentTime); // Low volume
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.12); // Beep duration 120ms
    } catch (err) {
      console.log("Audio play blocked by browser:", err.message);
    }
  };

  const getUsers = async () => {
    setIsUsersLoading(true);
    try {
      const res = await axiosInstance.get("/messages/users");
      setUsers(res.data);
    } catch (error) {
      console.log("Error in getUsers:", error.message);
    } finally {
      setIsUsersLoading(false);
    }
  };

  const getMessages = async (userId) => {
    setIsMessagesLoading(true);
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      setMessages(res.data);
    } catch (error) {
      console.log("Error in getMessages:", error.message);
    } finally {
      setIsMessagesLoading(false);
    }
  };

  const sendMessage = async (messageData) => {
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      setMessages((prevMessages) => [...prevMessages, res.data]);
      return { success: true };
    } catch (error) {
      console.log("Error in sendMessage:", error.message);
      return { success: false, message: error.response?.data?.message || "Lỗi khi gửi tin nhắn" };
    }
  };

  // Lắng nghe tin nhắn mới thông qua Socket.io
  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      // Chỉ tự động thêm tin nhắn vào feed nếu tin nhắn đến từ người dùng đang được chọn để chat cùng
      if (selectedUser && newMessage.sender === selectedUser._id) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
      playNotificationSound();
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, selectedUser]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        users,
        selectedUser,
        isUsersLoading,
        isMessagesLoading,
        getUsers,
        getMessages,
        sendMessage,
        setSelectedUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
