import "./ReviewCart.css";

function Stars({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<i key={i} className="fa-solid fa-star"></i>);
    else if (rating >= i - 0.5)
      stars.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
    else stars.push(<i key={i} className="fa-regular fa-star"></i>);
  }
  return <span className="rc-stars">{stars}</span>;
}

export default function ReviewCard({ name, rating, message, date }) {
  return (
    <article className="rc">
      <div className="rc-top">
        <Stars rating={rating} />
        <button type="button" className="rc-more" aria-label="Review options">
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>

      <h3 className="rc-name">
        {name}
        <span className="rc-check" aria-label="Verified buyer">
          <i className="fa-solid fa-circle-check"></i>
        </span>
      </h3>

      <p className="rc-message">&ldquo;{message}&rdquo;</p>

      {date ? <p className="rc-date">Posted on {date}</p> : null}
    </article>
  );
}
