import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useForm, FormProvider } from "react-hook-form";
// api
import { hotelApi } from "../../../api/hotelApi";
// components
import CustomInput from "../../../components/ui/CustomInput";
import LoadingButton from "../../../components/ui/LoadingButton";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatarHotel";
import { Label } from "../../../components/ui/label";
import UploadWidget from "../../../components/UploadWidget";

// hooks
import useFormSubmit from "../../../hook/useFormSubmit";
// validate
import { validation } from "../../../validation/rooms/StoreRoomValidation";
// icon
import { IoCloseCircleOutline } from "react-icons/io5";

interface RoomStoreProps {
  closeSheet: () => void;
  hotelId: string | null;
  action: string;
  onSubmitSuccess: () => void;
}

const RoomStore = ({ hotelId, action, closeSheet, onSubmitSuccess }: RoomStoreProps) => {
  const methods = useForm();
  const { setValue, handleSubmit: handleFormSubmit } = methods;
  const queryClient = useQueryClient();

  const { handleSubmit, loading } = useFormSubmit(
    action === "update" ? hotelApi.updateHotel : hotelApi.createHotel
  );

  const { data, isLoading } = useQuery(
    ["hotel", hotelId],
    () => hotelApi.getHotelById(hotelId),
    {
      enabled: action === "update" && !!hotelId,
    }
  );

  // State lưu URL ảnh
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  // Khi tải dữ liệu từ API, set URL ảnh cũ vào state
  useEffect(() => {
    if (action === "update" && data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key] || "");
      });

      // Gán ảnh cũ (nếu có) vào state `url`
      if (data.avatar_url) {
        setUrl(data.avatar_url);
      }
    }
  }, [data, setValue, action]);

  const onSubmitHandler = async (payload: Record<string, any>) => {
    try {
      const formattedPayload = {
        ...payload,
        stars: parseInt(payload.stars || "0", 10),
        total_rooms: parseInt(payload.total_rooms || "0", 10),
        rating: parseFloat(payload.rating || "0"),
        latitude: parseFloat(payload.latitude || "0"),
        longitude: parseFloat(payload.longitude || "0"),
        avatar_url: url, // Thêm URL ảnh vào payload
      };

      if (action === "update" && hotelId) {
        await handleSubmit({ hotelId, data: formattedPayload });

        // Cập nhật dữ liệu ngay trong cache
        queryClient.invalidateQueries(["hotels"]);
      } else {
        await handleSubmit(formattedPayload);
        queryClient.invalidateQueries(["hotels"]);
      }
      console.log(formattedPayload);

      closeSheet();
      onSubmitSuccess();
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

  function handleOnUpload(error: any, result: any, widget: any) {
    if (error) {
      console.error("Lỗi khi upload ảnh:", error);
      setError("Lỗi khi upload ảnh. Vui lòng thử lại!");
      widget.close({ quiet: true });
      return;
    }
    console.log("Kết quả upload ảnh:", result);
    setUrl(result?.info?.secure_url); // Lưu URL ảnh vào state
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit(onSubmitHandler)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {validation(action).map((item, index) => (
            <div key={index}>
              <CustomInput
                label={item.label}
                id={item.id}
                name={item.name}
                type={item.type}
                register={methods.register}
                rules={item.rules}
              />
            </div>
          ))}
          <div>
            {/* Input URL ẩn */}
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
                <Avatar className="w-[200px] h-[200px] inline-block cursor-pointer shadow-md">
                  <AvatarImage src={url || "/placeholder-image.png"} />
                  <AvatarFallback>Ảnh khách sạn</AvatarFallback>
                </Avatar>
              </Label>
            </div>
          </div>
        </div>
        <div className="text-right">
          <LoadingButton
            loading={loading}
            text={action === "update" ? "Cập nhật" : "Lưu thông tin"}
            className="w-40 text-white bg-[--primary-color] hover:bg-[--hover-btn-color] font-semibold rounded-md my-2 p-2 text-center"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default RoomStore;
