import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { CgClose } from "react-icons/cg";
import { getUserDetails, updateUser } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success } = useSelector((state) => state.userUpdate);

  const {
    loading: loadingOrders,
    error: errorOrders,
    orders,
  } = useSelector((state) => state.orderListMy);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUser({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className="flex items-start justify-between">
      <div className="w-3/12">
        <Title text="Profile info" className="text-xl" />
        {message && <Error text={message} />}
        {success &&
          toast.success("Profile updated", {
            className: "bg-red-200",
          })}
        {loading && <Loader />}
        {error &&
          toast.error(error, {
            className: "bg-red-200",
          })}
        <div className="m-2 flex items-center justify-start border-r border-stone-300">
          <form
            className="w-4/5 m-2 p-2 flex flex-col items-start justify-start"
            onSubmit={submitHandler}
          >
            <div className="w-full flex flex-col items-start justify-center mb-3">
              <label htmlFor="name" className="tracking-wider mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full py-2 px-2 border-l border-stone-500"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center mb-3">
              <label htmlFor="email" className="tracking-wider mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="w-full py-2 px-2 border-l border-stone-500"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center mb-3">
              <label htmlFor="password" className="tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full py-2 px-2 border-l border-stone-500"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center mb-3">
              <label htmlFor="confirmPassword" className="tracking-wider mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full py-2 px-2 border-l border-stone-500"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className="bg-stone-800 text-stone-200 py-2 rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600 mt-2 w-full"
              type="submit"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <div className="w-9/12">
        <Title text="Orders" className="text-xl" />
        <div className="m-2 p-2">
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Error text={error} />
          ) : (
            <div>
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <CgClose className="text-red-500 text-2xl" />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <CgClose className="text-red-500 text-2xl" />
                        )}
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}>
                          <button className="bg-stone-800 text-stone-200 p-1 w-full rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600 mb-2 text-sm">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <ToastContainer style={{ "margin-top": "4rem" }} />
    </div>
  );
};

export default ProfilePage;
