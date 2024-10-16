import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthNavBar from "../components/AuthNavBar.tsx";
import WelcomeMessage from "../components/UserAuth/WelcomeMessage.tsx";
import InputBoxLabel from "../components/UserAuth/InputBoxLabel.tsx";
import InputTextBox from "../components/UserAuth/InputTextBox.tsx";
import useRegisterUser from "../hooks/useRegisterUser.tsx";
import { User } from "../types/User.tsx";
import PasswordInputTextBox from "../components/UserAuth/PasswordInputTextBox.tsx";
import { useUser } from "../context/UserContext.tsx";

const RegisterPage: React.FC = () => {
  const [usernameValue, setUsernameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Failed to create new user. Please try again.");
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const { registerUser } = useRegisterUser();

  /* Component's instance of registered user */
  const [registeredUser, setRegisteredUser] = useState<User | undefined>(undefined);
  /* User context */
  const { updateUser } = useUser();

  const isEmailValid = () => {
    if (!emailValue.endsWith('@gmail.com')) {
      return false;
    }
    return true;
  }

  const isPasswordValid = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return(regex.test(passwordValue));
  }

  const handleSubmit = async () => {
    //alert(isEmailValid());
    if (emailValue.length > 0 && !isEmailValid()) {
      setErrorMessage('Email address should end with "@gmail.com"');
      setShowErrorMessage(true);
      return;
    } else if (passwordValue.length > 0 && !isPasswordValid()) {
      setErrorMessage('Password should contain at least 8 characters with a mix of alphanumeric characters and at least 1 special character.');
      setShowErrorMessage(true);
      return;
    }

    setShowErrorMessage(false);
    console.log("Registering:", usernameValue);
    const newUser = await registerUser(
      usernameValue,
      emailValue,
      passwordValue,
      setRegisteredUser,
      setSuccess,
      setErrorMessage,
      setShowErrorMessage
    ); // Call the custom hook function

    console.log(newUser);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      updateUser(registeredUser);
      /* All new users are 'User' by default */
      navigate('/dashboardForUsers', { replace: true}); // Replace: true to clear back history
    }
  }, [success]);

  return (
    <div className="w-screen h-screen flex flex-col">
      <AuthNavBar />
      <div className="flex flex-col items-center justify-start flex-grow">
        <WelcomeMessage />
        
        <div className="mt-10 w-2/5 justify-start">
            {/* Username */}
            <div className="flex flex-col">
            <InputBoxLabel labelString="Username" />
            <InputTextBox currInput={""} setInputValue={setUsernameValue} />
            </div>

            {/* Email */}
            <div className="flex flex-col mt-5">
            <InputBoxLabel labelString="Email" />
            <InputTextBox currInput={""} setInputValue={setEmailValue} />
            </div>

            {/* Password */}
            <div className="flex flex-col mt-5">
            <InputBoxLabel labelString="Password" />
            <PasswordInputTextBox currInput={""} setInputValue={setPasswordValue} />
            </div>

            {showErrorMessage && (
              <p id="errorMessage" className="flex justify-center text-red-500 mt-2">
                * {errorMessage} *
              </p>
            )}
        </div>

        <button 
          className="bg-yellow rounded-[25px] py-1.5 px-10 mt-8 text-off-white hover:opacity-60"
          onClick={handleSubmit}
        >
          Register
        </button>

        <div className="flex flex-row w-2/5 mt-3">
            <p className="text-gray-600">Have an existing account?</p>
            <Link to="/login" replace={true}>
            <button className="mx-1 text-blue-600 hover:opacity-60">
                Login Now
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
