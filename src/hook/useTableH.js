import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTableH = ({ apiMethod }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1); // Trang hiện tại
  const [limit] = useState(3); // Số mục mỗi trang
  const [filters, setFilters] = useState({}); // Bộ lọc

  // Hàm lấy dữ liệu
  const fetchData = async () => {
    const { search, sort } = filters; // Lấy các bộ lọc hiện tại
    const response = await apiMethod(page, limit, { search, sort }); // Gửi yêu cầu với các bộ lọc
    return response;
  };

  const { data, error, isLoading, refetch } = useQuery(
    ["hotels", page, limit, filters],
    fetchData,
    {
      keepPreviousData: true,
    }
  );
  const handleQueryString = (newFilters) => {    
    setFilters(newFilters);
    setPage(1);
  };
  // Cập nhật URL khi thay đổi bộ lọc hoặc trang
  useEffect(() => {
    const queryParamsObj = {
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    };
  
    // Xóa các tham số không có giá trị hoặc giá trị trống
    Object.keys(queryParamsObj).forEach((key) => {
      if (!queryParamsObj[key]) {
        delete queryParamsObj[key];
      }
    });
  
    const queryParams = new URLSearchParams(queryParamsObj).toString();
  
    navigate(queryParams ? `?${queryParams}` : '', { replace: true });
  }, [page, limit, filters, navigate]);

  return {
    data: data?.hotels || [],
    total: data?.total || 0,
    totalPages: data?.totalPages || 1,
    error,
    isLoading,
    page,
    filters,
    handlePageChange: setPage,
    handleFiltersChange: setFilters,
    refetch,
    handleQueryString
  };
};

export default useTableH;
