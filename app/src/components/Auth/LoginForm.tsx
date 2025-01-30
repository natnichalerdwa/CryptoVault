import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./LoginForm.css"; // Ensure the CSS file is consistent

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log({ formData });
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        formData
      );

      if (![200, 201].includes(response.status)) {
        throw new Error("Failed to sign up. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white flex flex-col gap-4 md:w-[40%] w-[80%] mx-auto p-4 rounded-sm shadow-xl"
    >
      <h2 className="text-3xl font-bold w-full text-center">Log In</h2>

      {error && <p className="error-message">{error}</p>}

      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
        required
        className="p-2 bg-white rounded border border-gray-300 focus:outline-none"
      />

      <input
        type="password"
        name="password"
        placeholder="Enter password"
        value={formData.password}
        onChange={handleChange}
        required
        className="p-2 bg-white rounded border border-gray-300 focus:outline-none"
      />

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 w-full rounded-md text-white"
      >
        LogIn
      </button>

      <div className="text-sm text-gray-400 mx-auto">
        Not registered?{" "}
        <span
          className="cursor-pointer hover:text-blue-600 font-bold"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Signup
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
