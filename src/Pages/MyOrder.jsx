
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar/Navbar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import { getMyOrders } from "../Components/lib/api.js";

import "./MyOrder.css";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const data = await getMyOrders(token);

        if (active) {
          setOrders(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchOrders();

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <>
      <Navbar />

      <section className="my-orders">
        <div className="my-orders-container">

          <h1>MY ORDERS</h1>

          {loading && <p>Loading your orders...</p>}

          {error && <p className="orders-error">{error}</p>}

          {!loading && !error && orders.length === 0 && (
            <div className="empty-orders">
              <i className="fa-solid fa-box-open"></i>
              <h2>No Orders Yet</h2>
              <p>You haven't placed any orders yet.</p>

              <button onClick={() => navigate("/")}>
                Continue Shopping
              </button>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="orders-list">

              {orders.map((order) => (
                <div className="order-card" key={order._id}>

                  <div className="order-card-header">
                    <div>
                      <span>Order ID</span>
                      <p>{order._id}</p>
                    </div>

                    <div>
                      <span>Order Date</span>
                      <p>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="order-items">
                    {order.items.map((item, index) => (
                      <div
                        className="order-item"
                        key={`${item.product}-${index}`}
                      >
                        <div>
                          <h3>{item.name}</h3>

                          <p>
                            Quantity: {item.quantity}
                          </p>

                          {item.size && <p>Size: {item.size}</p>}

                          {item.color && <p>Color: {item.color}</p>}
                        </div>

                        <strong>
                          ${Number(item.price * item.quantity).toFixed(2)}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="order-summary">

                    <p>
                      Order Status:
                      <strong>{order.status}</strong>
                    </p>

                    <p>
                      Payment Status:
                      <strong>{order.paymentStatus}</strong>
                    </p>

                    <h3>
                      Total: ${Number(order.totalAmount || 0).toFixed(2)}
                    </h3>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}
