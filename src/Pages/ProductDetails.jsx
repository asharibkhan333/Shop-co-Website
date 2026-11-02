import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "../Components/Navbar/Navbar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import ProductGallery from "../Components/ProductGallery/ProductGallery.jsx";
import ProductInfo from "../Components/ProductInfo/ProductInfo.jsx";
import ColorSelector from "../Components/ColorSelector/ColorSelector.jsx";
import SizeSelector from "../Components/SizeSelector/SizeSelector.jsx";
import QuantitySelector from "../Components/QuantitySelector/QuantitySelector.jsx";
import ProductTabs from "../Components/ProductTabs/ProductTabs.jsx";

import { addToCart } from "../Components/lib/cart.js";
import { getProductById } from ".././Components/lib/api.js";
import { getProductImage } from ".././Components/lib/productImages.js";

import NewArrivals from "../Components/NewArrivals/NewArrivals.jsx";
import Newsletter from "../Components/NewsLetter/NewsLetter.jsx";

import "./ProductDetails.css";

// Main Product Details Page
export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        if (active) {
          setProduct(data);
        }
      } catch (err) {
        if (active) {
          setError(err.message || "Product load nahi ho saka.");
          setProduct(null);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      active = false;
    };
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <>
        <Navbar />

        <main className="pdp">
          <h2>Loading product...</h2>
        </main>

        <Footer />
      </>
    );
  }

  // Error / Product Not Found
  if (error || !product) {
    return (
      <>
        <Navbar />

        <main className="pdp">
          <h1>Product Not Found</h1>

          <p>{error || "This product does not exist."}</p>

          <Link to="/">Go Back Home</Link>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <ProductDetailsContent
      key={product._id}
      product={product}
    />
  );
}

// Product Details Content
function ProductDetailsContent({ product }) {
  // Available Colors
  const availableColors = product.colors?.length
    ? product.colors
    : product.color
      ? [product.color]
      : [];

  // Available Sizes
  const availableSizes = product.sizes?.length
    ? product.sizes
    : ["Small", "Medium", "Large", "X-Large"];

  // Selected Options
  const [selectedColor, setSelectedColor] = useState(
    availableColors[0] || ""
  );

  const [selectedSize, setSelectedSize] = useState(
    availableSizes.includes("Large")
      ? "Large"
      : availableSizes[0]
  );

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Selected Color Images
  const imagePaths =
    product.imagesByColor?.[selectedColor] ||
    product.gallery ||
    [product.image];

  // Convert Database Image Paths into Local Assets
  const images = imagePaths
    .map((path) => getProductImage(path))
    .filter(Boolean);

  // Add Product to Cart
  const handleAddToCart = () => {
    if (!product._id) {
      console.error("Product MongoDB ID missing");
      return;
    }

    if (images.length === 0) {
      console.error("Product image not found");
      return;
    }

    addToCart({
      id: product._id,
      image: images[0],
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="pdp-page">
      <Navbar />

      <main className="pdp">

        {/* Breadcrumb */}

        <nav className="pdp-crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>

          <i className="fa-solid fa-chevron-right"></i>

          <span>Shop</span>

          <i className="fa-solid fa-chevron-right"></i>

          <span>Men</span>

          <i className="fa-solid fa-chevron-right"></i>

          <span className="is-current">
            {product.name}
          </span>
        </nav>

        {/* Product Information */}

        <div className="pdp-grid">

          <ProductGallery
            key={selectedColor}
            images={images}
            name={product.name}
          />

          <div className="pdp-info">

            <ProductInfo
              name={product.name}
              rating={product.rating ?? 0}
              reviews={product.reviews_count ?? 0}
              price={product.price}
              oldPrice={product.oldPrice}
              discount={product.discount}
              summary={product.description}
            />

            <hr className="pdp-divider" />

            {/* Color Selection */}

            <ColorSelector
              colors={availableColors}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />

            <hr className="pdp-divider" />

            {/* Size Selection */}

            <SizeSelector
              sizes={availableSizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            <hr className="pdp-divider" />

            {/* Quantity and Add to Cart */}

            <div className="pdp-actions">

              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
              />

              <button
                type="button"
                className="pdp-cart-btn"
                onClick={handleAddToCart}
                disabled={images.length === 0}
              >
                {added ? "Added to Cart" : "Add to Cart"}
              </button>

            </div>

          </div>

        </div>

        {/* Description, Reviews and FAQs */}

        <ProductTabs
          description={product.description}
          rating={product.rating ?? 0}
          reviews={product.reviews || []}
          faqs={product.faqs || []}
        />

      </main>

      {/* You Might Also Like */}

      <NewArrivals
        title="YOU MIGHT ALSO LIKE"
        showViewAll={true}
      />

      <Newsletter />

      <Footer />
    </div>
  );
}
