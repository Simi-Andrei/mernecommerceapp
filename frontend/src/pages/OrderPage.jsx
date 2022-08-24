import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { FaCheck } from "react-icons/fa";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

const OrderPage = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { order, loading, error } = useSelector((state) => state.orderDetails);

  const { loading: loadingPay, success: successPay } = useSelector(
    (state) => state.orderPay
  );

  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    (state) => state.orderDeliver
  );

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [
    dispatch,
    order,
    orderId,
    userInfo,
    navigate,
    successPay,
    successDeliver,
  ]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <div>
      {loading ? (
        <Loader className="m-2" />
      ) : error ? (
        <Error text={error} className="m-2" />
      ) : (
        <div>
          <Title text={`Order no ${orderId}`} />
          <div className="m-2 flex flex-col items-center justify-center">
            <div className="w-full m-2 p-2 flex items-start justify-between">
              <div className="w-7/12">
                <div className="mb-2 border-b border-b-stone-300 py-2">
                  <p className="text-lg font-semibold tracking-wider mb-2">
                    Shipping:
                  </p>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <p className="bg-green-300 italic my-1 p-2 text-stone-700 font-semibold tracking-wide rounded-md">
                      Delivered at {order.deliveredAt}
                    </p>
                  ) : (
                    <p className="bg-red-300 italic my-1 p-2 text-stone-700 font-semibold tracking-wide rounded-md">
                      Not delivered
                    </p>
                  )}
                </div>
                <div className="mb-2 border-b border-b-stone-300 py-2">
                  <p className="text-lg font-semibold tracking-wider mb-2">
                    Payment method:
                  </p>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <p className="bg-green-300 italic my-1 p-2 text-stone-700 font-semibold tracking-wide rounded-md">
                      Paid on {order.paidAt.substring(0, 10)}
                    </p>
                  ) : (
                    <p className="bg-red-300 italic my-1 p-2 text-stone-700 font-semibold tracking-wide rounded-md">
                      Not paid
                    </p>
                  )}
                </div>
                <div className="mb-2">
                  <p className="text-lg font-semibold tracking-wider mb-2">
                    Items:
                  </p>
                  <div>
                    {order.orderItems.length === 0 ? (
                      <Error text="Order is empty" />
                    ) : (
                      <div className="flex flex-col items-start">
                        {order.orderItems.map((item, index) => (
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
                  <p>${order.itemsPrice.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-300">
                  <p>Shipping</p>
                  <p>${order.shippingPrice.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-300">
                  <p>Tax</p>
                  <p>${order.taxPrice.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold">Total</p>
                  <p className="font-semibold">
                    ${order.totalPrice.toFixed(2)}
                  </p>
                </div>
                {!order.isPaid && (
                  <div className="mt-2">
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice.toFixed(2)}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </div>
                )}
                {loadingDeliver && <Loader />}
                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <div className="mt-2">
                      <button
                        onClick={deliverHandler}
                        className="bg-stone-800 text-stone-200 flex items-center justify-center py-2 w-full rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600 mb-2"
                      >
                        <FaCheck className="mr-2" />
                        Mark as delivered
                      </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
