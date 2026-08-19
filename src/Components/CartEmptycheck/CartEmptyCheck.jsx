import { useNavigate } from "react-router-dom";
import "./CartEmptyCheck.css";

function CartEmpty({
  title = "Your cart is empty",
  message = "Looks like you haven't added anything yet.",
  buttonText = "Continue Shopping",
}) {
  const navigate = useNavigate();

  return (
    <div className="cart-empty">
      <i className="fa-solid fa-cart-shopping cart-empty-icon"></i>
      <h2>{title}</h2>
      <p>{message}</p>

      <button type="button" onClick={() => navigate("/")}>
        {buttonText}
      </button>
    </div>
  );
}

export default CartEmpty;
