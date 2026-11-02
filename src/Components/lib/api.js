const API_URL =
  import.meta.env.VITE_API_URL || "https://shopco-backend-virid.vercel.app/api";

// Get all products
export async function getProducts() {
  const response = await fetch(`${API_URL}/products`);

  if (!response.ok) {
    throw new Error("Products load nahi ho sake.");
  }

  const data = await response.json();

  console.log("Products API response:", data);

  // API agar direct array return kare
  if (Array.isArray(data)) {
    return data;
  }

  // API agar object ke andar products return kare
  if (Array.isArray(data.products)) {
    return data.products;
  }

  return [];
}

// Get New Arrivals products
export async function getNewArrivals() {
  const response = await fetch(`${API_URL}/products/new-arrivals`);

  if (!response.ok) {
    throw new Error("New Arrivals load nahi ho sake.");
  }

  const data = await response.json();

  // API agar direct array return kare
  if (Array.isArray(data)) {
    return data;
  }

  // API agar object ke andar products return kare
  if (Array.isArray(data.products)) {
    return data.products;
  }

  return [];
}

// Get Top Selling products
export async function getTopSelling() {
  const response = await fetch(`${API_URL}/products/top-selling`);

  if (!response.ok) {
    throw new Error("Top Selling products load nahi ho sake.");
  }

  const data = await response.json();

  // API agar direct array return kare
  if (Array.isArray(data)) {
    return data;
  }

  // API agar object ke andar products return kare
  if (Array.isArray(data.products)) {
    return data.products;
  }

  return [];
}

// Get single product by MongoDB ID
export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Product load nahi ho saka.");
  }

  // Backend direct product ya { product } return kar sakta hai
  return data.product ?? data;
}
// Get logged-in customer's orders
export async function getMyOrders(token) {
  const response = await fetch(`${API_URL}/orders/my-orders`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Orders load nahi ho sake.");
  }

  return Array.isArray(data) ? data : data.orders || [];
}