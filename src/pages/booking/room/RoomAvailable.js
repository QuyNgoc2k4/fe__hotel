import React, { useState, useEffect } from "react";
import { hotelApi } from "../../../api/hotelApi";
import { roomApi } from "../../../api/roomApi";
import PageHeading from "../../../components/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Filter from "../../../components/ui/filterUseRoomAvailable";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import useCheckBoxState from "../../../hook/useCheckBoxState";
import useSheet from "../../../hook/useSheet";

import Paginate from "../../../components/Pagination";
import useTableRA from "../../../hook/useTableRA";
import CustomTable from "../../../components/ui/customTable";
import { tableColumn, buttonAction, breadcrumb } from "../../../setting/room_available";
import CustomSheet from "../../../components/ui/CustomSheet";
import BookingStore from "./Store";
import { LoadingSpinner } from "../../../components/ui/loading";

const RoomAvailable = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchFilters, setSearchFilters] = useState({});

  const {
    allData,
    filteredData,
    paginatedData,
    totalPages,
    error,
    isLoading,
    page,
    setFilteredData,
    handlePageChange,
    setPage,
    refetch
  } = useTableRA({ apiMethod: roomApi.getRooms, hotelId: selectedHotel });

  const {
    checkedState,
    checkedAllState,
    handleCheckedChange,
    handleCheckAllChange,
    isAnyChecked,
  } = useCheckBoxState(allData || []);

  const { isSheetOpen, openSheet, closeSheet } = useSheet();

  const fetchHotels = async () => {
    try {
      const response = await hotelApi.getHotels(1, 100);
      setHotels(response.hotels || []);
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleSelectHotel = (hotelId) => {
    setSelectedHotel(hotelId);
    if (hotelId) refetch();
  };

  // Áp dụng bộ lọc frontend
  useEffect(() => {
    if (allData.length > 0) {
      const filtered = allData.filter((room) => {
        const { room_type_id, is_smoking, status, search } = searchFilters;

        return (
          (!room_type_id || room.room_type_id === room_type_id) &&
          (!is_smoking || room.is_smoking.toString() === is_smoking) &&
          (!status || room.status.toString() === status) &&
          (!search ||
            room.room_number.toLowerCase().includes(search.toLowerCase()) ||
            room.description.toLowerCase().includes(search.toLowerCase()))
        );
      });

      setFilteredData(filtered);
      setPage(1);
    }
  }, [allData, searchFilters, setFilteredData]);

  return (
    <>
      <PageHeading breadcrumb={{ title: "Danh sách phòng" }} />
      <div className="container mx-auto">
        <Card className="bg-white rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
            <CardTitle className="uppercase">{breadcrumb.index.title}</CardTitle>
            <CardDescription className="text-xs">
              Hiển thị danh sách phòng, hãy chọn tên khách sạn.
            </CardDescription>
            <div className="mr-[10px] mt-5">
              <Select onValueChange={handleSelectHotel}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Chọn tên khách sạn" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {hotels.length > 0 ? (
                    hotels.map((hotel) => (
                      <SelectItem key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="text-gray-500 p-2">Không có khách sạn nào</div>
                  )}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-[15px]">
            <Filter
              isAnyChecked={isAnyChecked}
              checkedState={checkedState}
              openSheet={openSheet}
              handleQueryString={setSearchFilters}
            />
            {isLoading && (
              <p className="flex text-center items-center justify-center">
                <LoadingSpinner /> Đang tải dữ liệu...
              </p>
            )}
            {error && (
              <p className="text-red-500">
                Lỗi khi tải dữ liệu: {error.message}
              </p>
            )}
            {paginatedData.length > 0 ? (
              <CustomTable
                data={paginatedData} // Dữ liệu phân trang sau khi lọc
                columns={tableColumn}
                actions={buttonAction.map((action) => ({
                  ...action,
                  onClick: action.onClick
                    ? (id) =>
                      action.onClick(
                        id,
                        action ? openSheet : null
                      )
                    : undefined,
                }))}
                caption="Danh sách phòng"
                checkedState={checkedState}
                checkedAllState={checkedAllState}
                handleCheckedChange={handleCheckedChange}
                handleCheckAllChange={handleCheckAllChange}
                openSheet={openSheet}
              />
            ) : (
              <p className="text-gray-500">Không có phòng nào.</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Paginate
              page={page}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </CardFooter>
        </Card>
        <CustomSheet
          title={breadcrumb.create.title}
          description="Nhập đầy đủ các thông tin dưới đây. Các mục có dấu (*) là bắt buộc"
          isSheetOpen={isSheetOpen.open}
          closeSheet={closeSheet}
          className="w-[400px] sm:w-[400px]"
        >
          <BookingStore
            closeSheet={closeSheet}
            onSubmitSuccess={refetch}
            hotelId={selectedHotel} // Truyền hotelId từ trạng thái
            roomId={isSheetOpen.id} // Lấy roomId từ trạng thái của Sheet
          />
        </CustomSheet>
      </div>
    </>
  );
};

export default RoomAvailable;
