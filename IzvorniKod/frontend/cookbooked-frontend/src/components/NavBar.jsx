import React from "react";
import SignUpButton from "./SignUpButton";
import BarKategorije from "./BarKategorije";

function NavBar() {
    console.log("NAVBAR");
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a  className="flex items-center">
                <h1>🍪</h1>
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Cookbooked</span>
            </a>

            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                <BarKategorije/>
            </div>
            
            <div className="flex md:order-2">
            </div> 
                <SignUpButton/>
            </div>
            
        </nav>
    );
}

export default NavBar;