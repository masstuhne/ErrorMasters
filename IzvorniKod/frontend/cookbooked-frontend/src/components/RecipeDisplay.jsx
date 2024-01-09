import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RecipeDisplay() {
    const { id } = useParams();
    const [recept, setRecept] = useState([]);
    const [rating, setRating] = useState(0)
    const [mediaList, setMeidaList]= useState([])
    

    const apiUrl = 'http://localhost:8080/api/v1/recipes/' + id;

    console.log(id);

    useEffect(() => {
        axios.get(apiUrl)
        .then(response =>{
            setRecept(response.data)
            
            if(response.data.recipeRatings.length>0){
                let sum_raiting=0
                for(let i=0; i<response.data.recipeRatings.length;i++){
                    let rt=response.data.recipeRatings[i].rating
                    sum_raiting=sum_raiting+rt
                }
                setRating(sum_raiting/response.data.recipeRatings.length)
            }

            let media_ids= response.data.media.map(media=>media.id)
            
            console.log(media_ids)

            const fetchMedia= async(media_ids) =>{
                try{

                    let requests= media_ids.map(id=> 
                        axios.get('http://localhost:8080/api/v1/media/'+id));
                    
                    let responses = await Promise.all(requests);

                    let tmpMediaList=responses.map(mediaResponse=>mediaResponse.data)
                    console.log(tmpMediaList)
                    setMeidaList(tmpMediaList)

                }
                catch(err){
                    console.error('Error fetching data:', err);
                }
            }

            fetchMedia(media_ids);
            
            
            console.log(response.data)

        })
        .catch(err=>{
            console.error('Error fetching data:', err);
        })
    },[])

    const recipes = [
        {
          id: "2",
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
          description: `Prepare the mascarpone mixture:
In a heatproof bowl, whisk together the egg yolks and sugar until well combined.
Place the bowl over a pot of simmering water (double boiler) and whisk continuously until the mixture thickens. This will take about 8-10 minutes.
Remove the bowl from heat and let it cool slightly.
Add the mascarpone cheese to the egg mixture and whisk until smooth and well combined.
Whip the cream:
In a separate bowl, whip the heavy cream and vanilla extract until stiff peaks form.
Gently fold the whipped cream into the mascarpone mixture until fully incorporated. Set aside.
Prepare the coffee mixture:
Mix the cooled brewed coffee with the coffee liqueur in a shallow dish. This will be used to soak the ladyfinger biscuits.
Assemble the tiramisu:
Dip each ladyfinger biscuit into the coffee mixture for about 1-2 seconds, ensuring they are soaked but not overly soggy.
Arrange a layer of soaked ladyfingers at the bottom of a serving dish or a square baking dish.
Spread half of the mascarpone mixture evenly over the layer of ladyfingers.
Repeat with another layer of soaked ladyfingers and top it with the remaining mascarpone mixture.
Finish and chill:
Cover the tiramisu with plastic wrap and refrigerate for at least 4 hours, preferably overnight, to allow the flavors to meld and the dessert to set.
Serve:
Before serving, dust the top of the tiramisu with cocoa powder or grated chocolate using a fine sieve.
Slice and serve chilled. Enjoy your homemade tiramisu!`,
          cooking_time: 60,
          tags: [
            { id: 1, name: 'Coffee' },
            { id: 2, name: 'Mascarpone' },
            // ... (up to 5 tags)
          ],
          images: ['tiramisu_image1.jpg'],
          video: 'https://www.pexels.com/video/snow-wood-landscape-water-18879391/',
          rating: 4.33,
          reviews: [
            {
                author : 'Netko',
                comment : 'Odvratan recept nemojte ga nikada probati'
            },
            {
                author : 'Nitko',
                comment : 'Uživala sam radeći ovaj recept, morat ću ga ponovno sutra raditi. Prefini tiramisu'
            }
          ]
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
          video: 'https://youtu.be/hDAQ7grXBQI?si=Ia7FjMn59McVJyoO',
        },
        // ... (repeat the structure for 3 more recipes)
    ];


    const [recipe, setRecipe] = useState(recipes[0]);
    const foundRecipe = recipes.find((recept) => recept.id === id);
    //console.log(foundRecipe);
    //console.log(recipe.ingredients);

    useEffect(() => {
        setRecipe(foundRecipe);
    }, []);

    //Ak je samo jedna slika na receptu samo ju stavi dva put tak bu dobro delalo 
    //Ak nema ni jedne deni da nema tog elementa 
    //Moras u if dodat dal je zapraćen il ne, umjesto true ili false kaj sam sad dela
    //Mislim da mi nemamo rating neg stavi kolicinu lajkova/sejvova, to bi trebali imati 
    return (
        <div className="min-h-screen justify-center">
            <div id="custom-controls-gallery" className="z-10 relative w-full" data-carousel="slide">
                <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""></img>
                    </div>
                    <div className="hidden duration-700 ease-in-out" data-carousel-item>
                        <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""></img>
                    </div>
                </div>
                <div className="flex justify-center items-center pt-4">
                    <button type="button" className="flex justify-center items-center me-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                            <svg className="rtl:rotate-180 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button type="button" className="flex justify-center items-center h-full cursor-pointer group focus:outline-none" data-carousel-next>
                        <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                            <svg className="rtl:rotate-180 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>
            </div>
            <div className='px-36 justify-center p-4 relative w-full p-4 grid grid-cols-2'>
                <div>
                    <h1 className='text-4xl text-blue-700 p-1'>{recept.title}</h1>
                    <p className='flex p-1'><p>Autor: {recept?.user?.firstName}</p>
                    <a href='#' className='px-1 text-blue-700'>
                        {false ?  
                        <svg class="w-6 h-6 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 25">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM1.866 8.832a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z"/>
                        </svg>
                        :
                        <svg class="w-6 h-6 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 25">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"/>
                        </svg> 
                       }
                    </a>
                    <a href='#' className='px-1 text-blue-700'>
                        { false ?
                        <svg class="w-6 h-6 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 25">
                            <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"/>
                        </svg>
                        :
                        <svg class="w-6 h-6 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 25">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"/>
                        </svg>
                        }
                    </a>
                    <a href='#' className='px-1 text-blue-700'>
                        <svg class="w-6 h-6 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 25">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                        </svg>
                    </a>
                    </p>
                    <h1 className='text-xs text-gray-500 p-1'>          
                        {recept?.tags?.map(tag => (
                            <span>#{tag.name} </span>
                        ))} </h1>
                    <ul className="max-w-md space-y-1 list-disc list-inside dark:text-gray-400 p-1">
                        <li className='text-sm'>
                            Kuhinja: {recept?.cuisine?.name}
                        </li>
                        <li className='text-sm'>
                            Kategorija: {recept?.category?.name}
                        </li>
                    </ul>
                    <ul className="max-w-md space-y-1 list-disc list-inside dark:text-gray-400 p-1">
                        <p className='text-xl text-blue-700'>Sastojci</p>
                        {recept?.ingredients?.map(ingredient => (
                            <li key={ingredient.id}>
                                {ingredient.name} : {ingredient.amount} {ingredient.measuringUnit}    
                            </li>
                        ))}
                    </ul>
                    <h5 className='text-sm p-1'>Vrijeme kuhanja: {recept.cookingTime} minuta</h5>
                    <div class="flex items-center p-1">
                        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p class="ms-2 text-sm font-bold text-gray-900 dark:text-white"> {rating}</p>
                        <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <a href="#" class="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{recept?.recipeRatings?.length} reviews</a>
                    </div>
                    {recipe.video ? 
                        <video className="w-full pr-4" controls>
                            <source src={recipe.video} type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    :
                    '' }
                </div>
                <div>
                    <p className='text-xl text-blue-700'>Priprema: </p>
                    <p>{recept.description}</p>
                </div>
            </div>
        </div>
    );

};

export default RecipeDisplay;