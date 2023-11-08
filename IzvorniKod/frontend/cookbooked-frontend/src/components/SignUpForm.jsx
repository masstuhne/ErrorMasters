
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

function SignUpForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <form className="flex min-w-[28rem] min-h-[30rem] flex-col gap-4">
            <div>
              <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ime</label>
              <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ana" required/>
            </div>
            <div>
              <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Prezime</label>
              <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Anić" required/>
            </div>

            <div>
              <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefonski broj</label>
              <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="099 123 4567" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" required/>
            </div>

            <div>
              <div className="mb-2 block">
                  <Label htmlFor="email1" value="Vaš email" />
              </div>
              <TextInput id="email1" type="email" placeholder="ime_prezime@gmail.com" required />
            </div>

            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="username3" value="Korisničko ime" />
              </div>
              <TextInput id="username3" placeholder="Najbolja_Slastičarka" addon="@" required />
            </div>

            <div>
              <div className="mb-2 block">
                  <Label htmlFor="password1" value="Vaša lozinka" />
              </div>
              <TextInput id="password1" type="password" required />
            </div>
            <div></div>
            <Button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>Registracija</Button>
        </form>
    </div>


  );
}

export default SignUpForm;