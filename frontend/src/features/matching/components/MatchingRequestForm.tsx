import { Category } from "../../questions";
import { MatchingRequestFormState } from "../types/MatchingRequestFormState";
import Select from "react-select";

interface MatchingRequestFormProps {
  handleSubmit: () => Promise<void>;
  formData: MatchingRequestFormState;
  setFormData: React.Dispatch<React.SetStateAction<MatchingRequestFormState>>;
  categoriesWithQuestions: Array<Category>;
}

const difficulty = [
  { value: "EASY", label: "Easy" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HARD", label: "Hard" },
];

// MatchingRequestForm.tsx
const MatchingRequestForm: React.FC<MatchingRequestFormProps> = ({
  handleSubmit,
  formData,
  setFormData,
  categoriesWithQuestions,
}) => {
  // Transform categoriesWithQuestions to the format needed for react-select
  const categories = categoriesWithQuestions.map((category) => ({
    value: category.name, // Assuming 'name' is the property you want to use
    label: category.displayName || category.name, // Use displayName or fallback to name
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        // Validate form data
        if (!formData.category || !formData.difficulty) {
          alert("Please select both a topic and a difficulty level.");
          return; // Stop submission if topic or difficulty is not set
        }

        handleSubmit();
      }}
      className="flex flex-col space-y-6" // Use consistent spacing for form fields
    >
      <div className="text-center text-gray-600">
        Please fill out the form to find a suitable match.
      </div>
      {/* Topic input */}
      <div className="flex items-center space-x-4">
        <label htmlFor="topic" className="w-1/3 text-right">
          Topic:
        </label>
        <Select
          id="category"
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData, // Spread the previous formData to keep the difficulty
              category: e.value, // Replace "new topic" with the actual value you want
            }))
          }
          options={categories}
        />
      </div>

      {/* Difficulty input */}
      <div className="flex items-center space-x-4">
        <label htmlFor="difficulty" className="w-1/3 text-right">
          Difficulty:
        </label>
        <Select
          id="difficulty"
          onChange={(e) =>
            setFormData((prevFormData) => ({
              ...prevFormData, // Spread the previous formData to keep the difficulty
              difficulty: e.value, // Replace "new topic" with the actual value you want
            }))
          }
          options={difficulty}
        />
      </div>

      {/* Submit button */}
      <div className="flex justify-center mb-4">
        <button
          type="submit"
          className="px-6 py-2 text-white bg-black rounded hover:bg-gray-700"
        >
          Find Match
        </button>
      </div>
    </form>
  );
};

export default MatchingRequestForm;
