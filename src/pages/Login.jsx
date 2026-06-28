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
    <div className="auth-page-wrapper">
      {/* SVG perspective lines background */}
      <svg className="auth-bg-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Rays from center 50,50 to outer borders */}
        {/* y = 0 */}
        <line x1="50" y1="50" x2="0" y2="0" />
        <line x1="50" y1="50" x2="10" y2="0" />
        <line x1="50" y1="50" x2="20" y2="0" />
        <line x1="50" y1="50" x2="30" y2="0" />
        <line x1="50" y1="50" x2="40" y2="0" />
        <line x1="50" y1="50" x2="50" y2="0" />
        <line x1="50" y1="50" x2="60" y2="0" />
        <line x1="50" y1="50" x2="70" y2="0" />
        <line x1="50" y1="50" x2="80" y2="0" />
        <line x1="50" y1="50" x2="90" y2="0" />
        <line x1="50" y1="50" x2="100" y2="0" />
        {/* y = 100 */}
        <line x1="50" y1="50" x2="0" y2="100" />
        <line x1="50" y1="50" x2="10" y2="100" />
        <line x1="50" y1="50" x2="20" y2="100" />
        <line x1="50" y1="50" x2="30" y2="100" />
        <line x1="50" y1="50" x2="40" y2="100" />
        <line x1="50" y1="50" x2="50" y2="100" />
        <line x1="50" y1="50" x2="60" y2="100" />
        <line x1="50" y1="50" x2="70" y2="100" />
        <line x1="50" y1="50" x2="80" y2="100" />
        <line x1="50" y1="50" x2="90" y2="100" />
        <line x1="50" y1="50" x2="100" y2="100" />
        {/* x = 0 */}
        <line x1="50" y1="50" x2="0" y2="10" />
        <line x1="50" y1="50" x2="0" y2="20" />
        <line x1="50" y1="50" x2="0" y2="30" />
        <line x1="50" y1="50" x2="0" y2="40" />
        <line x1="50" y1="50" x2="0" y2="50" />
        <line x1="50" y1="50" x2="0" y2="60" />
        <line x1="50" y1="50" x2="0" y2="70" />
        <line x1="50" y1="50" x2="0" y2="80" />
        <line x1="50" y1="50" x2="0" y2="90" />
        {/* x = 100 */}
        <line x1="50" y1="50" x2="100" y2="10" />
        <line x1="50" y1="50" x2="100" y2="20" />
        <line x1="50" y1="50" x2="100" y2="30" />
        <line x1="50" y1="50" x2="100" y2="40" />
        <line x1="50" y1="50" x2="100" y2="50" />
        <line x1="50" y1="50" x2="100" y2="60" />
        <line x1="50" y1="50" x2="100" y2="70" />
        <line x1="50" y1="50" x2="100" y2="80" />
        <line x1="50" y1="50" x2="100" y2="90" />
      </svg>

      <div className="auth-card-container split-card">
        {/* Left Side: Brand Logo Column (Replaces QR Code) */}
        <div className="auth-left-brand">
          <div className="brand-logo-wrapper">
            <img src="/logo.png" alt="Mya app logo" style={{ width: "64px", height: "64px", objectFit: "contain", borderRadius: "14px" }} />
          </div>
          <h2 className="brand-title">Mya app</h2>
          <p className="brand-subtitle">Ứng dụng nhắn tin bảo mật thế hệ mới</p>
          <div className="brand-badge">Premium Chat</div>
        </div>

        <div className="auth-vertical-divider"></div>

        {/* Right Side: Login Form Column */}
        <div className="auth-right-form">
          <div className="auth-badge" style={{ display: "none" }}>Mya Login</div>
          <h1 className="auth-card-title">Đăng nhập tài khoản</h1>

          {errorMsg && (
            <div className="auth-error-box">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <div className="auth-field-group">
              <label className="auth-field-label">Email Address</label>
              <input
                type="email"
                placeholder="user@example.com"
                className="auth-pill-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="auth-field-group">
              <label className="auth-field-label">Password</label>
              <div className="auth-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="auth-pill-input"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-row-options">
              <label className="auth-remember-me">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="#" className="auth-forgot-link" onClick={() => alert("Chức năng đang được phát triển!")}>Forgot password?</Link>
            </div>

            <button type="submit" className="auth-btn-black" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <Loader size={18} style={{ animation: "spin 1s linear infinite" }} />
                  <span>Đang đăng nhập...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Social login options */}
          <div className="auth-social-section">
            <span className="auth-social-title">Hoặc đăng nhập bằng</span>
            <div className="auth-social-icons">
              {/* Google */}
              <button 
                type="button" 
                className="social-icon-btn google" 
                title="Đăng nhập bằng Google"
                onClick={() => alert("Đăng nhập bằng Google chưa được cấu hình!")}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
              </button>

              {/* Facebook */}
              <button 
                type="button" 
                className="social-icon-btn facebook" 
                title="Đăng nhập bằng Facebook"
                onClick={() => alert("Đăng nhập bằng Facebook chưa được cấu hình!")}
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
                </svg>
              </button>

              {/* Discord */}
              <button 
                type="button" 
                className="social-icon-btn discord" 
                title="Đăng nhập bằng Discord"
                onClick={() => alert("Đăng nhập bằng Discord chưa được cấu hình!")}
              >
                <svg viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.88,6.83,77.19,77.19,0,0,0,49.58,0,105.15,105.15,0,0,0,19.14,8.07C-3.41,41.72-1.86,74.77,12.75,96.36a105.81,105.81,0,0,0,31.94-16.14,75.1,75.1,0,0,1-6.72-3.19,5.82,5.82,0,0,1-.56-.37,56.76,56.76,0,0,0,11.23,5.63c32.7,14.28,68.08,14.28,100,0a57,57,0,0,0,11.23-5.63,6,6,0,0,1-.56.37,79.58,79.58,0,0,1-6.72,3.19,105.81,105.81,0,0,0,31.94,16.14C129.3,74.77,130.66,41.72,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.88,46,53.88,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.12,46,96.12,53,91,65.69,84.69,65.69Z" fill="#5865F2"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="auth-bottom-switch">
            Chưa có tài khoản?
            <Link to="/signup">Đăng ký ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

