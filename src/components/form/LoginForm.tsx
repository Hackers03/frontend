import { FormEvent } from "react";
import Input, { type InputProps } from "@/components/Input";

interface props {
    submitHandler: (event: FormEvent<HTMLFormElement>) => void;
    NotSigned: () => void;
    error?: string;
}


const loginFields: InputProps[] = [
  {
    name: 'email',
    label: 'email',
    placeholder: 'example@gmail.com',
    type: 'email',
    required: true,
  },
  { 
    name: 'password',
    label: 'password',
    placeholder: 'enter your password',
    type: 'password',
    required: true,
  }
]

const LoginForm: React.FC<props> = ({submitHandler, NotSigned, error}) => {
    return (
        <form
          onSubmit={submitHandler}
          className="min-h-[75vh] w-[80%] md:w-1/2 xl:w-[40%] bg-transparent flex flex-col justify-center items-center rounded-lg border-gray-500/20 p-3 sm:border sm:shadow-2xl sm:backdrop-blur-lg"
        >
          <div>
            <span className="text-red-600">{error}</span>
          </div>
          {loginFields.map((field, index) => (
            <Input 
              type={field.type}
              name={field.name}
              label={field.label}
              required={field.required || false}
              placeholder={field.placeholder || ""}
              key={index}
            />
          ))}

          <button
            type="submit"
            className="m-2 bg-blue-500/95 py-2 px-4 rounded-full"
          >
            Submit
          </button>

          <div className="flex flex-col py-10">
            <p>Not signed in yet?</p>
            <button
              onClick={NotSigned}
              className=""
            >
              Register
            </button>
          </div>
        </form>
    );
}

export default LoginForm;