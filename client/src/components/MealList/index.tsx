import React from "react";
import Meal from "../Meal";

const MealList = ({ mealData }) => {
  const nutrients = mealData.nutrients;

  return (
    <main>
      <section className="nutrients">
        <h1 className="text-center text-2xl heading">Nutrition Data</h1>
        <p className="text-center text-lg">
          Calories: {nutrients.calories.toFixed(0)}, Carbohydrates:{" "}
          {nutrients.carbohydrates.toFixed(0)}, Fat: {nutrients.fat.toFixed(0)},
          Protein: {nutrients.protein.toFixed(0)}
        </p>
      </section>

      <div className="flex flex-wrap justify-evenly">
        {mealData.meals.map((meal) => {
          return <Meal key={meal.id} meal={meal} />;
        })}
      </div>
    </main>
  );
};
export default MealList;
