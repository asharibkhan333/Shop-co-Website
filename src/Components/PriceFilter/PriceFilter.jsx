import "./PriceFilter.css";

const ABSOLUTE_MIN = 20;
const ABSOLUTE_MAX = 500;

function PriceFilter({ minPrice, maxPrice, setMinPrice, setMaxPrice }) {
  const handleMinChange = (e) => {
    const value = Number(e.target.value);

    if (value < maxPrice) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);

    if (value > minPrice) {
      setMaxPrice(value);
    }
  };

  return (
    <div className="price-filter">
      <div className="price-filter-track">
        <input
          type="range"
          min={ABSOLUTE_MIN}
          max={ABSOLUTE_MAX}
          value={minPrice}
          onChange={handleMinChange}
          className="price-filter-slider price-filter-slider-min"
        />

        <input
          type="range"
          min={ABSOLUTE_MIN}
          max={ABSOLUTE_MAX}
          value={maxPrice}
          onChange={handleMaxChange}
          className="price-filter-slider price-filter-slider-max"
        />
      </div>

      <div className="price-filter-values">
        <span>${minPrice}</span>

        <span>${maxPrice}</span>
      </div>
    </div>
  );
}

export default PriceFilter;
