import React, { useState } from "react";
import { Category } from "..";
import Select from "react-select";

interface CategoryDropDownProps {
  categories: Category[];
  selectedCategories: Category[]; //An array to store selected categories
  setSelectedCategories: (value: Category[]) => void;
  isDisabled: boolean;
}

const CategoryDropDown: React.FC<CategoryDropDownProps> = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  isDisabled,
}) => {
  // Convert the categories into the format that react-select expects
  const options = categories.map((category) => ({
    value: category.name,
    label: category.displayName,
  }));

  // Initialize the value directly based on selectedCategories
  const initialValue = selectedCategories.map((category) => ({
    value: category.name,
    label: category.displayName,
  }));

  // State to hold the current selected value
  const [value, setValue] =
    useState<{ value: string; label: string }[]>(initialValue);

  // Handle changes to the selected categories
  const handleChange = (selectedOptions: any) => {
    // If no options are selected, set to an empty array
    const updatedCategories = selectedOptions || [];
    setValue(updatedCategories); // Update local state
    setSelectedCategories(
      updatedCategories.map(
        (option: any) =>
          categories.find((category) => category.name === option.value)!
      )
    );
  };

  // // Determine which options are currently selected
  // const value = options.filter((option) =>
  //   selectedCategories.some((category) => category.name === option.value)
  // );

  return (
    <div>
      <label className="font-semibold">Categories</label>
      <div className="relative mt-1 shadow-md">
        <Select
          isMulti
          options={options}
          value={value} // Use pre-calculated value
          onChange={handleChange}
          isDisabled={isDisabled}
          classNamePrefix="react-select" // Optional: Customize class prefix for styling
          placeholder="Select categories..."
          styles={{
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

export default CategoryDropDown;
