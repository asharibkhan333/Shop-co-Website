import p1 from "../../assets/Arrivals/product-1-png.png";
import p2 from "../../assets/Arrivals/product-2-png.png";
import p3 from "../../assets/Arrivals/product-3-png.png";
import p4 from "../../assets/Arrivals/product-4-png.png";
import p5 from "../../assets/Arrivals/product-5-jpg.jpg";
import p6 from "../../assets/Arrivals/product-6-jpg.jpg";
import p7 from "../../assets/Arrivals/product-7-jpg.jpg";
import p8 from "../../assets/Arrivals/product-8-jpg.jpg";
import p9 from "../../assets/Arrivals/T-4-png.png";
import p10 from "../../assets/Arrivals/T-3-png.png";
import p11 from "../../assets/Arrivals/T-3-png.png";

export const COLORS = ["#4F4631", "#314F4A", "#31344F"];
export const SIZES = ["Small", "Medium", "Large", "X-Large"];

/* ==================================================
   CATEGORY PAGE CONSTANTS
   These power CategorySidebar / ColorFilter / SizeFilter /
   DressStyleFilter. Keep the hex values below IN SYNC with
   the `color` field used on each product further down,
   otherwise the color filter will silently match nothing.
================================================== */
export const CATEGORIES = ["T-Shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

export const DRESS_STYLES = ["Casual", "Formal", "Party", "Gym"];

export const FILTER_COLORS = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#1E4AE9" },
  { name: "Green", hex: "#22C55E" },
  { name: "Brown", hex: "#4F4631" },
  { name: "Yellow", hex: "#FFD400" },
  { name: "Purple", hex: "#8B15C9" },
];

const defaultReviews = [
  {
    id: 1,
    name: "Samantha D.",
    rating: 4.5,
    date: "August 14, 2023",
    message:
      "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
  },
  {
    id: 2,
    name: "Alex M.",
    rating: 4,
    date: "August 15, 2023",
    message:
      "The shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this shirt definitely gets a thumbs up from me.",
  },
  {
    id: 3,
    name: "Ethan R.",
    rating: 3.5,
    date: "August 16, 2023",
    message:
      "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can tell the designer poured their creativity into this piece.",
  },
  {
    id: 4,
    name: "Olivia P.",
    rating: 4,
    date: "August 17, 2023",
    message:
      "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer understands the essence of good design.",
  },
  {
    id: 5,
    name: "Liam K.",
    rating: 4,
    date: "August 18, 2023",
    message:
      "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
  },
  {
    id: 6,
    name: "Ava H.",
    rating: 4.5,
    date: "August 19, 2023",
    message:
      "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
  },
];
const defaultFaqs = [
  {
    id: "delivery",
    question: "What is the delivery time?",
    answer:
      "Standard delivery takes 3-5 business days. Express delivery arrives within 1-2 business days and is available at checkout.",
  },
  {
    id: "returns",
    question: "What is your return policy?",
    answer:
      "You can return any unworn item within 30 days of delivery for a full refund. Items must include original tags and packaging.",
  },
  {
    id: "exchange",
    question: "Can I exchange the product?",
    answer:
      "Yes. Exchanges for a different size or color are free within 30 days — just start the request from your order page.",
  },
  {
    id: "care",
    question: "How should I care for this item?",
    answer:
      "Machine wash cold with similar colors, do not bleach, tumble dry low and warm iron inside out if needed.",
  },
];

function makeProduct(base) {
  return {
    colors: COLORS,
    sizes: SIZES,
    reviews: defaultReviews,
    faqs: defaultFaqs,
    description:
      "This premium piece is crafted from soft and breathable fabric for everyday comfort and style. The relaxed silhouette, reinforced stitching and durable finish keep it looking sharp wash after wash — perfect for any casual occasion.",
    ...base,
    imagesByColor: base.imagesByColor ?? {
      [COLORS[0]]: [base.image, base.altA, base.altB],
      [COLORS[1]]: [base.altA, base.image, base.altB],
      [COLORS[2]]: [base.altB, base.altA, base.image],
    },
  };
}

