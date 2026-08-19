// import { useState } from "react";
// import ProductCart from "../ProductCart/ProductCart.jsx";
// import "./NewArrivals.css";

// import p1 from "../../assets/Arrivals/product-1-png.png";
// import p2 from "../../assets/Arrivals/product-2-png.png";
// import p3 from "../../assets/Arrivals/product-3-png.png";
// import p4 from "../../assets/Arrivals/product-4-png.png";
// import p5 from "../../assets/Arrivals/product-5-jpg.jpg";
// import p6 from "../../assets/Arrivals/product-6-jpg.jpg";
// import p7 from "../../assets/Arrivals/product-7-jpg.jpg";
// import p8 from "../../assets/Arrivals/product-8-jpg.jpg";

// const productSets = [
//   [
//     {
//       id: 1,
//       image: p1,
//       name: "T-shirt with Tape Details",
//       rating: 4.5,
//       reviews: 120,
//       price: 120,
//     },
//     {
//       id: 2,
//       image: p2,
//       name: "Skinny Fit Jeans",
//       rating: 3.5,
//       reviews: 84,
//       price: 240,
//       oldPrice: 260,
//       discount: 20,
//     },
//     {
//       id: 3,
//       image: p3,
//       name: "Checkered Shirt",
//       rating: 4.5,
//       reviews: 76,
//       price: 180,
//     },
//     {
//       id: 4,
//       image: p4,
//       name: "Sleeve Striped T-shirt",
//       rating: 4.5,
//       reviews: 145,
//       price: 130,
//       oldPrice: 160,
//       discount: 30,
//     },
//   ],
//   [
//     {
//       id: 5,
//       image: p5,
//       name: "Vertical Striped Shirt",
//       rating: 5,
//       reviews: 210,
//       price: 212,
//       oldPrice: 232,
//       discount: 20,
//     },
//     {
//       id: 6,
//       image: p6,
//       name: "Courage Graphic T-shirt",
//       rating: 4,
//       reviews: 98,
//       price: 145,
//     },
//     {
//       id: 7,
//       image: p7,
//       name: "Loose Fit Bermuda Shorts",
//       rating: 3,
//       reviews: 52,
//       price: 80,
//     },
//     {
//       id: 8,
//       image: p8,
//       name: "Faded Skinny Jeans",
//       rating: 4.5,
//       reviews: 167,
//       price: 210,
//       oldPrice: 260,
//       discount: 20,
//     },
//   ],
// ];

// export default function NewArrivals() {
//   const [setIndex, setSetIndex] = useState(0);
//   const products = productSets[setIndex];

//   return (
//     <section className="na" id="new-arrivals">
//       <div className="na-inner">
//         <h2 className="section-title">NEW ARRIVALS</h2>

//         <div className="na-grid">
//           {products.map((product) => (
//             <ProductCart
//               key={product.id}
//               id={product.id}
//               image={product.image}
//               name={product.name}
//               rating={product.rating}
//               reviews={product.reviews}
//               price={product.price}
//               oldPrice={product.oldPrice}
//               discount={product.discount}
//             />
//           ))}
//         </div>

//         <div className="na-actions">
//           <button
//             type="button"
//             className="view-all-btn"
//             onClick={() =>
//               setSetIndex((prev) => (prev + 1) % productSets.length)
//             }
//           >
//             View All
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import ProductCart from "../ProductCart/ProductCart.jsx";
import "./NewArrivals.css";

import p1 from "../../assets/Arrivals/product-1-png.png";
import p2 from "../../assets/Arrivals/product-2-png.png";
import p3 from "../../assets/Arrivals/product-3-png.png";
import p4 from "../../assets/Arrivals/product-4-png.png";
import p5 from "../../assets/Arrivals/product-5-jpg.jpg";
import p6 from "../../assets/Arrivals/product-6-jpg.jpg";
import p7 from "../../assets/Arrivals/product-7-jpg.jpg";
import p8 from "../../assets/Arrivals/product-8-jpg.jpg";

const productSets = [
  [
    {
      id: 1,
      image: p1,
      name: "T-shirt with Tape Details",
      rating: 4.5,
      reviews: 120,
      price: 120,
    },
    {
      id: 2,
      image: p2,
      name: "Skinny Fit Jeans",
      rating: 3.5,
      reviews: 84,
      price: 240,
      oldPrice: 260,
      discount: 20,
    },
    {
      id: 3,
      image: p3,
      name: "Checkered Shirt",
      rating: 4.5,
      reviews: 76,
      price: 180,
    },
    {
      id: 4,
      image: p4,
      name: "Sleeve Striped T-shirt",
      rating: 4.5,
      reviews: 145,
      price: 130,
      oldPrice: 160,
      discount: 30,
    },
  ],

  [
    {
      id: 5,
      image: p5,
      name: "Vertical Striped Shirt",
      rating: 5,
      reviews: 210,
      price: 212,
      oldPrice: 232,
      discount: 20,
    },
    {
      id: 6,
      image: p6,
      name: "Courage Graphic T-shirt",
      rating: 4,
      reviews: 98,
      price: 145,
    },
    {
      id: 7,
      image: p7,
      name: "Loose Fit Bermuda Shorts",
      rating: 3,
      reviews: 52,
      price: 80,
    },
    {
      id: 8,
      image: p8,
      name: "Faded Skinny Jeans",
      rating: 4.5,
      reviews: 167,
      price: 210,
      oldPrice: 260,
      discount: 20,
    },
  ],
];

export default function NewArrivals({
  products: customProducts,
  title = "NEW ARRIVALS",
  showViewAll = true,
}) {
  const [setIndex, setSetIndex] = useState(0);

  const products = customProducts
    ? customProducts[setIndex]
    : productSets[setIndex];

  return (
    <section className="na" id="new-arrivals">
      <div className="na-inner">

        <h2 className="section-title">{title}</h2>

        <div className="na-grid">
          {products.map((product) => (
            <ProductCart
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              rating={product.rating}
              reviews={product.reviews}
              price={product.price}
              oldPrice={product.oldPrice}
              discount={product.discount}
            />
          ))}
        </div>

        {showViewAll && (
          <div className="na-actions">
            <button
              type="button"
              className="view-all-btn"
              onClick={() => {
                setSetIndex((prev) => {
                  const totalSets = customProducts
                    ? customProducts.length
                    : productSets.length;

                  return (prev + 1) % totalSets;
                });
              }}
            >
              View All
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
