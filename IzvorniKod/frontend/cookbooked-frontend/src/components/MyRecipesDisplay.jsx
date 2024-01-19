
import { useState,useEffect } from "react";
import RecipeList from "./RecipeList";
import axios from 'axios';
import parseJwt from "./parseJwt";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function MyRecipesDisplay() {

  useEffect(()=>{
    let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
    let userId=tokenPayload.id
    console.log(userId)
    axios.get(API_BASE_URL + '/users/'+userId+'/recipes')
    .then(response =>{
        
        let tmpRcipeList=response.data.map(recept=>({
          id : recept.id, ime:recept.title, kategorija:recept?.category?.name, vrijeme: recept.cookingTime}))
          setRecpti(tmpRcipeList)
    })
    .catch(err=>{
      console.log('nema recepata');
    })

},[])

  const [recepti,setRecpti] = useState([])

    return (
      <RecipeList headline={"Moji recepti"} recipes={recepti} />
    );
;}

export default MyRecipesDisplay;