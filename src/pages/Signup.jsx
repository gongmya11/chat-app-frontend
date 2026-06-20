import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, User, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { signup, isSigningUp } = useAuth();

  const validateForm = () => {
    if (!formData.username.trim()) return "Vui lòng nhập tên tài khoản";
    if (!formData.email.trim()) return "Vui lòng nhập email";
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Định dạng email không hợp lệ";
    if (!formData.password) return "Vui lòng nhập mật khẩu";
    if (formData.password.length < 6) return "Mật khẩu phải chứa ít nhất 6 ký tự";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    const result = await signup(formData);
    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="auth-container glass-panel">
      <div className="auth-header">
        <div className="auth-logo">
          <MessageSquare size={32} />
        </div>
        <h1>Đăng ký tài khoản</h1>
        <p>Bắt đầu trò chuyện với bạn bè của bạn ngay hôm nay</p>
      </div>

      {errorMsg && (
        <div style={{
          background: "rgba(255, 77, 77, 0.1)",
          border: "1px solid rgba(255, 77, 77, 0.2)",
          color: "#ff4d4d",
          padding: "12px",
          borderRadius: "10px",
          marginBottom: "20px",
          fontSize: "0.9rem",
          textAlign: "center"
        }}>
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label>Tên tài khoản</label>
          <div className="input-wrapper">
            <User size={18} className="input-icon" />
            <input
              type="text"
              placeholder="nhaptenuser"
              className="form-input"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <div className="input-wrapper">
            <Mail size={18} className="input-icon" />
            <input
              type="email"
              placeholder="user@example.com"
              className="form-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <div className="input-wrapper">
            <Lock size={18} className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="form-input"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              style={{
                position: "absolute",
                right: "16px",
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
                display: "flex"
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={isSigningUp}>
          {isSigningUp ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <Loader size={18} style={{ animation: "spin 1s linear infinite" }} />
              <span>Đang tạo tài khoản...</span>
            </div>
          ) : (
            "Đăng ký"
          )}
        </button>
      </form>

      <div className="auth-footer">
        Đã có tài khoản?
        <Link to="/login">Đăng nhập</Link>
      </div>
    </div>
  );
};

export default Signup;
