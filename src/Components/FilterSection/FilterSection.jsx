import { useState } from "react";
import "./FilterSection.css";

function FilterSection({ title, children, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="filter-section">
      <button
        type="button"
        className="filter-section-header"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <i
          className={`fa-solid fa-chevron-down filter-section-chevron ${
            isOpen ? "open" : ""
          }`}
        ></i>
      </button>

      {isOpen ? <div className="filter-section-body">{children}</div> : null}
    </div>
  );
}

export default FilterSection;
