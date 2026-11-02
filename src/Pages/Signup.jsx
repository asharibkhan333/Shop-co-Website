import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../Components/lib/auth";
import "./Auth.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Profile picture select
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB.");
      return;
    }

    setError("");
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const signupData = new FormData();

      signupData.append("name", formData.name);
      signupData.append("email", formData.email);
      signupData.append("password", formData.password);

      if (selectedImage) {
        signupData.append("avatar", selectedImage);
      }

      await signupUser(signupData);

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">
          SHOP.CO
        </Link>

        <div className="auth-heading">
          <span className="auth-eyebrow">JOIN SHOP.CO</span>
          <h1>Create your account</h1>
          <p>Sign up to discover new styles and enjoy shopping.</p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* PROFILE PICTURE */}
          <div className="auth-field">
            <label htmlFor="signup-avatar">Profile Picture (Optional)</label>

            <div className="signup-avatar-upload">
              <div className="signup-avatar-preview">
                {previewImage ? (
                  <img src={previewImage} alt="Profile preview" />
                ) : (
                  <i className="fa-solid fa-user"></i>
                )}
              </div>

              <label htmlFor="signup-avatar" className="signup-avatar-button">
                <i className="fa-solid fa-camera"></i>
                Choose Picture
              </label>

              <input
                id="signup-avatar"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
            </div>

            <small>JPG, PNG or WEBP. Maximum 5MB.</small>
          </div>

          {/* FULL NAME */}
          <div className="auth-field">
            <label htmlFor="signup-name">Full Name</label>
            <input
              id="signup-name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="auth-field">
            <label htmlFor="signup-email">Email Address</label>
            <input
              id="signup-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="auth-field">
            <label htmlFor="signup-password">Password</label>

            <div className="password-wrapper">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                minLength={8}
                autoComplete="new-password"
                required
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <i
                  className={
                    showPassword
                      ? "fa-regular fa-eye-slash"
                      : "fa-regular fa-eye"
                  }
                ></i>
              </button>
            </div>
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
            {!loading && <i className="fa-solid fa-arrow-right"></i>}
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </div>

        <Link to="/" className="auth-back">
          <i className="fa-solid fa-arrow-left"></i> Back to shopping
        </Link>
      </div>
    </div>
  );
}

export default Signup;
