import React from "react";
import { Button } from "antd";
const index = () => {
  return (
    <div className="md:px-32">
      <div className="flex rounded-3xl mt-9 drop-shadow-2xl flex-wrap h-20 md:h-32  items-center justify-evenly bg-dark">
        <p className="text-white md:text-lg ">Skull Crushes</p>
        <p className="text-white md:text-lg">Target Area: Triceps</p>
        <p className="hidden md:block text-white md:text-lg">Type: Compound</p>
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
  );
};

export default index;
