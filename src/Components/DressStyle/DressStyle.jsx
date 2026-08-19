import { useState } from "react";
import DressStyleCard from "../DressStyleCart/DressStyleCart.jsx";
import "./DressStyle.css";

import casual from "../../assets/Dress/Dress-1-png.png";
import formal from "../../assets/Dress/Dress-2-png.png";
import party from "../../assets/Dress/Dress-3-png.png";
import gym from "../../assets/Dress/Dress-4-png.png";

const styles = [
  { id: "casual", title: "Casual", image: casual },
  { id: "formal", title: "Formal", image: formal },
  { id: "party", title: "Party", image: party },
  { id: "gym", title: "Gym", image: gym },
];

export default function DressStyle() {
  const [selected, setSelected] = useState("");

  return (
    <section className="ds" id="dress-style">
      <div className="ds-panel">
        <h2 className="ds-title">
          BROWSE BY DRESS STYLE
          {selected ? (
            <span className="ds-selected">Selected: {selected}</span>
          ) : null}
        </h2>

        <div className="ds-grid">
          {styles.map((style) => (
            <div key={style.id} className={`ds-cell ds-cell--${style.id}`}>
              <DressStyleCard
                image={style.image}
                title={style.title}
                onSelect={setSelected}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
