import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import {
  FaHome,
  FaStoreAlt,
  FaShoppingCart,
  FaUser,
  FaChevronDown,
} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from "../actions/userActions";
import "tw-elements";

const Navbar = () => {
  const [toggleActive, setToggleActive] = useState(false);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userLogin);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="w-100 flex items-center justify-center shadow-md text-stone-900 relative bg-stone-200">
      <div className="container flex items-center justify-between p-4">
        <NavLink to="/" className="font-logo text-2xl md:text-3xl">
          shoppy
        </NavLink>
        <div className="hidden md:inline-flex">
          <NavLink to="/" className="flex items-center font-semibold ml-8">
            <FaHome />
            <span className="ml-2">Home</span>
          </NavLink>
          <NavLink to="/store" className="flex items-center font-semibold ml-8">
            <FaStoreAlt />
            <span className="ml-2">Store</span>
          </NavLink>
          <NavLink to="/cart" className="flex items-center font-semibold ml-8">
            <FaShoppingCart />
            <span className="ml-2">Cart</span>
          </NavLink>
          {userInfo && userInfo.isAdmin ? (
            <div className="flex justify-center">
              <div>
                <div className="dropdown relative">
                  <p
                    className="flex items-center justify-center font-semibold cursor-pointer ml-8"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo.name}
                    <FaChevronDown className="ml-1 text-sm" />
                  </p>
                  <ul
                    className="hidden dropdown-menu absolute bg-stone-50 z-50 py-2 text-left rounded-lg shadow-lg w-28"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <Link
                        to="/profile"
                        className="dropdown-item text-sm py-2 px-4 block w-full hover:bg-stone-200"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/userlist"
                        className="dropdown-item text-sm py-2 px-4 block w-full hover:bg-stone-200"
                      >
                        Users
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/productlist"
                        className="dropdown-item text-sm py-2 px-4 block w-full hover:bg-stone-200"
                      >
                        Products
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/admin/orderlist"
                        className="dropdown-item text-sm py-2 px-4 block w-full hover:bg-stone-200"
                      >
                        Orders
                      </Link>
                    </li>
                    <p
                      onClick={logoutHandler}
                      className="cursor-pointer dropdown-item text-sm py-2 px-4 block w-full hover:bg-stone-200 border-t"
                    >
                      Logout
                    </p>
                  </ul>
                </div>
              </div>
            </div>
          ) : userInfo ? (
            <div className="flex justify-center">
              <div>
                <div className="dropdown relative">
                  <p
                    className="flex items-center justify-center font-semibold cursor-pointer w-28"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userInfo.name}
                    <FaChevronDown className="ml-1 text-sm" />
                  </p>
                  <ul
                    className="hidden dropdown-menu absolute bg-stone-50 z-50 py-2 text-left rounded-lg shadow-lg w-28"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li>
                      <Link
                        to="/profile"
                        className="dropdown-item text-sm py-2 px-4 block w-full hover:bg-stone-200"
                      >
                        Profile
                      </Link>
                    </li>
                    <p
                      onClick={logoutHandler}
                      className="cursor-pointer dropdown-item text-sm py-2 px-4 block w-full hover:bg-stone-200 border-t"
                    >
                      Logout
                    </p>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center font-semibold ml-8"
            >
              <FaUser />
              <span className="ml-2">Login</span>
            </NavLink>
          )}
        </div>
        <button
          className="md:hidden p-1 rounded-lg"
          onClick={() => setToggleActive(!toggleActive)}
        >
          <GiHamburgerMenu className="text-2xl pointer-events-none" />
        </button>
      </div>
      {toggleActive && (
        <div className="flex flex-col items-end justify-between absolute top-full right-0 z-50 bg-stone-50 w-full py-4 px-8 border-t border-stone-300 shadow-md">
          <NavLink to="/" className="flex items-center font-semibold ml-8 my-4">
            <FaHome />
            <span className="ml-2">Home</span>
          </NavLink>
          <NavLink
            to="/store"
            className="flex items-center font-semibold ml-8 my-4"
          >
            <FaStoreAlt />
            <span className="ml-2">Store</span>
          </NavLink>
          <NavLink
            to="/cart"
            className="flex items-center font-semibold ml-8 my-4"
          >
            <FaShoppingCart />
            <span className="ml-2">Cart</span>
          </NavLink>
          {userInfo ? (
            <div>
              <NavLink
                to="/profile"
                className="flex items-center font-semibold ml-8 my-4"
              >
                <FaUser />
                <span className="ml-2">Profile</span>
              </NavLink>
              <div className="w-full font-semibold flex items-center justify-end my-4">
                <MdLogout />
                <p className="ml-2 cursor-pointer" onClick={logoutHandler}>
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="flex items-center font-semibold ml-8"
            >
              <FaUser />
              <span className="ml-2">Login</span>
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
