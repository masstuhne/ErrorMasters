import { Link } from "react-router-dom"

function MyRecipesList() {
    return (
            <div className="flex items-center justify-center min-h-screen">
                <div>
                    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Moji recepti tj.mali Fail:</h2> 
                    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                        <li>
                            Tu budu nazivi recepata kao link? pa se otvori taj recept
                        </li>
                        <li className="py-3 sm:py-4">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <div className="flex-shrink-0">
                                    <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Neil image"></img>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Recept
                                    </p>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    možda i ovak neke
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    kuhanje: 30 min
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <Link to="/novi_recept">
                        <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Izradi novi recept</button>
                    </Link>
                </div>
            </div>
    );
;}

export default MyRecipesList;