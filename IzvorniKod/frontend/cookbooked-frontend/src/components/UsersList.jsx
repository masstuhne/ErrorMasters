import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL;

function UsersList() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(API_BASE_URL + '/users',{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
            },
        })
        .then(response =>{
            console.log(response.data);
            setUsers(response.data);
        })
        .catch(err=>{
            console.error('Error fetching data:', err);
        })
    }, [])

    return (
    <>
              <div className="flex items-center justify-center flex-col mt-[5rem] w-full gap-10">

                <div className="flex items-center justify-center flex-row min-w-[400rem]">
                  <div className="flex items-center justify-end gap-10">
                    <p className="mb-2 text-4xl font-semibold text-gray-900 dark:text-white">Popis korisnika</p>
                  </div>
                </div>

                    <div className="flex w-2/4 min-h-[35rem] flex-col items-center justify-center gap-4">
                        <ul className="w-4/5 space-y-1 text-2xl text-gray-500 list-disc dark:text-gray-400">
                            {users.map((user) => (
                                <li key={user.id} className="py-3 sm:py-4 border-b border-gray-300">
                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                        <div className="w-6/12">
                                            <h1 className="text-2xl font-medium text-gray-900 truncate dark:text-white">
                                                {user.username}
                                            </h1>
                                            <p className="text-lg text-gray-500 truncate dark:text-gray-400">
                                            - {user.email}
                                            </p>
                                        </div>
                                        <div className="inline-flex w-2/12 items-center text-base font-semibold text-gray-900 dark:text-white">
                                            {user.firstName} {user.lastName}
                                        </div>
                                        <div className="flex justify-center w-4/12">
                                            <a href={`/profil/` + user.id}>
                                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pogledaj profil</button>
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

              </div>
    </>
    );
}

export default UsersList;
