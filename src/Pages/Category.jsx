import { useState } from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Breadcrumb from "../Components/BreadCrumb/BreadCrumb.jsx";
import CategorySidebar from "../Components/CategorySidebar/CategorySidebar";
import ProductCart from "../Components/ProductCart/ProductCart";
import Newsletter from "../Components/NewsLetter/NewsLetter.jsx";
import { products } from "../Components/data/product.js";
import "./Category.css";

function Category() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(20);
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedDressStyle, setSelectedDressStyle] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // ==============================
  // APPLY FILTERS
  // ==============================

  const applyFilters = () => {
    const result = products.filter((product) => {
      // CATEGORY
      const categoryMatch =
        selectedCategory === "" || product.category === selectedCategory;

      // PRICE
      const price = Number(product.price);

      const min = Number(minPrice);
      const max = Number(maxPrice);

      const priceMatch = price >= min && price <= max;

      // COLOR
      const colorMatch =
        selectedColor === "" ||
        product.color?.toUpperCase() === selectedColor.toUpperCase();

      // SIZE
      const sizeMatch =
        selectedSize === "" || product.sizes?.includes(selectedSize);

      // DRESS STYLE
      const dressStyleMatch =
        selectedDressStyle === "" || product.dressStyle === selectedDressStyle;

      return (
        categoryMatch &&
        priceMatch &&
        colorMatch &&
        sizeMatch &&
        dressStyleMatch
      );
    });

    console.log("Selected Category:", selectedCategory);
    console.log("Min Price:", minPrice);
    console.log("Max Price:", maxPrice);
    console.log("Selected Color:", selectedColor);
    console.log("Selected Size:", selectedSize);
    console.log("Selected Dress Style:", selectedDressStyle);
    console.log("RESULT:", result);
    setFilteredProducts(result);
    setMobileFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setMinPrice(20);
    setMaxPrice(500);
    setSelectedColor("");
    setSelectedSize("");
    setSelectedDressStyle("");
    setFilteredProducts(products);
    setMobileFilterOpen(false);
  };

  // ==============================
  // RETURN
  // ==============================

  return (
    <>
      <Navbar />

      <div className="category-page">
        <div className="category-container">
          <Breadcrumb current="Casual" />

          <div className="category-layout">
            <CategorySidebar
              isOpen={mobileFilterOpen}
              onClose={() => setMobileFilterOpen(false)}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              selectedDressStyle={selectedDressStyle}
              setSelectedDressStyle={setSelectedDressStyle}
              onApply={applyFilters}
              onClear={clearFilters}
            />

            <main className="category-main">
              <div className="category-main-head">
                <div>
                  <h1>{selectedCategory || "Casual"}</h1>

                  <p className="category-count">
                    Showing {filteredProducts.length} of {products.length}{" "}
                    Products
                  </p>
                </div>

                <button
                  type="button"
                  className="mobile-filter-btn"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <i className="fa-solid fa-sliders"></i>
                  Filters
                </button>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="category-product-grid">
                  {filteredProducts.map((product) => (
                    <ProductCart
                      key={product.id}
                      id={product.id}
                      image={product.image}
                      name={product.name}
                      rating={product.rating}
                      reviews={product.reviews_count}
                      price={product.price}
                      oldPrice={product.oldPrice}
                      discount={product.discount}
                    />
                  ))}
                </div>
              ) : (
                <div className="category-empty">
                  <h2>No products found.</h2>

                  <p>Try changing your filters.</p>

                  <button type="button" onClick={clearFilters}>
                    Clear Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Newsletter />

      <Footer />
    </>
  );
}

export default Category;
