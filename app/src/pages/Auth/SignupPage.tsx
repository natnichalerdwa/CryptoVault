import React from "react";
import SignupForm from "../../components/Auth/SignupForm";

const SignupPage: React.FC = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
