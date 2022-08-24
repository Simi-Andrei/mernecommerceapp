import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  FaChevronLeft,
  FaShoppingCart,
  FaRegHeart,
  FaInfoCircle,
} from "react-icons/fa";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Title from "../components/Title";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ProductPage = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const { success: successProductReview, error: errorProductReview } =
    useSelector((state) => state.productReviewCreate);

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(params.id));
  }, [dispatch, params.id, successProductReview]);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <div>
      <div className="border-b">
        <div className="p-4">
          <Link to="/store" className="flex items-center w-36">
            <FaChevronLeft />
            <span className="ml-1">Back to products</span>
          </Link>
        </div>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error text="Product not found">{error}</Error>
        ) : (
          <div className="flex items-start justify-between m-2">
            <div className="w-1/3 p-2 flex items-center justify-center">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="w-1/3 p-2 flex flex-col items-end justify-center text-right">
              <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
              <div className="mb-4">
                <Rating
                  text={`${product.numReviews} reviews`}
                  value={product.rating}
                />
              </div>
              <p className="text-2xl mb-4">${product.price}</p>
              <p className="font-semibold mt-2">Description</p>
              <p className="">{product.description}</p>
            </div>
            <div className="w-1/4 p-2 flex items-center justify-center">
              <div className="w-full border p-2">
                <div className="flex items-center justify-between py-2 border-b">
                  <p>Price:</p>
                  <p>${product.price}</p>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <p>Status:</p>
                  {product.countInStock > 0 ? (
                    <p>In stock</p>
                  ) : (
                    <p>Out of stock</p>
                  )}
                </div>
                {product.countInStock > 0 && (
                  <div className="flex items-center justify-between py-2 border-b">
                    <p>Quantity:</p>
                    <select
                      className="bg-stone-100 w-14 cursor-pointer rounded-xl border border-stone-300"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center py-2">
                  <button
                    onClick={addToCartHandler}
                    className="bg-stone-800 text-stone-200 flex items-center justify-center py-2 w-full rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600 mb-2"
                    disabled={product.countInStock === 0}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to cart
                  </button>
                  <button className="bg-stone-100 text-stone-900 flex items-center justify-center py-2 w-full rounded hover:bg-stone-200 transition-all duration-200 border border-stone-300">
                    <FaRegHeart className="mr-2" />
                    Add to favourites
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <Title text="Reviews" />
        {errorProductReview && <Error text={errorProductReview} />}
        <div className="p-4">
          <p className="text-lg mb-4">Leave a review!</p>
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <div>
                <label htmlFor="rating"></label>
                <select
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="select select-sm select-bordered w-full max-w-xs"
                >
                  <option value="">Select rating</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very good</option>
                  <option value="5">5 - Excellent</option>
                </select>
              </div>
              <div className="mt-4">
                <label htmlFor="comment"></label>
                <textarea
                  id="comment"
                  className="textarea w-full max-w-xs"
                  placeholder="Leave your comment here"
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-stone-800 text-stone-200 py-2 text-sm px-4 mt-2 rounded hover:bg-stone-900 transition-all duration-200 disabled:bg-stone-600 mb-2"
              >
                Submit review
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-start">
              <FaInfoCircle className="text-red-800 mr-2 text-sm" />
              <p className="text-red-800 italic">
                Please login to leave a review
              </p>
            </div>
          )}
        </div>
        <div className="m-2 p-2">
          {product.reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            <div>
              {product.reviews.map((review) => (
                <div key={review._id} className="p-2 border-b last:border-b-0">
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p className="italic">"{review.comment}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ToastContainer style={{ "margin-top": "4rem" }} />
    </div>
  );
};

export default ProductPage;
