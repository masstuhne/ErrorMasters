import React, { useEffect, useState } from "react";
import axios from "axios";
import {Label, TextInput, Button } from 'flowbite-react';

function UserData() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);

    const url = 'http://localhost:8080/api/v1/users';
    const authToken = localStorage.getItem('user_ret');

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
            setUser(response.data.find(user => user.username === localStorage.getItem('user')));
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    // console.log(users);
    // console.log(user);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex min-w-[28rem] min-h-[30rem] flex-col gap-4">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ime</label>
                    <input type="text" id="first_name" defaultValue={user.firstName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prezime</label>
                    <input type="text" id="last_name" defaultValue={user.lastName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>

                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefonski broj</label>
                    <input type="tel" id="phone" defaultValue={user.phoneNumber} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" required/>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Vaš email" />
                    </div>
                    <TextInput id="email1" type="email" defaultValue={user.email} required />
                </div>
                <div></div>    
                <Button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Spremi podatke</Button>
            </form>
        </div>
    );
};

export default UserData;