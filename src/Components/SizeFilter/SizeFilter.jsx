import { SIZES } from "../data/product";
import "./SizeFilter.css";

function SizeFilter({ selectedSize, setSelectedSize }) {
  return (
    <div className="size-filter">
      {SIZES.map((size) => {
        const isActive = selectedSize === size;

        return (
          <button
            key={size}
            type="button"
            className={`size-pill ${isActive ? "active" : ""}`}
            onClick={() => setSelectedSize((prev) => (prev === size ? "" : size))}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}

export default SizeFilter;
