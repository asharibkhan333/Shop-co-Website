import { useNavigate } from "react-router-dom";
import "./CartEmpty.css";

function CartEmpty() {
  const navigate = useNavigate();

  return (
    <div className="cart-empty">
      <i className="fa-solid fa-cart-shopping cart-empty-icon"></i>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven&rsquo;t added anything yet.</p>

      <button type="button" onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
}

export default CartEmpty;
