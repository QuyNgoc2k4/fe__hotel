// src/pages/user/user/Store.js
import React, { useState } from "react";
import CustomInput from "../../../components/ui/CustomInput";
import { Label } from "../../../components/ui/label";
import Select from "react-select"; // Sử dụng react-select
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import LoadingButton from "../../../components/ui/LoadingButton";
import { useForm, FormProvider } from "react-hook-form";
import { createUser,breadcrumb } from "../../../api/userApi";
import useFormSubmit from "../../../hook/useFormSubmit";
import UploadWidget from "../../../components/UploadWidget";
import PageHeading from "../../../components/heading";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { IoCloseCircleOutline } from "react-icons/io5";

const UserStore = () => {
    const methods = useForm();
    const { handleSubmit: handleFormSubmit } = methods;

    const { handleSubmit, loading } = useFormSubmit(createUser);

    const [url, setUrl] = useState(null); // Lưu URL ảnh từ UploadWidget
    const [error, setError] = useState(null);
    const [management_level, setManagement_level] = useState("Senior Manager"); // State lưu management_level

    const validation = [
        { label: "Họ tên", id: "name", name: "name", type: "text", rules: { required: "Bạn chưa nhập Họ tên" } },
        {
            label: "Email(*)",
            id: "email",
            name: "email",
            type: "text",
            rules: {
                required: "Bạn chưa nhập địa chỉ email",
                pattern: { value: /^\S+@\S+$/i, message: "Địa chỉ mail không đúng định dạng" },
            },
        },
        {
            label: "Điện thoại",
            id: "phone",
            name: "phone",
            type: "number",
            rules: {
                required: "Bạn chưa nhập số điện thoại",
                pattern: { value: /^[0-9]{10,11}$/, message: "Số điện thoại không đúng định dạng" },
            },
        },
    ];

    const onSubmitHandler = async (payload) => {
        console.log("Dữ liệu form ban đầu:", payload);

        const formData = new FormData();

        // Thêm các trường dữ liệu khác vào FormData
        Object.entries(payload).forEach(([key, value]) => {
            formData.append(key, value);
        });

        // Thêm URL ảnh (nếu có)
        if (url) {
            formData.append("avatar_url", url);
        }

        // Thêm management_level
        formData.append("management_level", management_level);

        console.log("Dữ liệu gửi đi:");
        formData.forEach((value, key) => console.log(`${key}: ${value}`));

        // Gọi API để tạo user
        await handleSubmit(formData);
    };

    function handleOnUpload(error, result, widget) {
        if (error) {
            console.error("Lỗi khi upload ảnh:", error);
            setError("Lỗi khi upload ảnh. Vui lòng thử lại!");
            widget.close({ quiet: true });
            return;
        }
        console.log("Kết quả upload ảnh:", result);
        setUrl(result?.info?.secure_url); // Lưu URL ảnh vào state
    }

    const options = [
        { value: "Senior Manager", label: "Senior Manager" },
        { value: "Senior Manager 1", label: "Senior Manager 1" },
        { value: "Administrator 2", label: "Administrator 2" },
    ];

    return (
        <>
            <PageHeading breadcrumb={breadcrumb.create} />
            <div className="container">
                <Card className="bg-white rounded-[5px] mt-[15px]">
                    <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
                        <CardTitle className="uppercase">{breadcrumb.create.title}</CardTitle>
                        <CardDescription className="text-xs">
                            Hiển thị danh sách quản lý admin, sử dụng các chức năng bên dưới để lọc theo mong muốn
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-[15px]">
                        <div className="w-full flex flex-col lg:flex-row items-start">
                            <div className="relative w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col p-10">
                                <FormProvider {...methods}>
                                    <form onSubmit={handleFormSubmit(onSubmitHandler)} className="space-y-4">
                                        <div className="grid gap-4 py-4">
                                            {validation.map((item, index) => (
                                                <CustomInput
                                                    key={index}
                                                    label={item.label}
                                                    id={item.id}
                                                    name={item.name}
                                                    type={item.type}
                                                    register={methods.register}
                                                    rules={item.rules}
                                                />
                                            ))}

                                            {/* Ẩn input chứa URL ảnh */}
                                            <input className="hidden" name="avatar_url" value={url || ""} readOnly />

                                            {/* UploadWidget */}
                                            <UploadWidget onUpload={handleOnUpload}>
                                                {({ open }) => (
                                                    <button
                                                        id="upload-image"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            open();
                                                        }}
                                                    >
                                                        Upload an Image
                                                    </button>
                                                )}
                                            </UploadWidget>

                                            {/* Hiển thị lỗi nếu upload ảnh thất bại */}
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
                                                    <Avatar className="w-[100px] h-[100px] inline-block cursor-pointer shadow-md">
                                                        <AvatarImage src={url || "/placeholder-image.png"} />
                                                        <AvatarFallback>AVATAR</AvatarFallback>
                                                    </Avatar>
                                                    
                                                </Label>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="management_level" className="text-right">
                                                Management Level
                                            </Label>
                                            <Select
                                                options={options}
                                                className="col-span-3"
                                                defaultValue={options[0]}
                                                onChange={(selectedOption) => setManagement_level(selectedOption.value)} // Cập nhật state
                                            />
                                        </div>

                                        {/* Nút lưu */}
                                        <div className="text-right">
                                            <LoadingButton
                                                loading={loading}
                                                text="Lưu thông tin"
                                                className="w-40 text-white bg-[--primary-color] hover:bg-[--hover-btn-color] font-semibold rounded-md my-2 p-2 text-center"
                                            />
                                        </div>
                                    </form>
                                </FormProvider>
                            </div>

                            <div className="w-full lg:w-1/2 h-1/2 lg:h-full bg-[#f5f5f5] flex flex-col p-6 lg:p-20 justify-between items-center">
                                   
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default UserStore;
