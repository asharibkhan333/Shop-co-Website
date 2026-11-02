import { useState } from "react";
import ProductCart from "../ProductCart/ProductCart.jsx";
import { useProducts } from "../lib/useProduct.js";
import "./NewArrivals.css";

// Frontend assets se images
import p1 from "../../assets/Arrivals/product-1-png.png";
import p2 from "../../assets/Arrivals/product-2-png.png";
import p3 from "../../assets/Arrivals/product-3-png.png";
import p4 from "../../assets/Arrivals/product-4-png.png";
import p5 from "../../assets/Arrivals/product-5-jpg.jpg";
import p6 from "../../assets/Arrivals/product-6-jpg.jpg";
import p7 from "../../assets/Arrivals/product-7-jpg.jpg";
import p8 from "../../assets/Arrivals/product-8-jpg.jpg";

// Frontend images ka order
const localImages = [p1, p2, p3, p4, p5, p6, p7, p8];

export default function NewArrivals({
  products: customProducts,
  title = "NEW ARRIVALS",
  showViewAll = true,
}) {
  const [setIndex, setSetIndex] = useState(0);

  const {
    products: databaseProducts,
    loading,
    error,
  } = useProducts();

  const allProducts = customProducts ?? databaseProducts;

  // Database products ke saath frontend images attach karo
  const productsWithImages = allProducts.map((product, index) => ({
    ...product,
    image: localImages[index % localImages.length],
  }));

  const totalSets = Math.ceil(productsWithImages.length / 4);
  const startIndex = setIndex * 4;

  const products = productsWithImages.slice(startIndex, startIndex + 4);

  if (loading && !customProducts) {
    return <p>Products loading...</p>;
  }

  if (error && !customProducts) {
    return <p>{error}</p>;
  }

  return (
    <section className="na" id="new-arrivals">
      <div className="na-inner">
        <h2 className="section-title">{title}</h2>

        {products.length === 0 ? (
          <p>Abhi koi product available nahi hai.</p>
        ) : (
          <div className="na-grid">
            {products.map((product) => (
              <ProductCart
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  name={product.name}
                  rating={Number(product.rating ?? 0)}
                  reviews={product.reviews_count ?? 0}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  discount={product.discount}
              />
            ))}
          </div>
        )}

        {showViewAll && totalSets > 1 && (
          <div className="na-actions">
            <button
              type="button"
              className="view-all-btn"
              onClick={() => {
                setSetIndex((prev) => (prev + 1) % totalSets);
              }}
            >
              View All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
