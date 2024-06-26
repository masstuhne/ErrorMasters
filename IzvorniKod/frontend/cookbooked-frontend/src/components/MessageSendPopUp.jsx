import { useState } from 'react';
import axios from "axios";
import parseJwt from "./parseJwt";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function MessageSendPopUp({reciverId,messagageId}) {
    const [formData, setFormData] = useState('');
    const apiUrl= API_BASE_URL + '/users/'
    const handleChange = (e) => {
        setFormData(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Slanje...' + formData);
        let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
        let userId=tokenPayload.id
        try{
            const response= await axios.post(apiUrl+userId+"/chat-messages",JSON.stringify({
                senderId : userId,
                receiverId : reciverId,
                content : formData
            }),{headers :{"Content-Type":"application/json",
            Authorization: `Bearer ${localStorage.getItem('user_ret')}`
                } })
            console.log('Success');
            console.log(response.data)
            setFormData('')         
          }
          catch(err){
             console.log(err);
            // setErrorText(err.response.data);
          }

    };

    return (

    <>
        <div id={`message_${messagageId}`} tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100% - 1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Vaša poruka
                        </h3>
                        <button type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide={`message_${messagageId}`}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form className="space-y-4" action="#">
                            <div>
                                <textarea name="message" rows="4" id='message'     
                                    value={formData}
                                    onChange={handleChange}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ovdje napišite svoju poruku" required>
                                </textarea>                    
                            </div>
                            <button type="submit" onClick={handleSubmit} className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pošalji</button>
                        </form>
                    </div>
                </div>
            </div>
        </div> 
    </>

    );
}

export default MessageSendPopUp;