import React from "react";
import classes from "./AvailableMeal.module.css";
import Card from "../UI/Card.js";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Sushi",
    description: "Finest fish and veggies",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Schnitzel",
    description: "A german specialty!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Barbecue Burger",
    description: "American, raw, meaty",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Green Bowl",
    description: "Healthy...and green...",
    price: 18.99,
  },
];
const AvailableMeal = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError,setHttpError]=useState()
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-app-8089e-default-rtdb.firebaseio.com/meals.json"
      );

      if(!response.ok){
        throw new Error('Something went wrong!!');
      }
      const responseData = await response.json();
      console.log(responseData);

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchMeals().catch((error)=>{
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);



  if(isLoading){
    return(
      <section className={classes.MealIsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(httpError){
    return (
      <section className={classes.MealError}>
        <h2>{httpError}</h2>
      </section>
    )
  }
  const mealsList = meals.map((data) => (
    <MealItem
      key={data.id}
      id={data.id}
      price={data.price}
      name={data.name}
      description={data.description}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeal;
