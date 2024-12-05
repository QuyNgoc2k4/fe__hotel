import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useForm, FormProvider } from "react-hook-form";
import Select from "react-select";

// api
import { serviceApi } from "../../../api/serviceApi";
import { hotelApi } from "../../../api/hotelApi";

// components
import CustomInput from "../../../components/ui/CustomInput";
import LoadingButton from "../../../components/ui/LoadingButton";

// hooks
import useFormSubmit from "../../../hook/useFormSubmit";
// validate
import { validation } from "../../../validation/others/StoreServiceValidation";

interface ServiceStoreProps {
  closeSheet: () => void;
  serviceId: string | null;
  action: string;
  onSubmitSuccess: () => void;
}

const ServiceStore = ({ serviceId, action, closeSheet, onSubmitSuccess }: ServiceStoreProps) => {
  const methods = useForm();
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null); // State for the selected hotel

  const { setValue, handleSubmit: handleFormSubmit } = methods;
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(
    ["service", serviceId],
    () => serviceApi.getServiceById(serviceId),
    {
      enabled: action === "update" && !!serviceId,
    }
  );

  useEffect(() => {
    if (action === "update" && data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key] || "");
      });

      // Set default selected hotel
      if (data.hotel_id && hotels.length > 0) {
        const hotel = hotels.find((hotel) => hotel.value === data.hotel_id);
        setSelectedHotel(hotel || null);
      }
    }
  }, [data, setValue, action, hotels]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await hotelApi.getHotels(1, 100);
        const hotelOptions = Array.isArray(response.hotels)
          ? response.hotels.map((hotel) => ({ value: hotel.id, label: hotel.name }))
          : [];
        setHotels(hotelOptions);

        // Set default selected hotel if updating and data is already loaded
        if (data?.hotel_id) {
          const defaultHotel = hotelOptions.find((hotel) => hotel.value === data.hotel_id);
          setSelectedHotel(defaultHotel || null);
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };
    fetchHotels();
  }, [data]);

  const onSubmitHandler = async (payload: Record<string, any>) => {
    try {
      // Parse the price field to a float
      const formattedPayload = {
        ...payload,
        price: parseFloat(payload.price || "0"), // Ensure price is a Float
      };

      if (action === "update" && serviceId) {
        // Update service
        await serviceApi.updateService({ serviceId, data: formattedPayload });
        queryClient.invalidateQueries(["services"]); // Invalidate cache to refresh data
      } else {
        // Create service
        await serviceApi.createService(formattedPayload);
        queryClient.invalidateQueries(["services"]); // Invalidate cache to refresh data
      }

      closeSheet(); // Close the sheet after success
      onSubmitSuccess(); // Trigger any success callback
    } catch (error) {
      console.error("Error occurred while submitting the form:", error);
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
          <div className="mb-4 flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Chọn khách sạn</label>
            <Select
              options={hotels}
              value={selectedHotel} // Set the selected value
              onChange={(selectedOption) => {
                setValue("hotel_id", selectedOption ? selectedOption.value : null);
                setSelectedHotel(selectedOption);
              }}
              placeholder="Chọn tên khách sạn"
              className="w-[320px]"
            />
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

export default ServiceStore;
