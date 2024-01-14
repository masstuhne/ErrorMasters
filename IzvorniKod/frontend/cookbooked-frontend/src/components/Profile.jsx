import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import RecipeList from "./RecipeList";

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState([]);
    const [recepti, setRecepti] = useState([]);

    
    const authToken = localStorage.getItem('user_ret');
    const url_user = 'http://localhost:8080/api/v1/users/' + id;
    const url_recepti = url_user + '/recipes';

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
    }, []);

    const korisnikPrati_proba = [
        { id: 1, userName: 'user1' },
        { id: 2, userName: 'user2' },
        { id: 3, userName: 'user3' },
        { id: 4, userName: 'user4' },
        { id: 5, userName: 'user5' }
      ];
    const korisnikaPrate_proba = [
        { id: 16, userName: 'user16' },
        { id: 22, userName: 'user22' },
        { id: 33, userName: 'user33' },
        { id: 44, userName: 'user44' },
        { id: 55, userName: 'user55' }
      ];


    return (
        <div className="flex items-center justify-center flex-col mt-[2rem] w-screen gap-10">
            <div className="flex items-center justify-center flex-row w-full h-1/6 gap-10">
                <h1 className="mb-2 text-5xl font-semibold text-gray-900 dark:text-white">{user.username}</h1>
            </div>
            <div className="flex justify-center flex-row w-full h-5/6 gap-10">
                <div className="w-3/5">
                    <RecipeList headline={"Recepti"} recipes={recepti} />
                </div>
                <div className="w-1/5 mt-[5rem] ">
                    <p className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">Korisnik prati:</p>
                    {korisnikPrati_proba.map((el) => (
                        <li key={el.id}>
                          <a className="mb-2 text-base font-semibold text-gray-900 dark:text-white" href={`/profil/${el.id}`}>{el.userName}</a>
                        </li>
                    ))}
                </div>
                <div className="w-1/5 mt-[5rem] ">
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

    );
};

export default Profile;