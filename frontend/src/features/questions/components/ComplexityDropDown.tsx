import React from "react";
import Select from "react-select";

interface ComplexityDropDownProps {
    complexityValue: string
    setComplexityValue: (value: string) => void;
    isDisabled: boolean
}

const ComplexityDropDown: React.FC<ComplexityDropDownProps> = ({
  complexityValue,
  setComplexityValue,
  isDisabled
}) => {

    const options = [
      { value: 'EASY', label: 'Easy', color: 'text-green-500' },
      { value: 'MEDIUM', label: 'Medium', color: 'text-orange-500' },
      { value: 'HARD', label: 'Hard', color: 'text-red-700' },
    ]

    const value = options.find(option => option.value === complexityValue) || null;

    const handleChange = (selectedComplexity: any) => {
      const currComplexity = selectedComplexity || "";
      setComplexityValue(currComplexity.value);
    }

    return (
      <div>
          <label className="font-semibold">Complexity Level</label>
          <div className="relative mt-1 shadow-md">

            <Select
              isMulti={false}
              options={options}
              value={value}
              onChange={handleChange}
              isDisabled={isDisabled}
              classNamePrefix="react-select" // Optional: Customize class prefix for styling
              placeholder="Select complexity..."
              styles={{
                option: (provided, state) => ({
                  ...provided,
                  color: state.data.color, // Set color based on option
                }),
                control: (provided) => ({
                  ...provided,
                  border: "1px solid #ccc",
                  boxShadow: "none",
                  "&:hover": {
                    border: "1px solid #aaa",
                  },
                }),
              }}
            />
          </div>
        </div>
    );
};

export default ComplexityDropDown;