import { useState,useEffect } from "react";
import axios from 'axios';
import RecipeList from "./RecipeList";


function SavedRecipesDisplay() {

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  useEffect(()=>{
    let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
    let userId=tokenPayload.id
    axios.get('http://localhost:8080/api/v1/users/'+userId+'/bookmarked-recipes',{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
            
          },
    })
    .then(response =>{
      let tmpRcipeList=response.data.map(recept=>({
        id : recept.id, ime:recept.title, kategorija:recept?.category?.name, vrijeme: recept.cookingTime}))
        setRecipes(tmpRcipeList)
    })
    .catch(err=>{
        console.error('Error fetching data:', err);
    })

},[])
  const [recipes,setRecipes] = useState([])
    const recepti = [
        {
          id: "1",
          ime: "Torta s narančom",
          kategorija: "desert",
          vrijeme: "45"
        },
        {
          id: "2",
          ime: "Mese",
          kategorija: "Glavno jelo",
          vrijeme: "5"
        },
        {
          id: "4",
          ime: "Kesten pire",
          kategorija: "sok",
          vrijeme: "20"
        },
        {
          id: "5",
          ime: "Sok od naranče",
          kategorija: "Predjelo",
          vrijeme: "30"
        }
      ];

    return (
      <RecipeList headline={"Spremljeni recepti"} recipes={recepti} />
    );
;}

export default SavedRecipesDisplay;