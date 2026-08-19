import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Breadcrumb from "../Components/Breadcrumb/Breadcrumb";
import CartItem from "../Components/CartItem/CartItem";
import OrderSummary from "../Components/OrderSummary/OrderSummary";
import CartEmpty from "../Components/CartEmpty/CartEmpty";
import { useCart } from "../Components/lib/cart";
import "./Cart.css";
import Newsletter from "../Components/NewsLetter/NewsLetter";

function Cart() {
  const { cart, removeItem, updateQuantity, subtotal } = useCart();

  const handleIncrease = (item) => {
    updateQuantity(item.id, item.color, item.size, item.quantity + 1);
  };

  const handleDecrease = (item) => {
    updateQuantity(item.id, item.color, item.size, item.quantity - 1);
  };

  const handleRemove = (item) => {
    removeItem(item.id, item.color, item.size);
  };

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <div className="cart-container">
          <Breadcrumb current="Cart" />
          <h1 className="cart-title">Your Cart</h1>

          {cart.length === 0 ? (
            <CartEmpty />
          ) : (
            <div className="cart-layout">
              <div className="cart-list">
                {cart.map((item) => (
                  <CartItem
                    key={`${item.id}-${item.color}-${item.size}`}
                    item={item}
                    onIncrease={() => handleIncrease(item)}
                    onDecrease={() => handleDecrease(item)}
                    onRemove={() => handleRemove(item)}
                  />
                ))}
              </div>

              <OrderSummary subtotal={subtotal} />
            </div>
          )}
        </div>
      </div>

      <Newsletter />
      <Footer />
    </>
  );
}

export default Cart;
