import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from "../actions/cartActions";

const ShippingPage = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div>
      <Title text="Shipping" />
      <div className="m-2 flex flex-col items-center justify-center">
        <CheckoutSteps step1 step2 />
        <form
          className="border border-stone-500 rounded-lg m-2 p-10 flex flex-col items-center justify-center"
          onSubmit={submitHandler}
        >
          <div className="flex flex-col items-start justify-center mb-3">
            <label htmlFor="address" className="tracking-wider mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              className="w-64 py-2 px-2 border-l border-stone-500"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-start justify-center mb-3">
            <label htmlFor="city" className="tracking-wider mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              className="w-64 py-2 px-2 border-l border-stone-500"
              placeholder="Enter your city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-start justify-center mb-3">
            <label htmlFor="postalCode" className="tracking-wider mb-2">
              Postal code
            </label>
            <input
              type="text"
              id="postalCode"
              className="w-64 py-2 px-2 border-l border-stone-500"
              placeholder="Enter your postal code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col items-start justify-center mb-3">
            <label htmlFor="country" className="tracking-wider mb-2">
              Country
            </label>
            <input
              type="text"
              id="country"
              className="w-64 py-2 px-2 border-l border-stone-500"
              placeholder="Enter your country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
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

export default ShippingPage;
