import React from "react";

const Title = ({ text, className }) => {
  return (
    <div className="m-2 p-2">
      <h2
        className={`text-2xl inline-block font-light tracking-wide ${className}`}
      >
        {text}
      </h2>
    </div>
  );
};

export default Title;
