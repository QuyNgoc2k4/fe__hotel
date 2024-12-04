import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useForm, FormProvider } from "react-hook-form";
// api
import { roomTypeApi } from "../../../api/roomTypeApi";
// components
import CustomInput from "../../../components/ui/CustomInput";
import LoadingButton from "../../../components/ui/LoadingButton";
// hooks
import useFormSubmit from "../../../hook/useFormSubmit";
// validation
import { validation } from "../../../validation/rooms/StoreRoomTypeValidation";
// icons
import { IoCloseCircleOutline } from "react-icons/io5";

interface RoomTypeStoreProps {
  closeSheet: () => void;
  roomTypeId: string | null;
  action: string;
  onSubmitSuccess: () => void;
}

const RoomTypeStore = ({
  roomTypeId,
  action,
  closeSheet,
  onSubmitSuccess,
}: RoomTypeStoreProps) => {
  const methods = useForm();
  const { setValue, handleSubmit: handleFormSubmit } = methods;
  const queryClient = useQueryClient();

  const { handleSubmit, loading } = useFormSubmit(
    action === "update"
      ? roomTypeApi.updateRoomType
      : roomTypeApi.createRoomType
  );

  const { data, isLoading } = useQuery(
    ["roomType", roomTypeId],
    () => roomTypeApi.getRoomTypeById(roomTypeId),
    {
      enabled: action === "update" && !!roomTypeId,
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
      if (action === "update" && roomTypeId) {
        await handleSubmit({ roomTypeId, data: payload });
        queryClient.invalidateQueries(["roomTypes"]);
      } else {
        await handleSubmit(payload);
        queryClient.invalidateQueries(["roomTypes"]);
      }
      closeSheet();
      onSubmitSuccess();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleFormSubmit(onSubmitHandler)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 gap-4 py-4">
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
            text={action === "update" ? "Cập nhật thông tin" : "Lưu thông tin"}
            className="w-40 text-white bg-primary hover:bg-primary-dark font-semibold rounded-md my-2 p-2 text-center"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default RoomTypeStore;
