import React from "react";
import { Button } from "antd";
interface Props {
  key: string;
  id: number;
  duration: string;
  title: string;
  type: string;
  workingDay: string;
  premium: string;
}
const index = ({ type, duration, title, id, premium }) => {
  const url1 =
    "https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  const url2 =
    "https://images.unsplash.com/photo-1580051745101-2dca6e53f15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80";
  const url3 =
    "https://images.unsplash.com/photo-1607914660217-754fdd90041d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  const url6 =
    "https://images.unsplash.com/photo-1556817411-58c45dd94e8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  return (
    <div>
      <div className="flex mt-5 px-5 rounded-3xl drop-shadow-2xl flex-col h-fit w-80  md:w-96 align-middle  bg-white">
        <div className="flex my-3 justify-center">
          {type == "Fat Loss" && (
            <img
              className="rounded-xl"
              src={url1}
              height="300px"
              width="300px"
            ></img>
          )}
          {type == "Stretching" && (
            <img
              className="rounded-xl"
              src={url3}
              height="300px"
              width="300px"
            ></img>
          )}
          {type == "Build Muscle" && (
            <img
              className="rounded-xl"
              src={url6}
              height="300px"
              width="300px"
            ></img>
          )}
          {type == "Get Fit" && (
            <img
              className="rounded-xl"
              src={url2}
              height="300px"
              width="300px"
            ></img>
          )}
        </div>
        <p className="text-black text-md md:text-2xl text-center">{title}</p>
        <p className="text-black text-lg md:text-lg ">
          Duration: {duration} Weeks
        </p>
        <p className="text-black text-lg md:text-lg ">Type: {type}</p>

        <p className="text-black text-lg md:text-lg ">
          {premium == "Yes" && "Premium Plan"}{" "}
        </p>
        <div className="flex mb-5 justify-end">
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
            View Workout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default index;
