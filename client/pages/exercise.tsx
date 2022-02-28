import React, { useState, useEffect } from "react";
import { Input, Button } from "antd";
import Information from "../src/components/ExerciseInfo";
import Nav from "../src/components/AppHeader/Header";
import Verify from "./HOC/Verify";
const exercise = () => {
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
            <Information
              key={supplement.ex_id}
              id={supplement.ex_id}
              muscle={supplement.target_muscle}
              title={supplement.exercise_name}
              type={supplement.mechanics}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Verify(exercise);
