import React, { useEffect, useState } from "react";
import axios from "axios";
import {Label, TextInput, Button } from 'flowbite-react';
import parseJwt from "./parseJwt";

const REG_URL='http://localhost:8080/api/v1/users/profile/update'

function UserData() {
    const [user, setUser] = useState([]);

    const [first_name,setFirstName]=useState('');
    const [last_name,setLastName]=useState('');
    const [phone,setPhone]=useState('');
    const [email1,setEmail]=useState('');


    const authToken = localStorage.getItem('user_ret');
    const url = 'http://localhost:8080/api/v1/users/' + parseJwt(authToken).id;

    useEffect(() => {
        if (!authToken) {
            console.error('Authentication token is missing.');
            return;
        }

        axios.get(url,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
              },
        })
        .then((response) => {
            setUser(response.data);
            console.log(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setPhone(response.data.phoneNumber);
            setEmail(response.data.email)
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const handleSubmit= async (e)=>{
        e.preventDefault() 

        console.log({
            "firstName": first_name,
            "lastName": last_name,
            "email": email1,
            "phoneNumber": phone
          });
        
        try{
          const response= await axios.put('http://localhost:8080/api/v1/users/profile/update',{
            "firstName": first_name,
            "lastName": last_name,
            "email": email1,
            "phoneNumber": phone
          },{headers :{      
                "Content-Type":"application/json",
                Authorization: `Bearer ${localStorage.getItem('user_ret')}`
            } })
          console.log(response.data);
          console.log('Sucess');
        }
        catch(err){
          console.log(err.response);
          console.log('Fail');
        }
      }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="flex min-w-[28rem] min-h-[30rem] flex-col gap-4">
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ime</label>
                    <input type="text" id="first_name" defaultValue={user.firstName} onChange={(e)=> setFirstName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prezime</label>
                    <input type="text" id="last_name" defaultValue={user.lastName} onChange={(e)=> setLastName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                </div>

                <div>
                    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefonski broj</label>
                    <input type="tel" id="phone" defaultValue={user.phoneNumber} onChange={(e)=> setPhone(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" required/>
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Vaš email" />
                    </div>
                    <TextInput id="email1" type="email" defaultValue={user.email} onChange={(e)=> setEmail(e.target.value)} required />
                </div>
                <div></div>    
                <Button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Spremi podatke</Button>
            </form>
        </div>
    );
};

export default UserData;