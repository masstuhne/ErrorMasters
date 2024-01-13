import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function DohvatSastojci({cat, link, children}) {
    const [categories, seCategories] = useState([]);
    const [isOpen, setOpen] = useState(false);

    const navBarId = "dropdownNavbar " + cat;

    // console.log(cat);
    
    const apiUrl = 'http://localhost:8080/api/v1/' + cat;
    // console.log(apiUrl);
    useEffect(() => {
        axios.get(apiUrl)
            .then((response) => {
                seCategories(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
  
    const handleCheckboxChange = (categoryId) => {
      // Toggle the category in the selectedCategories state
      setSelectedCategories((prevSelected) => {
        if (prevSelected.includes(categoryId)) {
          return prevSelected.filter((id) => id !== categoryId);
        } else {
          return [...prevSelected, categoryId];
        }
      });
    };
  
    const handleSubmit = () => {
      // Perform the submission logic with the selectedCategories
      console.log('Submitting:', selectedCategories);
      // You can send the selectedCategories to your API endpoint here
  
      // Set submitting to true to show loading state or disable the button
      setSubmitting(true);

      const url = `/sastojci?categories=${selectedCategories.join(',')}`;
      console.log(url);
      navigate(url);
  
      // Simulate an asynchronous operation (replace with your actual API call)
      setTimeout(() => {
        setSubmitting(false);
      }, 2000);
    };
    

    return (
        <li>
            <button id="dropdownNavbarLink" data-dropdown-toggle={navBarId} className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent">                    
                {children.props.children} 
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m1 1 4 4 4-4"/>
                    </svg>
            </button>
            <div id={navBarId} className={`px-2 z-40 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${isOpen ? "block" : "hidden"}`}> 
                <ul className="dropdown py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    {categories.map(el => (
                        <li key={el.id}>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input 
                                    id={`checkbox-item-${el.id}`} 
                                    type="checkbox" 
                                    checked={selectedCategories.includes(el.id)}
                                    onChange={() => handleCheckboxChange(el.id)}
                                    value="" 
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                <label htmlFor={`checkbox-item-${el.id}`} 
                                    className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                                        {el.name}
                                </label>
                            </div>
                        </li>
                    ))}
                    <button type="button" onClick={handleSubmit} disabled={submitting} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Submit
                    </button>
                </ul>
            </div>
        </li>
    );
}

export default DohvatSastojci;