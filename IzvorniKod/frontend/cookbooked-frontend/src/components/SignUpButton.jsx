import { Link, useMatch, useResolvedPath } from "react-router-dom"

function SignUpButton() {
    return (
        <a href="/prijava">
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Prijava</button>
        </a>
        );
}

// ovo još nisam sigurna a nam treba, msm da da, ak budemo to koristili onda svaki Link treba zamijeniti sa CustomLink
// function CustomLink({ to, children, ...props}) {
//     const resolvedPath = useResolvedPath(to);
//     const isActive = useMatch({ path: resolvedPath.pathname, end: true})
//     return (
//         <Link to={to} {...props}>
//             {children}
//         </Link>

//     );
// }

export default SignUpButton;