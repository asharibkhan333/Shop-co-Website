
// import { useState } from "react";
// import "./Navbar.css";

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       <header className="navbar">
//         <div className="nav-container">

//           {/* Mobile Menu Icon */}
//           <button
//             className="menu-btn"
//             onClick={() => setIsMenuOpen(true)}
//           >
//             <i className="fa-solid fa-bars"></i>
//           </button>

//           {/* Logo */}
//           <div className="logo">
//             SHOP.CO
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="desktop-nav">
//             <a href="#shop">
//               Shop <i className="fa-solid fa-chevron-down"></i>
//             </a>

//             <a href="#sale">On Sale</a>
//             <a href="#new-arrivals">New Arrivals</a>
//             <a href="#brands">Brands</a>
//           </nav>

//           {/* Search */}
//           <div className="search-box">
//             <i className="fa-solid fa-magnifying-glass"></i>

//             <input
//               type="text"
//               placeholder="Search for products..."
//             />
//           </div>

//           {/* Right Icons */}
//           <div className="nav-icons">
//             <button>
//               <i className="fa-solid fa-cart-shopping"></i>
//             </button>

//             <button className="user-icon">
//               <i className="fa-regular fa-circle-user"></i>
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Overlay */}
//       <div
//         className={`menu-overlay ${isMenuOpen ? "active" : ""}`}
//         onClick={closeMenu}
//       ></div>

//       {/* Mobile Sidebar */}
//       <aside className={`mobile-sidebar ${isMenuOpen ? "open" : ""}`}>

//         <div className="sidebar-header">
//           <h2>SHOP.CO</h2>

//           <button onClick={closeMenu}>
//             <i className="fa-solid fa-xmark"></i>
//           </button>
//         </div>

//         <nav className="mobile-nav">
//           <a href="#home" onClick={closeMenu}>
//             Home
//           </a>

//           <a href="#shop" onClick={closeMenu}>
//             Shop
//           </a>

//           <a href="#sale" onClick={closeMenu}>
//             On Sale
//           </a>

//           <a href="#new-arrivals" onClick={closeMenu}>
//             New Arrivals
//           </a>

//           <a href="#brands" onClick={closeMenu}>
//             Brands
//           </a>

//           <a href="#cart" onClick={closeMenu}>
//             <i className="fa-solid fa-cart-shopping"></i>
//             Cart
//           </a>
//         </nav>

//       </aside>
//     </>
//   );
// }

// export default Navbar;

// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import { useCart } from "../lib/cart";

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <>
//       <header className="navbar">
//         <div className="nav-container">

//           {/* Mobile Menu Icon */}
//           <button
//             className="menu-btn"
//             onClick={() => setIsMenuOpen(true)}
//           >
//             <i className="fa-solid fa-bars"></i>
//           </button>

//           {/* Logo */}
//           <Link to="/" className="logo">
//             SHOP.CO
//           </Link>

//           {/* Desktop Navigation */}
//           <nav className="desktop-nav">

//             {/* SHOP → CATEGORY PAGE */}
//             <Link to="/category">
//               Shop <i className="fa-solid fa-chevron-down"></i>
//             </Link>

//             <a href="#sale">On Sale</a>

//             <a href="#new-arrivals">
//               New Arrivals
//             </a>

//             <a href="#brands">
//               Brands
//             </a>

//           </nav>

//           {/* Search */}
//           <div className="search-box">
//             <i className="fa-solid fa-magnifying-glass"></i>

//             <input
//               type="text"
//               placeholder="Search for products..."
//             />
//           </div>

//           {/* Right Icons */}
//           <div className="nav-icons">

//             {/* CART PAGE */}
//             <Link to="/cart">
//               <i className="fa-solid fa-cart-shopping"></i>
//             </Link>

//             <button className="user-icon">
//               <i className="fa-regular fa-circle-user"></i>
//             </button>

//           </div>
//         </div>
//       </header>

//       {/* Overlay */}
//       <div
//         className={`menu-overlay ${isMenuOpen ? "active" : ""}`}
//         onClick={closeMenu}
//       ></div>

//       {/* Mobile Sidebar */}
//       <aside
//         className={`mobile-sidebar ${
//           isMenuOpen ? "open" : ""
//         }`}
//       >

//         <div className="sidebar-header">
//           <h2>SHOP.CO</h2>

//           <button onClick={closeMenu}>
//             <i className="fa-solid fa-xmark"></i>
//           </button>
//         </div>

//         <nav className="mobile-nav">

//           <Link to="/" onClick={closeMenu}>
//             Home
//           </Link>

//           {/* SHOP → CATEGORY PAGE */}
//           <Link to="/category" onClick={closeMenu}>
//             Shop
//           </Link>

//           <a href="#sale" onClick={closeMenu}>
//             On Sale
//           </a>

//           <a href="#new-arrivals" onClick={closeMenu}>
//             New Arrivals
//           </a>

//           <a href="#brands" onClick={closeMenu}>
//             Brands
//           </a>

//           {/* CART PAGE */}
//           <Link to="/cart" onClick={closeMenu}>
//             <i className="fa-solid fa-cart-shopping"></i>
//             Cart
//           </Link>

//         </nav>
//       </aside>
//     </>
//   );
// }

// export default Navbar;

import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../lib/cart";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cart se total quantity
  const { count } = useCart();

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="nav-container">

          {/* Mobile Menu Icon */}
          <button
            className="menu-btn"
            onClick={() => setIsMenuOpen(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          {/* Logo */}
          <Link to="/" className="logo">
            SHOP.CO
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">

            {/* SHOP → CATEGORY PAGE */}
            <Link to="/category">
              Shop <i className="fa-solid fa-chevron-down"></i>
            </Link>

            <a href="#sale">
              On Sale
            </a>

            <a href="#new-arrivals">
              New Arrivals
            </a>

            <a href="#brands">
              Brands
            </a>

          </nav>

          {/* Search */}
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              type="text"
              placeholder="Search for products..."
            />
          </div>

          {/* Right Icons */}
          <div className="nav-icons">

            {/* CART PAGE */}
            <Link to="/cart" className="cart-link">
              <i className="fa-solid fa-cart-shopping"></i>

              {/* Cart Count */}
              {count > 0 && (
                <span className="cart-count">
                  {count}
                </span>
              )}
            </Link>

            <button className="user-icon">
              <i className="fa-regular fa-circle-user"></i>
            </button>

          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`menu-overlay ${
          isMenuOpen ? "active" : ""
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Sidebar */}
      <aside
        className={`mobile-sidebar ${
          isMenuOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">
          <h2>SHOP.CO</h2>

          <button onClick={closeMenu}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <nav className="mobile-nav">

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/category" onClick={closeMenu}>
            Shop
          </Link>

          <a href="#sale" onClick={closeMenu}>
            On Sale
          </a>

          <a href="#new-arrivals" onClick={closeMenu}>
            New Arrivals
          </a>

          <a href="#brands" onClick={closeMenu}>
            Brands
          </a>

          {/* CART PAGE */}
          <Link to="/cart" onClick={closeMenu}>
            <i className="fa-solid fa-cart-shopping"></i>

            Cart

            {count > 0 && (
              <span className="mobile-cart-count">
                ({count})
              </span>
            )}
          </Link>

        </nav>
      </aside>
    </>
  );
}

export default Navbar;