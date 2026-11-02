import { useEffect, useState } from "react";
import ProductCart from "../ProductCart/ProductCart.jsx";
import { getTopSelling } from "../lib/api.js";
import "./TopSelling.css";

import p5 from "../../assets/TopSelling/Top-1-png.png";
import p6 from "../../assets/TopSelling/Top-2-png.png";
import p7 from "../../assets/TopSelling/Top-3-png.png";
import p8 from "../../assets/TopSelling/Top-4-png.png";
import p1 from "../../assets/TopSelling/Top-5-jpg.jpg";
import p2 from "../../assets/TopSelling/Top-6-jpg.jpg";
import p3 from "../../assets/TopSelling/Top-7-jpg.jpg";
import p4 from "../../assets/TopSelling/Top-8-jpg.jpg";

const fallbackImages = [p5, p6, p7, p8, p1, p2, p3, p4];

export default function TopSelling() {
  const [products, setProducts] = useState([]);
  const [setIndex, setSetIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);

        const data = await getTopSelling();

        setProducts(data);
      } catch (err) {
        console.error("Top Selling error:", err);
        setError(err.message || "Products load nahi ho sake.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / 4);
  const startIndex = setIndex * 4;

  const visibleProducts = products.slice(
    startIndex,
    startIndex + 4
  );

  const handleViewAll = () => {
    if (totalPages > 1) {
      setSetIndex((prev) => (prev + 1) % totalPages);
    }
  };

  if (loading) {
    return (
      <section className="ts" id="top-selling">
        <div className="ts-inner">
          <h2 className="section-title">TOP SELLING</h2>
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="ts" id="top-selling">
        <div className="ts-inner">
          <h2 className="section-title">TOP SELLING</h2>
          <p>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="ts" id="top-selling">
      <div className="ts-inner">
        <h2 className="section-title">TOP SELLING</h2>

        <div className="ts-grid">
          {visibleProducts.map((product, index) => {
            const productImage =
              fallbackImages[
                (startIndex + index) % fallbackImages.length
              ];

            return (
              <ProductCart
                key={product._id}
                id={product._id}
                image={productImage}
                name={product.name}
                rating={Number(product.rating ?? 0)}
                reviews={
                  product.reviews_count ??
                  product.reviews ??
                  0
                }
                price={product.price}
                oldPrice={product.oldPrice}
                discount={product.discount}
              />
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="ts-actions">
            <button
              type="button"
              className="view-all-btn"
              onClick={handleViewAll}
            >
              View All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
