import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaChevronLeft } from "react-icons/fa";
import Title from "../components/Title";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

const ProductEditPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.productUpdate);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(listProductDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, id, navigate, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: id,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="p-4">
        <Link to="/admin/productlist" className="flex items-center w-36">
          <FaChevronLeft />
          <span className="ml-1">Back to products</span>
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <Title text="Edit product" className="text-center" />
        {loadingUpdate && <Loader />}
        {errorUpdate && <Error text={errorUpdate} />}
        {loading ? (
          <Loader />
        ) : error ? (
          <Error text={error} />
        ) : (
          <div className="m-2 flex items-center justify-center">
            <form
              className="border border-stone-500 rounded-lg m-2 p-10 flex items-start justify-center"
              onSubmit={submitHandler}
            >
              <div className="mx-10">
                <div className="flex flex-col items-start justify-center mb-3">
                  <label
                    htmlFor="name"
                    className="tracking-wider mb-2 font-semibold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-64 py-2 px-2 border-l border-stone-500"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-start justify-center mb-3">
                  <label
                    htmlFor="price"
                    className="tracking-wider mb-2 font-semibold"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="w-64 py-2 px-2 border-l border-stone-500"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-start justify-center mb-3">
                  <label
                    htmlFor="image"
                    className="tracking-wider mb-2 font-semibold"
                  >
                    Image
                  </label>
                  <input
                    type="text"
                    id="image"
                    className="w-64 py-2 px-2 border-l border-stone-500"
                    placeholder="Enter image url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </div>
                <div className="flex flex-col items-start justify-center mb-3">
                  <label
                    htmlFor="imageFile"
                    className="tracking-wider mb-2 font-semibold"
                  >
                    Choose Image
                  </label>
                  <input
                    type="file"
                    id="imageFile"
                    className="w-64 py-2 px-2 border-l border-stone-500"
                    onChange={uploadFileHandler}
                  />
                </div>
                {uploading && <Loader />}
                <div className="flex flex-col items-start justify-center mb-3">
                  <label
                    htmlFor="brand"
                    className="tracking-wider mb-2 font-semibold"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    className="w-64 py-2 px-2 border-l border-stone-500"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>

                <div className="flex flex-col items-start justify-center mb-3">
                  <label
                    htmlFor="countInStock"
                    className="tracking-wider mb-2 font-semibold"
                  >
                    Count in stock
                  </label>
                  <input
                    type="number"
                    id="countInStock"
                    className="w-64 py-2 px-2 border-l border-stone-500"
                    placeholder="Enter count in stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </div>
              </div>
              <div className="mx-10">
                <div className="flex flex-col items-start justify-center mb-3">
                  <label
                    htmlFor="category"
                    className="tracking-wider mb-2 font-semibold"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    className="w-64 py-2 px-2 border-l border-stone-500"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="flex flex-col items-start justify-center mb-3">
                  <label
                    htmlFor="description"
                    className="tracking-wider mb-2 font-semibold"
                  >
                    Description
                  </label>
                  <textarea
                    rows={6}
                    type="text"
                    id="description"
                    className="w-64 py-2 px-2 border-l border-stone-500"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <button
                  className="bg-stone-800 text-stone-200 py-2 w-64 rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600 mt-2"
                  type="submit"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductEditPage;
