
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
    // const recepti = [
    //     {
    //       id: "1",
    //       ime: "Torta s narančom",
    //       kategorija: "desert",
    //       vrijeme: "45"
    //     },
    //     {
    //       id: "2",
    //       ime: "Mese",
    //       kategorija: "Glavno jelo",
    //       vrijeme: "5"
    //     },
    //     {
    //       id: "3",
    //       ime: "Bažulj sa zeljem",
    //       kategorija: "salata",
    //       vrijeme: "25"
    //     },
    //     {
    //       id: "4",
    //       ime: "Kesten pire",
    //       kategorija: "sok",
    //       vrijeme: "20"
    //     },
    //     {
    //       id: "5",
    //       ime: "Sok od naranče",
    //       kategorija: "Predjelo",
    //       vrijeme: "30"
    //     }
    //   ];

    return (
      <RecipeList headline={"Moji recepti"} recipes={recepti} />
    );
;}

export default MyRecipesDisplay;