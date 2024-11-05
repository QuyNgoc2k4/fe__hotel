// src/components/EnterEmailForm.js
import React, { useState } from "react";
import { message } from "antd";
import { useForm } from "react-hook-form";
import COVER_IMAGE from "../assets/image-login-room.jpg";
import LOGO_IMAGE from "../assets/final-16.png";

const EnterEmailForm = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onFinish = async (data) => {
    setLoading(true);
    try {
      await onSubmit(data.email);
    } catch (error) {
      message.error("Đã xảy ra lỗi khi gửi OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row items-start">
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[#f5f5f5] flex flex-col p-6 lg:p-20 justify-between items-center">
        <div className="w-full max-w-[500px] flex items-center mx-auto mb-8 lg:mb-0">
          <img src={LOGO_IMAGE} className="w-12 h-12 lg:w-16 lg:h-16 object-cover mr-2" alt="Logo" />
          <h1 className="text-lg lg:text-xl text-[#060606] font-semibold">
            Moka Hotel System
          </h1>
        </div>

        <div className="w-full flex flex-col max-w-[500px]">
          <form onSubmit={handleSubmit(onFinish)} className="w-full flex flex-col">
            <h3 className="text-2xl lg:text-3xl font-semibold mb-2">Forgot Password</h3>
            <p className="text-sm lg:text-base mb-4">
              You forgot your password. Please enter your email to retrieve it.
            </p>

            <input
              type="email"
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
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}

            <button
              type="submit"
              className="w-full text-white bg-[#060606] font-semibold rounded-md my-4 p-2 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <i className="fa-solid fa-sync fa-spin"></i> : "Send OTP"}
            </button>
          </form>
        </div>
        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex items-center justify-center">
            <p className="text-sm font-semibold text-[#060606]">
              Your account has an issue.
              <span className="font-semibold underline underline-offset-2 cursor-pointer">
                Please contact the manager for assistance.
              </span>
            </p>
          </div>
        </div>
      </div>
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
    </div>
  );
};

export default EnterEmailForm;
