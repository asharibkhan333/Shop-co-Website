import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import "./OrderSuccess.css";


function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="order-success">
          <div className="order-success-card">
            <i className="fa-solid fa-circle-exclamation order-success-icon warn"></i>
            <h1>No order found</h1>
            <p>We couldn't find your recent order.</p>

            <div className="order-success-actions">
              <button onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="order-success">
        <div className="order-success-card">
          <i className="fa-solid fa-circle-check order-success-icon"></i>

          <h1>Order Successfully Placed!</h1>

          <p>
            Thank you for shopping with SHOP.CO.
            Your order has been received.
          </p>

          <div className="order-success-details">

            <div>
              <span className="order-success-label">Order ID</span>
              <span className="order-success-value">
                {order._id}
              </span>
            </div>

            <div>
              <span className="order-success-label">Order Total</span>
              <span className="order-success-value">
                ${Number(order.totalAmount || 0).toFixed(2)}
              </span>
            </div>

            <div>
              <span className="order-success-label">Order Status</span>
              <span className="order-success-value">
                {order.status || "pending"}
              </span>
            </div>

            <div>
              <span className="order-success-label">Payment Status</span>
              <span className="order-success-value">
                {order.paymentStatus || "pending"}
              </span>
            </div>

          </div>

          <div className="order-success-actions">
            <button
              type="button"
              className="order-success-secondary"
              onClick={() => navigate("/my-orders")}
            >
              My Orders
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderSuccess;
