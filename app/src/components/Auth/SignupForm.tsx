import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData?.password !== formData?.confirmPassword) {
      setError("'Password' does not match 'Confirm Password'");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/signup",
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
      // className="signup-form"
      className="bg-white flex flex-col gap-4 md:w-[40%] w-[80%] mx-auto p-4 rounded-sm shadow-xl"
    >
      <h2 className="text-3xl font-bold w-full text-center">Signup</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="p-2 bg-white rounded border border-gray-300 focus:outline-none"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="p-2 bg-white rounded border border-gray-300 focus:outline-none"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        className="p-2 bg-white rounded border border-gray-300 focus:outline-none"
      />

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        className="p-2 bg-white rounded border border-gray-300 focus:outline-none"
      />

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 w-full rounded-md text-white"
      >
        Sign Up
      </button>

      <div className="text-sm text-gray-400 mx-auto">
        Already a user?{" "}
        <span
          className="cursor-pointer hover:text-blue-600 font-bold"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </span>
      </div>
    </form>
  );
};

export default SignupForm;
