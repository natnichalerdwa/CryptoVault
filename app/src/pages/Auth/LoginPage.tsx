import React from "react";
import LoginForm from "../../components/Auth/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
