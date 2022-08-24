import React, { useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import Title from "../components/Title";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartPage = () => {
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const qty = new URLSearchParams(location.search).get("qty");

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (params.id) {
      dispatch(addToCart(params.id, qty));
    }
  }, [dispatch, params.id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate(`/login?redirect=${"/shipping"}`);
  };

  return (
    <div>
      <Title text="Your cart" />
      <div className="m-2 flex items-start justify-between">
        <div className="m-2 flex flex-col items-center justify-between w-8/12">
          {cartItems.length === 0 ? (
            <h2>Your cart is empty</h2>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product}
                className="border-b border-stone-300 last:border-b-0 flex items-center justify-between w-full"
              >
                <div className="w-1/5 flex items-center justify-center p-2">
                  <img src={item.image} alt={item.name} className="w-full" />
                </div>
                <div className="w-1/5 flex items-center justify-center p-2">
                  <Link
                    to={`/store/product/${item.product}`}
                    className="hover:underline text-sm font-semibold"
                  >
                    {item.name}
                  </Link>
                </div>
                <div className="w-1/5 flex items-center justify-center p-2">
                  <p className="text-lg font-semibold">${item.price}</p>
                </div>
                <div className="w-1/5 flex items-center justify-center p-2">
                  <select
                    className="bg-stone-100 w-14 cursor-pointer rounded-xl border border-stone-300"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, e.target.value))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/5 flex items-center justify-center p-2">
                  <button
                    type="button"
                    onClick={() => removeFromCartHandler(item.product)}
                    className="bg-stone-100 p-2 border border-stone-300 rounded"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="w-3/12 m-2">
          <div>
            <div className="p-2 flex items-center justify-between">
              <p className="font-semibold tracking-wide">
                Subtotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                items:
              </p>
              <p className="font-semibold tracking-wide">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="p-2">
              <button
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                className="bg-stone-800 text-stone-200 flex items-center justify-center py-2 w-full rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600 mb-2"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
