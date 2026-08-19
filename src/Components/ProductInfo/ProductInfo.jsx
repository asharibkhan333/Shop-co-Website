import "./ProductInfo.css";

function Stars({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<i key={i} className="fa-solid fa-star"></i>);
    else if (rating >= i - 0.5)
      stars.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
    else stars.push(<i key={i} className="fa-regular fa-star"></i>);
  }
  return <span className="pi-stars">{stars}</span>;
}

export default function ProductInfo({
  name,
  rating,
  reviews,
  price,
  oldPrice,
  discount,
  summary,
}) {
  return (
    <div className="pi">
      <h1 className="pi-name">{name}</h1>

      <div className="pi-rating">
        <Stars rating={rating} />
        <span className="pi-rating-value">
          {rating.toFixed(1)}
          <span className="pi-rating-max">/5</span>
        </span>
        {reviews ? (
          <span className="pi-reviews">({reviews} Reviews)</span>
        ) : null}
      </div>

      <div className="pi-prices">
        <span className="pi-price">${price}</span>
        {oldPrice ? <span className="pi-old">${oldPrice}</span> : null}
        {discount ? <span className="pi-badge">-{discount}%</span> : null}
      </div>

      {summary ? <p className="pi-summary">{summary}</p> : null}
    </div>
  );
}
