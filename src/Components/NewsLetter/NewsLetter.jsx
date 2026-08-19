import { useState } from "react";
import "./Newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="nl" id="newsletter">
      <div className="nl-panel">
        <h2 className="nl-title">
          STAY UPTO DATE ABOUT
          <br />
          OUR LATEST OFFERS
        </h2>

        <form className="nl-form" onSubmit={handleSubmit}>
          <label className="nl-field">
            <i className="fa-regular fa-envelope"></i>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>
          <button type="submit" className="nl-submit">
            Subscribe to Newsletter
          </button>
          {subscribed ? (
            <p className="nl-note">Thanks! You are on the list.</p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
