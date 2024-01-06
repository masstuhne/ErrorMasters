import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDisplay() {
    const { id } = useParams();

    console.log(id);

    const recipes = [
        {
          id: "1",
          category: 'Dessert',
          cuisine: 'Italian',
          ingredients: [
            { id: 1, name: 'Flour', amount: 200, measuringUnit: 'g' },
            { id: 2, name: 'Sugar', amount: 150, measuringUnit: 'g' },
            { id: 3, name: 'Chicken', amount: 500, measuringUnit: 'g' },
            { id: 4, name: 'Rice', amount: 1, measuringUnit: 'cup' },
            { id: 5, name: 'Pork', amount: 500, measuringUnit: 'g' },
            { id: 6, name: 'Potato', amount: 1, measuringUnit: 'cup' },
            // ... (up to 10 ingredients)
          ],
          userId: 'user1',
          title: 'Tiramisu',
          description: 'Classic Italian dessert',
          cooking_time: 60,
          tags: [
            { id: 1, name: 'Coffee' },
            { id: 2, name: 'Mascarpone' },
            // ... (up to 5 tags)
          ],
          images: ['tiramisu_image1.jpg'],
          video: 'https://www.youtube.com/watch?v=abc123',
        },
        {
          id: "2",
          category: 'Main Course',
          cuisine: 'Mexican',
          ingredients: [
            { id: 3, name: 'Chicken', amount: 500, measuringUnit: 'g' },
            { id: 4, name: 'Rice', amount: 1, measuringUnit: 'cup' },
            // ... (up to 10 ingredients)
          ],
          userId: 'user2',
          title: 'Chicken Burrito Bowl',
          description: 'A delicious and healthy meal',
          cooking_time: 45,
          tags: [
            { id: 3, name: 'Mexican' },
            { id: 4, name: 'Healthy' },
            // ... (up to 5 tags)
          ],
          images: ['burrito_image1.jpg'],
          video: 'https://www.youtube.com/watch?v=xyz456',
        },
        // ... (repeat the structure for 3 more recipes)
    ];


    const [recipe, setRecipe] = useState(recipes[0]);
    const foundRecipe = recipes.find((recept) => recept.id === id);
    console.log(foundRecipe);
    console.log(recipe.ingredients);

    useEffect(() => {
        setRecipe(foundRecipe);
    }, []);

    return (
        <div className="flex items-center justify-center flex-row min-h-screen gap-10">
            <div>
                <div>
                    <h1>{recipe.title}</h1>
                    <h1>          
                        {recipe.tags.map(tag => (
                            <span>#{tag.name}</span>
                    ))} </h1>
                </div>
                <ul className="max-w-md space-y-1 list-disc list-inside dark:text-gray-400">
                    <li>
                        Kuhinja: {recipe.cuisine}
                    </li>
                    <li>
                        Kategorija: {recipe.category}
                    </li>
                </ul>
                <ul className="max-w-md space-y-1 list-disc list-inside dark:text-gray-400">
                    Sastojci
                    {recipe.ingredients.map(ingredient => (
                        <li key={ingredient.id}>
                            {ingredient.name} : {ingredient.amount} {ingredient.measuringUnit}    
                        </li>
                    ))}
                </ul>
                <h5>Vrijeme kuhanja: {recipe.cooking_time} minuta</h5>
                <div>
                    <h3>Priprema: </h3>
                    <p>{recipe.description}</p>
                </div>
            </div>
            <div>
                <div>Slike(kao lista ko na pocetnoj?)</div>
                <div>Video</div>
            </div>
        </div>
    );

};

export default RecipeDisplay;