
import { useState,useEffect } from "react";
import RecipeList from "./RecipeList";
import axios from 'axios';
import parseJwt from "./parseJwt";

function MyRecipesDisplay(link) {
  useEffect(()=>{
    let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
    let userId=tokenPayload.id
    console.log(link)
    axios.get(link)
    .then(response =>{
        console.log(response);
        let tmpRcipeList=response.data.map(recept=>({
            id : recept.id, ime:recept.title, kategorija:recept?.category?.name, vrijeme: recept.cookingTime}));
            console.log(recept);
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

export default MyRecipesDisplay;