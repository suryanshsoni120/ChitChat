import React from "react";
import { useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { handleRegister } = useAuth();

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src="/logo.png" className="w-30 h-30 p-4" alt="Logo" />
      <div>
        <h1 className="text-4xl font-bold text-[#db1a5a]">Get Started!</h1>
        <p className="text-xl pt-3 text-center">Create your account</p>
      </div>
      <div className="w-[600px] p-8">
        <form
          className="flex flex-col p-4 border-2 border-[#282939] rounded-xl shadow-xl bg-[#f5f5f5] text-[#282939] text-xl"
          onSubmit={(e) => {
            handleRegister(e, credentials);
          }}
        >
          <div className="flex flex-col gap-2 p-2">
            <label className="font-bold">Name:</label>
            <input
              required
              type="text"
              name="name"
              value={credentials.name}
              placeholder="Enter your name..."
              onChange={(e) => {
                handleInputChange(e);
              }}
              className="rounded-xl p-2 text-xl text-[#282939] bg-[#f5f5f5] border-2 border-[#db1a5a]"
            />
          </div>

          <div className="flex flex-col gap-2 p-2">
            <label className="font-bold">Email:</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={credentials.email}
              onChange={(e) => {
                handleInputChange(e);
              }}
              className="rounded-xl p-2 text-xl text-[#282939] bg-[#f5f5f5] border-2 border-[#db1a5a]"
            />
          </div>

          <div className="flex flex-col gap-2 p-2">
            <label className="font-bold">Password:</label>
            <input
              required
              type="password"
              name="password1"
              placeholder="Enter a password..."
              value={credentials.password1}
              onChange={(e) => {
                handleInputChange(e);
              }}
              className="rounded-xl p-2 text-xl text-[#282939] bg-[#f5f5f5] border-2 border-[#db1a5a]"
            />
          </div>

          <div className="flex flex-col gap-2 p-2">
            <label className="font-bold">Confirm password:</label>
            <input
              required
              type="password"
              name="password2"
              placeholder="Confirm your password..."
              value={credentials.password2}
              onChange={(e) => {
                handleInputChange(e);
              }}
              className="rounded-xl p-2 text-xl text-[#282939] bg-[#f5f5f5] border-2 border-[#db1a5a]"
            />
          </div>

          <div className="flex flex-col gap-4 p-2">
            <input
              className="rounded-full cursor-pointer p-4 text-xl text-white bg-[#db1a5a] hover:bg-[#A01B49] transition duration-300 ease-in-out"
              type="submit"
              value="Register"
            />
          </div>

          <p className="text-center">
            Already have an account? Login{" "}
            <Link to="/login" className="text-[#40e0d0]">
              here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
