import Select from 'react-select';
import React, { useEffect, useState } from "react";
import axios from "axios";

function promjenaSastojka() {
    	

};


function NewRecipeForm() {
    const [cuisines, setCuisines] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ingredients, setIngredients] = useState([]);

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

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex min-w-[110rem] min-h-[40rem] flex-row gap-4">
                <div className='min-w-[50rem] flex flex-col gap-4'>
                    <div className="relative max-w-[40rem]">
                        <input type="text" id="naslov_recepta" aria-describedby="floating_helper_text" className="block rounded-t-lg px-10.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="naslov_recepta" className="absolute text-x1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto" required>Naslov recepta</label>
                    </div>
                    <div className="relative max-w-[40rem]">
                        <Select
                            defaultValue={"-"}
                            name="Kuhinja"
                            options= {cuisines_names}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Odaberi kuhinju"
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
                            onChange={(choice) => setUserChoice(choice)}
                        />
                    </div>
                    <div className='flex flex-col gap-4'>
                        {userChoice.map(el => (
                            <div className='flex flex-row gap-4'>
                                <label htmlFor="kol_sastojka" className="max-w-[15rem] block mb-2 text-sm font-medium text-gray-900 dark:text-white">{el.label}</label>
                                <input type="number" id="kol_sastojka" className="max-w-[10rem] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[15rem]" placeholder="Količina"/>
                                <Select
                                    defaultValue={"-"}
                                    name={el.label}
                                    options= {"-"}
                                    className="basic-single max-w-[10rem]"
                                    classNamePrefix="select"
                                    placeholder="mjerna jedinica"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='min-w-[50rem] flex flex-col gap-6'>
                    <div className="relative max-w-[40rem]">
                        <label htmlFor="priprema" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Koraci pripreme</label>
                        <textarea id="priprema" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Opiši pripremu..." required></textarea>
                    </div>
                    <div className="relative max-w-[40rem]">
                        <label htmlFor="vrijeme_kuhanja" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vrijeme kuhanja u minutama: </label>
                        <input type="number" id="vrijeme_kuhanja" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[15rem]" placeholder="45" required/>
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

                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Dodajte slike</label>
                        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple/>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    </div>
                    <div>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Dodajte video</label>
                        <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                    </div>

                </div>
            </form>
        </div>

    )

};

export default NewRecipeForm;