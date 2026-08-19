import "./CheckoutOrderSummary.css";

const DISCOUNT_RATE = 0.2;

function CheckoutOrderSummary({ cart, subtotal }) {
  const discount = subtotal * DISCOUNT_RATE;
  const deliveryFee = subtotal > 500 ? 0 : 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <div className="checkout-summary">
      <h2>Order Summary</h2>

      <div className="checkout-summary-items">
        {cart.map((item) => (
          <div
            className="checkout-summary-item"
            key={`${item.id}-${item.color}-${item.size}`}
          >
            <div className="checkout-summary-item-media">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="checkout-summary-item-body">
              <p className="checkout-summary-item-name">{item.name}</p>
              <p className="checkout-summary-item-meta">Size: {item.size}</p>
              <p className="checkout-summary-item-meta">Color: {item.color}</p>
              <p className="checkout-summary-item-meta">
                Quantity: {item.quantity}
              </p>
              <p className="checkout-summary-item-calc">
                ${item.price} &times; {item.quantity}
              </p>
            </div>

            <div className="checkout-summary-item-total">
              ${item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-summary-divider"></div>

      <div className="checkout-summary-row">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(0)}</span>
      </div>

      <div className="checkout-summary-row">
        <span>Discount (-20%)</span>
        <span className="checkout-summary-discount">
          -${discount.toFixed(0)}
        </span>
      </div>

      <div className="checkout-summary-row">
        <span>Delivery Fee</span>
        <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee}`}</span>
      </div>

      <div className="checkout-summary-divider"></div>

      <div className="checkout-summary-row checkout-summary-total">
        <span>Total</span>
        <span>${total.toFixed(0)}</span>
      </div>
    </div>
  );
}

export default CheckoutOrderSummary;
