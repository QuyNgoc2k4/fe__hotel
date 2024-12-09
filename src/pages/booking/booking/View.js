import React, { useEffect, useState } from "react";
import { bookingApi } from "../../../api/bookingApi";
import PageHeading from "../../../components/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import useCheckBoxState from "../../../hook/useCheckBoxState";
import useSheet from "../../../hook/useSheet";
import useTableB from "../../../hook/useTableB";
import CustomTable from "../../../components/ui/customTable";
import { bookingTableColumn, bookingButtonAction, bookingBreadcrumb } from "../../../setting/booking";
import CustomSheet from "../../../components/ui/CustomSheet";
import BookingStored from "./Store";
import { LoadingSpinner } from "../../../components/ui/loading";
import BookingDetailsDialog from "./BookingDetails"; // Import the BookingDetailsDialog component

const BookingIndex = () => {
  const [searchFilters, setSearchFilters] = useState({});
  const [currentBooking, setCurrentBooking] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const { allData, filteredData, error, isLoading, setFilteredData, refetch } =
    useTableB({ apiMethod: bookingApi.getBookings });

  const { checkedState, checkedAllState, handleCheckedChange, handleCheckAllChange } =
    useCheckBoxState(allData || []);

  const { isSheetOpen, openSheet, closeSheet } = useSheet();

  // Open dialog to display booking details
  const openDialog = async (bookingId) => {
    try {
      const response = await bookingApi.getBookingDetails(bookingId); // Fetch booking details API
      setCurrentBooking(response);
      console.log("Booking details set to:", response); // Debug log
      setDialogOpen(true); // Open the dialog
    } catch (err) {
      console.error("Failed to fetch booking details:", err);
    }
  };
  
  // Apply frontend filtering
  useEffect(() => {
    if (allData.length > 0) {
      const filtered = allData.filter((booking) => {
        const { status, search } = searchFilters;
        return (
          (!status || booking.status.toLowerCase() === status.toLowerCase()) &&
          (!search ||
            booking.user?.name.toLowerCase().includes(search.toLowerCase()) ||
            booking.room?.room_number.toLowerCase().includes(search.toLowerCase()))
        );
      });

      setFilteredData(filtered);
    }
  }, [allData, searchFilters, setFilteredData]);

  return (
    <>
      <PageHeading breadcrumb={{ title: "Danh sách đặt phòng" }} />
      <div className="container mx-auto">
        <Card className="bg-white rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
            <CardTitle className="uppercase">{bookingBreadcrumb.index.title}</CardTitle>
            <CardDescription className="text-xs">
              Hiển thị danh sách đặt phòng. Bạn có thể áp dụng bộ lọc hoặc tìm kiếm.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            {isLoading && (
              <p className="flex text-center items-center justify-center">
                <LoadingSpinner /> Đang tải dữ liệu...
              </p>
            )}
            {error && <p className="text-red-500">Lỗi khi tải dữ liệu: {error.message}</p>}
            {filteredData.length > 0 ? (
              <CustomTable
                data={filteredData} // Hiển thị toàn bộ dữ liệu đã lọc
                columns={bookingTableColumn}
                actions={bookingButtonAction.map((action) => ({
                  ...action,
                  onClick: action.onClick ? (id) => action.onClick(id, openDialog) : undefined,
                }))}
                caption="Danh sách đặt phòng"
                checkedState={checkedState}
                checkedAllState={checkedAllState}
                handleCheckedChange={handleCheckedChange}
                handleCheckAllChange={handleCheckAllChange}
                openSheet={openSheet}
              />
            ) : (
              <p className="text-gray-500">Không có đặt phòng nào.</p>
            )}
          </CardContent>
        </Card>
        <CustomSheet
          title={bookingBreadcrumb.edit.title}
          description="Nhập đầy đủ các thông tin dưới đây. Các mục có dấu (*) là bắt buộc"
          isSheetOpen={isSheetOpen.open}
          closeSheet={closeSheet}
          className="w-[400px] sm:w-[400px]"
        >
          <BookingStored
            closeSheet={closeSheet}
            onSubmitSuccess={refetch}
            bookingId={isSheetOpen.id} // Retrieve booking ID from sheet state
          />
        </CustomSheet>
        <BookingDetailsDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setCurrentBooking(null);
          }}
          booking={currentBooking}
        />
      </div>
    </>
  );
};

export default BookingIndex;
