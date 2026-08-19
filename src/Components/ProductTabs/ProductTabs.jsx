import { useState } from "react";
import ReviewCard from "../ReviewCart/ReviewCart.jsx";
import "./ProductTabs.css";

const TABS = [
  { key: "details", label: "Product Details" },
  { key: "reviews", label: "Rating & Reviews" },
  { key: "faqs", label: "FAQs" },
];

function Stars({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push(<i key={i} className="fa-solid fa-star"></i>);
    else if (rating >= i - 0.5)
      stars.push(<i key={i} className="fa-solid fa-star-half-stroke"></i>);
    else stars.push(<i key={i} className="fa-regular fa-star"></i>);
  }
  return <span className="pt-stars">{stars}</span>;
}

export default function ProductTabs({ description, rating, reviews, faqs }) {
  const [activeTab, setActiveTab] = useState("details");
  const [visibleReviews, setVisibleReviews] = useState(6);
  const [openFaq, setOpenFaq] = useState(faqs[0]?.id ?? null);

  return (
    <div className="pt">
      <div className="pt-tabs" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`pt-tab ${activeTab === tab.key ? "is-active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "details" ? (
        <div className="pt-panel pt-details">
          <p>{description}</p>
          <ul className="pt-specs">
            <li>
              <span>Material</span> 100% combed cotton
            </li>
            <li>
              <span>Fit</span> Regular, true to size
            </li>
            <li>
              <span>Care</span> Machine wash cold, tumble dry low
            </li>
            <li>
              <span>Origin</span> Ethically made
            </li>
          </ul>
        </div>
      ) : null}

      {activeTab === "reviews" ? (
        <div className="pt-panel">
          <div className="pt-reviews-head">
            <div className="pt-reviews-title">
              <h3>All Reviews</h3>
              <span className="pt-count">({reviews.length})</span>
            </div>
            <div className="pt-overall">
              <Stars rating={rating} />
              <span className="pt-overall-value">
                {rating.toFixed(1)}
                <span className="pt-overall-max">/5</span>
              </span>
            </div>
          </div>

          <div className="pt-reviews-grid">
            {reviews.slice(0, visibleReviews).map((review) => (
              <ReviewCard
                key={review.id}
                name={review.name}
                rating={review.rating}
                message={review.message}
                date={review.date}
              />
            ))}
          </div>

          {visibleReviews < reviews.length ? (
            <div className="pt-more-wrap">
              <button
                type="button"
                className="pt-more-btn"
                onClick={() => setVisibleReviews((prev) => prev + 3)}
              >
                Load More Reviews
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {activeTab === "faqs" ? (
        <div className="pt-panel">
          <div className="pt-faqs">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`pt-faq ${openFaq === faq.id ? "is-open" : ""}`}
              >
                <button
                  type="button"
                  className="pt-faq-q"
                  onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  aria-expanded={openFaq === faq.id}
                >
                  <span>{faq.question}</span>
                  <i
                    className={`fa-solid ${openFaq === faq.id ? "fa-chevron-up" : "fa-chevron-down"}`}
                  ></i>
                </button>
                {openFaq === faq.id ? (
                  <p className="pt-faq-a">{faq.answer}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
