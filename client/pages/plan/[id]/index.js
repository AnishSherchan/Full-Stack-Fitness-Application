import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Verify from "../../HOC/Verify";
import { Carousel } from "antd";
import Nav from "../../../src/components/AppHeader/Header";

const index = () => {
  const router = useRouter();
  const [planName, setPlanName] = useState("");
  const [goal, setGoal] = useState("");
  const [duraton, setDuration] = useState("");
  const [workingdays, setWorkingdays] = useState("");
  const [gender, setGender] = useState("");
  const [url, setUrl] = useState("");
  const [currentPlan, setcurrentPlan] = useState(0);
  const [plan_id, setPlanid] = useState(0);
  const { id } = router.query;
  const contentStyle = {
    height: "290px",
    color: "#fff",
    lineHeight: "290px",
    textAlign: "center",
  };

  const SelectPlan = async () => {
    let plan_id = id;
    try {
      const body = { plan_id };
      const response = await fetch("http://localhost:5000/dashboard/userPlan", {
        method: "POST",
        headers: {
          token: localStorage.token,
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
        // ? converting object to json
      });

      const parseRes = await response.json();
      if (parseRes) {
        toast.success("Plan Selected Successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      }
      console.log(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };

  const IsCurrentPlan = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/userPlan", {
        method: "get",
        headers: {
          token: localStorage.token,
        },
      });
      const parseRes = await response.json();
      setcurrentPlan(parseRes.plan_id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const PlanData = async () => {
    try {
      const body = { id };
      const response = await fetch("http://localhost:5000/dashboard/specPlan", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
        // ? converting object to json
      });

      const parseRes = await response.json();
      setPlanName(parseRes.plan_name);
      setGoal(parseRes.plan_type);
      setDuration(parseRes.plan_duration);
      setWorkingdays(parseRes.working_days);
      setGender(parseRes.genders);
      setUrl(parseRes.url);
      console.log(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    PlanData();
    IsCurrentPlan();
  }, [id]);
  return (
    <div>
      <Nav buttons={false} verifyContent={true} CurrentPage={0} />
      <div>
        {" "}
        <Carousel autoplay effect="fade">
          <div>
            <h3
              className="md:text-3xl bg-fixed grayscale bg-no-repeat bg-cover bg-center bg-[url('https://www.gannett-cdn.com/presto/2021/04/25/USAT/e01a0394-b6b4-4aa0-8639-a79ec8ad8347-USATSI_15962526.jpg?width=2560')] text-md  tracking-widest"
              style={contentStyle}
            >
              ❝ TRUST YOURSELF AND CONQUER ❞
            </h3>
          </div>
          <div>
            <h3
              className="md:text-3xl grayscale bg-fixed bg-no-repeat bg-cover bg-top bg-[url('https://wallpapercave.com/wp/wp4664065.jpg')] text-md  tracking-widest"
              style={contentStyle}
            >
              ❝ TRAIN INSANE OR REMAIN THE SAME ❞
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
              className="md:text-3xl bg-fixed bg-no-repeat bg-cover bg-top bg-[url('https://wallpaperaccess.com/full/2079529.jpg')] text-md  tracking-widest"
              style={contentStyle}
            >
              ❝ NO PAIN NO GAIN ❞
            </h3>
          </div>
        </Carousel>
      </div>
      {
        // ? Contnt
      }

      <div className=" px-5 ">
        <h1 className="text-center heading mt-3 text-3xl">{planName}</h1>
        {currentPlan != id && (
          <div className="flex justify-end">
            <div className="bg-primaryButton w-fit h-fit p-1 py-2 rounded-xl m-3">
              <a
                onClick={SelectPlan}
                className="text-white text-center text-lg px-7"
              >
                Select Plan
              </a>
            </div>
          </div>
        )}
        <div className="md:flex md:flex-col my-4 md:pb-5 md:items-center">
          <div className="h-fitcontent md:w-8/12 md:py-3 py-2 border-4 border-t-back bg-navcolor rounded-3xl drop-shadow-2xl md:mt-11">
            <h1 className="text-2xl font-bold mt-3 px-10 text-center ">
              WORKOUT SUMMARY
            </h1>
            <div className="">
              <div className="py-6 md:py-5 px-10">
                <p className="text-lg ">Plan name : {planName} </p>
                <p className="text-lg ">Main Goal : {goal} </p>
                <p className="text-lg ">Program Duration : {duraton} weeks </p>
                <p className="text-lg ">Days Per Week : {workingdays} days </p>
                <p className="text-lg ">Target Gender : {gender} </p>
                <div className="flex items-center flex-wrap space-x-10">
                  <p className="text-lg flex align-middle">Workout PDF : </p>
                  <div className=" bg-blue-600 w-fit h-fit p-1 py-2 rounded-xl m-3">
                    <a
                      href={url}
                      target="_blank"
                      className="text-white text-center text-lg px-7"
                    >
                      Download Workout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify(index);
