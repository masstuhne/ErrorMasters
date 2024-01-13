import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import parseJwt from "./parseJwt";
import ReviewPopUp from './ReviewPopUp';
import fromStringToTime from './fromStringToTime';

function saveRecipe(id) {
    const url = 'http://localhost:8080/api/v1/users/' + parseJwt(localStorage.getItem('user_ret')).id + '/bookmarked-recipes?recipeId=' + id;
    console.log('saving \n' + url);
    axios.put(url,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
          },
    })
    .then(response =>{
        console.log(response.data);
    })
    .catch(err=>{
        console.error('Error fetching data:', err);
    })
}

function unsaveRecipe(id) {
    const url = 'http://localhost:8080/api/v1/users/' + parseJwt(localStorage.getItem('user_ret')).id + '/bookmarked-recipes?recipeId=' + id;
    console.log('unsaving');
}

function RecipeDisplay() {
    const { id } = useParams();
    const [recept, setRecept] = useState([]);
    const [rating, setRating] = useState(0)
    const [mediaList, setMeidaList]= useState([])
    const [currentIndex, setCurrentIndex] = useState(0)    
    const [videoList,setVideoList]=useState([])
    const [isSaved, setIsSaved]= useState(false)
    const [isBell, setIsBell]= useState(false)
        

    const apiUrl = 'http://localhost:8080/api/v1/recipes/' + id;

    useEffect(() => {
        axios.get(apiUrl)
        .then(response =>{
            setRecept(response.data)
            console.log(response.data)
            
            if(response.data.recipeRatings.length>0){
                let sum_raiting=0
                for(let i=0; i<response.data.recipeRatings.length;i++){
                    let rt=response.data.recipeRatings[i].rating
                    sum_raiting=sum_raiting+rt
                }
                setRating((sum_raiting/response.data.recipeRatings.length).toFixed(2))
            }

            let image_ids=[] 
            response.data.media.forEach(media => {
                if (media.mediaType=="IMAGE") image_ids.push(media.id)
            });
            
            let video_ids=[]
            response.data.media.forEach(media => {
                if (media.mediaType=="VIDEO") video_ids.push(media.id)
            });
            

            const fetchMedia= async(media_ids,video) =>{
                try{

                    let requests= media_ids.map(id=> 
                        axios.get('http://localhost:8080/api/v1/media/'+id));
                    
                    let responses = await Promise.all(requests);

                    let tmpMediaList=responses.map(mediaResponse=>mediaResponse.data)
                    // za testiranje ako je samo jedna slika da se doda jos jedan link pa da se mogu dvije mijenjati
                    // tmpMediaList.push({link:"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg"})
                    if (video) setVideoList(tmpMediaList) 
                    else setMeidaList(tmpMediaList)

                }
                catch(err){
                    console.error('Error fetching data:', err);
                }
            }

            fetchMedia(image_ids,false);
            fetchMedia(video_ids,true)
            
            
            

        })
        .catch(err=>{
            console.error('Error fetching data:', err);
        })
    },[])
    
    useEffect(()=>{
        let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
        let userId=tokenPayload.id
        console.log(tokenPayload, userId);
        axios.get('http://localhost:8080/api/v1/users/' + userId + '/bookmarked-recipes',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_ret')}`,

              },
        })
        .then(response =>{
            setIsSaved(response.data.some(item => item?.recipe?.id == id));
        })
        .catch(err=>{
            console.error('Error fetching data:', err);
        })

    },[])

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaList.length);    
    };
    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaList.length) % mediaList.length);
    };

   


    //Ak je samo jedna slika na receptu samo ju stavi dva put tak bu dobro delalo 
    //Ak nema ni jedne deni da nema tog elementa 
    //Moras u if dodat dal je zapraćen il ne, umjesto true ili false kaj sam sad dela
    //Mislim da mi nemamo rating neg stavi kolicinu lajkova/sejvova, to bi trebali imati 
    return (
        
        <div className="min-h-screen justify-center">
            
            {mediaList.length>0 ?<div id="custom-controls-gallery" className="z-10 relative w-full" data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div className= "duration-700 ease-in-out" data-carousel-item>
                    <img
                        src={mediaList[currentIndex].link}
                        className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                        alt=""
                    ></img>
                </div>
            </div>
                <div className="flex justify-center items-center pt-4">
                    <button onClick={handlePrevious} type="button" className="flex justify-center items-center me-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                        <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                            <svg className="rtl:rotate-180 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                            </svg>
                            <span className="sr-only">Previous</span>
                        </span>
                    </button>
                    <button onClick={handleNext} type="button" className="flex justify-center items-center h-full cursor-pointer group focus:outline-none" data-carousel-next>
                        <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                            <svg className="rtl:rotate-180 w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                            <span className="sr-only">Next</span>
                        </span>
                    </button>
                </div>
            </div>:''}
            <div className='px-36 justify-center p-4 relative w-full p-4 grid grid-cols-2'>
                <div>
                    <h1 className='text-4xl text-blue-700 p-1'>{recept.title}</h1>
                    <div className='flex p-1'><p>Autor: <a href={`/profil/${recept?.user?.id}`}>{recept?.user?.username}</a></p>
                    <a href='#' className='px-1 text-blue-700'>
                        {isBell ?  
                        <svg onClick={e=>setIsBell(false)} className="w-6 h-6 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 25">
                            <path onClick={e=>setIsBell(false)} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C17 15.4 17 16 16.462 16H3.538C3 16 3 15.4 3 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 10 3.464ZM1.866 8.832a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M6.54 16a3.48 3.48 0 0 0 6.92 0H6.54Z"/>
                        </svg>
                        :
                        <svg onClick={e=>setIsBell(true)} className="w-6 h-6 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 25">
                            <path onClick={e=>setIsBell(true)}stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 3.464V1.1m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175C15 15.4 15 16 14.462 16H1.538C1 16 1 15.4 1 14.807c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 8 3.464ZM4.54 16a3.48 3.48 0 0 0 6.92 0H4.54Z"/>
                        </svg> 
                       }
                    </a>
                    <a href='#' className='px-1 text-blue-700'>
                        { isSaved ?
                        <svg  className="w-6 h-6 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 25">
                            <path onClick={e=> {setIsSaved(false); unsaveRecipe(id)}} d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"/>
                        </svg>
                        :
                        <svg onClick={e=> {setIsSaved(true); saveRecipe(id)}}className="w-6 h-6 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 25">
                            <path  stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 19-6-5-6 5V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17Z"/>
                        </svg>
                        }
                    </a>
                    <a href='/moje_poruke' className='px-1 text-blue-700'>
                        <svg className="w-6 h-6 text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 25">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h9M5 9h5m8-8H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4l3.5 4 3.5-4h5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
                        </svg>
                    </a>
                    </div>
                    <h1 className='text-xs text-gray-500 p-1'>          
                        {recept?.tags?.map(tag => (
                            <span key={tag.name}>#{tag.name} </span>
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
                    <h5 className='text-sm p-1'>Vrijeme kuhanja: {fromStringToTime(recept.cookingTime)} minuta</h5>
                    <div className="flex items-center p-1">
                        <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                        </svg>
                        <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white"> {rating}</p>
                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">{recept?.recipeRatings?.length} reviews</a>
                    </div>
                    <ReviewPopUp/>
                    {videoList.length>0 ? 
                        <video className="w-full pr-4 h-96" controls>
                            <source src={videoList[0].link} type="video/mp4"/>
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