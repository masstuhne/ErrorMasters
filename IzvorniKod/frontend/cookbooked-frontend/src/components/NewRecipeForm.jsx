import Select from 'react-select';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from 'flowbite-react';

function NewRecipeForm() {
    const [cuisines, setCuisines] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const RCP_URL="http://localhost:8080/api/v1/recipes/add"

    const handleSubmit= async (e)=>{
        e.preventDefault() 
        try{
            console.log(chosenIngredients);

            const ingredientsText = chosenIngredients.map((ingredient) => {
                const { name, quantity, unit } = ingredient;
                return `${name}: ${quantity} ${unit}`;
            }).join('\n');
    
            const recipeText = `${ingredientsText}\n$@%&#$%&\n${descripton}`;
            console.log(recipeText);

            setDescription(recipeText)

            let token=localStorage.getItem('user_ret')
            let time=parseInt(cookingTime)
            let ingredientIds=userChoice.map(ingr => ingr.value)
            const formData= new FormData()
            
            if(images!='') {formData.append('imageFiles',images)}
            if(video!='') formData.append('videoFile',video)
            formData.append('title',titile)
            formData.append('description',descripton)
            formData.append('cookingTime',time)
            formData.append('categoryId',selectedCategory)
            formData.append('cuisineId',selectedCuisine)
            formData.append('ingredients',ingredientIds)
            formData.append('tags',[])

            const response= await axios.post(RCP_URL,formData,{headers :{"Content-Type":"multipart/form-data",
                        Authorization: `Bearer ${token}`,
            }})

            console.log(response.status)
            console.log(response.data)
          
        }
        catch(err){
          console.log(err);
        }
      }
    


    const url1 = 'http://localhost:8080/api/v1/cuisines';
    const url2 = 'http://localhost:8080/api/v1/categories';
    const url3 = 'http://localhost:8080/api/v1/ingredients';

    useEffect(() => {
        axios.get(url1)
            .then((response) => {
                setCuisines(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        axios.get(url2)
            .then((response) => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        
        axios.get(url3)
            .then((response) => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const cuisines_names = cuisines.map(item => ({
        value: item.id,
        label: item.name
      }));
    const categories_names = categories.map(item => ({
        value: item.id,
        label: item.name
      }));
    const ingredients_names = ingredients.map(item => ({
        value: item.id,
        label: item.name
      }));


    const [userChoice, setUserChoice] = useState([]);
    const [selectedCategory,setSelectedCategory]= useState([])
    const [selectedCuisine,setSelectedCousine]= useState([])
    const [titile,setTitle]=useState("")
    const [descripton,setDescription]= useState("")
    const [cookingTime,setCookinTime]= useState('0')
    const [images,setImages]=useState('')
    const [video,setVideo]=useState('')

    const [chosenIngredients,setChosenIngredients]= useState([]);


    const mjerne_jedinice = [
        { value: 1, label: 'g' },
        { value: 2, label: 'dg' },
        { value: 3, label: 'kg' },
        { value: 4, label: 'ml' },
        { value: 5, label: 'dcl' },
        { value: 6, label: 'l' },
        { value: 7, label: 'jušna žlica' },
        { value: 8, label: 'srednja žlica' },
        { value: 9, label: 'kavska žlica' },
        { value: 10, label: 'kom' }
    ];

    const handleInputChange = (event, label) => {
        const inputValue = event.target.value;
        const updatedIngredients = chosenIngredients.map((ingredient) => {
            if (ingredient.name === label) {
            return { ...ingredient, quantity: inputValue };
            }
            return ingredient;
        });
        setChosenIngredients(updatedIngredients);
    };

    const handleSelectChange = (selectedOption, label) => {
        const updatedIngredients = chosenIngredients.map((ingredient) => {
            if (ingredient.name === label) {
                return { ...ingredient, unit: selectedOption.label };
            }
            return ingredient;
        });
        setChosenIngredients(updatedIngredients);
    };

    const handleUserChoiceChange = (choice) => {
        setUserChoice(choice);
    
        // Initialize chosenIngredients for selected ingredients
        const updatedIngredients = choice.map((ingredient) => {
            const existingIngredient = chosenIngredients.find((el) => el.name === ingredient.label);
            if (existingIngredient) {
                return existingIngredient;
            }
            // If the ingredient is not in the existing chosenIngredients, create a new entry
            return {
                name: ingredient.label,
                quantity: "",
                unit: "",
            };
        });
    
        setChosenIngredients(updatedIngredients);
    };

    const [descriptionError, setDescriptionError] = useState("");

    const handleDescriptionChange = (e) => {
        const inputValue = e.target.value;
        const forbiddenString = "$@%&#$%&";
    
        // Check if the description contains invalid characters
        if (inputValue.includes(forbiddenString)) {
            // Set an error message if invalid characters are detected
            setDescriptionError("Description should not contain special characters like $@%&#$%&");
        } else {
            // Update the description state and clear the error message if it's valid
            setDescription(inputValue);
    
            // Clear the error message after a short delay
            setTimeout(() => {
                setDescriptionError("");
            }, 500);
        }
    };

    return (
        <div className="flex items-center justify-center mt-[10rem] w-screen">
            <form onSubmit={handleSubmit} className="flex items-center justify-center max-w-100vh min-h-[40rem] w-5/6 flex-col gap-4 ">
                <div className="flex w-full min-h-[40rem] flex-row gap-4">
                    <div className='w-1/2 flex flex-col gap-4'>
                        <div className="relative max-w-[40rem]">
                            <input onChange={e=> setTitle(e.target.value)} type="text" id="naslov_recepta" aria-describedby="floating_helper_text" className="relative max-w-[40rem] w-full block rounded-t-lg px-10.5 pb-2.5 pt-5 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="naslov_recepta" className="absolute text-x1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto" >Naslov recepta</label>
                        </div>
                        <div className="relative max-w-[40rem]">
                            <Select
                                defaultValue={"-"}
                                name="Kuhinja"
                                options= {cuisines_names}
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Odaberi kuhinju"
                                onChange={(choice) => {setSelectedCousine(choice);}}
                            />
                        </div>
                        <div className="relative max-w-[40rem]">
                            <Select
                                defaultValue={"-"}
                                name="Kategorija"
                                options= {categories_names}
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Odaberi kategoriju"
                                onChange={(choice) => {setSelectedCategory(choice);}}
                            />
                        </div>
                        <div className="relative max-w-[40rem]">
                            <Select
                                isMulti
                                name="Sastojci"
                                options={ingredients_names}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Odaberi sastojke"
                                onChange={handleUserChoiceChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-4 max-w-[40rem]'>
                            {userChoice.map(el => (
                                <div key={el.label} className='flex flex-row gap-6 justify-center items-center'>
                                    <label htmlFor="kol_sastojka" className="max-w-[15rem] block mb-2 text-sm font-medium text-gray-900 dark:text-white w-1/3">{el.label}</label>
                                    <input type="number" min="0" id="kol_sastojka" required onChange={(event) => handleInputChange(event, el.label)} className="w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[15rem]" placeholder="Količina"/>
                                    <Select
                                        defaultValue={"-"}
                                        name={el.label}
                                        options= {mjerne_jedinice}
                                        className="basic-single w-1/3"
                                        classNamePrefix="select"
                                        placeholder="mjerna jedinica"
                                        required
                                        onChange={(selectedOption) => handleSelectChange(selectedOption, el.label)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='w-1/2 flex flex-col gap-6'>
                        <div className="relative max-w-[40rem]">
                            <label htmlFor="priprema" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Koraci pripreme</label>
                            <textarea onChange={handleDescriptionChange} id="priprema" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Opiši pripremu..." required></textarea>
                            {descriptionError && <p className="text-red-500">{descriptionError}</p>}
                        </div>
                        <div className="relative max-w-[40rem]">
                            <label htmlFor="vrijeme_kuhanja" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vrijeme kuhanja u minutama: </label>
                            <input onChange={e=> setCookinTime(e.target.value)} type="number" id="vrijeme_kuhanja" min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[15rem]" placeholder="45" required/>
                        </div>
                        <div className="relative max-w-[40rem]">
                            <Select
                                defaultValue={"0"}
                                isMulti
                                name="Oznake"
                                options={"0"}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Odaberi oznake"
                            />
                        </div>
                        <div className='max-h-[20rem]'>

                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Dodajte slike</label>
                            <input onChange={e=> setImages(e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple/>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF.</p>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Dodajte video</label>
                            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">MPEG-4(MP4), MOV, AVI, WMV or AVCHD.</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 justify-center w-1/3">
                    <Button onChange={e=> setVideo(e.target.files[0])} type="submit" className='w-full text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '>
                        Objavi recept
                    </Button>
                </div>
            </form>
        </div>

    )

};

export default NewRecipeForm;