import { useQuery } from "react-query";

const useTableS = ({ apiMethod }) => {
  // Hàm lấy dữ liệu từ API
  const fetchData = async () => {
    const response = await apiMethod();
    return response;
  };

  const { data, error, isLoading, refetch } = useQuery("services", fetchData);

  return {
    data: data || [], // Toàn bộ danh sách dịch vụ
    error,
    isLoading,
    refetch,
  };
};

export default useTableS;
