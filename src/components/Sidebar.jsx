import { useEffect, useState } from "react";
import { LogOut, Search, MoreHorizontal, Edit, MessageSquare, BellOff, Loader } from "lucide-react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import ProfileModal from "./ProfileModal";

const Sidebar = () => {
  const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } = useChat();
  const { authUser, logout, onlineUsers } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [logoError, setLogoError] = useState(false);
  const [mutedUsers, setMutedUsers] = useState(() => JSON.parse(localStorage.getItem("mutedUsers") || "[]"));
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    getUsers();

    const handleMuteChange = () => {
      setMutedUsers(JSON.parse(localStorage.getItem("mutedUsers") || "[]"));
    };
    window.addEventListener("mutedUsersChanged", handleMuteChange);
    return () => window.removeEventListener("mutedUsersChanged", handleMuteChange);
  }, []);

  // Lọc người dùng theo từ khóa tìm kiếm
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title-row">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={authUser?.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=" + authUser?.username}
              alt="Hồ sơ"
              onClick={() => setShowProfileModal(true)}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                cursor: "pointer",
                objectFit: "cover",
                border: "2.5px solid var(--color-primary)",
                transition: "transform 0.2s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              title="Xem thông tin tài khoản"
            />
            <span className="sidebar-title" style={{ fontSize: "1.2rem", fontWeight: 800 }}>Mya app</span>
          </div>

          <div className="sidebar-actions">
            <button className="sidebar-action-btn" title="Xem thêm">
              <MoreHorizontal size={16} />
            </button>
            <button onClick={logout} className="sidebar-action-btn" title="Đăng xuất">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <div className="sidebar-search-wrapper">
          <Search size={16} className="input-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs danh mục kiểu Facebook Messenger */}
      <div className="sidebar-categories">
        {["All", "Unread", "Groups", "Communities"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`category-pill ${activeCategory === cat ? "active" : ""}`}
          >
            {cat === "All" ? "Hộp thư" : cat === "Unread" ? "Chưa đọc" : cat === "Groups" ? "Nhóm" : "Cộng đồng"}
          </button>
        ))}
      </div>

      <div className="sidebar-users-list">
        {isUsersLoading ? (
          <div className="sidebar-loading-wrapper">
            <Loader className="spinner" size={24} />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
            Không tìm thấy hội thoại nào
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isSelected = selectedUser?._id === user._id;
            const isOnline = onlineUsers.includes(user._id);
            const isMuted = mutedUsers.includes(user._id);

            return (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`user-item ${isSelected ? "active" : ""}`}
              >
                <div className="avatar-wrapper">
                  <img
                    src={user.avatar || "https://api.dicebear.com/7.x/bottts/svg?seed=" + user.username}
                    alt={user.username}
                    className="user-avatar"
                  />
                  {isOnline && <span className="online-indicator"></span>}
                </div>

                <div className="user-info">
                  <div className="user-name-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span className="user-name">{user.username}</span>
                    {isMuted && <BellOff size={13} style={{ color: "var(--text-secondary)" }} />}
                  </div>
                  <span className="user-status-text">
                    {isOnline ? "Đang hoạt động" : "Ngoại tuyến"}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
      <ThemeToggle />
      <ProfileModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} />
    </aside>
  );
};

export default Sidebar;
