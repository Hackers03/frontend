export interface InputProps {
  type: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value?: string;
  name: string;
  label?: string
}

const Input: React.FC<InputProps> = ({
  type,
  placeholder,
  required,
  className,
  name,
  label
}) => {
  return (
    <div className="py-3">
      {label &&
        <div className="flex opacity-100 group-hover:text-yellow-500 transition-opacity relative top-3 left-3">
            <label htmlFor={name} className="px-2 bg-white text-xl text-blue-500">{label}</label>
        
        </div>
      }

      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        id={name}
        className="bg-transparent py-2 px-5 xl:px-10 rounded-3xl focus:ring-2 focus:border-transparent ring-blue-500 border text-black"
      />
    </div>
  );
};

export default Input;
