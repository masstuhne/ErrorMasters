import { Link } from "react-router-dom"
function RecipeList({headline, recipes}) {

    return (
            <div className="flex items-center justify-center flex-col mt-[10rem] w-screen gap-10">
                <div className="flex items-center justify-center flex-row min-w-[100rem]">
                    <div className="flex items-center justify-content: flex-end  gap-10 ">
                        <h2 className="mb-2 text-4xl font-semibold text-gray-900 dark:text-white">{headline}</h2> 
                    </div>
                </div>
                
                <div className="flex w-screen min-h-[35rem] flex-col items-center justify-center gap-4">

                    <ul className="w-2/5 space-y-1 text-2xl text-gray-500 list-disc  dark:text-gray-400">
                        {recipes.map(el => (
                            <li key={el.id} className="py-3 sm:py-4 border-b border-gray-300">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="w-3/6">
                                        <h1 className="text-2xl font-medium text-gray-900 truncate dark:text-white">
                                        {el.ime}
                                        </h1>
                                        <p className="text-lg text-gray-500 truncate dark:text-gray-400">
                                        - {el.kategorija}
                                        </p>
                                    </div>
                                    <div className="inline-flex w-1/6 items-center text-base font-semibold text-gray-900 dark:text-white">
                                        kuhanje: {el.vrijeme} min
                                    </div>
                                    <div className="flex justify-center w-2/6">
                                        <Link to={`/recept/${el.id}`}>
                                          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Pročitaj više</button>
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                        
                    </ul>
                </div>
            </div>
    );
;}

export default RecipeList;