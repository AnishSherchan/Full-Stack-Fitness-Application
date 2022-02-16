import React from "react";
import { Input, Button } from "antd";
import Information from "../src/components/ExerciseInfo";
import Nav from "../src/components/AppHeader/Header";
import Verify from "./HOC/Verify";
const exercise = () => {
  return (
    <div>
      <Nav buttons={false} verifyContent={true} CurrentPage={3} />
      <div className="p-8">
        <div className=" md:flex md:flex-col md:pb-5 md:items-center">
          <div className="md:w-4/12">
            <Input
              size="large"
              style={{
                borderRadius: "10px",
              }}
              allowClear
              placeholder="Search Exercise"
            />
          </div>
        </div>
        {
          // ? boxes of exercise
        }
        <Information />
        <Information />
        <Information />
      </div>
    </div>
  );
};

export default Verify(exercise);
