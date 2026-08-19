import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSummary.css";

const DELIVERY_FEE = 15;
const DISCOUNT_RATE = 0.2;

function OrderSummary({ subtotal }) {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");

  const discount = subtotal * DISCOUNT_RATE;
  const total = subtotal - discount + DELIVERY_FEE;

  const handleApplyPromo = () => {
    // UI-only for now, as requested — swap this for a real promo
    // lookup later without touching the discount math above.
    if (!promoCode.trim()) {
      setPromoMessage("Enter a promo code first.");
      return;
    }
    setPromoMessage("Promo codes aren't active yet — stay tuned.");
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>

      <div className="order-summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(0)}</span>
      </div>

      <div className="order-summary-row">
        <span>Discount (-20%)</span>
        <span className="order-summary-discount">-${discount.toFixed(0)}</span>
      </div>

      <div className="order-summary-row">
        <span>Delivery Fee</span>
        <span>${DELIVERY_FEE}</span>
      </div>

      <div className="order-summary-divider"></div>

      <div className="order-summary-row order-summary-total">
        <span>Total</span>
        <span>${total.toFixed(0)}</span>
      </div>

      <div className="order-summary-promo">
        <i className="fa-solid fa-tag order-summary-promo-icon"></i>
        <input
          type="text"
          placeholder="Add promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button type="button" onClick={handleApplyPromo}>
          Apply
        </button>
      </div>

      {promoMessage ? (
        <p className="order-summary-promo-message">{promoMessage}</p>
      ) : null}

      <button
        type="button"
        className="checkout-btn"
        onClick={() => navigate("/checkout")}
      >
        Go to Checkout
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}

export default OrderSummary;
