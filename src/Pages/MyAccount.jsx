import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getMyProfile,
  updateMyProfile,
  logoutUser,
} from "../Components/lib/auth";
import "./Auth.css";

const EMPTY_PROFILE = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  phone: "",
  countryCode: "+92",
  address: "",
  pinCode: "",
  city: "",
  country: "",
  avatar: "",
};

function MyAccount() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // MongoDB se profile load karo
  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const customer = await getMyProfile();
        const nameParts = (customer.name || "").trim().split(/\s+/);

        if (isMounted) {
          setProfile({
            firstName: customer.firstName || nameParts[0] || "",
            lastName: customer.lastName || nameParts.slice(1).join(" "),
            userName: customer.userName || "",
            email: customer.email || "",
            phone: customer.phone || "",
            countryCode: customer.countryCode || "+92",
            address: customer.address || "",
            pinCode: customer.pinCode || "",
            city: customer.city || "",
            country: customer.country || "",
            avatar: customer.avatar || "",
          });

          setPreviewImage(customer.avatar || "");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Profile load nahi ho saki.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  // Text fields update
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Profile picture select karo
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size 5MB se kam honi chahiye.");
      e.target.value = "";
      return;
    }

    setError("");
    setSuccess("");

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  // Profile save karo aur image Cloudinary par upload karo
  const handleSave = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      setError("First Name aur Last Name required hain.");
      return;
    }

    try {
      setSaving(true);

      const profileData = new FormData();

      profileData.append("firstName", profile.firstName.trim());
      profileData.append("lastName", profile.lastName.trim());
      profileData.append("userName", profile.userName.trim());
      profileData.append("phone", profile.phone.trim());
      profileData.append("countryCode", profile.countryCode.trim());
      profileData.append("address", profile.address.trim());
      profileData.append("pinCode", profile.pinCode.trim());
      profileData.append("city", profile.city.trim());
      profileData.append("country", profile.country.trim());

      // Selected image backend ko bhejo
      if (selectedImage) {
        profileData.append("avatar", selectedImage);
      }

      const updatedCustomer = await updateMyProfile(profileData);

      if (!updatedCustomer) {
        throw new Error("Updated profile response nahi mili.");
      }

      setProfile((prev) => ({
        ...prev,
        firstName: updatedCustomer.firstName || profile.firstName,
        lastName: updatedCustomer.lastName || profile.lastName,
        userName: updatedCustomer.userName || "",
        phone: updatedCustomer.phone || "",
        countryCode: updatedCustomer.countryCode || "+92",
        address: updatedCustomer.address || "",
        pinCode: updatedCustomer.pinCode || "",
        city: updatedCustomer.city || "",
        country: updatedCustomer.country || "",
        avatar: updatedCustomer.avatar || prev.avatar,
      }));

      // Database se returned image URL preview mein lagao
      setPreviewImage(updatedCustomer.avatar || "");
      setSelectedImage(null);

      setIsEditing(false);
      setSuccess("Your profile has been updated successfully!");
    } catch (err) {
      setError(err.message || "Profile update nahi ho saki.");
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    window.location.reload();
  };

  // Logout
  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  if (loading) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile.email) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <h1>Account Details</h1>
          <p className="auth-error">{error}</p>
          <Link to="/login">Go to Login</Link>
        </div>
      </div>
    );
  }

  const inputFields = [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name", required: true },
    { name: "userName", label: "Username" },
    { name: "phone", label: "Phone Number" },
    { name: "countryCode", label: "Country Code" },
    { name: "address", label: "Address" },
    { name: "pinCode", label: "Pin Code" },
    { name: "city", label: "City" },
    { name: "country", label: "Country" },
  ];

  return (
    <div className="auth-page">
      <div className="auth-card my-account-card">
        <h1>My Account</h1>
        <p>Your SHOP.CO Profile</p>

        {/* Profile Picture */}
        <div className="account-avatar-section">
          <div className="account-avatar">
            {previewImage ? (
              <img src={previewImage} alt="Profile" />
            ) : (
              <span>
                {profile.firstName?.charAt(0)?.toUpperCase() || "U"}
              </span>
            )}
          </div>

          {isEditing && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />

              <button
                type="button"
                className="account-action-btn secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Profile Picture
              </button>

              <small>JPG, PNG or WEBP. Maximum 5MB.</small>
            </>
          )}
        </div>

        <form onSubmit={handleSave}>
          <div className="account-details">
            <div>
              <strong>Full Name</strong>
              <p>
                {`${profile.firstName} ${profile.lastName}`.trim() ||
                  "Not available"}
              </p>
            </div>

            <div>
              <strong>Email Address</strong>
              <p>{profile.email || "Not available"}</p>
            </div>

            <div>
              <strong>Account Type</strong>
              <p>Customer</p>
            </div>
          </div>

          <h3>Personal Information</h3>

          {inputFields.slice(0, 5).map((field) => (
            <div key={field.name} className="profile-field">
              <label htmlFor={field.name}>
                {field.label}
                {field.required ? " *" : ""}
              </label>

              <input
                id={field.name}
                type="text"
                name={field.name}
                value={profile[field.name]}
                onChange={handleChange}
                disabled={!isEditing || saving}
                required={field.required}
                placeholder={`Enter ${field.label}`}
              />
            </div>
          ))}

          <div className="profile-field">
            <label>Email Address</label>
            <input type="email" value={profile.email} disabled />
          </div>

          <h3>Address Information</h3>

          {inputFields.slice(5).map((field) => (
            <div key={field.name} className="profile-field">
              <label htmlFor={field.name}>{field.label}</label>

              <input
                id={field.name}
                type="text"
                name={field.name}
                value={profile[field.name]}
                onChange={handleChange}
                disabled={!isEditing || saving}
                placeholder={`Enter ${field.label}`}
              />
            </div>
          ))}

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="profile-success">{success}</p>}

          {!isEditing ? (
            <button
              type="button"
              className="account-action-btn"
              onClick={() => {
                setError("");
                setSuccess("");
                setIsEditing(true);
              }}
            >
              Edit My Profile
            </button>
          ) : (
            <>
              <button
                type="submit"
                className="account-action-btn"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                className="account-action-btn secondary"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </button>
            </>
          )}
        </form>

        <Link to="/my-orders" className="account-orders-link">
          View My Orders
        </Link>

        <button
          type="button"
          className="account-action-btn logout"
          onClick={handleLogout}
        >
          Logout
        </button>

        <button
          type="button"
          className="account-action-btn secondary"
          onClick={() => navigate("/")}
        >
          Back to Shopping
        </button>
      </div>
    </div>
  );
}

export default MyAccount;
