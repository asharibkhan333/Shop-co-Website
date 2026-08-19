import "./BrandLogos.css";

import versace from "../../assets/logos/logo-1-png.png";
import zara from "../../assets/logos/logo-2-png.png";
import gucci from "../../assets/logos/logo-3-png.png";
import prada from "../../assets/logos/logo-4-png.png";
import calvinKlein from "../../assets/logos/logo-5-png.png";

function BrandLogos() {
  const logos = [
    {
      name: "Versace",
      image: versace
    },
    {
      name: "Zara",
      image: zara
    },
    {
      name: "Gucci",
      image: gucci
    },
    {
      name: "Prada",
      image: prada
    },
    {
      name: "Calvin Klein",
      image: calvinKlein
    }
  ];

  return (
    <section className="brand-section">

      <div className="brand-container">

        {logos.map((logo) => (
          <div className="brand-logo" key={logo.name}>

            <img
              src={logo.image}
              alt={logo.name}
            />

          </div>
        ))}

      </div>

    </section>
  );
}

export default BrandLogos;