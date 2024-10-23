import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { GoogleLogin } from "@react-oauth/google"; // Thêm phần này
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        // Nếu không tồn tại tài khoản, thông báo cho người dùng
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
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Đăng Nhập</h2>
      <Form
        name="login"
        onFinish={onFinish}
        initialValues={{ email: "", password: "" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Đăng Nhập
          </Button>
        </Form.Item>
      </Form>

      <div style={{ textAlign: "center" }}>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
        />
      </div>
    </div>
  );
};

export default Login;
