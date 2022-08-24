import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Product from "../components/Product";
import StoreCategories from "../components/StoreCategories";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { listProducts } from "../actions/productActions";
import Search from "../components/Search";

const StorePage = () => {
  const dispatch = useDispatch();

  const { keyword } = useParams();

  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      <Title text="Latest products" />
      <div className="m-2 p-2">
        <Search />
      </div>
      <div className="flex items-start justify-between m-2">
        <StoreCategories />
        <div className="w-11/12 m-2 flex flex-wrap items-start">
          {loading ? (
            <Loader />
          ) : error ? (
            <Error text={error} />
          ) : (
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
