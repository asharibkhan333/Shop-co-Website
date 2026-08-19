import "./QuantitySelector.css";

export default function QuantitySelector({ quantity, setQuantity }) {
  return (
    <div className="qs">
      <button
        type="button"
        className="qs-btn"
        onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
        aria-label="Decrease quantity"
      >
        <i className="fa-solid fa-minus"></i>
      </button>
      <span className="qs-value">{quantity}</span>
      <button
        type="button"
        className="qs-btn"
        onClick={() => setQuantity(quantity + 1)}
        aria-label="Increase quantity"
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}