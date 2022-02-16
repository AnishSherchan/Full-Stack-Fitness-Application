import React from "react";
import { Input, Button } from "antd";
import Verify from "./HOC/Verify";
import SupInfo from "../src/components/SupplementsInfo";
import Nav from "../src/components/AppHeader/Header";
const supplements = () => {
  return (
    <div>
      <Nav buttons={false} verifyContent={true} CurrentPage={4} />
      <div className="p-5">
        <div className=" md:flex md:flex-col md:pb-5 md:items-center">
          <h1 className="md:text-3xl text-center text-2xl heading">
            Supplements
          </h1>
          <div className="md:w-4/12">
            <Input
              size="large"
              style={{
                borderRadius: "10px",
              }}
              allowClear
              placeholder="Search Suppliment"
            />
          </div>
        </div>

        {
          // ? Supplements Content
        }
        <div className="flex flex-wrap justify-evenly">
          <SupInfo />
          <SupInfo />
          <SupInfo />
          <SupInfo />
          <SupInfo />
          <SupInfo />
        </div>
      </div>
    </div>
  );
};

export default Verify(supplements);
