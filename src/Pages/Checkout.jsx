import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Breadcrumb from "../Components/BreadCrumb/BreadCrumb.jsx";
import CheckoutSteps from "../Components/CheckoutSteps/CheckoutSteps";
import CheckoutForm from "../Components/CheckoutForm/CheckoutForm";
import PaymentMethod from "../Components/PaymentMethod/PaymentMethod";
import CheckoutOrderSummary from "../Components/CheckoutOrderSummary/CheckoutOrderSummary";
import CartEmpty from "../Components/CartEmptycheck/CartEmptyCheck.jsx";
import { useCart } from "../Components/lib/cart";
import { saveOrder, generateOrderId } from "../libs/Checkout.js";
import "./Checkout.css";
import Newsletter from "../Components/NewsLetter/NewsLetter.jsx";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  apartment: "",
  postalCode: "",
  paymentMethod: "cash-on-delivery",
  cardHolder: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

const DISCOUNT_RATE = 0.2;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(formData) {
  const errors = {};

  if (!formData.firstName.trim()) errors.firstName = "First name is required.";
  if (!formData.lastName.trim()) errors.lastName = "Last name is required.";

  if (!formData.email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(formData.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!formData.phone.trim()) errors.phone = "Phone number is required.";
  if (!formData.country.trim()) errors.country = "Country is required.";
  if (!formData.city.trim()) errors.city = "City is required.";
  if (!formData.address.trim()) errors.address = "Address is required.";
  if (!formData.postalCode.trim())
    errors.postalCode = "Postal code is required.";

  if (formData.paymentMethod === "card") {
    if (!formData.cardHolder.trim())
      errors.cardHolder = "Card holder name is required.";

    const digitsOnly = formData.cardNumber.replace(/\s/g, "");
    if (!digitsOnly) {
      errors.cardNumber = "Card number is required.";
    } else if (digitsOnly.length < 16) {
      errors.cardNumber = "Card number must be 16 digits.";
    }

    if (!formData.expiry.trim()) {
      errors.expiry = "Expiry date is required.";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiry.trim())) {
      errors.expiry = "Use MM/YY format.";
    }

    if (!formData.cvv.trim()) {
      errors.cvv = "CVV is required.";
    } else if (formData.cvv.trim().length < 3) {
      errors.cvv = "CVV must be 3-4 digits.";
    }
  }

  return errors;
}

function Checkout() {
  const navigate = useNavigate();
  const { cart, subtotal, clearCart } = useCart();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorField = document.getElementsByName(
        Object.keys(validationErrors)[0]
      )[0];
      firstErrorField?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const discount = subtotal * DISCOUNT_RATE;
    const deliveryFee = subtotal > 500 ? 0 : 15;
    const total = subtotal - discount + deliveryFee;

    const order = {
      id: generateOrderId(),
      createdAt: new Date().toISOString(),
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },
      shippingAddress: {
        country: formData.country,
        city: formData.city,
        address: formData.address,
        apartment: formData.apartment,
        postalCode: formData.postalCode,
      },
      paymentMethod: formData.paymentMethod,
      items: cart,
      subtotal,
      discount,
      deliveryFee,
      total,
      status: "Confirmed",
    };

    saveOrder(order);
    clearCart();
    navigate("/order-success", { state: { order } });
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div className="checkout-page">
          <div className="checkout-container">
            <CartEmpty message="Add some products before proceeding to checkout." />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="checkout-page">
        <div className="checkout-container">
          <Breadcrumb current="Checkout" />
          <CheckoutSteps currentStep={2} />

          <div className="checkout-layout">
            <div className="checkout-left">
              <CheckoutForm
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />

              <PaymentMethod
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />

              <button
                type="button"
                className="place-order-btn"
                onClick={handlePlaceOrder}
              >
                Place Order
              </button>
            </div>

            <div className="checkout-right">
              <CheckoutOrderSummary cart={cart} subtotal={subtotal} />
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
      <Footer />
    </>
  );
}

export default Checkout;
