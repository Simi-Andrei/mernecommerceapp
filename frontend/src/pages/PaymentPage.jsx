import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../actions/cartActions";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { shippingAddress } = useSelector((state) => state.cart);

  if (!shippingAddress) {
    navigate("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div>
      <Title text="Payment" />
      <div className="m-2 flex flex-col items-center justify-center">
        <CheckoutSteps step1 step2 step3 />
        <form
          className="border border-stone-500 rounded-lg m-2 p-10 flex flex-col items-center justify-center"
          onSubmit={submitHandler}
        >
          <div className="mb-2 py-2 w-full flex items-center justify-start">
            <input
              type="radio"
              id="PayPal"
              name="paymentMethod"
              className="radio mr-2"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.checked)}
            />
            <label htmlFor="PayPal" className="font-semibold">
              PayPal or Credit Card
            </label>
          </div>
          {/* <div className="mb-2 py-2 w-full flex items-center justify-start">
            <input
              type="radio"
              id="Stripe"
              name="paymentMethod"
              class="radio mr-2"
              value="Stripe"
              checked={paymentMethod === "Stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="Stripe" className="font-semibold">
              Stripe
            </label>
          </div> */}
          <button
            className="bg-stone-800 text-stone-200 py-2 w-64 rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600 mt-2"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
