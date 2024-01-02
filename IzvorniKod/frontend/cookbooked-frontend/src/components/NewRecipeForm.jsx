import Select from 'react-select';

function NewRecipeForm() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex min-w-[110rem] min-h-[40rem] flex-row gap-4">
                <div className='min-w-[50rem] flex flex-col gap-4'>
                    <div className="relative max-w-[40rem]">
                        <input type="text" id="naslov_recepta" aria-describedby="floating_helper_text" className="block rounded-t-lg px-10.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                        <label htmlFor="naslov_recepta" className="absolute text-x1 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto" required>Naslov recepta</label>
                    </div>
                    <div className="relative max-w-[40rem]">
                        <Select
                            defaultValue={"0"}
                            isMulti
                            name="Kuhinja"
                            options={"0"}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Odaberi kuhinju"
                        />
                    </div>
                    <div className="relative max-w-[40rem]">
                        <Select
                            defaultValue={"0"}
                            isMulti
                            name="Kategorija"
                            options={"0"}
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Odaberi kategoriju"
                        />
                    </div>
                    <div className="relative max-w-[40rem]">
                        <Select
                            defaultValue={"0"}
                            isMulti
                            name="Sastojci"
                            options={"0"}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Odaberi sastojke"
                        />
                    </div>
                    <div className="relative max-w-[40rem]">
                        <label htmlFor="priprema" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Koraci pripreme</label>
                        <textarea id="priprema" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Opiši pripremu..." required></textarea>
                    </div>
                    <div className="relative max-w-[40rem]">
                        <label htmlFor="vrijeme_kuhanja" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vrijeme kuhanja u minutama: </label>
                        <input type="number" id="vrijeme_kuhanja" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-[15rem]" placeholder="45" required/>
                    </div>
                    <div className="relative max-w-[40rem]">
                        <Select
                            defaultValue={"0"}
                            isMulti
                            name="Oznake"
                            options={"0"}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Odaberi oznake"
                        />
                    </div>
                </div>
                <div className='min-w-[50rem] flex flex-col gap-6'>
                    <div>
                        <label className="block mb-2 text-xl font-medium text-gray-900 dark:text-white" htmlFor="unos_slika">Dodajte slike: </label>
                        <div className="flex items-center justify-center w-full" id='unos_slika'>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div> 
                    </div>
                    <div>
                        <label className="block mb-2 text-xl text-sm font-medium text-gray-900 dark:text-white" htmlFor="unos_videa">Dodajte video: </label>
                        <div className="flex items-center justify-center w-full" id='unos_videa'>
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div> 
                    </div>

                </div>
            </form>
        </div>

    )

};

export default NewRecipeForm;