import React, { useEffect } from "react";
import { Category } from "..";
import Select from "react-select";

interface CategoryDropDownProps {
  rawCategories?: string[]; // Used for categories from the question directly
  categories: Category[];
  selectedCategories: Category[]; // An array to store selected categories
  setSelectedCategories: (value: Category[]) => void;
  isDisabled: boolean;
}

const CategoryDropDown: React.FC<CategoryDropDownProps> = ({
  rawCategories,
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

  // Initialize selectedCategories based on rawCategories
  useEffect(() => {
    if (rawCategories) {
      const initialValue = rawCategories.map((categoryName) => {
        const foundOption = options.find(
          (option) => option.value === categoryName
        );
        return foundOption || { value: categoryName, label: categoryName }; // Fallback
      });

      // Only set selectedCategories if they differ
      const selectedCategoriesToSet = initialValue.map((option) => {
        const category = categories.find((cat) => cat.name === option.value);
        return category || { name: option.value, displayName: option.label }; // Fallback
      });

      setSelectedCategories(selectedCategoriesToSet);
    }
  }, []);

  // Handle changes to the selected categories
  const handleChange = (selectedOptions: any) => {
    const updatedCategories = selectedOptions || [];
    setSelectedCategories(
      updatedCategories.map(
        (option: any) =>
          categories.find((category) => category.name === option.value)!
      )
    );
  };

  const value = options.filter((option) =>
    selectedCategories.some((category) => category.name === option.value)
  );

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
