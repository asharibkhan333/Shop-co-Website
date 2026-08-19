import "./CartItem.css";

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-media">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="cart-item-body">
        <div className="cart-item-top">
          <div className="cart-item-info">
            <h3 className="cart-item-name">{item.name}</h3>
            <p className="cart-item-meta">Size: {item.size}</p>
            <p className="cart-item-meta">Color: {item.color}</p>
          </div>

          <button
            type="button"
            className="cart-item-remove"
            onClick={onRemove}
            aria-label={`Remove ${item.name} from cart`}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>

        <div className="cart-item-bottom">
          <span className="cart-item-price">${item.price}</span>

          <div className="cart-item-qty">
            <button
              type="button"
              onClick={onDecrease}
              aria-label="Decrease quantity"
            >
              <i className="fa-solid fa-minus"></i>
            </button>

            <span>{item.quantity}</span>

            <button
              type="button"
              onClick={onIncrease}
              aria-label="Increase quantity"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
