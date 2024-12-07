import { useQuery } from "react-query";

const useTableV = ({ apiMethod }) => {
  // Hàm lấy dữ liệu từ API
  const fetchData = async () => {
    const response = await apiMethod();
    return response;
  };

  const { data, error, isLoading, refetch } = useQuery("vouchers", fetchData);

  return {
    data: data || [], // Toàn bộ danh sách voucher
    error,
    isLoading,
    refetch,
  };
};

export default useTableV;
