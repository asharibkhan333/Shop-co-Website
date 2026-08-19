import "./CheckoutSteps.css";

const STEPS = ["Cart", "Checkout", "Complete"];

/**
 * currentStep is 1-indexed: 1 = Cart, 2 = Checkout, 3 = Complete
 */
function CheckoutSteps({ currentStep = 2 }) {
  return (
    <div className="checkout-steps">
      {STEPS.map((step, index) => {
        const stepNumber = index + 1;
        const isComplete = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;

        return (
          <div className="checkout-step" key={step}>
            <div className="checkout-step-marker">
              <span
                className={`checkout-step-circle ${
                  isActive ? "active" : ""
                } ${isComplete ? "complete" : ""}`}
              >
                {isComplete ? (
                  <i className="fa-solid fa-check"></i>
                ) : (
                  stepNumber
                )}
              </span>
              <span
                className={`checkout-step-label ${isActive ? "active" : ""}`}
              >
                {step}
              </span>
            </div>

            {stepNumber < STEPS.length ? (
              <span
                className={`checkout-step-line ${isComplete ? "complete" : ""}`}
              ></span>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default CheckoutSteps;
