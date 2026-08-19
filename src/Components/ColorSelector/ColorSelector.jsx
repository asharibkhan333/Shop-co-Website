import "./ColorSelector.css";

export default function ColorSelector({
  colors,
  selectedColor,
  setSelectedColor,
}) {
  return (
    <div className="cs">
      <p className="cs-label">Select Colors</p>
      <div className="cs-options">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            className={`cs-dot ${selectedColor === color ? "is-active" : ""}`}
            style={{ background: color }}
            onClick={() => setSelectedColor(color)}
            aria-label={`Select color ${color}`}
            aria-pressed={selectedColor === color}
          >
            {selectedColor === color ? (
              <i className="fa-solid fa-check"></i>
            ) : null}
          </button>
        ))}
      </div>
    </div>
  );
}
