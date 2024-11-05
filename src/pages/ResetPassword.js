import React, { useState, useEffect } from "react";
import { message } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
import COVER_IMAGE from "../assets/image-login-room.jpg";
import LOGO_IMAGE from "../assets/final-16.png";
import { useForm } from "react-hook-form";
import "../App.css";

const ResetPassword = () => {

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



 


  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-start">
      <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col">
        <div className="absolute top-[25%] left-[10%] flex flex-col">
          <h1 className="text-3xl lg:text-4xl text-white font-bold my-4">
            Welcome To Moka Hotel
          </h1>
          <p className="text-sm lg:text-base text-white font-normal">
            Moka Vietnam Hotel Chain Management System
          </p>
        </div>
        <img src={COVER_IMAGE} className="w-full h-full object-cover" alt="Cover" />
      </div>

      <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[#f5f5f5] flex flex-col p-6 lg:p-20 justify-between items-center">
        <div className="w-full max-w-[500px] flex items-center mx-auto mb-8 lg:mb-0">
          <img
            src={LOGO_IMAGE}
            className="w-12 h-12 lg:w-16 lg:h-16 object-cover mr-2"
            alt="Logo"
          />
          <h1 className="text-lg lg:text-xl text-[#060606] font-semibold">
            Moka Hotel System
          </h1>
        </div>

        <div className="w-full flex flex-col max-w-[500px]">
          <form onSubmit="">
            <div className="w-full flex flex-col mb-2">
              <h3 className="text-2xl lg:text-3xl font-semibold mb-2">You Forgot Password</h3>
              <p className="text-sm lg:text-base mb-2">
              You forgot your password. Please enter your email to retrieve it.
              </p>
            </div>

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

              
            </div>

          

            <div className="w-full flex flex-col my-4">
              <button
                type="submit"
                className="w-full text-white bg-[#060606] font-semibold rounded-md my-2 p-2 text-center flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <i className="fa-solid fa-sync fa-spin"></i>
                ) : (
                  "Send Mail"
                )}
              </button>
            </div>
          </form>

          

         

          
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
