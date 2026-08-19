import "./CustomerReviewCart.css";

export default function CustomerReviewCard({ name, rating, message }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<i key={i} className="fa-solid fa-star"></i>);
    else if (rating >= i - 0.5)
      stars.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
    else stars.push(<i key={i} className="fa-regular fa-star"></i>);
  }

  return (
    <article className="crc">
      <div className="crc-stars">{stars}</div>
      <h3 className="crc-name">
        {name}
        <span className="crc-check" aria-label="Verified buyer">
          <i className="fa-solid fa-circle-check"></i>
        </span>
      </h3>
      <p className="crc-message">&ldquo;{message}&rdquo;</p>
    </article>
  );
}
