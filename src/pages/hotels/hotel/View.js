import React from "react";
import PageHeading from "../../../components/heading";
import { hotelApi, tableColumn, buttonAction, breadcrumb } from "../../../api/hotelApi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Filter from "../../../components/ui/filterUseHotel";

import { LoadingSpinner } from "../../../components/ui/loading";
import CustomTable from "../../../components/ui/customTable";
import useTableH from "../../../hook/useTableH";
import useCheckBoxState from "../../../hook/useCheckBoxState";
import Paginate from "../../../components/Pagination";
import useSheet from "../../../hook/useSheet";
import CustomSheet from "../../../components/ui/CustomSheet";
import HotelStore from "./Store";

const HotelIndex = () => {
  // Fetch hotel data with refetch capability
  const {
    data,
    totalPages,
    error,
    isLoading,
    page,
    refetch, // refetch function to refresh the data
    handlePageChange,
  } = useTableH({ apiMethod: hotelApi.getHotels });

  // Checkbox state management
  const {
    checkedState,
    checkedAllState,
    handleCheckedChange,
    handleCheckAllChange,
    isAnyChecked,
  } = useCheckBoxState(data || []);

  const somethingChecked = isAnyChecked();
  const { isSheetOpen, openSheet, closeSheet } = useSheet();

  return (
    <>
      <PageHeading breadcrumb={breadcrumb.index} />
      <div className="container">
        <Card className="bg-white rounded-[5px] mt-[15px]">
          {/* Header */}
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
            <CardTitle className="uppercase">{breadcrumb.index.title}</CardTitle>
            <CardDescription className="text-xs">
              Hiển thị danh sách khách sạn, sử dụng các chức năng bên dưới để quản lý.
            </CardDescription>
          </CardHeader>
          {/* Nội dung */}
          <CardContent className="p-[15px]">
            <Filter
              isAnyChecked={somethingChecked}
              checkedState={checkedState}
              openSheet={openSheet}
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
              actions={buttonAction}
              caption="Danh sách khách sạn"
              checkedState={checkedState}
              checkedAllState={checkedAllState}
              handleCheckedChange={handleCheckedChange}
              handleCheckAllChange={handleCheckAllChange}
              openSheet={openSheet}
            />
          </CardContent>
          {/* Footer */}
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
            onSubmitSuccess={refetch} // Trigger refetch on success
          />
        </CustomSheet>
      </div>
    </>
  );
};

export default HotelIndex;
