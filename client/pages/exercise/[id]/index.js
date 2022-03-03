import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import YouTube from "react-youtube";
var getYouTubeID = require("get-youtube-id");
import Link from "next/link";
import Verify from "../../HOC/Verify";
import Nav from "@components/AppHeader/InfoHeader";
const exerciseInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [url, setUrl] = useState();
  const [title, setTitle] = useState("");
  const [targetMuscle, settargetMuscle] = useState("");
  const [exetype, setexetype] = useState("");
  const [equipment, setequipment] = useState("");
  const [mechanics, setmechanics] = useState("");
  const [force, setforce] = useState("");
  const exerciseData = async () => {
    try {
      const body = { id };
      const response = await fetch("http://localhost:5000/dashboard/exercise", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
        // ? converting object to json
      });

      const parseRes = await response.json();
      settargetMuscle(parseRes.target_muscle);
      setexetype(parseRes.exercise_type);
      setequipment(parseRes.equipment_required);
      setmechanics(parseRes.mechanics);
      setforce(parseRes.force_type);
      setTitle(parseRes.exercise_name);
      let ytd_id = getYouTubeID(parseRes.url);
      setUrl(ytd_id);
      console.log(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    exerciseData();
  });
  const opts = {
    height: "290",
    width: "400",
    playerVars: {
      // ? 0 means Autoplay ON and 1 means off
      autoplay: 1,
    },
  };
  return (
    <div>
      <Nav title={title} />
      <div className="flex mt-3 flex-wrap justify-center overflow-x-auto">
        <YouTube videoId={url} opts={opts} />
      </div>
      <div className="md:flex md:flex-col my-4 md:pb-5 md:items-center">
        <div className="h-fitcontent md:w-8/12 md:py-3 py-2 border-4 border-t-back bg-navcolor rounded-3xl drop-shadow-2xl md:mt-11">
          <h1 className="text-xl font-bold mt-3 px-10 text-center ">
            Exercise Profile
          </h1>
          <div className="">
            <div className="py-6 md:py-5 px-10">
              <p className="text-lg ">Exercise name : {title}</p>
              <p className="text-lg ">Target Muscle Group : {targetMuscle}</p>
              <p className="text-lg ">Exercise Type : {exetype}</p>
              <p className="text-lg ">Equipment Required : {equipment} </p>
              <p className="text-lg ">Mechanics : {mechanics} </p>
              <p className="text-lg ">Force Type : {force} </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bg-primaryButton p-1 z-10 px-4 rounded-xl bottom-0 right-0 m-3">
        <Link href="/exercise">
          <a className="text-white">Go Back</a>
        </Link>
      </div>
    </div>
  );
};

export default Verify(exerciseInfo);
