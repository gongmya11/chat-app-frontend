import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login, isLoggingIn } = useAuth();

  const validateForm = () => {
    if (!formData.email.trim()) return "Vui lòng nhập email";
    if (!formData.password) return "Vui lòng nhập mật khẩu";
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

    const result = await login(formData);
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
        <h1>Đăng nhập Mya app</h1>
        <p>Chào mừng bạn trở lại! Trò chuyện cùng mọi người ngay tức khắc</p>
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

        <button type="submit" className="btn-primary" disabled={isLoggingIn}>
          {isLoggingIn ? (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <Loader size={18} style={{ animation: "spin 1s linear infinite" }} />
              <span>Đang đăng nhập...</span>
            </div>
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>

      <div className="auth-footer">
        Chưa có tài khoản?
        <Link to="/signup">Đăng ký ngay</Link>
      </div>
    </div>
  );
};

export default Login;
