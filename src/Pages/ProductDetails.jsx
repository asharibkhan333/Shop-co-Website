import { useState } from "react";
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
import { getProductById } from "../Components/data/product.js";

import NewArrivals from "../Components/NewArrivals/NewArrivals.jsx";

import "./ProductDetails.css";

// YOU MIGHT ALSO LIKE images
import related1 from "../assets/Arrivals/product-9-png.png";
import related2 from "../assets/Arrivals/product-10-png.png";
import related3 from "../assets/Arrivals/product-11-png.png";
import related4 from "../assets/Arrivals/product-12-png.png";
import related5 from "../assets/Arrivals/product-7-jpg.jpg";
import related6 from "../assets/Arrivals/product-1-png.png";
import related7 from "../assets/Arrivals/T-4-png.png";
import related8 from "../assets/Arrivals/product-5-jpg.jpg";
import Newsletter from "../Components/NewsLetter/NewsLetter.jsx";

// Related products
const relatedProductSets = [
  [
    {
      id: 101,
      image: related1,
      name: "Polo with Contrast Trims",
      rating: 4,
      reviews: 120,
      price: 212,
      oldPrice: 242,
      discount: 20,
    },
    {
      id: 102,
      image: related2,
      name: "Gradient Graphic T-shirt",
      rating: 3.5,
      reviews: 85,
      price: 145,
    },
    {
      id: 103,
      image: related3,
      name: "Polo with Tipping Details",
      rating: 4.5,
      reviews: 98,
      price: 180,
    },
    {
      id: 104,
      image: related4,
      name: "Black Striped T-shirt",
      rating: 5,
      reviews: 150,
      price: 120,
      oldPrice: 150,
      discount: 30,
    },
  ],

 [
  {
    id: 105,
    image: related5,
    name: "Casual Shirt",
    rating: 4,
    reviews: 90,
    price: 160,
  },
  {
    id: 106,
    image: related6,
    name: "Classic Polo",
    rating: 4.5,
    reviews: 110,
    price: 190,
  },
  {
    id: 107,
    image: related7,
    name: "Slim Fit T-shirt",
    rating: 4,
    reviews: 75,
    price: 150,
    oldPrice: 180,
    discount: 20,
  },
  {
    id: 108,
    image: related8,
    name: "Classic Casual Shirt",
    rating: 5,
    reviews: 130,
    price: 130,
  },
],
];

export default function ProductDetails() {
  const { id } = useParams();

  // product.js se product find karega
  const product = getProductById(id);

  // Agar product nahi mila
  if (!product) {
    return (
      <>
        <Navbar />

        <main
          style={{
            minHeight: "60vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <h1>Product Not Found</h1>

          <Link to="/">Go Back Home</Link>

          <NewArrivals />
        </main>

        <Footer />
      </>
    );
  }

  return <ProductDetailsContent product={product} />;
}

// Product ka actual UI
function ProductDetailsContent({ product }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("Large");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const images = product.imagesByColor[selectedColor] ?? [product.image];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
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
          <span className="is-current">{product.name}</span>
        </nav>

        {/* Product */}

        <div className="pdp-grid">
          <ProductGallery
            key={selectedColor}
            images={images}
            name={product.name}
          />

          <div className="pdp-info">
            <ProductInfo
              name={product.name}
              rating={product.rating}
              reviews={product.reviews_count}
              price={product.price}
              oldPrice={product.oldPrice}
              discount={product.discount}
              summary={product.description}
            />

            <hr className="pdp-divider" />

            <ColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />

            <hr className="pdp-divider" />

            <SizeSelector
              sizes={product.sizes}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />

            <hr className="pdp-divider" />

            <div className="pdp-actions">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />

              <button
                type="button"
                className="pdp-cart-btn"
                onClick={handleAddToCart}
              >
                {added ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>

        {/* Product Tabs */}

        <ProductTabs
          description={product.description}
          rating={product.rating}
          reviews={product.reviews}
          faqs={product.faqs}
        />
      </main>

      {/* YOU MIGHT ALSO LIKE */}

      <NewArrivals
        title="YOU MIGHT ALSO LIKE"
        products={relatedProductSets}
        showViewAll={true}
      />
      <Newsletter />
      <Footer />
    </div>
  );
}
