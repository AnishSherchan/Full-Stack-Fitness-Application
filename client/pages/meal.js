import React, { useState, useEffect } from "react";
import MealList from "../src/components/MealList";
import Nav from "../src/components/AppHeader/Header.tsx";
import Verify from "./HOC/Verify";
import { Carousel, Input } from "antd";
const Meal = () => {
  const [mealData, setMealData] = useState(null);
  const [calories, setCalories] = useState(2000);
  const contentStyle = {
    height: "260px",
    color: "#fff",
    lineHeight: "260px",
    textAlign: "center",
  };

  function getMealData() {
    fetch(
      `https://api.spoonacular.com/mealplanner/generate?apiKey=e47cf01d20ea4c1fb8adda3fd623b532&timeFrame=day&targetCalories=${calories}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMealData(data);
      })
      .catch(() => {
        console.log("error");
      });
  }

  function handleChange(e) {
    setCalories(e.target.value);
  }

  useEffect(() => {
    getMealData();
  }, []);

  return (
    <div className="App pb-4">
      <Nav buttons={false} verifyContent={true} CurrentPage={5} />
      <Carousel autoplay effect="fade">
        <div className="">
          <h3
            className="md:text-3xl bg-fixed bg-no-repeat bg-cover bg-top bg-[url('https://wallpaperaccess.com/full/1916281.jpg')] text-md  tracking-widest"
            style={contentStyle}
          >
            ❝ One must eat to live, not live to eat. ❞
          </h3>
        </div>
        <div>
          <h3
            className="md:text-3xl  text-md bg-fixed bg-no-repeat bg-cover bg-center bg-[url('https://wallpaperaccess.com/full/826919.jpg')]  tracking-widest"
            style={contentStyle}
          >
            ❝ Your goals, minus your doubts, equal your reality. ❞
          </h3>
        </div>
      </Carousel>
      <div>
        <h1 className="text-center heading text-3xl tracking-widest font-bold text-primaryButton">
          DIET GUIDES
        </h1>
        <h1 className="text-xl tracking-wide text-center heading ">
          <span className="text-gray-700">
            Confused about what diet you should follow? 😕
          </span>
          <> </>Our guides provides and helps <br></br> in choosing a diet style
          that best suits your goals, food preferences and lifestyle.
        </h1>
      </div>
      <div>
        <h1 className="text-center mt-7 heading tracking-wider text-3xl ">
          ~ 🥗 Daily Meal Plan Based on Calories 🥪 ~
        </h1>
        <section className="controls">
          <div className=" md:flex md:flex-col md:pb-5 md:items-center">
            <div className="md:w-7/12 flex">
              <Input
                size="large"
                style={{
                  borderRadius: "10px",
                }}
                allowClear
                placeholder="2000 Calories"
                onChange={handleChange}
              />
              <button
                className=" bg-primaryButton text-white rounded-xl text-lg  px-6 mx-3 "
                onClick={getMealData}
              >
                Get Meal Plan
              </button>
            </div>
          </div>
        </section>
        {mealData && <MealList mealData={mealData} />}
      </div>
    </div>
  );
};

export default Verify(Meal);
