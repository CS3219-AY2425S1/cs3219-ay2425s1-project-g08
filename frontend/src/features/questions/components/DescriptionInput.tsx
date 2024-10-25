import React from "react";

interface DescriptionInputProps {
    currDescription: string
    setDescriptionValue: (value: string) => void;
    isDisabled: boolean
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  currDescription,
  setDescriptionValue,
  isDisabled
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionValue(event.target.value);
    }
    return (
        <div className="mt-2">
          <label className="font-semibold">Question description</label>
          <div className="relative mt-1 shadow-md">
            <textarea
              id="description"
              rows={3}
              className="block w-full resize-none rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6"
              defaultValue={currDescription}
              onChange={handleChange}
              disabled={isDisabled}
            ></textarea>
          </div>
        </div>
    );
};

export default DescriptionInput;