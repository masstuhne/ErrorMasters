
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { Link } from 'react-router-dom';

function SignInForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <form className="flex min-w-[28rem] min-h-[30rem] flex-col gap-4">
            <div>
            <div className="mb-2 block">
                <Label htmlFor="email1" value="Vaš email" />
            </div>
            <TextInput id="email1" type="email" placeholder="ime_prezime@gmail.com" required />
            </div>
            <div>
            <div className="mb-2 block">
                <Label htmlFor="password1" value="Vaša lozinka" />
            </div>
            <TextInput id="password1" type="password" required />
            </div>
            <div></div>
            <Button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Prijava</Button>
            <div>
                Nemate korisnički račun?
                <Link to="/registracija" className="ml-1 font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Registracija
                </Link>
                .
            </div>
            
        </form>
    </div>


  );
}

export default SignInForm;