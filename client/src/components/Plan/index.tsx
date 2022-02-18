import React from "react";
import { Button } from "antd";
const index = () => {
  return (
    <div>
      <div className="flex mt-5 px-5 rounded-3xl drop-shadow-2xl flex-col h-fit w-80  md:w-96 align-middle  bg-white">
        <p className="text-black mt-4 text-lg md:text-2xl text-center">
          BIO-Grow Mass
        </p>
        <p className="text-black text-lg md:text-lg ">BIO-Gro Mass</p>
        <p className="text-black text-lg md:text-lg ">Duration: 4 Weeks</p>
        <p className="text-black text-lg md:text-lg ">Type: Bulking</p>
        <p className="text-black text-lg md:text-lg ">Working days: 5 days</p>
        <p className="text-black text-lg md:text-lg ">Premium: Yes</p>
        <div className="flex mb-5 justify-end">
          <a className="px-4">Preview</a>
          <Button
            size="middle"
            style={{
              backgroundColor: "#607fe8",
              borderRadius: "10px",
              boxShadow: "1px 1px grey",
              color: "white",
              border: "none",
            }}
          >
            Learn more
          </Button>
        </div>
      </div>
    </div>
  );
};

export default index;
