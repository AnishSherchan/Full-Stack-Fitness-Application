import React from "react";
import Image from "next/image";
const index = () => {
  return (
    <div>
      <div className="flex mt-5 rounded-3xl drop-shadow-2xl flex-col h-80 w-80 md:h-96 md:w-96 align-middle  bg-white">
        <Image
          className=""
          src="/icons/Protien.svg"
          alt="Protien"
          width={406}
          height={370}
        />
        <p className="text-black text-lg md:text-lg text-center">
          On Whey <a>Get Info</a>{" "}
        </p>
      </div>
    </div>
  );
};

export default index;
