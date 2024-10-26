import React, { useState } from "react";
import { message } from "antd";
import { GoogleLogin } from "@react-oauth/google"; // Thêm phần này
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
import COVER_IMAGE from "../assets/image-login-room.jpg";
import LOGO_IMAGE from "../assets/final-16.png";
import { useForm } from "react-hook-form";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await authApi.login({
        email: values.email,
        password: values.password,
      });

      if (response.status === 201) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        message.error("Thông tin đăng nhập không hợp lệ.");
      } else {
        message.error("Đã xảy ra lỗi khi đăng nhập.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const googleToken = response.credential; // Lấy token từ Google
      console.log("Google ID Token:", googleToken);

      const res = await authApi.loginWithGoogle({ idToken: googleToken });
      if (res.data.status === "success") {
        message.success("Đăng nhập Google thành công!");
        localStorage.setItem("token", res.data.data.token);
        navigate("/dashboard");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("Đã xảy ra lỗi khi đăng nhập với Google.");
    }
  };

  const handleGoogleLoginFailure = () => {
    message.error("Đăng nhập Google thất bại.");
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-start">
      {/* Left section (Cover Image) */}
      <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col">
        <div className="absolute top-[25%] left-[10%] flex flex-col">
          <h1 className="text-3xl lg:text-4xl text-white font-bold my-4">
            Welcome To Moka Hotel
          </h1>
          <p className="text-sm lg:text-base text-white font-normal">
            Moka Vietnam Hotel Chain Management System
          </p>
        </div>
        <img src={COVER_IMAGE} className="w-full h-full object-cover" />
      </div>

      {/* Right section (Form) */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[#f5f5f5] flex flex-col p-6 lg:p-20 justify-between items-center">
        {/* Logo Section */}
        <div className="w-full max-w-[500px] flex items-center mx-auto mb-8 lg:mb-0">
          <img
            src={LOGO_IMAGE}
            className="w-12 h-12 lg:w-16 lg:h-16 object-cover mr-2"
          />
          <h1 className="text-lg lg:text-xl text-[#060606] font-semibold">
            Moka Hotel System
          </h1>
        </div>

        {/* Form Section */}
        <div className="w-full flex flex-col max-w-[500px]">
          <form onSubmit={handleSubmit(onFinish)}>
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-2">Login</h3>
              <p className="text-sm lg:text-base mb-2">
                Welcome Back! Please enter your details.
              </p>
            </div>

            {/* Input Fields */}
            <div className="w-full flex flex-col">
              <input
                type="text"
                placeholder="Email"
                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}

              <div className="input-2 flex items-center">
                <input
                  type={isShowPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                <i
                  className={
                    isShowPassword
                      ? "fa-solid fa-eye"
                      : "fa-solid fa-eye-slash"
                  }
                  onClick={() => setIsShowPassword(!isShowPassword)}
                ></i>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="w-full flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" className="w-4 h-4 mr-2" />
                <p className="text-sm">Remember me for 30 days</p>
              </div>
              <p className="text-sm font-medium cursor-pointer underline underline-offset-2">
                Forgot Password?
              </p>
            </div>

            {/* Buttons */}
            <div className="w-full flex flex-col my-4">
              <button
                type="submit"
                className="w-full text-white bg-[#060606] font-semibold rounded-md my-2 p-2 text-center flex items-center justify-center"
              >
                {loadingApi && <i className="fa-solid fa-sync fa-spin"></i>}
                &nbsp;Login
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="w-full flex items-center justify-center relative py-2">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="text-sm lg:text-lg absolute text-black/80 bg-[#f5f5f5] px-2">
              or
            </p>
          </div>

          {/* Google Login */}
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            useOneTap
          />

          {/* Sign Up Section */}
          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-semibold text-[#060606]">
              Don't have an account?{" "}
              <span className="font-semibold underline underline-offset-2 cursor-pointer">
                Sign up for free
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;