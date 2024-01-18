import React, { useEffect, useState } from "react";
import axios from "axios";
import {Label, TextInput, Button } from 'flowbite-react';
import parseJwt from "./parseJwt";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const REG_URL=API_BASE_URL + '/users/profile/update'

function UserData() {
    const [user, setUser] = useState([]);

    const [first_name,setFirstName]=useState('');
    const [last_name,setLastName]=useState('');
    const [phone,setPhone]=useState('');
    const [email1,setEmail]=useState('');
    
    const [communicationTimes, setCommunicationTimes] = useState([]);

    const formatPhoneNumber = (phoneNumber) => {
      const cleaned = ('' + phoneNumber).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        return match[1] + ' ' + match[2] + ' ' + match[3];
      }
      return phoneNumber; // return the original number if no match
    };


    const authToken = localStorage.getItem('user_ret');
    const url = API_BASE_URL + '/users/' + parseJwt(authToken).id;
    const dateUrl = API_BASE_URL + '/users/' + parseJwt(authToken).id + '/communication-times';

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
            setPhone(formatPhoneNumber(response.data.phoneNumber));
            setEmail(response.data.email)
        })
        .catch(error => {
            console.log(error);
        });


        axios.get(dateUrl,{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
            },
        })
        .then((response) => {
          const dateRangeObjects = response.data.map((dateRange) => ({
            id: dateRange.id,
            startTime: new Date(dateRange.startTime),
            endTime: new Date(dateRange.endTime)
          }));
          setCommunicationTimes(dateRangeObjects);
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
        
          try {
            if (!first_name || !last_name || !email1 || !phone) {
              console.error('Invalid request data');
              return;
            }
          
            const response = await axios.put(
              API_BASE_URL + '/users/profile/update',
              {
                firstName: first_name,
                lastName: last_name,
                email: email1,
                phoneNumber: phone,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
                },
              }
            );
          
            if (response && response.data) {
              console.log(response.data);
              console.log('Success');
            } else {
              console.error('Invalid response structure');
            }
            window.location.reload();
          } catch (err) {
            console.error('Error:', err);
            console.error('Fail:', err.response ? err.response.data : 'Unknown error');
          }
      }

      const [startDate, setStartDate] = useState("");
      const [endDate, setEndDate] = useState("");
      const [dateTimeError, setDateTimeError] = useState("");
    
      const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
      };
    
      const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
      };

      const handleDateTimeSubmit= async (e)=>{
        e.preventDefault() 
        try{
          if (new Date(endDate) < new Date(startDate)) {
            setDateTimeError("Završno vrijeme ne može biti prije početnog vremena.");
            return;
          }
        
          console.log(startDate);
          setDateTimeError("");
  
          console.log(dateUrl);
          const response= await axios.post(dateUrl, {
            start: new Date(startDate).toISOString(),
            end: new Date(endDate).toISOString()
          },
          {headers :{
            Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
            'Content-Type': 'application/json'
          }})
  
          console.log(response.status)
          console.log(response.data)
          window.location.reload();
      
        }
        catch(err){
          console.log(err);
        }
      }

    function formatDate(date) {
      const options = {
        weekday: 'long',
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };
    
      return date.toLocaleString('hr-HR', options);
    }
    

    return (
        <div className="flex items-center justify-center gap-20 mt-[15rem] mr-[2rem] ml-[2rem]">
            <form onSubmit={handleSubmit} className="w-1/2 flex max-w-[28rem] min-h-[30rem] flex-col gap-4">
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
                <Button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  Spremi podatke
                </Button>
            </form>
            <div className="w-1/2 flex items-center max-w-[40rem] min-h-[30rem] flex-col gap-20">
              <form onSubmit={handleDateTimeSubmit} className="flex items-center max-w-[40rem] flex-col gap-4">
                <p className="text-xl">Odaberite vrijeme kada ste dostupni za komunikaciju sa drugim korisnicima:</p>
                <div className="flex gap-10">
                  <label>Od: </label>
                  <input
                    type="datetime-local"
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                  <label>Do: </label>
                  <input
                    type="datetime-local"
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                  </div>
                  <div className="flex w-1/2">
                      <Button type="submit" className='w-full text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 '>
                          Spremi odabrano vrijeme
                      </Button>
                  </div>
                  {dateTimeError && <p className="text-red-500">{dateTimeError}</p>}
              </form>
              <div className="flex items-center max-w-[40rem] flex-col gap-4">
                <h1 className="text-xl">Već odabrani termini za komunikaciju:</h1>
                {communicationTimes.map((termin) => (
                  <div key={termin.id} >
                      <span>{formatDate(termin.startTime)}</span>
                      <span> - </span>
                      <span>{formatDate(termin.startTime)}</span>
                  </div>
                ))}
              </div>
            </div>
        </div>
    );
};

export default UserData;