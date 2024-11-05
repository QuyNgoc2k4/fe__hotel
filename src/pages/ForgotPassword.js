// src/pages/ForgotPassword.js
import React, { useState } from "react";
import EnterEmailForm from "../components/EnterEmailForm";
import EnterOtpForm from "../components/EnterOtpForm";
import { useNavigate, Link } from "react-router-dom";

import ResetPasswordForm from "../components/ResetPasswordForm";
import authApi from "../api/authApi";
import { message } from "antd";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [resetToken, setResetToken] = useState("");

    const handleEmailSubmit = async (email) => {
        try {
            const response = await authApi.forgotPassword(email);
            if (response.data.status === "success") {
                message.success(response.data.message);
                setEmail(email);
                setStep(2);
            } else {
                message.error("Đã xảy ra lỗi khi gửi OTP.");
            }
        } catch (error) {
            message.error("Lỗi khi gửi yêu cầu. Vui lòng thử lại.");
        }
    };

    const handleOtpSubmit = async (otp) => {
        try {
            const response = await authApi.verifyOtp({ email, otp });
            if (response.data.status === "success") {
                message.success(response.data.message);
                setResetToken(response.data.data.resetToken);
                setStep(3);
            } else {
                message.error("OTP không hợp lệ. Vui lòng thử lại.");
            }
        } catch (error) {
            message.error("OTP không hợp lệ. Vui lòng thử lại.");
        }
    };

    const handlePasswordReset = async (newPassword) => {
        try {
            const response = await authApi.resetPassword({ resetToken, newPassword });
            if (response.data.status === "success") {
                message.success(response.data.message);
                navigate("/");
               
            } else {
                message.error("Đã xảy ra lỗi khi đặt lại mật khẩu.");
            }
        } catch (error) {
            message.error("Lỗi khi đặt lại mật khẩu. Vui lòng thử lại.");
        }
    };

    return (
        <div>
            {step === 1 && <EnterEmailForm onSubmit={handleEmailSubmit} />}
            {step === 2 && <EnterOtpForm email={email} onSubmit={handleOtpSubmit} />}
            {step === 3 && <ResetPasswordForm onSubmit={handlePasswordReset} />}
        </div>
    );
};

export default ForgotPassword;
