import React, { useState, useEffect } from "react";
import { Input, Carousel } from "antd";
import Image from "next/image";
import Link from "next/link";
import Information from "../src/components/ExerciseInfo";
import Nav from "../src/components/AppHeader/Header";
import Verify from "./HOC/Verify";
const exercise = () => {
  const contentStyle = {
    height: "290px",
    color: "#fff",
    lineHeight: "290px",
    textAlign: "center",
  };
  const [exercises, setexercises] = useState([]);
  const [search, setSearch] = useState("");
  const exercisesInfo = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/exercises",
        {
          method: "get",
        }
      );
      const parseRes = await response.json();
      setexercises(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredexercise = exercises.filter((supplement) =>
    supplement.exercise_name.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    exercisesInfo();
  }, []);

  return (
    <div>
      <Nav buttons={false} verifyContent={true} CurrentPage={3} />
      <div>
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
              className="md:text-3xl grayscale bg-fixed bg-no-repeat bg-cover bg-top bg-[url('https://firstsportz.com/wp-content/uploads/2022/01/CC_Express_20220113_1625160-1.jpg')] text-md  tracking-widest"
              style={contentStyle}
            >
              ❝ NOBODY CARES, WORK HARDER ❞
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
              onChange={handleChange}
            />
          </div>
        </div>
        {
          // ? boxes of exercise
        }
        {filteredexercise.map((supplement) => {
          return (
            <Link href="/exercise/[id]" as={`/exercise/${supplement.ex_id}`}>
              <a className="cursor-default">
                <Information
                  key={supplement.ex_id}
                  id={supplement.ex_id}
                  muscle={supplement.target_muscle}
                  title={supplement.exercise_name}
                  type={supplement.mechanics}
                />
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Verify(exercise);
