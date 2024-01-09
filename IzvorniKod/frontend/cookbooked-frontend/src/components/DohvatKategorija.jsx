import React, { useEffect, useState } from "react";
import axios from "axios";

function DohvatKategorija({cat, children}) {
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

    // console.log(categories);

    // const handleDropDown = () => {
    //     setOpen(!isOpen);
    // };

    return (
        <li>
            <button id="dropdownNavbarLink" data-dropdown-toggle={navBarId} className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                // onClick={handleDropDown}
                >                    
                {children.props.children} 
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m1 1 4 4 4-4"/>
                    </svg>
            </button>
            <div id={navBarId} className={`z-40 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${isOpen ? "block" : "hidden"}`}> 
                <ul className="dropdown py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                {categories.map(el => (
                    <li key={el.id}>
                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                            {el.name}
                        </a>
                    </li>
                ))}
                </ul>
            </div>
        </li>
    );
}

export default DohvatKategorija;