import React from "react";
import Image from "next/image";
const Header = () => {
  return (
    <div className="  h-24 flex flex-row flex-wrap justify-between z-10 sticky top-0 left-0 right-0 bg-white">
      <div className="px-5">
        <Image
          className=""
          src="/icons/Logo.svg"
          alt="Logo"
          width={280}
          height={90}
        />
      </div>
      <div className="flex flex-row pl-28 w-1/3">
        <button className="px-5">
          <p className="text-xl font-normal">Login</p>
        </button>
        <div className="flex flex-row px-3 justify-center items-center ">
          <p className=" cursor-pointer font-normal text-xl border-2 rounded-3xl border-gray-400 py-2 px-3 ">
            Sign Up
          </p>
        </div>
      </div>
    </div>
  );
};
export default Header;
