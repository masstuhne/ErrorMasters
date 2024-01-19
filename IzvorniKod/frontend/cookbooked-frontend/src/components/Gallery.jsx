function Gallery() {
    return (
        <div id="gallery" className="relative h-screen w-screen" data-carousel="slide">
            <div className="z-10 relative overflow-hidden h-full">
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://img.freepik.com/free-photo/assortment-pieces-cake_114579-30728.jpg?w=2000&t=st=1704545794~exp=1704546394~hmac=830ff889ad8c4d5a50f310c0ef0674f085ec15a78760728895b19ae76dc3a815" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""></img>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
                    <img src="https://img.freepik.com/free-photo/sponge-cake-with-strawberries-top_144627-45517.jpg?w=2000&t=st=1704545831~exp=1704546431~hmac=072e220f16689837ab9510d4f25adbdb565b07e36cc65eb7f2f3238d8e0ed16e" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""></img>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                    <img src="https://img.freepik.com/free-photo/decorating-delicious-homemade-eclairs-with-chocolate-peanuts_155003-4401.jpg?w=2000&t=st=1704545862~exp=1704546462~hmac=17425e92b91d78e2ad05873368c2e6c411eec082cf364858a28fd943171feeb5" className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""></img>
                </div>
            </div>
            <button type="button" className="absolute top-0 start-0 z-20 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                    </svg>
                    <span className="sr-only">Previous</span>
                </span>
            </button>
            <button type="button" className="absolute top-0 end-0 z-20 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="sr-only">Next</span>
                </span>
            </button>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-70 font-normal p-7 rounded-md z-20 text-5xl">
                Dobrodošli!
            </div>
        </div>
    );
}

export default Gallery;