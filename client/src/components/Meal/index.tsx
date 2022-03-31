import React, { useState, useEffect } from "react";

const Meal = ({ meal }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=e47cf01d20ea4c1fb8adda3fd623b532&includeNutrition=false`
    )
      .then((response) => response.json())
      .then((data) => {
        setImageUrl(data.image);
      })
      .catch(() => {
        console.log("error");
      });
  }, [meal.id]);
  return (
    <div className="flex mt-3 rounded-3xl drop-shadow-2xl  flex-col w-80  md:w-96 align-middle  bg-white">
      <div className="flex my-3  justify-center ">
        <img
          src={imageUrl}
          className="rounded-xl"
          height="450px"
          width="350px"
          alt="recipe"
        />
        {/* <div
          style={{ backgroundColor: "#BBE8FA`" }}
          className="fixed p-1 my-4 mx-4 rounded-xl z-10 top-0 right-0 m-3"
        >
          <a className="text-black">Meal/Food</a>
        </div> */}
      </div>
      <h1 className="text-black text-lg md:text-2xl font-medium px-1 text-center">
        {meal.title}
      </h1>
      <ul className="text-gray-700 text-lg md:text-lg text-center">
        <li>Preparation time: {meal.readyInMinutes} minutes</li>
        <li>Number of servings: {meal.servings}</li>
      </ul>

      <a
        className=" text-lg md:text-lg text-right px-3 pb-2"
        href={meal.sourceUrl}
      >
        Go to Recipe
      </a>
    </div>
  );
};
export default Meal;
