import React from "react";
import Image from "next/image";
import Verify from "./HOC/Verify";
import PlanInfo from "../src/components/Plan";
import { Radio, Input } from "antd";
import Nav from "../src/components/AppHeader/Header";
const plan = () => {
  return (
    <div>
      <Nav buttons={false} verifyContent={true} CurrentPage={2} />
      <div>
        <Image
          className=""
          src="/icons/PlansWall.svg"
          alt="Protien"
          width={1540}
          height={645}
        />
      </div>
      <div className="p-5 px-9 ">
        <h1 className="text-center text-lg">Your Plans</h1>
        <div>
          <h1 className="text-lg">Change your plan </h1>
          <Radio.Group name="radiogroup" defaultValue={1}>
            <Radio value={1}>Lose Weight</Radio>
            <Radio value={2}>Get Toned</Radio>
            <Radio value={3}>Build Muscle</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-dark p-5 px-9">
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
          // ? wokrout plans components
        }
        <div className="flex flex-wrap justify-evenly">
          <PlanInfo />
          <PlanInfo />
          <PlanInfo />
          <PlanInfo />
        </div>
      </div>
    </div>
  );
};

export default Verify(plan);
