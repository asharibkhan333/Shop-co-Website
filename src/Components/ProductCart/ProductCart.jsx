import { Link } from "react-router-dom";
import "./ProductCart.css";

function Stars({ rating }) {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<i key={i} className="fa-solid fa-star"></i>);
    } else if (rating >= i - 0.5) {
      stars.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
    } else {
      stars.push(<i key={i} className="fa-regular fa-star"></i>);
    }
  }

  return <span className="pc-stars">{stars}</span>;
}

export default function ProductCard({
  id,
  image,
  name,
  rating,
  reviews,
  price,
  oldPrice,
  discount,
}) {
  return (
    <article className="pc">
      <Link to={`/product/${id}`} className="product-link">
        <div className="pc-media">
          <img src={image} alt={name} loading="lazy" width={640} height={640} />
        </div>

        <h3 className="pc-name">{name}</h3>

        <div className="pc-rating">
          <Stars rating={rating} />

          <span className="pc-rating-value">
            {rating.toFixed(1)}
            <span className="pc-rating-max">/5</span>
          </span>

          {reviews ? <span className="pc-reviews">({reviews})</span> : null}
        </div>

        <div className="pc-prices">
          <span className="pc-price">${price}</span>

          {oldPrice ? <span className="pc-old">${oldPrice}</span> : null}

          {discount ? <span className="pc-badge">-{discount}%</span> : null}
        </div>
      </Link>
    </article>
  );
}
