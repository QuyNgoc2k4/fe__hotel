import React, { useState } from "react";
import { useQuery } from "react-query";
import { userApi } from "../../api/userApi";
import UploadWidget from "../../components/UploadWidget";
import { Label } from "../../components/ui/label";
import { IoCloseCircleOutline } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import useFormSubmit from "../../hook/useFormSubmit";

const Profile = () => {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const { data: userInfo, isLoading, isError } = useQuery(
    "userInfo",
    userApi.getUserInfo,
    {
      refetchInterval: 100,
    }
  );

  const { handleSubmit, loading } = useFormSubmit(userApi.updateUser);

  if (isLoading) return <p>Đang tải thông tin...</p>;
  if (isError) return <p>Có lỗi xảy ra khi tải thông tin người dùng!</p>;

  const { id, name, email, phone, avatar_url, Admins } = userInfo || {};
  const management_level = Admins?.[0]?.management_level || "Chưa xác định";

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (url) {
      data.avatar_url = url;
    }

    await handleSubmit({ userId: id, data });
  };

  const handleOnUpload = (error, result, widget) => {
    if (error) {
      console.error("Lỗi khi upload ảnh:", error);
      setError("Lỗi khi upload ảnh. Vui lòng thử lại!");
      widget.close({ quiet: true });
      return;
    }
    setUrl(result?.info?.secure_url);
  };

  return (
    <div className="container mx-auto">
      <div className="font-std mb-10 w-full rounded-2xl bg-white p-10 font-normal leading-relaxed text-gray-900 shadow-xl flex flex-col lg:flex-row items-start">
        {/* Thông tin hồ sơ */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col p-6 lg:p-20 justify-between items-center">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 text-center mb-8 md:mb-0">
              <img
                src={avatar_url}
                alt="Profile"
                className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105"
              />
              <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">
                {name}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{management_level}</p>
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h2 className="mb-5 text-2xl font-bold text-blue-900">Hồ sơ</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Đây là thông tin cơ bản của bạn.
              </p>

              <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
                Liên hệ
              </h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  {email}
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-800 dark:text-blue-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  {phone}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Cập nhật hồ sơ */}
        <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[#f5f5f5] flex flex-col p-6 lg:p-20 justify-between items-center">
          <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            {/* Input URL ẩn */}
            <input className="hidden" name="avatar_url"value={url || avatar_url || ""} readOnly />

            {/* UploadWidget */}
            <UploadWidget onUpload={handleOnUpload}>
              {({ open }) => (
                <button
                  id="upload-image"
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                  className="hidden"
                >
                  Upload an Image
                </button>
              )}
            </UploadWidget>

            {/* Hiển thị lỗi khi upload ảnh thất bại */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Preview ảnh */}
            <div className="text-center">
              <Label htmlFor="upload-image" className="text-right relative">
                {url && (
                  <IoCloseCircleOutline
                    className="absolute top-50 right-0 cursor-pointer"
                    onClick={() => setUrl(null)} // Xóa URL ảnh
                  />
                )}
                <Avatar className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105">
                  <AvatarImage src={url || avatar_url || "/placeholder-image.png"} />
                  <AvatarFallback>Ảnh người dùng</AvatarFallback>
                </Avatar>
              </Label>
            </div>
          </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Họ tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={name}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="management_level" className="block text-sm font-medium text-gray-700">
                Chức vụ quản lý
              </label>
              <input
                type="text"
                id="management_level"
                name="management_level"
                defaultValue={management_level}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={phone}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className={`px-4 py-2 rounded-lg ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-800 text-white hover:bg-indigo-700"
                }`}
                disabled={loading}
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
