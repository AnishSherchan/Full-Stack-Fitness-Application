import React, { useEffect, useState } from "react";
import Image from "next/image";
import Verify from "./HOC/Verify";
import PlanInfo from "../src/components/Plan";
import { Radio, Input, Carousel } from "antd";
import Nav from "../src/components/AppHeader/Header";
import Link from "next/link";
const plan = () => {
  const contentStyle = {
    height: "290px",
    color: "#fff",
    lineHeight: "290px",
    textAlign: "center",
  };
  const [goal, setusergoal] = useState("");

  const [exercises, setexercises] = useState([]);
  const [search, setSearch] = useState("");
  // ! User Information
  const getUserInformation = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/userinformation",
        {
          method: "get",
          headers: {
            token: localStorage.token,
          },
        }
      );
      const parseRes = await response.json();
      console.log(parseRes);
      setusergoal(parseRes.goal);
    } catch (error) {
      console.log(error.message);
    }
  };

  const SupplementInfo = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/plan", {
        method: "get",
      });
      const parseRes = await response.json();
      setexercises(parseRes);
      console.log(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const filteredexercise = exercises.filter((supplement) =>
    supplement.plan_name.toLowerCase().includes(search.toLowerCase())
  );

  const userGoal = async (selectedgoal) => {
    try {
      const body = { selectedgoal };
      const response = await fetch("http://localhost:5000/dashboard/usergoal", {
        method: "PUT",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const parseRes = await response.json();
    } catch (error) {
      console.log(error.message);
    }
  };
  const onChange = (e) => {
    setusergoal(e.target.value);
    userGoal(e.target.value);
  };
  useEffect(() => {
    getUserInformation();
    SupplementInfo();
  }, []);
  return (
    <div>
      <Nav buttons={false} verifyContent={true} CurrentPage={2} />
      <Carousel autoplay effect="fade">
        <div>
          <h3
            className="md:text-3xl grayscale bg-fixed bg-no-repeat bg-cover bg-top bg-[url('https://www.sportsnet.ca/wp-content/uploads/2017/07/jones_jon1280.jpg')] text-md  tracking-widest"
            style={contentStyle}
          >
            ❝ DON'T WISH FOR IT, WORK FOR IT ❞
          </h3>
        </div>
        <div>
          <h3
            className="md:text-3xl grayscale text-md bg-fixed bg-no-repeat bg-cover bg-top bg-[url('https://image-cdn.essentiallysports.com/wp-content/uploads/undertaker-wrestlemania.png')]  tracking-widest"
            style={contentStyle}
          >
            ❝ GO HARD or GO Hell ❞
          </h3>
        </div>
        <div>
          <h3
            className="md:text-3xl bg-fixed grayscale bg-no-repeat bg-cover bg-top  bg-[url('https://www.meme-arsenal.com/memes/f03f84c98ba62a8bb0ad8e62f8e400b6.jpg')] text-md  tracking-widest"
            style={contentStyle}
          >
            ❝ TRAIN INSANE OR REMAIN THE SAME ❞
          </h3>
        </div>
        <div>
          <h3
            className="md:text-3xl grayscale  text-md bg-fixed bg-no-repeat bg-cover bg-[url('https://i.ytimg.com/vi/NH-o9U8G7-4/maxresdefault.jpg')] bg-center  tracking-widest"
            style={contentStyle}
          >
            ❝ TRUST YOURSELF AND CONQUER ❞
          </h3>
        </div>
      </Carousel>
      <div className=" px-5 ">
        <h1 className="text-center heading text-3xl">Your Plans</h1>
        <div className="flex flex-wrap justify-around items-center mb-4">
          <div>
            <div className=" px-14 flex mt-5 py-3 border-2 ml-4 rounded-xl drop-shadow-2xl flex-col h-fit align-middle bg-neutral-100 ">
              <h1 className="text-xl mt-4">Change your plan </h1>
              <div className="flex my-3 justify-center">
                <Radio.Group
                  name="radiogroup"
                  onChange={onChange}
                  defaultValue={goal}
                >
                  <Radio value={"Fat Loss"}>Lose Weight</Radio>
                  <Radio value={"Get Fit"}>Get Fit</Radio>
                  <Radio value={"Build Muscle"}>Build Muscle</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>

          <div className="bg-primaryButton w-fit h-fit p-1 py-2 rounded-xl m-3">
            <Link href="/admin">
              <a className="text-white text-center text-lg px-7">
                Continue Your Current Plan
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="p-5 px-9">
        <div className=" md:flex md:flex-col md:pb-5 md:items-center">
          <div className="md:w-4/12">
            <Input
              size="large"
              style={{
                borderRadius: "10px",
              }}
              allowClear
              placeholder="Search Plan"
              onChange={handleChange}
            />
          </div>
        </div>

        {
          // ? wokrout plans components
        }
        <div className="flex flex-wrap justify-evenly">
          {filteredexercise.map((supplement) => {
            return (
              <Link href="/plan/[id]" as={`/plan/${supplement.plan_id}`}>
                <a className="cursor-default">
                  <PlanInfo
                    key={supplement.plan_id}
                    id={supplement.plan_id}
                    duration={supplement.plan_duration}
                    title={supplement.plan_name}
                    type={supplement.plan_type}
                    premium={supplement.permium}
                  />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Verify(plan);
