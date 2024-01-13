import React from "react";
import DohvatKategorija from "./DohvatKategorija";
import DohvatSastojci from "./DohvatSastojci";

function BarKategorije() {
    // console.log("BarKategorije");
    return (
        <ul className="navigation-bar flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <DohvatKategorija cat='cuisines' link='kuhinje'><>Kuhinje</></DohvatKategorija>
            <DohvatKategorija cat='categories' link='kategorije'><>Kategorije</></DohvatKategorija>
            <DohvatSastojci cat='ingredients' link='sastojci'><>Sastojci</></DohvatSastojci>
        </ul>
    );
}

export default BarKategorije;