import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import CustomInput from "../../../components/ui/CustomInput";
import Select from "react-select";
import UploadWidget from "../../../components/UploadWidget";
import LoadingButton from "../../../components/ui/LoadingButton";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";
import { Label } from "../../../components/ui/label";
import { IoCloseCircleOutline } from "react-icons/io5";
import { userApi } from "../../../api/userApi";
import { hotelApi } from "../../../api/hotelApi"; // Import hotel API
import { validation } from "../../../validation/users/StoreValidationUser";

const UserStore = ({ closeSheet, userId, action, role, onSubmitSuccess }) => {
  const methods = useForm();
  const { handleSubmit: handleFormSubmit, setValue } = methods;
  const queryClient = useQueryClient();

  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [hotels, setHotels] = useState([]); // State to store hotel options
  const [selectedHotel, setSelectedHotel] = useState(null); // State for the selected hotel

  // Query to fetch user data by ID (for update)
  const { data, isLoading } = useQuery(
    ["user", userId],
    () => userApi.getUserById(userId),
    {
      enabled: action === "update" && !!userId,
      onSuccess: (userData) => {
        const user = userData.data;

        if (user) {
          // Map common fields
          Object.keys(user).forEach((key) => setValue(key, user[key] || ""));
          setUrl(user.avatar_url || null);
           // Ánh xạ các trường dữ liệu đặc biệt theo vai trò
           if (role === "customer" && user.Customers?.length) {
            const customerData = user.Customers[0];
            setValue("gender", customerData.gender || "");
            setValue("date_of_birth", customerData.date_of_birth?.split("T")[0] || "");
            setValue("identity_number", customerData.identity_number || "");
            setValue("address", customerData.address || "");
            setValue("nationality", customerData.nationality || "");
          }

          // Map specific fields for "staff" role
          if (role === "staff" && user.Employees?.length) {
            const staffData = user.Employees[0];
            setValue("hotel_id", staffData.hotel_id || "");
            setValue("role", staffData.role || "");
            setValue("salary", staffData.salary || "");
            setValue("start_date", staffData.start_date?.split("T")[0] || "");
            setValue("end_date", staffData.end_date?.split("T")[0] || "");
            setValue("id_card_number", staffData.id_card_number || "");
            setValue("birthdate", staffData.birthdate?.split("T")[0] || "");
            setValue("address", staffData.address || "");
            setValue("emergency_contact_name", staffData.emergency_contact_name || "");
            setValue("emergency_contact_phone", staffData.emergency_contact_phone || "");
            setValue("education_level", staffData.education_level || "");
            setValue("certifications", staffData.certifications || "");

            // Set default selected hotel
            setSelectedHotel(
              hotels.find((hotel) => hotel.value === staffData.hotel_id) || null
            );
          }
          
        }
      },
    }
  );

  // Fetch hotels data
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await hotelApi.getHotels(1, 100);
        setHotels(
          response.hotels.map((hotel) => ({ value: hotel.id, label: hotel.name }))
        );
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  // Handle form submission
  const onSubmitHandler = async (payload) => {
    try {
      const formattedPayload = {
        ...payload,
        avatar_url: url,
        hotel_id: selectedHotel?.value || null, // Include selected hotel ID
        salary: parseInt(payload.salary, 10), // Ensure salary is an integer
      };
console.log(formattedPayload);

      if (action === "update" && userId) {
        if (role === "admin") {
          await userApi.updateUser({ userId, data: formattedPayload });
        } else if (role === "customer") {
          await userApi.updateCustomer({ userId, data: formattedPayload });
        } else if (role === "staff") {
          await userApi.updateStaff({ userId, data: formattedPayload });
        }
      } else {
        if (role === "admin") {
          await userApi.createUser(formattedPayload);
        } else if (role === "customer") {
          await userApi.createCustomer(formattedPayload);
        } else if (role === "staff") {
          await userApi.createStaff(formattedPayload);
        }
      }

      queryClient.invalidateQueries(["users"]);
      closeSheet();
      onSubmitSuccess();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Handle avatar upload
  const handleOnUpload = (error, result, widget) => {
    if (error) {
      console.error("Image upload error:", error);
      setError("Error uploading image. Please try again.");
      widget.close({ quiet: true });
      return;
    }
    setUrl(result?.info?.secure_url);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit(onSubmitHandler)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {validation(data || {}, role).map((field, index) => (
            <CustomInput
              key={index}
              label={field.label}
              id={field.id}
              name={field.name}
              type={field.type}
              defaultValue={field.defaultValue}
              register={methods.register}
              rules={field.rules}
            />
          ))}

          {/* Hotel Selection for Staff */}
          {role === "staff" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Chọn khách sạn
              </label>
              <Select
                options={hotels}
                value={selectedHotel}
                onChange={(option) => {
                  setValue("hotel_id", option?.value || null);
                  setSelectedHotel(option);
                }}
                placeholder="Chọn khách sạn"
              />
            </div>
          )}

          <div>
            <input className="hidden" name="avatar_url" value={url || ""} readOnly />
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

            {error && <p className="text-red-500">{error}</p>}

            <div className="text-center">
              <Label htmlFor="upload-image" className="text-right relative">
                {url && (
                  <IoCloseCircleOutline
                    className="absolute top-50 right-0 cursor-pointer"
                    onClick={() => setUrl(null)}
                  />
                )}
                <Avatar className="w-[200px] h-[200px] inline-block cursor-pointer shadow-md">
                  <AvatarImage src={url || "/placeholder-image.png"} />
                  <AvatarFallback>Ảnh người dùng</AvatarFallback>
                </Avatar>
              </Label>
            </div>
          </div>
        </div>

        <div className="text-right">
          <LoadingButton
            loading={isLoading}
            text={action === "update" ? "Cập nhật" : "Lưu thông tin"}
            className="w-40 text-white bg-[--primary-color] hover:bg-[--hover-btn-color] font-semibold rounded-md my-2 p-2 text-center"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default UserStore;
