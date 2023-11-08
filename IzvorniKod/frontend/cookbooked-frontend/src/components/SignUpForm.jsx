
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

function SignUpForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
        <form className="flex min-w-[28rem] min-h-[30rem] flex-col gap-4">
            <div>
            <div className="mb-2 block">
                <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
            </div>
            <div>
            <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput id="password1" type="password" required />
            </div>
            <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit">Submit</Button>
        </form>
    </div>


  );
}

export default SignUpForm;