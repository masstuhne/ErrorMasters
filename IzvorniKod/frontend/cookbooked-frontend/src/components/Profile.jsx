import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import RecipeList from "./RecipeList";
import parseJwt from "./parseJwt";
import ChangePassPopUp from "./ChangePassPopUp";
import MessageSendPopUp from "./MessageSendPopUp";
import RedAlert from "./RedAlert";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [recepti, setRecepti] = useState([]);
    const [communicationTimes, setCommunicationTimes] = useState([]);


    const authToken = localStorage.getItem('user_ret');
    const url_user = API_BASE_URL + '/users/' + id;
    const url_recepti = url_user + '/recipes';
    const dateUrl = API_BASE_URL + '/users/' + id + '/communication-times';


    useEffect(() => {
        if (!authToken) {
            console.error('Authentication token is missing.');
            return;
        }

        axios.get(url_user,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
              },
            })
            .then((response) => {
                //ZBRISATI OVO KAD DOBIMO ROLE
                response.data.role = 'ADMIN_ROLE';
                console.log(response.data);
                setUser(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(url_recepti)
            .then((response) => {
                let tmpRcipeList=response.data.map(recept=>({
                    id : recept.id, ime:recept.title, kategorija:recept?.category?.name, vrijeme: recept.cookingTime}))
                setRecepti(tmpRcipeList)
            })
            .catch(error => {
                console.error(error);
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

    const handleDeleteUser = () => {

        console.log(`${API_BASE_URL}/users/${id}`);
    
        axios.delete(`${API_BASE_URL}/users/${id}`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
            },
        })
        .then(response => {
            console.log('Recipe deleted successfully:', response);
            window.location.href = '/admin_stranica';
        })
        .catch(error => {
            console.error('Error deleting recipe:', error);
        });
    };

    const[korisnikPrati_proba,setKorisnikPrati_proba]= useState([])
    const[korisnikaPrate_proba,setKorisnikaPrate_proba]=useState([])
    useEffect(() => {
        axios.get(`${API_BASE_URL}/users/${id}/following`)
            .then((response) => {
                let tmpList=response.data.map(el=>({
                    id : el?.author?.id, userName:el?.author?.username}))
                setKorisnikPrati_proba(tmpList)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    useEffect(() => {
        axios.get(`${API_BASE_URL}/users/${id}/followers`)
            .then((response) => {
                console.log(response.data)
                let tmpList=response.data.map(el=>({
                    id : el?.follower?.id, userName:el?.follower?.username}))
                    setKorisnikaPrate_proba(tmpList)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    // const handleChangeRole = () => {
    //     let novi_role = '';
    //     //TODO MOŽDA BU I OVE IFOVE TREBALO MIJENJAT 
    //     if (user.role == 'ADMIN') {
    //         novi_role = 'MEMBER'
    //     } else {
    //         novi_role = 'ADMIN'
    //     }
    //     axios.put(`${API_BASE_URL}/users/${id}`,{
    //         "firstName": user.firstName,
    //         "lastName": user.lastName,
    //         "email": user.email,
    //         "phoneNumber": user.phoneNumber,
    //         "username": user.userName,
    //         "password": user,
    //         "roleEnum": novi_role
    //     },
    //     {
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
    //         },
    //     })
    //     .then(response => {
    //         console.log('Recipe deleted successfully:', response);
    //         window.location.href = '/admin_stranica';
    //     })
    //     .catch(error => {
    //         console.error('Error deleting recipe:', error);
    //     });
    // };

    // const korisnikPrati_proba = [
    //     { id: 1, userName: 'user1' },
    //     { id: 2, userName: 'user2' },
    //     { id: 3, userName: 'user3' },
    //     { id: 4, userName: 'user4' },
    //     { id: 5, userName: 'user5' }
    //   ];
    // const korisnikaPrate_proba = [
    //     { id: 16, userName: 'user16' },
    //     { id: 22, userName: 'user22' },
    //     { id: 33, userName: 'user33' },
    //     { id: 44, userName: 'user44' },
    //     { id: 55, userName: 'user55' }
    //   ];

    
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

        <div className="flex items-center justify-center flex-col mt-[2rem] w-screen gap-10">
            {localStorage.getItem('user_ret') ? 
            <>
            <div className="flex items-center justify-center flex-row w-full h-1/6 gap-10">
                <h1 className="mb-2 text-5xl font-semibold text-gray-900 dark:text-white">{user.username}</h1>
            </div>
            {localStorage.getItem('user_ret') && parseJwt(localStorage.getItem('user_ret')).role[0].authority == 'ROLE_ADMIN' ? 
                <div className="flex gap-3">
                    {id != parseJwt(authToken).id ? 
                        <button type="button" onClick={handleDeleteUser} className='block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800' >Obriši korisnika</button>
                    : '' }
                    <ChangePassPopUp user={user}/>
                </div>
                : '' 
            }
            <><button data-modal-toggle="message_1" type="button" onClick={e => e.preventDefault()}className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' >Pošalji poruku</button>
            <MessageSendPopUp reciverId={id} messagageId={1} /></> 
            <div className="flex justify-center flex-row w-full h-5/6 gap-10">
                <div className="w-3/5">
                    <RecipeList headline={"Recepti"} recipes={recepti} />
                </div>
                <div className="w-2/5 mt-[5rem] mr-[5rem]" >
                    <div className="mr-[15rem]">
                        <div className="flex items-center max-w-[40rem] flex-col gap-4">
                            <h1 className="text-xl">Termini za komunikaciju:</h1>
                            {communicationTimes.map((termin) => (
                            <div key={termin.id} >
                                <span>{formatDate(termin.startTime)}</span>
                                <span> - </span>
                                <span>{formatDate(termin.endTime)}</span>
                            </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-center flex-row w-full h-5/6 gap-10">
                        <div className="w-1/2 mt-[5rem] ">
                            <p className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Korisnik prati:</p>
                            {korisnikPrati_proba.map((el) => (
                                <li key={el.id}>
                                <a className="mb-2 text-base font-semibold text-gray-900 dark:text-white" href={`/profil/${el.id}`}>{el.userName}</a>
                                </li>
                            ))}
                        </div>
                        <div className="w-1/2 mt-[5rem] ">
                            <p className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Korisnika prate:</p>
                            <p>
                                {korisnikaPrate_proba.map((el) => (
                                    <li key={el.id}>
                                    <a className="mb-2 text-base font-semibold text-gray-900 dark:text-white" href={`/profil/${el.id}`}>{el.userName}</a>
                                    </li>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </> : 
            <RedAlert>Za pregled profila korisnika morate se prijaviti!</RedAlert>
            }
        </div>

    );
};

export default Profile;