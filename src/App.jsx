import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./Pages/Home.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import Category from "./Pages/Category.jsx";
import Cart from "./Pages/Cart.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Checkout from "./Pages/Checkout.jsx";
import OrderSuccess from "./Components/OderSuccess/OrderSuccess.jsx";
import MyOrders from "./Pages/MyOrder.jsx";

// Cart Context
import { CartProvider } from "./Components/Content/CartContent.jsx";
import MyAccount from "./Pages/MyAccount.jsx";

// Check customer login
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Default page */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Product Details */}
          <Route
            path="/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          {/* Category */}
          <Route
            path="/category"
            element={
              <ProtectedRoute>
                <Category />
              </ProtectedRoute>
            }
          />

          {/* Cart */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* Checkout */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          {/* Order Success */}
          <Route
            path="/order-success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />

          {/* My Orders */}
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />

          {/* My Account */}
          <Route
            path="/my-account"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />

          {/* Unknown URL */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;