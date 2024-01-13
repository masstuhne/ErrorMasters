import { Link } from "react-router-dom"
import RedAlert from "./RedAlert";
function RecipeList({headline, recipes}) {

    return (
        <>
              <div className="flex items-center justify-center flex-col mt-[10rem] w-screen gap-10">
                <div className="flex items-center justify-center flex-row min-w-[100rem]">
                  <div className="flex items-center justify-end gap-10"> {/* Fix: justify-end instead of justify-content: flex-end */}
                    <h2 className="mb-2 text-4xl font-semibold text-gray-900 dark:text-white">{headline}</h2>
                  </div>
                </div>

                {recipes ? (<RedAlert>Nemate svoje recepte</RedAlert>) : (

                <div className="flex w-screen min-h-[35rem] flex-col items-center justify-center gap-4">
                  <ul className="w-2/5 space-y-1 text-2xl text-gray-500 list-disc dark:text-gray-400">
                    {recipes.map((el) => (
                      <li key={el.id} className="py-3 sm:py-4 border-b border-gray-300">
                      </li>
                    ))}
                  </ul>
                </div>
                )}

              </div>
        </>
    );
;}

export default RecipeList;