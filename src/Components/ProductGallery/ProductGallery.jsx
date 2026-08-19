import { useState } from "react";
import "./ProductGallery.css";

export default function ProductGallery({ images, name }) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const active = images.includes(selectedImage) ? selectedImage : images[0];

  return (
    <div className="pg">
      <div className="pg-thumbs">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            className={`pg-thumb ${active === image ? "is-active" : ""}`}
            onClick={() => setSelectedImage(image)}
            aria-label={`View image ${index + 1} of ${name}`}
          >
            <img src={image} alt={`${name} view ${index + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      <div className="pg-main">
        <img src={active} alt={name} />
      </div>
    </div>
  );
}
