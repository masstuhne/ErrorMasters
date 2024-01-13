
import { useState,useEffect } from "react";
import RecipeList from "./RecipeList";
import axios from 'axios';

function RecipesDisplay(link) {
  useEffect(()=>{
    console.log(link.link);
    axios.get(link.link)
    .then(response =>{
        let tmpRcipeList=response.data.map(recept=>({
            id : recept.id, ime:recept.title, kategorija:recept?.category?.name, vrijeme: recept.cookingTime}));
            console.log(tmpRcipeList)
            setRecpti(tmpRcipeList);
        })
    .catch(err=>{
      console.log('nema recepata');
    })

},[])

  const [recepti,setRecpti] = useState([])

    return (
      <RecipeList headline={"Recepti"} recipes={recepti} />
    );
;}

export default RecipesDisplay;