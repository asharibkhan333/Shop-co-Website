import "./DressStyleCart.css";

export default function DressStyleCard({ image, title, onSelect }) {
  return (
    <a
      className="dsc"
      href="#new-arrivals"
      onClick={() => onSelect && onSelect(title)}
      aria-label={`Browse ${title} styles`}
    >
      <img className="dsc-img" src={image} alt={`${title} dress style`} loading="lazy" />
      <span className="dsc-title">{title}</span>
    </a>
  );
}