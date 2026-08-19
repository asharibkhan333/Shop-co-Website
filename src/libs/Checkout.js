const ORDERS_KEY = "shopco-orders";
const CART_KEY = "shopco-cart";

export function getOrders() {
  try {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY));
    return orders || [];
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  return orders;
}

export function getOrderById(id) {
  return getOrders().find((order) => order.id === id);
}

export function getLatestOrder() {
  const orders = getOrders();
  return orders.length ? orders[orders.length - 1] : null;
}

export function generateOrderId() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `ORDER-${random}`;
}

/**
 * Direct localStorage clear for the cart key. Kept here for spec
 * compliance, but Checkout.jsx actually clears the cart through
 * CartContext's clearCart() so the Navbar badge updates reactively
 * without needing a page refresh. Use this only in non-React contexts.
 */
export function clearCartAfterOrder() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(CART_KEY);
  }
}
