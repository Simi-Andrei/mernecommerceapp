import React from "react";
import { NavLink } from "react-router-dom";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <div className="border w-[17rem] mb-4 mr-4 bg-white shadow-md">
      <NavLink to={`/store/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-60 object-cover"
        />
      </NavLink>
      <div className="h-16 flex items-start justify-start border-b mx-2 py-2">
        <NavLink to={`/store/product/${product._id}`}>
          <p className="hover:underline font-normal">{product.name}</p>
        </NavLink>
      </div>
      <div className="m-2">
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </div>
      <div className="flex items-center justify-between">
        <p className="my-3 mx-2 text-2xl font-semibold">${product.price}</p>
      </div>
    </div>
  );
};

export default Product;
