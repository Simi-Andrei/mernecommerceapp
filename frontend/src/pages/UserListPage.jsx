import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { CgClose } from "react-icons/cg";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { listUsers, deleteUser } from "../actions/userActions";

const UserListPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, error, users } = useSelector((state) => state.userList);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success: successDelete } = useSelector((state) => state.userDelete);

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div>
      <Title text="Users" />
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
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FiCheck className="text-green-500 text-2xl" />
                    ) : (
                      <CgClose className="text-red-500 text-2xl" />
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <button className="mr-2">
                        <FaEdit className="text-blue-500" />
                      </button>
                    </Link>
                    <button
                      className="ml-2"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrashAlt className="text-red-500" />
                    </button>
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

export default UserListPage;
