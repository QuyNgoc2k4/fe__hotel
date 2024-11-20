import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTableH = ({ apiMethod }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1); // Quản lý trang hiện tại
  const [limit] = useState(10); // Giới hạn số mục trên mỗi trang (cố định)

  // Hàm lấy dữ liệu
  const fetchData = async () => {
    const response = await apiMethod(page, limit);
    return response;
  };

  // Sử dụng react-query để quản lý trạng thái dữ liệu
  const { data, error, isLoading } = useQuery(
    ["hotels", page, limit],
    fetchData,
    {
      keepPreviousData: true, // Giữ dữ liệu cũ khi đang tải dữ liệu mới
    }
  );

  // Cập nhật URL mỗi khi trang thay đổi
  useEffect(() => {
    navigate(`?page=${page}&limit=${limit}`, { replace: true });
  }, [page, limit, navigate]);

  // Đặt lại trạng thái isChecked khi dữ liệu hoặc trang thay đổi
  useEffect(() => {
    if (data?.hotels) {
      data.hotels.forEach((hotel) => {
        hotel.isChecked = false; // Tất cả mục được bỏ chọn
      });
    }
  }, [page, data]);

  return {
    data: data?.hotels || [], // Danh sách khách sạn
    total: data?.total || 0, // Tổng số khách sạn
    totalPages: data?.totalPages || 1, // Tổng số trang
    error, // Lỗi nếu có
    isLoading, // Trạng thái đang tải
    page, // Trang hiện tại
    handlePageChange: setPage, // Hàm thay đổi trang
  };
};

export default useTableH;
