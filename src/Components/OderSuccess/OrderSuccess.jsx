import { useLocation, useNavigate } from "react-router-dom";
import { getLatestOrder } from "../lib/checkout";
import "./OrderSuccess.css";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  // Prefer the order passed via navigate() state (fresh checkout).
  // Fall back to the last saved order so a page refresh doesn't break.
  const order = location.state?.order || getLatestOrder();

  if (!order) {
    return (
      <div className="order-success">
        <div className="order-success-card">
          <i className="fa-solid fa-circle-exclamation order-success-icon warn"></i>
          <h1>No order found</h1>
          <p>We couldn&rsquo;t find a recent order to show you.</p>

          <div className="order-success-actions">
            <button type="button" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success">
      <div className="order-success-card">
        <i className="fa-solid fa-circle-check order-success-icon"></i>

        <h1>Order Successfully Placed!</h1>
        <p>
          Thank you for shopping with SHOP.CO. Your order has been
          confirmed.
        </p>

        <div className="order-success-details">
          <div>
            <span className="order-success-label">Order ID</span>
            <span className="order-success-value">{order.id}</span>
          </div>

          <div>
            <span className="order-success-label">Order Total</span>
            <span className="order-success-value">
              ${order.total.toFixed(0)}
            </span>
          </div>

          <div>
            <span className="order-success-label">Estimated delivery</span>
            <span className="order-success-value">3-5 business days</span>
          </div>
        </div>

        <div className="order-success-actions">
          <button
            type="button"
            className="order-success-secondary"
            onClick={() => navigate("/cart")}
          >
            View Cart
          </button>

          <button type="button" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
