import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthNavBar from "../components/navbars/AuthNavBar.tsx";
import { WelcomeMessage } from "../features/authentication";
import { InputBoxLabel } from "../features/authentication";
import InputTextBox from "../components/InputTextBox.tsx";
import { PasswordInputTextBox } from "../features/authentication";
import useLoginUser from "../hooks/useLoginUser.tsx";
import { useUser } from "../context/UserContext.tsx";
import { useAuthenticateUser } from "../features/authentication";

const LoginPage: React.FC = () => {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Failed to create new user. Please try again."
  );
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { loginUser } = useLoginUser();
  const { authenticateUser } = useAuthenticateUser();
  /* Component's instance of registered user */
  /* User context */
  const { user } = useUser();

  const handleSubmit = async () => {
    console.log("submitted");
    console.log("Logging in:", emailValue);
    const newUser = await loginUser(
      emailValue,
      passwordValue,
      setSuccess,
      setErrorMessage,
      setShowErrorMessage
    ); // Call the custom hook function
    console.log(newUser);
  };

  useEffect(() => {
    if (user) {
      authenticateUser(setSuccess);
    }
  }, [user]);

  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      navigate("/dashboard", { replace: true }); // Replace: true to clear back history
    }
  }, [success]);

  return (
    <div className="w-screen h-screen flex flex-col overflow-y-auto">
      <AuthNavBar />
      <div className="flex flex-col items-center justify-start flex-grow">
        <WelcomeMessage />

        <div className="mt-10 w-2/5 justify-start">
          {/* Email */}
          <div className="flex flex-col">
            <InputBoxLabel labelString="Email" />
            <InputTextBox currInput={""} setInputValue={setEmailValue} />
          </div>

          {/* Password */}
          <div className="flex flex-col mt-5">
            <InputBoxLabel labelString="Password" />
            <PasswordInputTextBox
              currInput={""}
              setInputValue={setPasswordValue}
            />
          </div>

          {showErrorMessage && (
            <p
              id="errorMessage"
              className="flex justify-center text-red-500 mt-2"
            >
              * {errorMessage} *
            </p>
          )}
        </div>

        <Link to="/dashboard">
          <button className="mt-2 py-2 text-gray-700 hover:opacity-60">
            Forget Password?
          </button>
        </Link>

        <button
          className="bg-yellow rounded-[25px] py-1.5 px-10 mt-4 text-off-white hover:opacity-60"
          onClick={handleSubmit}
        >
          Login
        </button>

        <div className="flex flex-row w-2/5 mt-3">
          <p className="text-gray-600">Don't have an account?</p>
          <Link to="/register" replace={true}>
            <button className="mx-1 text-blue-600 hover:opacity-60">
              Register Instead
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
