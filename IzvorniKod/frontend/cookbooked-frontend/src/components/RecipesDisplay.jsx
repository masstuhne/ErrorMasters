
import { useState,useEffect } from "react";
import RecipeList from "./RecipeList";
import axios from 'axios';

function RecipesDisplay({link}) {
  useEffect(()=>{
    console.log(link);
    axios.get(link)
    .then(response =>{
        if (response.data) {
          let tmpRcipeList=response.data.map(recept=>({
              id : recept.id, ime:recept.title, kategorija:recept?.category?.name, vrijeme: recept.cookingTime}));
              console.log(tmpRcipeList)
              setRecpti(tmpRcipeList);
        } else {
          setRecpti('');
        }
      })
    .catch(err=>{
      console.log('nema recepata');
      setRecpti(null);
    })

  },[link])

  const [recepti,setRecpti] = useState([])

    return (
      <RecipeList headline={"Recepti"} recipes={recepti} />
    );
;}

export default RecipesDisplay;