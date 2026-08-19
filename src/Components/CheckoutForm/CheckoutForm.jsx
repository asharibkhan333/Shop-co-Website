import "./CheckoutForm.css";

function CheckoutForm({ formData, errors, onChange }) {
  return (
    <div className="checkout-form">
      <section className="checkout-form-section">
        <h2>Contact Information</h2>

        <div className="checkout-form-grid">
          <div className="checkout-field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={onChange}
              placeholder="John"
            />
            {errors.firstName ? (
              <span className="checkout-field-error">{errors.firstName}</span>
            ) : null}
          </div>

          <div className="checkout-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={onChange}
              placeholder="Doe"
            />
            {errors.lastName ? (
              <span className="checkout-field-error">{errors.lastName}</span>
            ) : null}
          </div>

          <div className="checkout-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              placeholder="john@example.com"
            />
            {errors.email ? (
              <span className="checkout-field-error">{errors.email}</span>
            ) : null}
          </div>

          <div className="checkout-field">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={onChange}
              placeholder="+92 300 1234567"
            />
            {errors.phone ? (
              <span className="checkout-field-error">{errors.phone}</span>
            ) : null}
          </div>
        </div>
      </section>

      <section className="checkout-form-section">
        <h2>Delivery Address</h2>

        <div className="checkout-form-grid">
          <div className="checkout-field">
            <label htmlFor="country">Country</label>
            <input
              id="country"
              name="country"
              type="text"
              value={formData.country}
              onChange={onChange}
              placeholder="Pakistan"
            />
            {errors.country ? (
              <span className="checkout-field-error">{errors.country}</span>
            ) : null}
          </div>

          <div className="checkout-field">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              type="text"
              value={formData.city}
              onChange={onChange}
              placeholder="Karachi"
            />
            {errors.city ? (
              <span className="checkout-field-error">{errors.city}</span>
            ) : null}
          </div>

          <div className="checkout-field checkout-field-full">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={onChange}
              placeholder="Street address"
            />
            {errors.address ? (
              <span className="checkout-field-error">{errors.address}</span>
            ) : null}
          </div>

          <div className="checkout-field">
            <label htmlFor="apartment">
              Apartment / House Number{" "}
              <span className="checkout-field-optional">(optional)</span>
            </label>
            <input
              id="apartment"
              name="apartment"
              type="text"
              value={formData.apartment}
              onChange={onChange}
              placeholder="Apt 4B"
            />
          </div>

          <div className="checkout-field">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={onChange}
              placeholder="74200"
            />
            {errors.postalCode ? (
              <span className="checkout-field-error">{errors.postalCode}</span>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CheckoutForm;
