import { useEffect } from "react";
import AdminNavBar from "../components/navbars/AdminNavBar";
import UserNavBar from "../components/navbars/UserNavBar";
import { DashboardForAdmins, DashboardForUsers } from "../features/dashboard";
import { useQuestionList } from "../features/questions";
import { useCategoryList } from "../features/questions";
import { useCategoryWithQuestionsList } from "../features/questions";
import { useUser } from "../context/UserContext"; // Assuming you have a context providing the user

const DashboardPage: React.FC = () => {
  const { questions, fetchData } = useQuestionList();
  const { categories, fetchCategories } = useCategoryList();
  const { categoriesWithQuestions, fetchCategoriesWithQuestions } =
    useCategoryWithQuestionsList();
  const { user } = useUser(); // Get the logged-in user's info

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchCategoriesWithQuestions();
  }, []); // Avoid infinite renders by not adding fetchData in the dependency array

  // Redirect if user is not authorized (can be handled here or in route config)
  if (!user) {
    return <p>Loading...</p>; // or redirect to login
  }

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Conditional Navbar based on user role */}
      {user.isAdmin ? (
        <>
          <AdminNavBar fetchData={fetchData} categories={categories} />
          <DashboardForAdmins
            questions={questions}
            fetchData={fetchData}
            categories={categories}
          />
        </>
      ) : (
        <>
          <UserNavBar categoriesWithQuestions={categoriesWithQuestions} />
          <DashboardForUsers
            questions={questions}
            fetchData={fetchData}
            categories={categories}
          />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
