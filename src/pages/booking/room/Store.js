import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { useForm, FormProvider } from "react-hook-form";
import CustomInput from "../../../components/ui/CustomInput";
import LoadingButton from "../../../components/ui/LoadingButton";
import Select from "react-select";
import useFormSubmit from "../../../hook/useFormSubmit";
import { validation } from "../../../validation/booking/StoreBookingValidation";
// API
import { bookingApi } from "../../../api/bookingApi";
import { roomApi } from "../../../api/roomApi"; // Import roomApi
import { userApi } from "../../../api/userApi";
import { serviceApi } from "../../../api/serviceApi";

const BookingStore = ({ closeSheet, onSubmitSuccess, hotelId, roomId }) => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [roomPrice, setRoomPrice] = useState(0); // State for dynamic room price
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const [error, setError] = useState(null);

  const methods = useForm();
  const { register, setValue, handleSubmit: handleFormSubmit } = methods;
  const queryClient = useQueryClient();

  const { handleSubmit, loading } = useFormSubmit(bookingApi.createBooking);

  // Fetch room price
  const fetchRoomPrice = async () => {
    try {
      const roomData = await roomApi.getRoomById(roomId);
      setRoomPrice(roomData.current_price); // Set the dynamic room price
    } catch (error) {
      console.error("Failed to fetch room price:", error);
      setError("Lỗi khi lấy giá phòng. Vui lòng thử lại sau.");
    }
  };

  // Update room status
  const updateRoomStatus = async () => {
    try {
      await roomApi.updateRoom({
        roomId,
        data: { status: true },
      });
    } catch (error) {
      console.error("Failed to update room status:", error);
      setError("Lỗi khi cập nhật trạng thái phòng.");
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    const servicesTotal = selectedServices.reduce(
      (acc, service) => acc + service.price * service.quantity,
      0
    );
    setTotalPrice(roomPrice + servicesTotal);
  };

  const handleServiceQuantityChange = (serviceId, newQuantity) => {
    setSelectedServices((prevServices) =>
      prevServices.map((service) =>
        service.value === serviceId
          ? { ...service, quantity: newQuantity }
          : service
      )
    );
  };

  const handleServiceRemove = (serviceId) => {
    setSelectedServices((prevServices) =>
      prevServices.filter((service) => service.value !== serviceId)
    );
  };

  const onSubmitHandler = async (payload) => {
    try {
      const formattedServices = selectedServices.map((service) => ({
        service_id: service.value,
        price: service.price,
        quantity: service.quantity,
      }));

      const formattedPayload = {
        hotel_id: hotelId,
        room_id: roomId,
        user_id: selectedCustomer?.value,
        start_date: payload.start_date,
        end_date: payload.end_date,
        special_requests: payload.special_requests || "",
        services: formattedServices,
        payment_method: paymentMethod?.value,
        total_price: totalPrice,
      };

      console.log(formattedPayload);

      await bookingApi.createBooking(formattedPayload);
      // Update room status to true immediately after booking
      await updateRoomStatus();

      queryClient.invalidateQueries(["bookings"]);
      closeSheet();
      onSubmitSuccess();
    } catch (error) {
      console.error("Error creating booking:", error.response || error);
      setError("Lỗi khi tạo đặt phòng. Vui lòng kiểm tra dữ liệu.");
    }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceApi.getServices();
        setServices(
          Array.isArray(response)
            ? response.map((service) => ({
                value: service.id,
                label: service.name,
                price: service.price || 0,
                quantity: 1,
              }))
            : []
        );
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await userApi.getUsers(1, 100, "&role=customer");
        const sortedCustomers = response.users.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setCustomers(
          sortedCustomers.map((customer) => ({
            value: customer.id,
            label: customer.name || customer.email,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchServices();
    fetchCustomers();
    if (roomId) fetchRoomPrice(); // Fetch room price dynamically
  }, [roomId]);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedServices, roomPrice]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit(onSubmitHandler)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 py-4">
          {validation().baseValidationData.map((item, index) => (
            <div key={index}>
              <CustomInput
                label={item.label}
                id={item.id}
                name={item.name}
                type={item.type}
                register={register}
                rules={item.rules}
              />
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Chọn khách hàng
            </label>
            <Select
              options={customers}
              value={selectedCustomer}
              onChange={(selectedOption) => {
                setValue("user_id", selectedOption ? selectedOption.value : null);
                setSelectedCustomer(selectedOption);
              }}
              placeholder="Chọn khách hàng"
              className="w-[320px]"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Chọn dịch vụ
            </label>
            <Select
              isMulti
              options={services}
              value={selectedServices}
              onChange={(selectedOptions) =>
                setSelectedServices(
                  selectedOptions.map((service) => ({
                    ...service,
                    quantity: 1, // Default quantity
                  }))
                )
              }
              placeholder="Chọn dịch vụ"
              className="w-[320px]"
            />
          </div>

          <div className="space-y-2">
            {selectedServices.map((service) => (
              <div
                key={service.value}
                className="flex items-center justify-between border p-2 rounded"
              >
                <span>
                  {service.label} - {service.price.toLocaleString()} VND
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      handleServiceQuantityChange(
                        service.value,
                        Math.max(service.quantity - 1, 1)
                      )
                    }
                  >
                    -
                  </button>
                  <span>{service.quantity}</span>
                  <button
                    type="button"
                    className="px-2 py-1 bg-gray-200 rounded"
                    onClick={() =>
                      handleServiceQuantityChange(service.value, service.quantity + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => handleServiceRemove(service.value)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phương thức thanh toán
            </label>
            <Select
              options={[
                { value: "cash", label: "Tiền mặt" },
                { value: "momo", label: "Momo" },
              ]}
              value={paymentMethod}
              onChange={(selectedOption) => setPaymentMethod(selectedOption)}
              placeholder="Chọn phương thức thanh toán"
              className="w-[320px]"
            />
          </div>

          <div className="text-right font-bold">
            Tổng giá: {totalPrice.toLocaleString()} VND
          </div>

          {error && <p className="text-red-500">{error}</p>}
        </div>
        <div className="text-right">
          <LoadingButton
            loading={loading}
            text="Đặt phòng"
            className="w-40 text-white bg-[--primary-color] hover:bg-[--hover-btn-color] font-semibold rounded-md my-2 p-2 text-center"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default BookingStore;

