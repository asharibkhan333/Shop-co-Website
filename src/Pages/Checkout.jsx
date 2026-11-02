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
import { useCart } from "../Components/Content/CartContent.jsx";
// import { saveOrder, generateOrderId } from "../libs/Checkout.js";
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  
  const handlePlaceOrder = async () => {
  if (cart.length === 0 || isSubmitting) return;

  const validationErrors = validateForm(formData);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);

    const firstErrorField = document.getElementsByName(
      Object.keys(validationErrors)[0]
    )[0];

    firstErrorField?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    return;
  }

  setIsSubmitting(true);
  setSubmitError("");

  try {
    // User ka login token
    const token = localStorage.getItem("token");

    if (!token) {
      setSubmitError(
        "Please login before placing your order."
      );
      return;
    }

    // Frontend cart ko backend ke required format mein convert karo
    const orderData = {
      items: cart.map((item) => ({
        productId: String(item.id),
        quantity: Number(item.quantity),
        color: item.color,
        size: item.size,
      })),

      shippingAddress: {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone.trim(),

        address: [
          formData.address,
          formData.apartment,
          formData.city,
          formData.country,
          formData.postalCode,
        ]
          .filter(Boolean)
          .join(", "),
      },
    };

    const response = await fetch(
      "http://localhost:4000/api/orders",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(orderData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message ||
          data.error ||
          "Order place nahi ho saka."
      );
    }

    // Backend se returned order
    const savedOrder = data.order || data;

    // Sirf successful response par cart clear karo
    clearCart();

    // Success page par database wala order bhejo
    navigate("/order-success", {
      state: {
        order: {
          ...savedOrder,
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
          },
          paymentMethod: formData.paymentMethod,
        },
      },
    });
  } catch (error) {
    console.error("Place order error:", error);

    setSubmitError(
      error.message ||
        "Server se connection nahi ho saka. Dobara try karo."
    );
  } finally {
    setIsSubmitting(false);
  }
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

            {submitError && (
            <p role="alert" className="checkout-error">
    {submitError}
  </p>
)}

         <button
        type="button"
        className="place-order-btn"
        onClick={handlePlaceOrder}
        disabled={isSubmitting}
>
  {isSubmitting ? "Placing Order..." : "Place Order"}
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
