import React from "react";

interface InputTextBoxProps {
    currInput: string
    setInputValue: (value: string) => void
}

const InputTextBox: React.FC<InputTextBoxProps> = ({
  currInput,
  setInputValue
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }
    return (
      <div className="mt-1 shadow-md">
        <input
          type="text"
          defaultValue={currInput}
          className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6"
          onChange={handleChange}
        ></input>
      </div>
    );
};

export default InputTextBox;