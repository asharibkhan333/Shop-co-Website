import { FILTER_COLORS } from "../data/product";
import "./ColorFilter.css";

function ColorFilter({ selectedColor, setSelectedColor }) {
  return (
    <div className="color-filter">
      {FILTER_COLORS.map((color) => {
        const isActive = selectedColor === color.hex;
        const isLight = color.hex.toUpperCase() === "#FFFFFF";

        return (
          <button
            key={color.hex}
            type="button"
            aria-label={color.name}
            title={color.name}
            className={`color-swatch ${isActive ? "active" : ""} ${
              isLight ? "light" : ""
            }`}
            onClick={() =>
              setSelectedColor((prev) => (prev === color.hex ? "" : color.hex))
            }
          >
            <span
              className={`color-swatch-fill color-fill-${color.name.toLowerCase()}`}
            ></span>
            {isActive ? (
              <i className="fa-solid fa-check color-swatch-check"></i>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export default ColorFilter;
