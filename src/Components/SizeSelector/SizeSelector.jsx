import "./SizeSelector.css";

export default function SizeSelector({ sizes, selectedSize, setSelectedSize }) {
  return (
    <div className="ss">
      <p className="ss-label">Choose Size</p>
      <div className="ss-options">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            className={`ss-btn ${selectedSize === size ? "is-active" : ""}`}
            onClick={() => setSelectedSize(size)}
            aria-pressed={selectedSize === size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
