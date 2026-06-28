import { useState, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import DetailsSidebar from "../components/DetailsSidebar";

const Home = () => {
  const { selectedUser, chatThemes } = useChat();
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [showChatSearch, setShowChatSearch] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState("");

  // Tự động tắt tìm kiếm khi chuyển sang trò chuyện với người khác
  useEffect(() => {
    setShowChatSearch(false);
    setChatSearchQuery("");
  }, [selectedUser?._id]);

  return (
    <div className="chat-app-window">
      <Sidebar />
      {selectedUser ? (
        <div className="chat-active-area">
          <ChatContainer 
            showRightSidebar={showRightSidebar} 
            setShowRightSidebar={setShowRightSidebar}
            showChatSearch={showChatSearch}
            setShowChatSearch={setShowChatSearch}
            chatSearchQuery={chatSearchQuery}
            setChatSearchQuery={setChatSearchQuery}
          />
          {showRightSidebar && (
            <DetailsSidebar 
              user={selectedUser} 
              showChatSearch={showChatSearch}
              setShowChatSearch={setShowChatSearch}
            />
          )}
        </div>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default Home;
