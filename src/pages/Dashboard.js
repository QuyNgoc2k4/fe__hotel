import React, { useState } from "react";
import { roomApi } from "../api/roomApi";
import PageHeading from "../components/heading";
import SelectHotel from "../components/ui/SelectHotel";
import BarChart from "../components/charts/BarChart";
import LineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import InfoCard from "../components/InfoCard";
import {
  barData,
  barOptions,
  lineData,
  lineOptions,
  pieData,
  pieOptions,
} from "../constant/chartData";

const Dashboard = () => {
  const breadcrumb = {
    title: "Thống kê chung",
    route: "/dashboard",
  };


  const [selectedHotel, setSelectedHotel] = useState(null); // ID khách sạn được chọn
  const [rooms, setRooms] = useState([]); // Danh sách phòng
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải dữ liệu

  const [emptyRooms, setEmptyRooms] = useState(0); // Số lượng phòng trống
  const [occupiedRooms, setOccupiedRooms] = useState(0); // Số lượng phòng đã đặt

  // Hàm gọi API lấy danh sách phòng
  const fetchRooms = async (hotelId) => {
    if (!hotelId) return;

    setIsLoading(true);
    try {
      const response = await roomApi.getRooms(hotelId); // Gọi API để lấy danh sách phòng
      const roomsData = response.data.rooms; // Lấy danh sách phòng từ response
      console.log(roomsData); // Kiểm tra dữ liệu trả về
      setRooms(roomsData || []);

      // Tính toán số lượng phòng trống và đã đặt
      const empty = roomsData.filter((room) => room.status === false).length;
      const occupied = roomsData.filter((room) => room.status === true).length;

      setEmptyRooms(empty);
      setOccupiedRooms(occupied);
    } catch (error) {
      console.error("Failed to fetch rooms:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý khi chọn khách sạn
  const handleSelectHotel = (hotelId) => {
    setSelectedHotel(hotelId);
    fetchRooms(hotelId);
  };

  return (
    <>
      <PageHeading breadcrumb={breadcrumb} />
      <div className="container mx-auto px-4 py-8">
        {/* Select Hotel */}
        <SelectHotel selectedHotel={selectedHotel} onSelectHotel={handleSelectHotel} />

        {/* Thống kê tổng quan */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 mt-5">
          <InfoCard
            title="Phòng trống"
            value={isLoading ? "Đang tải..." : emptyRooms}
            color="text-green-500"
          />
          <InfoCard
            title="Phòng đang được đặt"
            value={isLoading ? "Đang tải..." : occupiedRooms}
            color="text-yellow-500"
          />
          <InfoCard title="Doanh thu tháng này" value="0 VND" color="text-blue-500" />
        </div>

        {/* Biểu đồ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <BarChart data={barData} options={barOptions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <LineChart data={lineData} options={lineOptions} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <PieChart data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
