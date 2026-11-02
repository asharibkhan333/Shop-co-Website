const API_URL = "http://localhost:4000/api";

export async function signupUser(userData) {
  const isFormData = userData instanceof FormData;

  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: isFormData ? userData : JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
}


// CUSTOMER LOGIN
export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  // Other components can listen for login changes
  window.dispatchEvent(new Event("authChanged"));

  return data;
}

// LOGOUT
export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.dispatchEvent(new Event("authChanged"));
}

// GET CURRENT USER
export function getCurrentUser() {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

// GET TOKEN
export function getToken() {
  return localStorage.getItem("token");
}

// GET MY PROFILE
export async function getMyProfile() {
  const token = getToken();

  if (!token) throw new Error("Please login first.");

  const response = await fetch(`${API_URL}/profile/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Profile load failed");
  }

  return data.customer;
}

// UPDATE MY PROFILE
export async function updateMyProfile(profileData) {
  const token = getToken();

  const isFormData = profileData instanceof FormData;

  const response = await fetch(`${API_URL}/profile/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    body: isFormData ? profileData : JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Profile update failed");
  }

  const updatedCustomer = data.customer;

  if (updatedCustomer) {
    localStorage.setItem("user", JSON.stringify(updatedCustomer));
    window.dispatchEvent(new Event("authChanged"));
  }

  return updatedCustomer;
}
