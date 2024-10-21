import React from "react";

interface ComplexityDropDownProps {
    currComplexity: string
    setComplexityValue: (value: string) => void;
    isDisabled: boolean
}

const ComplexityDropDown: React.FC<ComplexityDropDownProps> = ({
  currComplexity, 
  setComplexityValue,
  isDisabled
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setComplexityValue(event.target.value);
    }
    return (
      <div>
          <label className="font-semibold">Complexity Level</label>
          <div className="relative mt-1 shadow-md">
            <select
              name="complexity"
              id="complexity"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-800 ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-opacity-50 focus:ring-black sm:text-sm sm:leading-6"
              defaultValue={currComplexity}
              onChange={handleChange}
              disabled={isDisabled}
            >
              <option value="" disabled hidden>
                Choose a complexity level
              </option>
              <option value="EASY" className="text-green ">
                Easy
              </option>
              <option value="MEDIUM" className="text-orange-500">
                Medium
              </option>
              <option value="HARD" className="text-red-700">
                Hard
              </option>
            </select>
          </div>
        </div>
    );
};

export default ComplexityDropDown;