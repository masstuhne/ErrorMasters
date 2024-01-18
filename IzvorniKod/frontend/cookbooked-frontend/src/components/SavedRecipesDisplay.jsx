import { useState,useEffect } from "react";
import axios from 'axios';
import RecipeList from "./RecipeList";


const API_BASE_URL = import.meta.env.VITE_API_URL;

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
    axios.get(API_BASE_URL + '/users/'+userId+'/bookmarked-recipes',{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
            
          },
    })
    .then(response =>{
      
      let recpeIdList=[...new Set(response.data.map(item => item?.recipe?.id))]
      const fetchRecepies= async(recept_id) =>{        
        try {
          let tmpReceptList = [];
      
          await Promise.all(
            recept_id.map(async (id) => {
              try {
                const response = await axios.get(
                  API_BASE_URL + '/recipes/' + id
                );
      
                tmpReceptList.push({
                  id: response.data?.id,
                  ime: response.data?.title,
                  kategorija: response.data?.category?.name,
                  vrijeme: response.data?.cookingTime,
                });
              } catch (error) {
                console.error(`Error fetching data for id ${id}:`, error);
                
              }
            })
          );
      
          console.log(tmpReceptList);
          setRecipes(tmpReceptList);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      }
      fetchRecepies(recpeIdList)
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
      <RecipeList headline={"Spremljeni recepti"} recipes={recipes} />
    );
;}

export default SavedRecipesDisplay;