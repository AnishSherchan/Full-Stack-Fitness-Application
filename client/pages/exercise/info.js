import React, { useState, useEffect } from "react";
import Nav from "../../src/components/AppHeader/InfoHeader";
import YouTube from "react-youtube";
import Link from "next/link";
var getYouTubeID = require("get-youtube-id");
import Image from "next/image";
const info = () => {
  const [id, setUrl] = useState("");
  useEffect(() => {
    setUrl(
      getYouTubeID(
        "https://www.youtube.com/watch?v=hbuhK4lq1J8&ab_channel=titotitos"
      )
    );
  }, []);

  const opts = {
    height: "290",
    width: "400",
    playerVars: {
      // ? 0 means Autoplay ON and 1 means off
      autoplay: 1,
    },
  };
  return (
    <div className="h-96">
      <Nav />
      {
        //   ? Content
      }
      <div className="p-5">
        <div className="flex flex-wrap justify-center overflow-x-auto">
          <YouTube videoId={id} opts={opts} />
        </div>
        <div className="md:flex md:flex-col my-4 md:pb-5 md:items-center">
          <div className="h-fitcontent md:w-8/12 md:py-3 py-2 border-4 border-t-back bg-navcolor rounded-3xl drop-shadow-2xl md:mt-11">
            <h1 className="text-xl font-bold mt-3 px-10 text-center ">
              Exercise Profile
            </h1>
            <div className="">
              <div className="py-6 md:py-5 px-10">
                <p className="text-lg ">Target Muscle Group: Triceps :</p>
                <p className="text-lg ">Exercise Type: Stregnth</p>
                <p className="text-lg ">Equipment Required Barbell</p>
                <p className="text-lg ">Mechanics Isolation </p>
                <p className="text-lg ">Force Type: Push </p>
                <p className="text-lg ">Secondary Muscles None</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bg-primaryButton p-1 px-4 rounded-xl bottom-0 right-0 m-3">
        <Link href="/exercise">
          <a className="text-white">Go Back</a>
        </Link>
      </div>
    </div>
  );
};

export default info;
