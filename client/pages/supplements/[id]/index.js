import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Nav from "@components/AppHeader/InfoHeader";
const supplementsInfo = () => {
  const [company, setcompany] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [tips, settips] = useState("");
  const [energy, setenergy] = useState("");
  const [protien, setprotien] = useState("");
  const [carbs, setcarbs] = useState("");
  const [fat, setfat] = useState("");
  const [url, seturl] = useState("");
  const router = useRouter();
  const { id } = router.query;
  const supplementData = async () => {
    try {
      const body = { id };
      const response = await fetch(
        "http://localhost:5000/dashboard/supplement",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
          // ? converting object to json
        }
      );

      const parseRes = await response.json();
      console.log(parseRes);
      setcompany(parseRes.company);
      seturl(parseRes.image_url);
      setname(parseRes.supplement_name);
      setdescription(parseRes.description);
      settips(parseRes.tips);
      setenergy(parseRes.energy);
      setprotien(parseRes.protein);
      setcarbs(parseRes.carbs);
      setfat(parseRes.fat);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    supplementData();
  });
  return (
    <div>
      <Nav title={name} />
      <div className="flex flex-col items-center">
        <div className="flex px-5 mt-5 rounded-3xl drop-shadow-2xl flex-col align-middle  bg-white">
          <div className="flex my-3  justify-center">
            <img
              className="rounded-lg"
              src={url}
              height="400px"
              width="400px"
            ></img>
          </div>
        </div>
      </div>
      <div className="md:flex md:flex-col my-4 md:pb-5 md:items-center">
        <div className="h-fitcontent md:w-8/12 md:py-3 py-2 border-4 border-t-back bg-navcolor rounded-3xl drop-shadow-2xl md:mt-11">
          <h1 className="text-xl font-bold mt-3 px-10 text-center ">
            Supplement Profile
          </h1>

          <div className="">
            <div className="py-6 md:py-5 px-10">
              <p className="text-lg">
                Supplement name : <u>{name}</u>
              </p>
              <p className="text-lg ">Company : {company}</p>
              <p className="text-lg ">Description : {description}</p>
              <p className="text-lg ">Tips : {tips}</p>
              <p className="text-lg ">Energy : {energy}</p>
              <p className="text-lg ">Protien : {protien}</p>
              <p className="text-lg ">Carbs : {carbs}</p>
              <p className="text-lg ">Fat : {fat}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bg-primaryButton p-1 z-10 px-4 rounded-xl bottom-0 right-0 m-3">
        <Link href="/supplements">
          <a className="text-white">Go Back</a>
        </Link>
      </div>
    </div>
  );
};

export default supplementsInfo;
