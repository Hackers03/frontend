import { FormEvent } from "react";
import Input, { type InputProps } from "@/components/Input";

interface props {
    submitHandler: (event: FormEvent<HTMLFormElement>) => void
    AlreadySigned: () => void
}

const registerFields: InputProps[] = [
  {
    name: 'nickname',
    label: 'nickname',
    placeholder: 'nickname',
    type: 'text',
    required: true,
  },
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
  },
  { 
    name: 're_password',
    label: 'password',
    placeholder: 'confirm your password',
    type: 'password',
    required: true,
  }
]
const RegisterForm: React.FC<props> = ({submitHandler, AlreadySigned}) => {
    return (
        <form
        onSubmit={submitHandler}
        className="min-h-[75vh] w-[80%] md:w-1/2 xl:w-[40%] bg-transparent flex flex-col justify-center items-center rounded-lg border-gray-500/20 p-3 sm:border sm:shadow-2xl sm:backdrop-blur-lg"
      >
        {registerFields.map((field, index) => (
          <Input 
            type={field.type}
            name={field.name}
            label={field.label}
            required={field.required}
            placeholder={field.placeholder}
            key={index}
          />
        ))}

        <button
          type="submit"
          className="m-2 bg-blue-400 py-2 px-4 rounded-full"
        >
          Submit
        </button>

        <div className="py-10 flex flex-col">
          <p>Already signed up?</p>
          <button
            onClick={AlreadySigned}
            className=""
          >
            Sign in
          </button>
        </div>
      </form>
    );
}

export default RegisterForm;