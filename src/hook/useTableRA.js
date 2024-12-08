import { useQuery } from "react-query";
import { useState, useEffect } from "react";

const useTableRA = ({ apiMethod, hotelId }) => {
  const [page, setPage] = useState(1); // Trạng thái trang hiện tại
  const [limit] = useState(10); // Số phòng mỗi trang
  const [allData, setAllData] = useState([]); // Dữ liệu gốc
  const [filteredData, setFilteredData] = useState([]); // Dữ liệu đã lọc
  const [paginatedData, setPaginatedData] = useState([]); // Dữ liệu phân trang

  const fetchData = async () => {
    if (!hotelId) return { rooms: [], total: 0 };
    const response = await apiMethod(hotelId); 
    // Lọc chỉ lấy các phòng có status là false
    const filteredRooms = response.data.rooms.filter((room) => room.status === false);
    return { rooms: filteredRooms, total: filteredRooms.length };
  };

  const { data, error, isLoading, refetch } = useQuery(
    ["rooms", hotelId],
    fetchData,
    {
      enabled: !!hotelId, // Chỉ fetch dữ liệu nếu có hotelId
      onSuccess: (fetchedData) => {
        setAllData(fetchedData.rooms || []); // Lưu dữ liệu gốc
        setFilteredData(fetchedData.rooms || []); // Ban đầu chưa lọc
        setPage(1); // Reset trang về đầu tiên khi có dữ liệu mới
      },
    }
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(filteredData.length / limit)) {
      setPage(newPage); // Thay đổi trang
    }
  };

  // Cập nhật dữ liệu phân trang khi filteredData hoặc page thay đổi
  useEffect(() => {
    const start = (page - 1) * limit;
    const end = page * limit;
    setPaginatedData(filteredData.slice(start, end));
  }, [filteredData, page, limit]);

  return {
    allData,
    filteredData, // Dữ liệu đã lọc
    paginatedData, // Dữ liệu phân trang
    totalPages: Math.ceil(filteredData.length / limit),
    total: filteredData.length,
    error,
    isLoading,
    page,
    setFilteredData, // Hàm để cập nhật dữ liệu đã lọc
    handlePageChange,
    setPage, // Đảm bảo setPage được trả về
    refetch,
  };
};


export default useTableRA;



