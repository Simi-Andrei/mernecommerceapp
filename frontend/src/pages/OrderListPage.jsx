import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { CgClose } from "react-icons/cg";
import { listOrders } from "../actions/orderActions";

const OrderListPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, orders } = useSelector((state) => state.orderList);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <div>
      <Title text="Orders" />
      {loading ? (
        <Loader />
      ) : error ? (
        <Error text={error} />
      ) : (
        <div className="m-2 p-2">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
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
                  <td>{order.user && order.user.name}</td>
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
                      <button className="bg-stone-800 text-stone-200 py-1 px-4 rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600">
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
  );
};

export default OrderListPage;
