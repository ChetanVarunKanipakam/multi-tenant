// LoginComponent.jsx
import React, { useEffect, useState } from "react";
import { login, getScreens } from "./api";
import { getToken, saveToken } from "./auth";
import MainComponent from "./MainComponent";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import './login.module.css';

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  


  const handleInputBox = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleLogIn = () => {
    const emailPattern = /^([A-Za-z0-9_\-\.])+@([A-Za-z0-9_\-\.])+\.[A-Za-z]{2,4}$/;
    setValidEmail(!emailPattern.test(data.email));
    setValidPassword(data.password === "");
    if (
      emailPattern.test(data.email) &&
      data.password !== ""
    ) {
      handleApiCalling(data);
    }
  };

  const handleApiCalling = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/auth/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successfully", { position: "top-center" });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.response?.data.message === "email or password doesn't exists") {
        setMessage(true);
      }
    }
  };

  return (
    <>
      {loading && <h1>loading...</h1>}
      <div className="main">
        

        <div className="login_container">
          <h2 className="form_title">Sign in to your account</h2>
          <form onSubmit={(e) => e.preventDefault()} className="login_form">
            {message && (
              <div className="div_wrapper">
                <span className="message">User doesn't exist</span>
              </div>
            )}
            <div className="div_wrapper">
              <div className="form_input_box">
                <label className="form_data_wrapper">
                  <span className="input_title">Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="  Enter your email"
                    className="input_box"
                    onChange={handleInputBox}
                  />
                </label>
                {validEmail && (
                  <span className="invalid_user">Invalid Email Address</span>
                )}
              </div>
            </div>

            <div className="div_wrapper">
              <div className="form_input_box">
                <label className="form_data_wrapper">
                  <span className="input_title">Password</span>
                  <div className="password_box">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="  Enter your password"
                      name="password"
                      onChange={handleInputBox}
                      className="password_input_box"
                    />
                    
                  </div>
                </label>
                {validPassword && (
                  <span className="invalid_user">*Please Enter Your Password</span>
                )}
              </div>
            </div>

            <div className="forgot_password_box">
              <label htmlFor="checkbox" className="remember_me">
                <input type="checkbox" name="checkbox" id="checkbox" />
                <span className="remember_me_text">Remember me</span>
              </label>
            </div>

            <div className="form_input_box">
              <button className="login_button" onClick={handleLogIn}>
                Login
              </button>
            </div>

      
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;

