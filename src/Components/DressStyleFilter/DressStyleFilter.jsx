import { DRESS_STYLES } from "../data/product";
import "./DressStyleFilter.css";

function DressStyleFilter({ selectedDressStyle, setSelectedDressStyle }) {
  return (
    <div className="dress-style-filter">
      {DRESS_STYLES.map((style) => {
        const isActive = selectedDressStyle === style;

        return (
          <button
            key={style}
            type="button"
            className={`dress-style-item ${isActive ? "active" : ""}`}
            onClick={() =>
              setSelectedDressStyle((prev) => (prev === style ? "" : style))
            }
          >
            <span>{style}</span>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        );
      })}
    </div>
  );
}

export default DressStyleFilter;
