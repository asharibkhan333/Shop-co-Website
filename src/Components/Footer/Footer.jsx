import visa from "../../assets/Footer-pic/visa.png";
import mastercard from "../../assets/Footer-pic/mastercard.png";
import paypal from "../../assets/Footer-pic/paypal.png";
import applepay from "../../assets/Footer-pic/pay.png";
import googlepay from "../../assets/Footer-pic/G-pay.png";
import "./Footer.css";

const columns = [
  { title: "COMPANY", links: ["About", "Features", "Works", "Career"] },
  {
    title: "HELP",
    links: [
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    title: "FAQ",
    links: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "RESOURCES",
    links: [
      "Free eBooks",
      "Development Tutorial",
      "How to - Blog",
      "YouTube Playlist",
    ],
  },
];

const socials = [
  { icon: "fa-brands fa-twitter", label: "Twitter" },
  { icon: "fa-brands fa-facebook-f", label: "Facebook" },
  { icon: "fa-brands fa-instagram", label: "Instagram" },
  { icon: "fa-brands fa-github", label: "GitHub" },
];

// const payments = [
//   { icon: "fa-brands fa-cc-visa", label: "Visa" },
//   { icon: "fa-brands fa-cc-mastercard", label: "Mastercard" },
//   { icon: "fa-brands fa-cc-paypal", label: "PayPal" },
//   { icon: "fa-brands fa-cc-apple-pay", label: "Apple Pay" },
//   { icon: "fa-brands fa-google-pay", label: "Google Pay" },
// ];

const payments = [
  { image: visa, label: "Visa" },
  { image: mastercard, label: "Mastercard" },
  { image: paypal, label: "PayPal" },
  { image: applepay, label: "Apple Pay" },
  { image: googlepay, label: "Google Pay" },
];

export default function Footer() {
  return (
    <footer className="ft">
      <div className="ft-inner">
        <div className="ft-top">
          <div className="ft-brand">
            <span className="ft-logo">SHOP.CO</span>
            <p className="ft-desc">
              We have clothes that suit your style and which you&rsquo;re proud
              to wear. From women to men.
            </p>
            <div className="ft-socials">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#newsletter"
                  aria-label={social.label}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="ft-cols">
            {columns.map((column) => (
              <div className="ft-col" key={column.title}>
                <h3>{column.title}</h3>
                <ul>
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#new-arrivals">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-bottom">
          <p>Shop.co &copy; 2000-2026, All Rights Reserved</p>
          <div className="ft-pay">
            {payments.map((payment) => (
              <span key={payment.label} title={payment.label}>
                <img src={payment.image} alt={payment.label} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
