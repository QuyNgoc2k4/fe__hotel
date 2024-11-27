import React, { useState } from "react";
// api
import { hotelApi } from "../../../api/hotelApi";
// settings
import { tableColumn, buttonAction, breadcrumb } from "../../../setting/hotel";
// components
import PageHeading from "../../../components/heading";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import Filter from "../../../components/ui/filterUseHotel";
import { LoadingSpinner } from "../../../components/ui/loading";
import CustomTable from "../../../components/ui/customTable";
import Paginate from "../../../components/Pagination";
import CustomSheet from "../../../components/ui/CustomSheet";
import CustomDialog from "../../../components/ui/CustomDialog";

// hooks
import useTableH from "../../../hook/useTableH";
import useCheckBoxState from "../../../hook/useCheckBoxState";
import useSheet from "../../../hook/useSheet";
import HotelStore from "./Store";

const HotelIndex = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentHotelId, setCurrentHotelId] = useState(null);

  const {
    data,
    totalPages,
    error,
    isLoading,
    page,
    refetch,
    handlePageChange,
    handleQueryString,

  } = useTableH({ apiMethod: hotelApi.getHotels });

  const {
    checkedState,
    checkedAllState,
    handleCheckedChange,
    handleCheckAllChange,
    isAnyChecked,
  } = useCheckBoxState(data || []);

  const somethingChecked = isAnyChecked();
  const { isSheetOpen, openSheet, closeSheet } = useSheet();

  const openDialog = (hotelId) => {
    setCurrentHotelId(hotelId);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentHotelId) {
      try {
        await hotelApi.deleteHotel(currentHotelId);
        setDialogOpen(false); // Đóng dialog sau khi xóa
        refetch(); // Tải lại dữ liệu sau khi xóa
      } catch (error) {
        console.error("Lỗi xóa khách sạn:", error);
      }
    }
  };

  return (
    <>
      <PageHeading breadcrumb={breadcrumb.index} />
      <div className="container">
        <Card className="bg-white rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
            <CardTitle className="uppercase">{breadcrumb.index.title}</CardTitle>
            <CardDescription className="text-xs">
              Hiển thị danh sách khách sạn, sử dụng các chức năng bên dưới để quản lý.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            <Filter
              isAnyChecked={somethingChecked}
              checkedState={checkedState}
              openSheet={openSheet}
              handleQueryString={handleQueryString}

            />
            {isLoading && (
              <p className="flex text-center items-center justify-center">
                <LoadingSpinner /> Đang tải dữ liệu...
              </p>
            )}
            {error && (
              <p className="text-red-500">
                Lỗi khi lấy danh sách khách sạn: {error.message}
              </p>
            )}
            <CustomTable
              data={data}
              columns={tableColumn}
              actions={buttonAction.map((action) => ({
                ...action,
                onClick: action.onClick
                  ? (id) =>
                      action.onClick(
                        id,
                        action.method === "update" ? openSheet : openDialog
                      )
                  : undefined,
              }))}
              caption="Danh sách khách sạn"
              checkedState={checkedState}
              checkedAllState={checkedAllState}
              handleCheckedChange={handleCheckedChange}
              handleCheckAllChange={handleCheckAllChange}
              openSheet={openSheet}
            />
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
          title={
            isSheetOpen.action === "update"
              ? breadcrumb.update.title
              : breadcrumb.create.title
          }
          description="Nhập đầy đủ các thông tin dưới đây. Các mục có dấu (*) là bắt buộc"
          isSheetOpen={isSheetOpen.open}
          closeSheet={closeSheet}
          className="w-[1000px] sm:w-[1000px]"
        >
          <HotelStore
            closeSheet={closeSheet}
            hotelId={isSheetOpen.id}
            action={isSheetOpen.action}
            onSubmitSuccess={refetch}
          />
        </CustomSheet>
        <CustomDialog
          title="Xác nhận xóa"
          description="Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác."
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={handleDelete}
          confirmText="Xóa"
          cancelText="Hủy"
        />
      </div>
    </>
  );
};

export default HotelIndex;
