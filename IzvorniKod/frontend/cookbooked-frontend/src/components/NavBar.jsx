import React, {createContext, useState,useEffect} from "react";
import SignUpButton from "./SignUpButton";
import BarKategorije from "./BarKategorije";
import UserLog from "./UserLog";
import NotificationToast from "./NotificationToast";
import parseJwt from "./parseJwt";
import axios from "axios";

export const AuthContext = createContext();

function NavBar() {
    const [isToastVisible, setIsToastVisible] = useState(false);
    const [notifType,setNotifType]=useState("Nova poruka")
    const [sender,setSender]=useState("")
    const [content,setConetent]= useState("")
    const checEvery=5
    const apiUrl= "http://localhost:8080/api/v1/users/"

    const handleToastClose = () => {
      setIsToastVisible(false);
    };
    useEffect(() => {
        const yourFunction = () => {
        if (localStorage.getItem('user')){
            let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
            console.log(tokenPayload)
            if(Date.now() >= tokenPayload.exp * 1000){
                localStorage.removeItem('user');
                localStorage.removeItem('user_ret');
                window.location.href = '/prijava';
            }

            
        }
        }
        const nMinutes = 5; 
        const intervalMs = nMinutes * 60 * 1000;
        const intervalId = setInterval(yourFunction, intervalMs);
        return () => clearInterval(intervalId);
    }, []);
    
      useEffect(() => {
        const yourFunction = () => {
            

            if (localStorage.getItem('user')){
                let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
                let userId=tokenPayload.id
                axios.get(apiUrl+userId+'/chat-messages', {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
                },
                    })
                .then(response =>{
                    if(localStorage.getItem("noMsgs")){
                    let newNoMsgs=response.data.length
                    let oldNoMsg= localStorage.getItem("noMsgs")
                    if(oldNoMsg!=newNoMsgs){
                        setIsToastVisible(true);
                        setNotifType("Nova poruka")
                        let lastMsg=response.data[newNoMsgs-1]
                        setSender(lastMsg?.sender?.username)
                        setConetent(lastMsg?.content)
                        localStorage.setItem("noMsgs",newNoMsgs)
                        console.log("Showing new notifficatio")
                    }
                }
                else{
                    localStorage.setItem("noMsgs",response.data.length)
                }
                })
                .catch(err=>{
                    console.log(err);
                })
            }
          
        };
        const nMinutes = checEvery; 
        const intervalMs = nMinutes * 60 * 1000;
        const intervalId = setInterval(yourFunction, intervalMs);
        return () => clearInterval(intervalId);
      }, []);


      useEffect(() => {
        const yourFunction = () => {
            

            if (localStorage.getItem('user')){
                let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
                let userId=tokenPayload.id
                axios.get(apiUrl+userId+'/followers', {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
                },
                    })
                .then(response =>{
                    let dataLenght=response.data.length
                    let newFollower=""
                    let oldFollower=""
                    if(dataLenght>0 && localStorage.getItem("mostrecentFollower") ){
                        newFollower=response.data[dataLenght-1]?.follower?.username
                        oldFollower= localStorage.getItem("mostrecentFollower")
                    }
                    if( dataLenght>0 && oldFollower!=newFollower ){
                        setIsToastVisible(true);
                        setNotifType("Nova obavjest")
                        setSender(newFollower)
                        setConetent("vas je počeo pratiti")
                        localStorage.setItem("mostrecentFollower",newFollower)
                        
                    }
                    if(dataLenght>0 && !localStorage.getItem("mostrecentFollower") ){
                        newFollower=response.data[dataLenght-1]?.follower?.username
                        localStorage.setItem("mostrecentFollower",newFollower)
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
            }
          
        };
        const nMinutes = checEvery; 
        const intervalMs = nMinutes * 60 * 1000;
        const intervalId = setInterval(yourFunction, intervalMs);
        return () => clearInterval(intervalId);
      }, []);
      
      
      useEffect(() => {
       

        if (localStorage.getItem('user')){
                let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
                let userId=tokenPayload.id
                axios.get(apiUrl+userId+'/chat-messages', {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
                },
                    })
            .then(response =>{
                let newNoMsgs=response.data.length
                localStorage.setItem('noMsgs', newNoMsgs);
                console.log("noMsgs Set")
            })
            .catch(err=>{
                console.log(err);
            })
        }

        
      }, []);

      useEffect(() => {
       

            if (localStorage.getItem('user')){
                let tokenPayload=parseJwt(localStorage.getItem('user_ret'))
                let userId=tokenPayload.id
                axios.get(apiUrl+userId+'/followers', {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('user_ret')}`,
                },
                    })
                .then(response =>{
                    let newNoFolowers=response.data.length
                    if(response.data.length>0){
                        localStorage.setItem('mostrecentFollower', response?.data[newNoFolowers-1]?.follower?.username);
                        console.log("folower set")
                    }
                    else console.log("no folowers")
                })
                .catch(err=>{
                    console.log(err);
                })
        }

        
      }, []);



    return (
        <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"> 
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/"  className="flex items-center">
                    <h1>🍪</h1>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Cookbooked</span>
                </a>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <BarKategorije/>
                </div>
                
                <div className="flex md:order-2">
                    {localStorage.getItem('user_ret') ? (
                        <UserLog>{localStorage.getItem('user')}</UserLog>
                    ) : (
                        <SignUpButton/>
                    )}
                </div>
                   
                  { isToastVisible && <div id="toast-notification" class="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
                    <NotificationToast onClose={handleToastClose} notificatioType={notifType} content={content} sender={sender}/>
                    </div>}
            </div>
        </nav>
    );
}

export default NavBar;