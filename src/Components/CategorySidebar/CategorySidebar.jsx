import { CATEGORIES } from "../data/product";
import FilterSection from "../FilterSection/FilterSection";
import PriceFilter from "../PriceFilter/PriceFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import SizeFilter from "../SizeFilter/SizeFilter";
import DressStyleFilter from "../DressStyleFilter/DressStyleFilter";
import "./CategorySidebar.css";

function CategorySidebar({
  isOpen,
  onClose,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  selectedDressStyle,
  setSelectedDressStyle,
  onApply,
  onClear,
}) {
  return (
    <>
      {/* Overlay only relevant on mobile, hidden on desktop via CSS */}
      <div
        className={`category-sidebar-overlay ${isOpen ? "active" : ""}`}
        onClick={onClose}
      ></div>

      <aside className={`category-sidebar ${isOpen ? "open" : ""}`}>
        <div className="category-sidebar-head">
          <h2>Filters</h2>

          <button
            type="button"
            className="category-sidebar-close"
            onClick={onClose}
            aria-label="Close filters"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="category-sidebar-scroll">
          {/* Category list */}
          <div className="category-list">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  className={`category-list-item ${isActive ? "active" : ""}`}
                  onClick={() =>
                    setSelectedCategory((prev) =>
                      prev === category ? "" : category
                    )
                  }
                >
                  <span>{category}</span>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              );
            })}
          </div>

          <FilterSection title="Price">
            <PriceFilter
              minPrice={minPrice}
              maxPrice={maxPrice}
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
            />
          </FilterSection>

          <FilterSection title="Colors">
            <ColorFilter
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
            />
          </FilterSection>

          <FilterSection title="Size">
            <SizeFilter
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
            />
          </FilterSection>

          <FilterSection title="Dress Style">
            <DressStyleFilter
              selectedDressStyle={selectedDressStyle}
              setSelectedDressStyle={setSelectedDressStyle}
            />
          </FilterSection>

          <div className="category-sidebar-actions">
            <button
              type="button"
              className="apply-filter-btn"
              onClick={onApply}
            >
              Apply Filter
            </button>

            <button
              type="button"
              className="clear-filter-btn"
              onClick={onClear}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default CategorySidebar;
