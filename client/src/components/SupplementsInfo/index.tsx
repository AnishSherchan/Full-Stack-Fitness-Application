import React from "react";
import Image from "next/image";
const index = () => {
  return (
    <div>
      <div className="flex mt-5 rounded-3xl drop-shadow-2xl flex-col h-96 w-80 md:h-96 md:w-96 align-middle  bg-white">
        <div className="flex my-3  justify-center">
          <img
            className="rounded-xl"
            src="https://s1.thcdn.com/productimg/1600/1600/11730725-4624935067318992.jpg"
            height="300px"
            width="300px"
          ></img>
        </div>
        <p className="text-black text-lg md:text-lg text-center">
          Impact Whey isolate <a>Get Info</a>{" "}
        </p>
      </div>
    </div>
  );
};

export default index;
