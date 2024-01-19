import { useEffect, useState } from "react";
import parseJwt from "./parseJwt";
import axios from "axios";
import MessageSendPopUp from "./MessageSendPopUp";

const API_BASE_URL = import.meta.env.VITE_API_URL;

function MessagesDisplay() {
    const[msgs,setMsgs]=useState([])
   

    const apiUrl= API_BASE_URL + '/users/'
    useEffect(()=>{
        let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
        let userId=tokenPayload.id
        axios.get(apiUrl+userId+'/chat-messages', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
            },
          })
    .then(response =>{
        
    
        let responseData = response.data
        console.log(responseData)
        let tmpMsgs=responseData.map(el=>({
            id : el.id,
            sender : el?.sender?.username,
            content : el.content,
            senderId : el?.sender?.id
        }))
        setMsgs(tmpMsgs)
    })
    .catch(err=>{
      console.log(err);
    })
        
    },[])

    // const msgs=[
    //     {
    //         id:1,
    //         sender:"You",
    //         reciver:"Luka",
    //         content:"Poruka",
    //         reciverId: 2,
    //         senderId:4
    //     },
    //     {
    //         id:2,
    //         sender:"You",
    //         reciver:"Luka",
    //         content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    //         reciverId: 2,
    //         senderId:3
    //     }
    // ]
    return (

    <>
        
        <div className="flex items-center justify-center flex-col mt-[5rem] w-full gap-10">
                <div className="flex items-center justify-center flex-row min-w-[100rem]">
                  <div className="flex items-center justify-end gap-10"> {/* Fix: justify-end instead of justify-content: flex-end */}
                    <h2 className="mb-2 text-4xl font-semibold text-gray-900 dark:text-white">Poruke</h2>
                  </div>
                </div>
                {msgs.length>0 ?
                    <div className="flex w-full min-h-[35rem] flex-col items-center justify-center gap-4">
                        <ul className="w-3/5 max-w-[48rem] space-y-1 text-2xl text-gray-500 list-disc dark:text-gray-400">
                        {msgs.map(((el,index)=>(
                            <li key={index} className="py-3 sm:py-4 border-b border-gray-300">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="w-3/6">
                                    <h1 className="text-2xl font-medium text-gray-900 truncate dark:text-white">
                                    {"Šalje "}
                                    <a className="text-2xl font-medium text-gray-900 truncate dark:text-white" href={`/profil/${el.id}`}>{el.sender}</a>
                                    </h1>
                                </div>
                            </div>
                            <p className="text-lg text-gray-500  dark:text-gray-400">
                                    {el.content}
                            </p>
                        </li>
                        
                        )))
                        }
                        </ul>
                    </div>
                    
                 :'' }

        </div>
    </>

    );
}

export default MessagesDisplay;