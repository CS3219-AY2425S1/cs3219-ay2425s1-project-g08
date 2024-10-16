import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons/faCommentsDollar";

interface PasswordInputTextBoxProps {
    currInput: string
    setInputValue: (value: string) => void
}

const PasswordInputTextBox: React.FC<PasswordInputTextBoxProps> = ({
  currInput,
  setInputValue
}) => {
  const [showPassword, setShowPassword] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }

    return (
      <div className="mt-1 shadow-md relative justify-stretch">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          defaultValue={currInput}
          className='block w-full rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6'
          onChange={handleChange}
        ></input>
        <button
          className="flex absolute right-2 top-1/4"
          type="button"
          onClick={togglePasswordVisibility}
        >
          <FontAwesomeIcon 
            icon={showPassword ? faEye : faEyeSlash}
            className="bg-white px-1"
            style={{color: 'gray'}}
          />
        </button>
      </div>
    );
};

export default PasswordInputTextBox;