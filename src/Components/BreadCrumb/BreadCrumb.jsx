import { Link } from "react-router-dom";
import "./BreadCrumb.css";

function Breadcrumb({ trail = [], current }) {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <Link to="/" className="breadcrumb-link">
        Home
      </Link>

      {trail.map((item) => (
        <span className="breadcrumb-item" key={item.label}>
          <i className="fa-solid fa-chevron-right breadcrumb-sep"></i>
          <Link to={item.to} className="breadcrumb-link">
            {item.label}
          </Link>
        </span>
      ))}

      {current ? (
        <span className="breadcrumb-item">
          <i className="fa-solid fa-chevron-right breadcrumb-sep"></i>
          <span className="breadcrumb-current">{current}</span>
        </span>
      ) : null}
    </nav>
  );
}

export default Breadcrumb;
