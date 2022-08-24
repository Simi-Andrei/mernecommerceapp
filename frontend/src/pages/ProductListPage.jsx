import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, products } = useSelector(
    (state) => state.productList
  );

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = useSelector((state) => state.productDelete);

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector((state) => state.productCreate);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
  ]);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <Title text="Products" />
      <div className="p-4">
        <button
          className="bg-stone-800 text-stone-200 flex items-center justify-center py-2 px-4 rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600 mb-2"
          onClick={createProductHandler}
        >
          <FaPlus className="mr-2" />
          Add product
        </button>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Error text={errorDelete} />}
      {loadingCreate && <Loader />}
      {errorCreate && <Error text={errorCreate} />}
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
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button className="mr-2">
                        <FaEdit className="text-blue-500" />
                      </button>
                    </Link>
                    <button
                      className="ml-2"
                      onClick={() => deleteHandler(product._id)}
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

export default ProductListPage;
