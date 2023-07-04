import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Login = () => {
  const { user, handleUserLogin } = useAuth();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <img src="/logo.png" className="w-50 h-50 p-6" alt="Logo" />
      <div>
        <h1 className="text-4xl font-bold text-[#db1a5a]">Welcome Back!</h1>
        <p className="text-xl pt-3 text-center">Login to your account</p>
      </div>
      <div className="w-[600px] p-8">
        <form
          className="flex flex-col p-4 border-2 border-[#282939] rounded-xl shadow-xl bg-[#f5f5f5] text-[#282939] text-xl"
          onSubmit={(e) => {
            handleUserLogin(e, credentials);
          }}
        >
          <div className="flex flex-col gap-4 p-2">
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

          <div className="flex flex-col gap-4 p-2">
            <label className="font-bold">Password:</label>
            <input
              required
              type="password"
              name="password"
              placeholder="Enter password..."
              value={credentials.password}
              onChange={(e) => {
                handleInputChange(e);
              }}
              className="rounded-xl p-2 text-xl text-[#282939] bg-[#f5f5f5] border-2 border-[#db1a5a]"
            />
          </div>

          <div className="flex flex-col gap-4 p-2">
            <input
              type="submit"
              value="Login"
              className="rounded-full cursor-pointer p-4 text-xl text-white bg-[#db1a5a] hover:bg-[#A01B49] transition duration-300 ease-in-out"
            />
          </div>
          <p className="text-center">
            Dont have an account? Register{" "}
            <Link to="/register" className="text-[#40e0d0]">
              here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
