import { Button, Label, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RedAlert from './RedAlert';
import { AuthContext } from './NavBar';
import { useNavigate } from "react-router-dom";

const LOG_URL='http://localhost:8080/api/v1/login'

function SignInForm() {

    const [success,setSuccess]=useState(false);

    const [errorText, setErrorText]=useState('');
    const [showAlert, setShowAlert]=useState(false);

    const [user_name,setUserName]=useState('');
    const [password,setPassword]=useState('');

    const navigateTo = useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault() 
        try{
          const response= await axios.post(LOG_URL,JSON.stringify({
            username : user_name,
            password : password
          }),{headers :{"Content-Type":"application/json"} })
          console.log('Success');
          setSuccess(true);
          setShowAlert(false);

          localStorage.setItem('user', user_name);
          localStorage.setItem('user_ret', response.data);
          
          navigateTo('/');
        }
        catch(err){
          console.log(err.response.data);
          console.log('Fail');
          setErrorText(err.response.data);
          setShowAlert(true);
        }
      }

  return (
    <div className="flex items-center justify-center min-h-screen">
            <form  onSubmit={handleSubmit} className="flex min-w-[28rem] min-h-[30rem] flex-col gap-4">
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="email1" value="Vaše korisničko ime" />
                </div>
                <TextInput id="email1"  placeholder="ime_prezime" onChange={(e)=> setUserName(e.target.value)} required />
                </div>
                <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1" value="Vaša lozinka" />
                </div>
                <TextInput id="password1" type="password" onChange={(e)=> setPassword(e.target.value)} required />
                </div>
                <div></div>
                <Button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Prijava</Button>
                <div>
                    Nemate korisnički račun?
                    <Link to="/registracija" className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                    Registracija
                    </Link>
                    .
                </div>
                {showAlert && (
                  <RedAlert>{errorText}</RedAlert>
                )}
            </form>
        </div>
  );
}

export default SignInForm;