import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import heroSlider1 from "../images/heroSlider1.jpg";
import heroSlider2 from "../images/heroSlider2.jpg";
import heroSlider3 from "../images/heroSlider3.jpg";
import heroSlider4 from "../images/heroSlider4.jpg";
import "@splidejs/react-splide/css";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="flex items-center justify-between">
        <div className="w-1/2 p-2 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-semibold">Welcome to shoppy!</h1>
          <p className="font-semibold mt-6 italic">
            Best quality products, gadgets, accessories and many more at
            cheapest prices on the market.
          </p>
        </div>
        <div className="container m-2 w-1/2">
          <Splide
            options={{
              perPage: "1",
              pagination: false,
              arrows: true,
            }}
          >
            <SplideSlide className="relative">
              <img src={heroSlider1} alt="carousel1" />
              <div className="bg-black absolute w-full h-full top-0 left-0 opacity-10"></div>
            </SplideSlide>
            <SplideSlide>
              <img src={heroSlider2} alt="carousel2" />
              <div className="bg-black absolute w-full h-full top-0 left-0 opacity-10"></div>
            </SplideSlide>
            <SplideSlide>
              <img src={heroSlider3} alt="carousel3" />
              <div className="bg-black absolute w-full h-full top-0 left-0 opacity-10"></div>
            </SplideSlide>
            <SplideSlide>
              <img src={heroSlider4} alt="carousel4" />
              <div className="bg-black absolute w-full h-full top-0 left-0 opacity-10"></div>
            </SplideSlide>
          </Splide>
        </div>
      </div>
      <div className="w-full m-2 p-2">
        <p className="text-center font-logo text-2xl text-stone-50 bg-stone-900 py-2 rounded-3xl">
          Discover the best gadgets at cheapest prices!
        </p>
      </div>
    </div>
  );
};

export default HomePage;
