import { useState } from "react";
import { useChat } from "../context/ChatContext";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import DetailsSidebar from "../components/DetailsSidebar";

const Home = () => {
  const { selectedUser } = useChat();
  const [showRightSidebar, setShowRightSidebar] = useState(true);

  return (
    <div className="chat-app-window">
      <Sidebar />
      {selectedUser ? (
        <>
          <ChatContainer 
            showRightSidebar={showRightSidebar} 
            setShowRightSidebar={setShowRightSidebar} 
          />
          {showRightSidebar && <DetailsSidebar user={selectedUser} />}
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default Home;
