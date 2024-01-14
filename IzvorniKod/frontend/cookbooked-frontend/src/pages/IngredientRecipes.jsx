import RecipesDisplay from "../components/RecipesDisplay";
import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

function MyRecipes() {

    const location = useLocation();
    const [queryParams, setQueryParams] = useState({});
    const [link, setLink] = useState('');

    useEffect(() => {
        // Parse and store query parameters when the location changes
        const params = new URLSearchParams(location.search);
        let paramsObject = {};
        
        for (const [key, value] of params.entries()) {
          paramsObject[key] = value;
        }
        
        let url = '';
        
        if (paramsObject && paramsObject.categories) {
          const categories = paramsObject.categories.split(',');
          
          for (let i = 0; i < categories.length; i++) {
            const category = categories[i].trim(); 
            
            console.log(category);
            
            if (i === 0) {
              url += '?'; 
            } else {
              url += '&';
            }
            
            url += 'ingredientIds=' + category;
          }
        }
        
        console.log(url);
        setQueryParams(paramsObject);
        setLink('http://localhost:8080/api/v1/ingredients/recipes' + url);
    }, [location]);
    
    useEffect(() => {
        // You can add additional logic here if needed
        // This effect will run whenever the 'link' state changes
    }, [link]);

    return (
        <RecipesDisplay link={link} />
    );
}

export default MyRecipes;