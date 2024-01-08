function LinkBox({link, children}) {
    return (
        <div className="p-2">
            <a href={link} className="inline-flex items-center justify-center p-5 text-base font-medium text-gray-700 rounded-lg bg-gray-100 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
                <span className="w-full">{children}</span>
                <svg className="w-4 h-4 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a> 
        </div>
    );
}

export default LinkBox;