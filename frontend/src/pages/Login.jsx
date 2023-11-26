/* eslint-disable no-unused-vars */
// src/components/RegisterForm.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext'
import axios from "axios";
const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the API to log in
    try {
      const response = await axios.post(
        "http://localhost:5001/auth/login",
        formData
      );
      if (response.status === 200) {
        console.log("Login successful:", response.data);
        login(response.data.user.name)
        navigate('/chat')
      } else {
        setError(response.data.message || "Error logging in.");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
