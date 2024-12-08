import { useQuery } from "react-query";
import { useState, useEffect } from "react";

const useTableB = ({ apiMethod }) => {
  const [allData, setAllData] = useState([]); // Toàn bộ dữ liệu
  const [filteredData, setFilteredData] = useState([]); // Dữ liệu đã lọc

  const fetchData = async () => {
    const response = await apiMethod();
    return { bookings: response || [] };
  };

  const { data, error, isLoading, refetch } = useQuery("bookings", fetchData, {
    onSuccess: (fetchedData) => {
      setAllData(fetchedData.bookings || []); // Lưu dữ liệu ban đầu
      setFilteredData(fetchedData.bookings || []); // Lưu dữ liệu đã lọc
    },
  });

  return {
    allData,
    filteredData,
    error,
    isLoading,
    setFilteredData, // Hàm cập nhật dữ liệu đã lọc
    refetch,
  };
};

export default useTableB;
