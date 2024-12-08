import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Select from "react-select";
import LoadingButton from "../../../components/ui/LoadingButton";
import { bookingApi } from "../../../api/bookingApi";
import { useQueryClient } from "react-query";

const BookingStored = ({ closeSheet, onSubmitSuccess, bookingId, initialStatus }) => {
  const methods = useForm();
  const { handleSubmit: handleFormSubmit } = methods;
  const queryClient = useQueryClient();

  const [status, setStatus] = useState(initialStatus || null); // Trạng thái ban đầu
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const statusOptions = [
    { value: "Pending", label: "Đang chờ" },
    { value: "Confirmed", label: "Đã xác nhận" },
    { value: "Cancelled", label: "Đã hủy" },
  ];

  const onSubmitHandler = async () => {
    if (!status) {
      setError("Vui lòng chọn trạng thái mới.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Gọi API cập nhật trạng thái
      await bookingApi.updateBookingStatus(bookingId, { status: status.value });

      // Làm mới dữ liệu bookings
      queryClient.invalidateQueries(["bookings"]);
      closeSheet();
      onSubmitSuccess();
    } catch (err) {
      console.error("Error updating booking status:", err.response || err);
      setError("Lỗi khi cập nhật trạng thái. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit(onSubmitHandler)} className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Trạng thái mới</label>
          <Select
            options={statusOptions}
            value={status}
            onChange={(selectedOption) => setStatus(selectedOption)}
            placeholder="Chọn trạng thái"
            className="w-[320px]"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="text-right">
          <LoadingButton
            loading={loading}
            text="Cập nhật trạng thái"
            className="w-40 text-white bg-[--primary-color] hover:bg-[--hover-btn-color] font-semibold rounded-md my-2 p-2 text-center"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default BookingStored;
