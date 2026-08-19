// import { useState } from "react";
// import ProductCart from "../ProductCart/ProductCart.jsx";
// import "./TopSelling.css";

// import p5 from "../../assets/TopSelling/Top-1-png.png";
// import p6 from "../../assets/TopSelling/Top-2-png.png";
// import p7 from "../../assets/TopSelling/Top-3-png.png";
// import p8 from "../../assets/TopSelling/Top-4-png.png";
// import p1 from "../../assets/TopSelling/Top-5-jpg.jpg";
// import p2 from "../../assets/TopSelling/Top-6-jpg.jpg";
// import p3 from "../../assets/TopSelling/Top-7-jpg.jpg";
// import p4 from "../../assets/TopSelling/Top-8-jpg.jpg";

// const topSellingSets = [
//   [
//     {
//       id: 11,
//       image: p5,
//       name: "Vertical Striped Shirt",
//       rating: 5,
//       reviews: 312,
//       price: 212,
//       oldPrice: 232,
//       discount: 20,
//     },
//     {
//       id: 12,
//       image: p6,
//       name: "Courage Graphic T-shirt",
//       rating: 4,
//       reviews: 187,
//       price: 145,
//     },
//     {
//       id: 13,
//       image: p7,
//       name: "Loose Fit Bermuda Shorts",
//       rating: 3,
//       reviews: 64,
//       price: 80,
//     },
//     {
//       id: 14,
//       image: p8,
//       name: "Faded Skinny Jeans",
//       rating: 4.5,
//       reviews: 240,
//       price: 210,
//       oldPrice: 260,
//       discount: 20,
//     },
//   ],
//   [
//     {
//       id: 15,
//       image: p1,
//       name: "Classic Black Tee",
//       rating: 4.5,
//       reviews: 402,
//       price: 95,
//       oldPrice: 120,
//       discount: 20,
//     },
//     {
//       id: 16,
//       image: p2,
//       name: "Mid Blue Slim Jeans",
//       rating: 4,
//       reviews: 155,
//       price: 195,
//     },
//     {
//       id: 17,
//       image: p3,
//       name: "Buffalo Check Flannel",
//       rating: 5,
//       reviews: 289,
//       price: 168,
//       oldPrice: 210,
//       discount: 20,
//     },
//     {
//       id: 18,
//       image: p4,
//       name: "Colorblock Sleeve Tee",
//       rating: 3.5,
//       reviews: 73,
//       price: 110,
//     },
//   ],
// ];

// export default function TopSelling() {
//   const [setIndex, setSetIndex] = useState(0);
//   const products = topSellingSets[setIndex];

//   return (
//     <section className="ts" id="top-selling">
//       <div className="ts-inner">
//         <h2 className="section-title">TOP SELLING</h2>

//         <div className="ts-grid">
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

//         <div className="ts-actions">
//           <button
//             type="button"
//             className="view-all-btn"
//             onClick={() =>
//               setSetIndex((prev) => (prev + 1) % topSellingSets.length)
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
import "./TopSelling.css";

import p5 from "../../assets/TopSelling/Top-1-png.png";
import p6 from "../../assets/TopSelling/Top-2-png.png";
import p7 from "../../assets/TopSelling/Top-3-png.png";
import p8 from "../../assets/TopSelling/Top-4-png.png";
import p1 from "../../assets/TopSelling/Top-5-jpg.jpg";
import p2 from "../../assets/TopSelling/Top-6-jpg.jpg";
import p3 from "../../assets/TopSelling/Top-7-jpg.jpg";
import p4 from "../../assets/TopSelling/Top-8-jpg.jpg";

const topSellingSets = [
  [
    {
      id: 5,
      image: p5,
      name: "Vertical Striped Shirt",
      rating: 5,
      reviews: 312,
      price: 212,
      oldPrice: 232,
      discount: 20,
    },
    {
      id: 6,
      image: p6,
      name: "Courage Graphic T-shirt",
      rating: 4,
      reviews: 187,
      price: 145,
    },
    {
      id: 7,
      image: p7,
      name: "Loose Fit Bermuda Shorts",
      rating: 3,
      reviews: 64,
      price: 80,
    },
    {
      id: 8,
      image: p8,
      name: "Faded Skinny Jeans",
      rating: 4.5,
      reviews: 240,
      price: 210,
      oldPrice: 260,
      discount: 20,
    },
  ],
  [
    {
      id: 15,
      image: p1,
      name: "Classic Black Tee",
      rating: 4.5,
      reviews: 402,
      price: 95,
      oldPrice: 120,
      discount: 20,
    },
    {
      id: 16,
      image: p2,
      name: "Mid Blue Slim Jeans",
      rating: 4,
      reviews: 155,
      price: 195,
    },
    {
      id: 17,
      image: p3,
      name: "Buffalo Check Flannel",
      rating: 5,
      reviews: 289,
      price: 168,
      oldPrice: 210,
      discount: 20,
    },
    {
      id: 18,
      image: p4,
      name: "Colorblock Sleeve Tee",
      rating: 3.5,
      reviews: 73,
      price: 110,
    },
  ],
];

export default function TopSelling() {
  const [setIndex, setSetIndex] = useState(0);

  const products = topSellingSets[setIndex];

  return (
    <section className="ts" id="top-selling">
      <div className="ts-inner">
        <h2 className="section-title">TOP SELLING</h2>

        <div className="ts-grid">
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

        <div className="ts-actions">
          <button
            type="button"
            className="view-all-btn"
            onClick={() =>
              setSetIndex((prev) =>
                (prev + 1) % topSellingSets.length
              )
            }
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
}