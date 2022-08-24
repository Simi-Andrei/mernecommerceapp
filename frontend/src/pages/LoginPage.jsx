import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { login } from "../actions/userActions";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="flex flex-col items-center">
      <Title text="Login" className="text-center" />
      {error && <Error text={error} />}
      {loading && <Loader />}
      <div className="m-2 flex items-center justify-center">
        <form
          className="border border-stone-500 rounded-lg m-2 p-10 flex flex-col items-center justify-center bg-stone-100"
          onSubmit={submitHandler}
        >
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
          <div className="flex flex-col items-start justify-center mb-3">
            <label htmlFor="password" className="tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-64 py-2 px-2 border-l border-stone-500"
              placeholder="Enter your email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-stone-800 text-stone-200 py-2 w-64 rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600 mt-2"
            type="submit"
          >
            Login
          </button>
          <p className="mt-4 w-64 flex items-center justify-around">
            New customer?
            <NavLink
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              <span className="bg-stone-100 text-stone-900  py-2 px-6 rounded hover:bg-stone-200 transition-all duration-200 border border-stone-300 text-sm mt-2">
                Register
              </span>
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
