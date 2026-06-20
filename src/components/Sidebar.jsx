import { useEffect, useState } from "react";
import { LogOut, Search, MoreHorizontal, Edit, MessageSquare } from "lucide-react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { users, getUsers, isUsersLoading, selectedUser, setSelectedUser } = useChat();
  const { logout, onlineUsers } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  // Lọc người dùng theo từ khóa tìm kiếm
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-title-row">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {!logoError ? (
              <img
                src="/logo.png"
                alt="Logo"
                onError={() => setLogoError(true)}
                style={{ width: "24px", height: "24px", objectFit: "contain", borderRadius: "4px" }}
              />
            ) : (
              <MessageSquare size={20} style={{ color: "var(--color-messenger-blue)" }} />
            )}
            <span className="sidebar-title">Mya app</span>
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
            placeholder="Search Messenger"
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
          <div style={{ textAlign: "center", padding: "20px", color: "var(--text-secondary)" }}>
            Đang tải đoạn chat...
          </div>
        ) : filteredUsers.length === 0 ? (
          <div style={{ textAlign: "center", padding: "20px", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
            Không tìm thấy hội thoại nào
          </div>
        ) : (
          filteredUsers.map((user) => {
            const isSelected = selectedUser?._id === user._id;
            const isOnline = onlineUsers.includes(user._id);

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
                  <div className="user-name-row">
                    <span className="user-name">{user.username}</span>
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
    </aside>
  );
};

export default Sidebar;
