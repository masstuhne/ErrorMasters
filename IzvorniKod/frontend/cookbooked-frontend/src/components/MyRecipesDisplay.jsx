
import { useState,useEffect } from "react";
import RecipeList from "./RecipeList";
import axios from 'axios';
import parseJwt from "./parseJwt";

function MyRecipesDisplay() {

  useEffect(()=>{
    let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
    let userId=tokenPayload.id
    console.log(userId)
    axios.get('http://localhost:8080/api/v1/users/'+userId+'/recipes')
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