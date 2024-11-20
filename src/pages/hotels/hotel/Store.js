import { useEffect } from "react";
import CustomInput from "../../../components/ui/CustomInput";
import { useForm, FormProvider } from "react-hook-form";
import { hotelApi } from "../../../api/hotelApi";
import useFormSubmit from "../../../hook/useFormSubmit";
import LoadingButton from "../../../components/ui/LoadingButton";
import { useQuery } from "react-query";
import { validation } from "../../../validation/hotels/StoreHotelValidation";

interface HotelStoreProps {
  closeSheet: () => void;
  hotelId: string | null;
  action: string;
}

const HotelStore = ({ hotelId, action, closeSheet }: HotelStoreProps) => {
  const methods = useForm();
  const { setValue, handleSubmit: handleFormSubmit } = methods;

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

  useEffect(() => {
    if (action === "update" && data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key] || "");
      });
    }
  }, [data, setValue, action]);

  const onSubmitHandler = async (payload: Record<string, any>) => {
    try {
      console.log("Payload từ form:", payload);

      const formattedPayload = {
        ...payload,
        stars: parseInt(payload.stars || "0", 10),
        total_rooms: parseInt(payload.total_rooms || "0", 10),
        rating: parseFloat(payload.rating || "0"),
        latitude: parseFloat(payload.latitude || "0"),
        longitude: parseFloat(payload.longitude || "0"),
      };

      console.log("Dữ liệu gửi đi:", formattedPayload);

      if (action === "update" && hotelId) {
        await handleSubmit({ hotelId, data: formattedPayload });
      } else {
        await handleSubmit(formattedPayload);
      }

      closeSheet();
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  };

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

export default HotelStore;
