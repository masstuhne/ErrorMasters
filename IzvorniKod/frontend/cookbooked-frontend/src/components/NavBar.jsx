import React, {createContext, useState} from "react";
import SignUpButton from "./SignUpButton";
import BarKategorije from "./BarKategorije";
import UserLog from "./UserLog";
import { Link } from "react-router-dom";

export const AuthContext = createContext();

function NavBar() {
    // console.log("NAVBAR");

    return (
        <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600"> 
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/"  className="flex items-center">
                    <h1>🍪</h1>
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Cookbooked</span>
                </Link>

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
            </div>
        </nav>
    );
}

export default NavBar;