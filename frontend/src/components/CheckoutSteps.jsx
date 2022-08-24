import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="w-1/2">
      <ul className="steps mb-10 text-center w-full">
        {step1 ? (
          <li data-content="✓" className="step step-accent">
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </li>
        ) : (
          <li data-content="?" className="step">
            <Link to="/login" className="pointer-events-none font-bold">
              Login
            </Link>
          </li>
        )}
        {step2 ? (
          <li data-content="✓" className="step step-accent">
            <Link to="/shipping" className="font-bold">
              Shipping
            </Link>
          </li>
        ) : (
          <li data-content="?" className="step">
            <Link to="/shipping" className="pointer-events-none font-bold">
              Shipping
            </Link>
          </li>
        )}
        {step3 ? (
          <li data-content="✓" className="step step-accent">
            <Link to="/payment" className="font-bold">
              Payment
            </Link>
          </li>
        ) : (
          <li data-content="?" className="step">
            <Link to="/payment" className="pointer-events-none font-bold">
              Payment
            </Link>
          </li>
        )}
        {step4 ? (
          <li data-content="✓" className="step step-accent">
            <Link to="/placeorder" className="font-bold">
              Place Order
            </Link>
          </li>
        ) : (
          <li data-content="?" className="step">
            <Link to="/placeorder" className="pointer-events-none font-bold">
              Place Order
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CheckoutSteps;
