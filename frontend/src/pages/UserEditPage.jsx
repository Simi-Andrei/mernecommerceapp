import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { getUserDetails, updateUserAdmin } from "../actions/userActions";
import { USER_UPDATE_ADMIN_RESET } from "../constants/userConstants";

const UserEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);

  const { loading, error, user } = useSelector((state) => state.userDetails);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.userUpdateAdmin);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_ADMIN_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== id) {
        dispatch(getUserDetails(id));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, id, successUpdate, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserAdmin({ _id: id, name, email, isAdmin }));
  };

  return (
    <div>
      <div className="p-4">
        <Link to="/admin/userlist" className="flex items-center w-36">
          <FaChevronLeft />
          <span className="ml-1">Back to users</span>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <Title text="Edit user" className="text-center" />
        {loadingUpdate && <Loader />}
        {errorUpdate && <Error text={errorUpdate} />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Error text={error} />
        ) : (
          <div className="m-2 flex items-center justify-center">
            <form
              className="border border-stone-500 rounded-lg m-2 p-10 flex flex-col items-center justify-center"
              onSubmit={submitHandler}
            >
              <div className="flex flex-col items-start justify-center mb-3">
                <label htmlFor="name" className="tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-64 py-2 px-2 border-l border-stone-500"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start justify-center mb-3">
                <label htmlFor="email" className="tracking-wider mb-2">
                  Email address
                </label>
                <input
                  type="text"
                  id="email"
                  className="w-64 py-2 px-2 border-l border-stone-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2 py-2 w-full flex items-center justify-start">
                <input
                  type="checkbox"
                  id="isAdmin"
                  className="checkbox mr-2"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  disabled={userInfo._id === user._id}
                />
                <label htmlFor="isAdmin" className="font-semibold">
                  Is Admin
                </label>
              </div>
              <button
                className="bg-stone-800 text-stone-200 py-2 w-64 rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600 mt-2"
                type="submit"
              >
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEditPage;
