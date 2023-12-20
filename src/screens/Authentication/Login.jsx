import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email } = data;
    if (!emailRegex.test(email)) {
      toast.dismiss();
      toast.error("Invalid email address");
      return;
    }
    toast.loading("Logging In...");
    try {
      const response = await axios.post(
        `http://127.0.0.1:3002/api/v1/student/login`,
        data
      );
      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('sid', response.data.user.sid);
      toast.dismiss();
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      toast.dismiss();
      console.log(err.response.data.msg);
      toast.error(err.response.data.msg);
    }
    setData({
      email: "",
      password: "",
    });
  };

  const setValueHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <section className="flex justify-center min-h-[90vh] items-center w-full bg-blue-50">
      <div className="my-10 w-[40%] bg-white flex justify-center items-center flex-col py-6 px-5 shadow-md rounded-md">
        <p className="my-6 text-2xl font-semibold">Login to Your Account</p>
        <div className="w-full">
          <form className="px-8 pt-6 mb-4 bg-white">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-semibold text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={data.email}
                onChange={setValueHandler}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-semibold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={data.password}
                onChange={setValueHandler}
                required
              />
            </div>
            <Link to={"/forget-password"}>
              <p className="mt-5 mb-3 text-sm text-right cursor-pointer hover:underline">
                Forget Password?
              </p>
            </Link>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded-md my-3 transition_fade hover:shadow-lg shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 bg-gradient-to-tr from-blue-600 to-blue-700 w-[50%]"
                type="submit"
                onClick={handleSubmit}
              >
                Login Now
              </button>
            </div>
            <Link to={"/register"}>
              <p className="flex items-center justify-center mt-5 text-sm cursor-pointer hover:underline">
                Don't have an account? Register now!
              </p>
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
