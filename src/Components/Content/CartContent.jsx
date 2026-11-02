import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  getCart,
  addToCart as addToCartStorage,
  removeFromCart as removeFromCartStorage,
  updateCartQuantity as updateCartQuantityStorage,
  clearCart as clearCartStorage,
} from "../lib/cart";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Lazy init so localStorage is only read once, on first mount.
  const [cart, setCart] = useState(() => getCart());

  const addItem = useCallback((item) => {
    setCart(addToCartStorage(item));
  }, []);

  const removeItem = useCallback((id, color, size) => {
    setCart(removeFromCartStorage(id, color, size));
  }, []);

  const updateQuantity = useCallback((id, color, size, quantity) => {
    setCart(updateCartQuantityStorage(id, color, size, quantity));
  }, []);

  const clearCart = useCallback(() => {
    setCart(clearCartStorage());
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    cartCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a <CartProvider>");
  }

  return context;
}
