import { useEffect, useState } from "react";

const STORAGE_KEY = "shopco-cart";
const CART_EVENT = "shopco-cart-updated";


export function getCart() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}


function saveCart(cart) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cart)
    );

    // React components ko update karne ke liye
    window.dispatchEvent(new Event(CART_EVENT));
  }

  return cart;
}


// ADD TO CART
export function addToCart(item) {
  const cart = getCart();

  const existing = cart.find(
    (entry) =>
      entry.id === item.id &&
      entry.color === item.color &&
      entry.size === item.size
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  return saveCart(cart);
}


// REMOVE PRODUCT
export function removeFromCart(id, color, size) {
  const cart = getCart().filter(
    (entry) =>
      !(
        entry.id === id &&
        entry.color === color &&
        entry.size === size
      )
  );

  return saveCart(cart);
}


// UPDATE QUANTITY
export function updateCartQuantity(
  id,
  color,
  size,
  quantity
) {
  const cart = getCart();

  const entry = cart.find(
    (item) =>
      item.id === id &&
      item.color === color &&
      item.size === size
  );

  if (entry) {
    entry.quantity = Math.max(1, quantity);
  }

  return saveCart(cart);
}


// CLEAR CART
export function clearCart() {
  return saveCart([]);
}


// TOTAL CART COUNT
export function getCartCount() {
  return getCart().reduce(
    (total, item) => total + item.quantity,
    0
  );
}


// SUBTOTAL
export function getCartSubtotal() {
  return getCart().reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );
}


// CUSTOM REACT HOOK
export function useCart() {
  const [cart, setCart] = useState(getCart());

  useEffect(() => {
    const syncCart = () => {
      setCart(getCart());
    };

    window.addEventListener(CART_EVENT, syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener(CART_EVENT, syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);


  const removeItem = (id, color, size) => {
    const updatedCart = removeFromCart(
      id,
      color,
      size
    );

    setCart(updatedCart);
  };


  const updateQuantity = (
    id,
    color,
    size,
    quantity
  ) => {
    const updatedCart = updateCartQuantity(
      id,
      color,
      size,
      quantity
    );

    setCart(updatedCart);
  };


  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );


  const count = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  return {
    cart,
    subtotal,
    count,
    removeItem,
    updateQuantity,
  };
}
