import { useQuery } from "react-query";
import { useState } from "react";

const useTableR = ({ apiMethod, hotelId }) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchData = async () => {
    if (!hotelId) return { rooms: [], totalPages: 0, total: 0 };
    const response = await apiMethod(hotelId, page, limit);
    return response.data; // Đảm bảo trả về `data` từ API
  };

  const { data, error, isLoading, refetch } = useQuery(
    ["rooms", hotelId, page, limit],
    fetchData,
    {
      keepPreviousData: true,
      enabled: !!hotelId, // Chỉ fetch nếu có hotelId
    }
  );

  return {
    data: data?.rooms || [], // Lấy danh sách phòng
    totalPages: data?.totalPages || 0, // Lấy tổng số trang
    total: data?.total || 0, // Tổng số phòng
    error,
    isLoading,
    page,
    handlePageChange: setPage,
    refetch,
  };
};

export default useTableR;
