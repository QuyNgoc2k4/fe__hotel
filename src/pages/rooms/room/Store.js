import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useForm, FormProvider } from "react-hook-form";
import CustomInput from "../../../components/ui/CustomInput";
import LoadingButton from "../../../components/ui/LoadingButton";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatarHotel";
import { Label } from "../../../components/ui/label";
import UploadWidget from "../../../components/UploadWidget";
import Select from "react-select"; // Import react-select
import { IoCloseCircleOutline } from "react-icons/io5";
import useFormSubmit from "../../../hook/useFormSubmit";
import { validation } from "../../../validation/rooms/StoreRoomValidation";
// API
import { hotelApi } from "../../../api/hotelApi";
import { roomApi } from "../../../api/roomApi";
import { roomTypeApi } from "../../../api/roomTypeApi";

const RoomStore = ({ roomId, action, closeSheet, onSubmitSuccess }) => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // State for the selected hotel

  const [roomTypes, setRoomTypes] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState(null); // State for the selected hotel

  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);

  const methods = useForm();
  const { setValue, handleSubmit: handleFormSubmit } = methods;
  const queryClient = useQueryClient();

  const { handleSubmit, loading } = useFormSubmit(
    action === "update" ? roomApi.updateRoom : roomApi.createRoom
  );

  const { data } = useQuery(["room", roomId], () => roomApi.getRoomById(roomId), {
    enabled: action === "update" && !!roomId,
  });

  useEffect(() => {
    if (action === "update" && data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key] || "");
      });

      if (data.avatar_url) {
        setUrl(data.avatar_url);
      }

      // Set default selected hotel
      if (data.hotel_id && hotels.length > 0) {
        const hotel = hotels.find((hotel) => hotel.value === data.hotel_id);
        setSelectedHotel(hotel || null);
      }
      // Set default selected room Type
      if (data.room_type_id && roomTypes.length > 0) {
        const roomType = roomTypes.find((roomType) => roomType.value === data.room_type_id);
        setSelectedRoomType(roomType || null);
      }
    }
  }, [data, setValue, action, hotels, roomTypes]);

  const onSubmitHandler = async (payload) => {
    try {
      const { room_number, hotel_id, room_type_id, current_price, floor, is_smoking, status, description } = payload;

      const formattedPayload = {
        room_number,
        avatar_url: url || "https://example.com/placeholder-image.jpg",
        hotel_id,
        room_type_id,
        current_price: parseInt(current_price, 10),
        floor: parseInt(floor, 10),
        is_smoking: payload.is_smoking || false, // Nếu không có giá trị thì gán false
        status: payload.status || false, // Nếu không có giá trị thì gán false
        description,
      };

      if (action === "update" && roomId) {
        await roomApi.updateRoom({ roomId, data: formattedPayload });
        queryClient.invalidateQueries(["rooms"]);
      } else {
        await roomApi.createRoom(formattedPayload);
        queryClient.invalidateQueries(["rooms"]);
      }

      closeSheet();
      onSubmitSuccess();
    } catch (error) {
      console.error("Error creating room:", error.response || error);
      setError("Error creating room. Please check your input data.");
    }
  };

  const handleOnUpload = (error, result, widget) => {
    if (error) {
      console.error("Error uploading image:", error);
      setError("Lỗi khi upload ảnh. Vui lòng thử lại!");
      widget.close({ quiet: true });
      return;
    }
    setUrl(result?.info?.secure_url);
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await hotelApi.getHotels(1, 100);
        setHotels(
          Array.isArray(response.hotels)
            ? response.hotels.map((hotel) => ({ value: hotel.id, label: hotel.name }))
            : []
        );
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };

    const fetchRoomTypes = async () => {
      try {
        const response = await roomTypeApi.getRoomTypes();
        setRoomTypes(
          Array.isArray(response.roomTypes)
            ? response.roomTypes.map((type) => ({ value: type.id, label: type.name }))
            : []
        );
      } catch (error) {
        console.error("Failed to fetch room types:", error);
      }
    };

    fetchHotels();
    fetchRoomTypes();
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit(onSubmitHandler)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            {validation(action).baseValidationData.map((item, index) => (
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

            {validation(action).checkboxValidationData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  id={item.id}
                  type="checkbox"
                  {...methods.register(item.name, item.rules)}
                  defaultChecked={item.defaultValue}
                />
                <label htmlFor={item.id} className="text-sm">
                  {item.label}
                </label>
              </div>
            ))}
          </div>

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
                  <AvatarFallback>Ảnh phòng</AvatarFallback>
                </Avatar>
              </Label>
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Chọn khách sạn</label>
              <Select
                options={hotels}
                value={selectedHotel} // Set the selected value
                onChange={(selectedOption) => {
                  setValue("hotel_id", selectedOption ? selectedOption.value : null);
                  setSelectedHotel(selectedOption); // Cập nhật đúng trạng thái của khách sạn
                }}
                placeholder="Chọn tên khách sạn"
                className="w-[320px]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Chọn loại phòng</label>
              <Select
                options={roomTypes}
                value={selectedRoomType} // Set the selected value
                onChange={(selectedOption) => {
                  setValue("room_type_id", selectedOption ? selectedOption.value : null);
                  setSelectedRoomType(selectedOption); // Cập nhật đúng trạng thái của loại phòng
                }}
                placeholder="Chọn loại phòng"
                className="w-[320px]"
              />
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
