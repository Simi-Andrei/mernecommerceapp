import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/store/search/${keyword}`);
    } else {
      navigate("/store");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search"
        className="input input-sm input-bordered w-50"
      />
      <button
        type="submit"
        className="bg-stone-800 text-stone-200 py-2 px-4 hover:bg-stone-900 rounded-sm transition-all duration-200"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default Search;
