import "./Hero.css";

import heroModels from "../../assets/hero/hero-png.png";
import smallStar from "../../assets/hero/hero-star-png.png";
import bigStar from "../../assets/hero/hero-star2-png.png";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Content */}

        <div className="hero-content">
          <h1>
            FIND CLOTHES <br />
            THAT MATCHES <br />
            YOUR STYLE
          </h1>

          <p>
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <button className="shop-btn">Shop Now</button>

          {/* Statistics */}

          <div className="statistics">
            <div className="stat">
              <h2>200+</h2>
              <span>International Brands</span>
            </div>

            <div className="stat">
              <h2>2,000+</h2>
              <span>High-Quality Products</span>
            </div>

            <div className="stat">
              <h2>30,000+</h2>
              <span>Happy Customers</span>
            </div>
          </div>
        </div>

        {/* Right Image */}

        <div className="hero-image">
          <img src={heroModels} alt="Fashion Models" className="models" />

          {/* Small Star */}
          <img src={smallStar} alt="" className="star small-star" />

          {/* Big Star */}
          <img src={bigStar} alt="" className="star big-star" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
