import "./PaymentMethode.css";

function PaymentMethod({ formData, errors, onChange }) {
  return (
    <section className="payment-method">
      <h2>Payment Method</h2>

      <div className="payment-options">
        <label
          className={`payment-option ${
            formData.paymentMethod === "cash-on-delivery" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="cash-on-delivery"
            checked={formData.paymentMethod === "cash-on-delivery"}
            onChange={onChange}
          />
          <i className="fa-solid fa-money-bill-wave"></i>
          <span>Cash on Delivery</span>
        </label>

        <label
          className={`payment-option ${
            formData.paymentMethod === "card" ? "active" : ""
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={formData.paymentMethod === "card"}
            onChange={onChange}
          />
          <i className="fa-solid fa-credit-card"></i>
          <span>Credit / Debit Card</span>
        </label>
      </div>

      {formData.paymentMethod === "cash-on-delivery" ? (
        <p className="payment-note">Pay when your order arrives.</p>
      ) : null}

      {formData.paymentMethod === "card" ? (
        <div className="card-fields">
          <div className="checkout-field checkout-field-full">
            <label htmlFor="cardHolder">Card Holder Name</label>
            <input
              id="cardHolder"
              name="cardHolder"
              type="text"
              value={formData.cardHolder}
              onChange={onChange}
              placeholder="Name on card"
            />
            {errors.cardHolder ? (
              <span className="checkout-field-error">
                {errors.cardHolder}
              </span>
            ) : null}
          </div>

          <div className="checkout-field checkout-field-full">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              id="cardNumber"
              name="cardNumber"
              type="text"
              inputMode="numeric"
              maxLength={19}
              value={formData.cardNumber}
              onChange={onChange}
              placeholder="1234 5678 9012 3456"
            />
            {errors.cardNumber ? (
              <span className="checkout-field-error">
                {errors.cardNumber}
              </span>
            ) : null}
          </div>

          <div className="checkout-field">
            <label htmlFor="expiry">Expiry Date</label>
            <input
              id="expiry"
              name="expiry"
              type="text"
              maxLength={5}
              value={formData.expiry}
              onChange={onChange}
              placeholder="MM/YY"
            />
            {errors.expiry ? (
              <span className="checkout-field-error">{errors.expiry}</span>
            ) : null}
          </div>

          <div className="checkout-field">
            <label htmlFor="cvv">CVV</label>
            <input
              id="cvv"
              name="cvv"
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={formData.cvv}
              onChange={onChange}
              placeholder="123"
            />
            {errors.cvv ? (
              <span className="checkout-field-error">{errors.cvv}</span>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default PaymentMethod;
