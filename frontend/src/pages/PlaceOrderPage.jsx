import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import Error from "../components/Error";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";

const PlaceOrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  // Calculate prices
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const shippingPrice = itemsPrice > 100 ? 0 : 100;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const { order, success, error } = useSelector((state) => state.orderCreate);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
    //eslint-disable-next-line
  }, [success, navigate]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    );
  };

  return (
    <div>
      <Title text="Place order" />
      <div className="m-2 flex flex-col items-center justify-center">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="w-full m-2 p-2 flex items-start justify-between">
          <div className="w-7/12">
            <div className="mb-2">
              <p className="text-lg font-semibold tracking-wider mb-2">
                Shipping:
              </p>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div className="mb-2">
              <p className="text-lg font-semibold tracking-wider mb-2">
                Payment method:
              </p>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>
            <div className="mb-2">
              <p className="text-lg font-semibold tracking-wider mb-2">
                Items:
              </p>
              <div>
                {cart.cartItems.length === 0 ? (
                  <Error text="Your cart is empty" />
                ) : (
                  <div className="flex flex-col items-start">
                    {cart.cartItems.map((item, index) => (
                      <div
                        key={item.product}
                        className="flex items-center justify-between border-b border-stone-300 last:border-b-0 py-2"
                      >
                        <div className="w-1/4 flex items-center justify-start p-2">
                          <img
                            className="w-1/3"
                            src={item.image}
                            alt={item.name}
                          />
                        </div>
                        <div className="w-2/4 flex items-center justify-start p-2">
                          <Link
                            to={`/store/products/${item.product}`}
                            className="hover:underline"
                          >
                            {item.name}
                          </Link>
                        </div>
                        <div className="w-1/4 flex items-center justify-start p-2">
                          <p>
                            {item.qty} x ${item.price} = $
                            {(item.qty * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-3/12 p-2">
            <div className="border-b border-stone-300">
              <h3 className="text-xl tracking-wide my-2">Order summary</h3>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-stone-300">
              <p>Items</p>
              <p>${itemsPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-stone-300">
              <p>Shipping</p>
              <p>${shippingPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-stone-300">
              <p>Tax</p>
              <p>${taxPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between py-2">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="mt-2">
              {error && <Error text={error} />}
              <button
                onClick={placeOrderHandler}
                className="bg-stone-800 text-stone-200 py-2 w-full rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600"
              >
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
