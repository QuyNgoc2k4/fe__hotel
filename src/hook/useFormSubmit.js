import { useMutation } from "react-query";
import { message } from "antd";

const useFormSubmit = (apiFunction: (data: any) => Promise<any>) => {
  const mutation = useMutation(apiFunction, {
    onSuccess: () => {
      message.success("Gửi dữ liệu thành công!");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại!";
    //   console.error("Chi tiết lỗi:", error.response?.data || error.message);
      message.error(errorMessage);
    },
  });

  return {
    handleSubmit: mutation.mutateAsync,
    loading: mutation.isLoading,
  };
};

export default useFormSubmit;
