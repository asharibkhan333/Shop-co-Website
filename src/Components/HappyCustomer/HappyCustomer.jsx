import { useEffect, useState } from "react";
import CustomerReviewCard from "../CustomerReviewCart/CustomerReviewCart.jsx";
import "./HappyCustomer.css";

const reviews = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    message:
      "I am very happy with the quality of the clothes. The design and fitting are excellent and delivery was quick.",
  },
  {
    id: 2,
    name: "Alex K.",
    rating: 4.5,
    message:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co.",
  },
  {
    id: 3,
    name: "James L.",
    rating: 5,
    message:
      "As someone who is always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co.",
  },
  {
    id: 4,
    name: "Mooen",
    rating: 4,
    message:
      "The fabric feels premium and the stitching is clean. I ordered three shirts and all of them fit perfectly.",
  },
  {
    id: 5,
    name: "Emily R.",
    rating: 5,
    message:
      "Customer support helped me swap a size in minutes. Shopping here genuinely feels effortless.",
  },
  {
    id: 6,
    name: "Daniel S.",
    rating: 4.5,
    message:
      "Great prices for the quality you get. The seasonal drops always have something worth adding to my cart.",
  },
  {
    id: 7,
    name: "Ayesha N.",
    rating: 5,
    message:
      "Colours look exactly like the photos on the site. That alone makes Shop.co my go-to store now.",
  },
];

function useVisibleCount() {
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 640) setVisible(1);
      else if (width < 1024) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return visible;
}

export default function HappyCustomers() {
  const visible = useVisibleCount();
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, reviews.length - visible);
  const safeIndex = Math.min(index, maxIndex);

  const prev = () =>
    setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  const next = () =>
    setIndex((current) => (current >= maxIndex ? 0 : current + 1));

  return (
    <section className="hc" id="reviews">
      <div className="hc-inner">
        <div className="hc-head">
          <h2 className="section-title hc-title">OUR HAPPY CUSTOMERS</h2>
          <div className="hc-nav">
            <button type="button" onClick={prev} aria-label="Previous reviews">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button type="button" onClick={next} aria-label="Next reviews">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="hc-viewport">
          <div
            className="hc-track"
            style={{
              transform: `translateX(-${safeIndex * (100 / visible)}%)`,
            }}
          >
            {reviews.map((review) => (
              <div
                className="hc-slide"
                key={review.id}
                style={{ width: `${100 / visible}%` }}
              >
                <CustomerReviewCard
                  name={review.name}
                  rating={review.rating}
                  message={review.message}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