export const products = [
  makeProduct({
    id: 1,
    image: p9,
    altA: p1,
    altB: p11,
    name: "T-shirt with Tape Details",
    rating: 4.5,
    reviews_count: 120,
    price: 120,
    category: "T-Shirts",
    dressStyle: "Casual",
    color: "#000000",
  }),
  makeProduct({
    id: 2,
    image: p2,
    altA: p8,
    altB: p7,
    name: "Skinny Fit Jeans",
    rating: 3.5,
    reviews_count: 84,
    price: 240,
    oldPrice: 260,
    discount: 20,
    category: "Jeans",
    dressStyle: "Casual",
    color: "#1E4AE9",
  }),
  makeProduct({
    id: 3,
    image: p3,
    altA: p5,
    altB: p1,
    name: "Checkered Shirt",
    rating: 4.5,
    reviews_count: 76,
    price: 180,
    category: "Shirts",
    dressStyle: "Formal",
    color: "#FF0000",
  }),
  makeProduct({
    id: 4,
    image: p4,
    altA: p1,
    altB: p6,
    name: "Sleeve Striped T-shirt",
    rating: 4.5,
    reviews_count: 145,
    price: 130,
    oldPrice: 160,
    discount: 30,
    category: "T-Shirts",
    dressStyle: "Gym",
    color: "#000000",
  }),
  makeProduct({
    id: 5,
    image: p5,
    altA: p3,
    altB: p6,
    name: "Vertical Striped Shirt",
    rating: 5,
    reviews_count: 210,
    price: 212,
    oldPrice: 232,
    discount: 20,
    category: "Shirts",
    dressStyle: "Formal",
    color: "#22C55E",
  }),
  makeProduct({
    id: 6,
    image: p6,
    altA: p1,
    altB: p4,
    name: "Courage Graphic T-shirt",
    rating: 4,
    reviews_count: 98,
    price: 145,
    category: "T-Shirts",
    dressStyle: "Party",
    color: "#FFD400",
  }),
  makeProduct({
    id: 7,
    image: p7,
    altA: p2,
    altB: p8,
    name: "Loose Fit Bermuda Shorts",
    rating: 3,
    reviews_count: 52,
    price: 80,
    category: "Shorts",
    dressStyle: "Gym",
    color: "#4F4631",
  }),
  makeProduct({
    id: 8,
    image: p8,
    altA: p2,
    altB: p7,
    name: "Faded Skinny Jeans",
    rating: 4.5,
    reviews_count: 167,
    price: 210,
    oldPrice: 260,
    discount: 20,
    category: "Jeans",
    dressStyle: "Casual",
    color: "#1E4AE9",
  }),
  makeProduct({
    id: 15,
    image: p1,
    altA: p6,
    altB: p4,
    name: "Classic Black Tee",
    rating: 4.5,
    reviews_count: 402,
    price: 95,
    oldPrice: 120,
    discount: 20,
    category: "T-Shirts",
    dressStyle: "Casual",
    color: "#000000",
  }),
  makeProduct({
    id: 16,
    image: p2,
    altA: p7,
    altB: p8,
    name: "Mid Blue Slim Jeans",
    rating: 4,
    reviews_count: 155,
    price: 195,
    category: "Jeans",
    dressStyle: "Formal",
    color: "#1E4AE9",
  }),
  makeProduct({
    id: 17,
    image: p3,
    altA: p5,
    altB: p6,
    name: "Buffalo Check Flannel",
    rating: 5,
    reviews_count: 289,
    price: 168,
    oldPrice: 210,
    discount: 20,
    category: "Shirts",
    dressStyle: "Casual",
    color: "#FF0000",
  }),
  makeProduct({
    id: 18,
    image: p4,
    altA: p1,
    altB: p3,
    name: "Colorblock Sleeve Tee",
    rating: 3.5,
    reviews_count: 73,
    price: 110,
    category: "T-Shirts",
    dressStyle: "Party",
    color: "#8B15C9",
  }),

  makeProduct({
    id: 19,
    image: p10,
    altA: p1,
    altB: p4,
    name: "Oversized Pullover Hoodie",
    rating: 4.5,
    reviews_count: 64,
    price: 175,
    category: "Hoodie",
    dressStyle: "Gym",
    color: "#22C55E",
  }),
  makeProduct({
    id: 20,
    image: p6,
    altA: p3,
    altB: p5,
    name: "Zip-Up Fleece Hoodie",
    rating: 4,
    reviews_count: 41,
    price: 190,
    oldPrice: 220,
    discount: 15,
    category: "Hoodie",
    dressStyle: "Casual",
    color: "#FFFFFF",
  }),
  makeProduct({
    id: 21,
    image: p5,
    altA: p7,
    altB: p2,
    name: "Cargo Utility Shorts",
    rating: 3.5,
    reviews_count: 37,
    price: 95,
    category: "Shorts",
    dressStyle: "Gym",
    color: "#8B15C9",
  }),
];

export function getProductById(id) {
  return products.find((product) => String(product.id) === String(id));
}
