import React, { useEffect, useState } from "react";
import axios from "axios";
import {Label, TextInput } from 'flowbite-react';

import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'


function UserData() {
    const [users, setUsers] = useState([]);
    const url = 'http://localhost:8080/api/v1/users';

    const authToken = localStorage.getItem('user_ret');
    console.log(authToken);
    useEffect(() => {
        if (!authToken) {
            console.error('Authentication token is missing.');
            return;
        }

        axios.get(url, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
        })
        .then((response) => {
            setUsers(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    console.log(users);

    const firstName = 'Ime';
    const lastName = 'Prezime';
    const phoneNumber = '000 000 0000';
    const userName = 'korisničko ime';
    const lozinka = 'lozinka';
    const email = 'ime.prez@gmail.com';

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
        if (type==='password'){
           setIcon(eye);
           setType('text')
        } else {
           setIcon(eyeOff)
           setType('password')
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex min-w-[28rem] min-h-[30rem] flex-col gap-4">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ime</label>
                    <input type="text" id="first_name" defaultValue={firstName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prezime</label>
                    <input type="text" id="last_name" defaultValue={lastName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>

                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefonski broj</label>
                    <input type="tel" id="phone" defaultValue={phoneNumber} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" required/>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Vaš email" />
                    </div>
                    <TextInput id="email1" type="email" defaultValue={email} required />
                </div>

                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="username3" value="Korisničko ime" />
                    </div>
                    <TextInput id="username3" addon="@" defaultValue={userName} required />
                </div>

                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="password" value="Vaša lozinka" />
                    </div>
                    <div >
                        <TextInput
                            type={type}
                            name="password"
                            defaultValue={lozinka}
                            required
                        />
                        <span className="flex justify-end items-center" onClick={handleToggle}>
                            <Icon className="absolute mr-3 mb-11" icon={icon} size={25}/>
                        </span>
                    </div>
                </div>
                <div></div>    
            </form>
        </div>
    );
};

export default UserData;