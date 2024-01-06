import { Link } from "react-router-dom"

function MyRecipesList() {

    const recepti = [
        {
          id: "1",
          ime: "Torta s narančom",
          kategorija: "desert",
          vrijeme: "45"
        },
        {
          id: "2",
          ime: "Mese",
          kategorija: "Glavno jelo",
          vrijeme: "5"
        },
        {
          id: "3",
          ime: "Bažulj sa zeljem",
          kategorija: "salata",
          vrijeme: "25"
        },
        {
          id: "4",
          ime: "Kesten pire",
          kategorija: "sok",
          vrijeme: "20"
        },
        {
          id: "5",
          ime: "Sok od naranče",
          kategorija: "Predjelo",
          vrijeme: "30"
        }
      ];

    return (
            <div className="flex items-center justify-center flex-col min-h-screen gap-10">
                <div className="flex items-center justify-center flex-row gap-10 min-w-[100rem]">
                    <div className="flex items-center justify-content: flex-end flex-col gap-10 min-w-[50rem]">
                        <h2 className="mb-2 text-4xl font-semibold text-gray-900 dark:text-white">Moji recepti:</h2> 
                    </div>
                    <div className="flex items-center justify-end flex-col gap-10 min-w-[50rem]">
                        <Link to="/novi_recept">
                            <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Izradi novi recept</button>
                        </Link>
                    </div>
                </div>
                
                <div className="flex min-w-[90rem] min-h-[35rem] flex-col gap-4">

                    <ul className="max-w-md space-y-1 text-2xl text-gray-500 list-disc  dark:text-gray-400">
                        {recepti.map(el => (
                            <li key={el.id} className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="flex-1 min-w-0">
                                        <Link to={`/recept/${el.id}`} className="text-2xl font-medium text-gray-900 truncate dark:text-white">
                                        {el.ime}
                                        </Link>
                                        <p className="text-lg text-gray-500 truncate dark:text-gray-400">
                                        - {el.kategorija}
                                        </p>
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        kuhanje: {el.vrijeme} min
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
    );
;}

export default MyRecipesList;