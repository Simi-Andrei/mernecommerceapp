import React from "react";
import { BiError } from "react-icons/bi";

const Error = ({ text }) => {
  return (
    <div className="w-full p-2 flex items-center justify-center">
      <BiError className="text-2xl text-red-700" />
      <p className="ml-2 font-semibold tracking-wide text-lg text-red-700">
        {text}
      </p>
    </div>
  );
};

export default Error;
