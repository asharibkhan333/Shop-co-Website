import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../Content/CartContent.jsx";
import { getCurrentUser, logoutUser } from "../../Components/lib/auth.js";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(() => getCurrentUser());

  const { cartCount, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const updateUser = () => setUser(getCurrentUser());

    window.addEventListener("authChanged", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("authChanged", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = () => {
    logoutUser();
    clearCart();

    setUser(null);
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);

    navigate("/login", { replace: true });
  };

  const userName = user?.name || user?.firstName || "My Account";

  return (
    <>
      <header className="navbar">
        <div className="nav-container">
          <button
            className="menu-btn"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          <Link to="/" className="logo">SHOP.CO</Link>

          <nav className="desktop-nav">
            <Link to="/category">
              Shop <i className="fa-solid fa-chevron-down"></i>
            </Link>
            <a href="#sale">On Sale</a>
            <a href="#new-arrivals">New Arrivals</a>
            <a href="#brands">Brands</a>
          </nav>

          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search for products..." />
          </div>

          <div className="nav-icons">
            <Link to="/cart" className="cart-link">
              <i className="fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
              )}
            </Link>

            <div className="user-menu-wrapper">
              <button
                className={`user-icon ${user ? "logged-in-user" : ""}`}
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                aria-label="User account menu"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="navbar-avatar"
                  />
                ) : (
                  <i className="fa-regular fa-circle-user"></i>
                )}

                {user && (
                  <span className="navbar-user-name">{userName}</span>
                )}
              </button>

              {isUserMenuOpen && (
                <div className="user-dropdown">
                  {user ? (
                    <>
                      <Link to="/my-account" onClick={() => setIsUserMenuOpen(false)}>
                        <i className="fa-regular fa-user"></i>
                        My Account
                      </Link>

                      <Link to="/my-orders" onClick={() => setIsUserMenuOpen(false)}>
                        <i className="fa-solid fa-box"></i>
                        My Orders
                      </Link>

                      <button onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsUserMenuOpen(false)}>
                        <i className="fa-solid fa-right-to-bracket"></i>
                        Login
                      </Link>
                      <Link to="/signup" onClick={() => setIsUserMenuOpen(false)}>
                        <i className="fa-solid fa-user-plus"></i>
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div
        className={`menu-overlay ${isMenuOpen ? "active" : ""}`}
        onClick={closeMenu}
      ></div>

      <aside className={`mobile-sidebar ${isMenuOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>SHOP.CO</h2>
          <button onClick={closeMenu} aria-label="Close menu">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="mobile-nav">
          <Link to="/" onClick={closeMenu}>Home</Link>
          <Link to="/category" onClick={closeMenu}>Shop</Link>
          <a href="#sale" onClick={closeMenu}>On Sale</a>
          <a href="#new-arrivals" onClick={closeMenu}>New Arrivals</a>
          <a href="#brands" onClick={closeMenu}>Brands</a>

          <Link to="/cart" onClick={closeMenu}>
            <i className="fa-solid fa-cart-shopping"></i>
            Cart {cartCount > 0 && `(${cartCount})`}
          </Link>

          {user ? (
            <>
              <Link to="/my-account" onClick={closeMenu}>
                <i className="fa-regular fa-user"></i> My Account
              </Link>
              <Link to="/my-orders" onClick={closeMenu}>
                <i className="fa-solid fa-box"></i> My Orders
              </Link>
              <button className="mobile-logout" onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>Login</Link>
              <Link to="/signup" onClick={closeMenu}>Create Account</Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
}

export default Navbar;
