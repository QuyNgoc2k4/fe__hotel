import React, { useState } from "react";
// API
import { roomTypeApi } from "../../../api/roomTypeApi";
// Settings
import { tableColumn, buttonAction, breadcrumb } from "../../../setting/roomType";
// Components
import PageHeading from "../../../components/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Filter from "../../../components/ui/filterUseRoomType";
import { LoadingSpinner } from "../../../components/ui/loading";
import CustomTable from "../../../components/ui/customTable";
import Paginate from "../../../components/Pagination";
import CustomSheet from "../../../components/ui/CustomSheet";
import CustomDialog from "../../../components/ui/CustomDialog";
// Hooks
import useTableRT from "../../../hook/useTableRT";
import useCheckBoxState from "../../../hook/useCheckBoxState";
import useSheet from "../../../hook/useSheet";
import RoomTypeStore from "./Store";

const RoomTypes = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentRoomTypeId, setCurrentRoomTypeId] = useState(null);

  const {
    data,
    totalPages,
    error,
    isLoading,
    page,
    filters,
    refetch,
    handlePageChange,
    handleQueryString,
  } = useTableRT({ apiMethod: roomTypeApi.getRoomTypes });

  const {
    checkedState,
    checkedAllState,
    handleCheckedChange,
    handleCheckAllChange,
    isAnyChecked,
  } = useCheckBoxState(data || []);

  const somethingChecked = isAnyChecked();
  const { isSheetOpen, openSheet, closeSheet } = useSheet();

  const openDialog = (roomTypeId) => {
    setCurrentRoomTypeId(roomTypeId);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentRoomTypeId) {
      try {
        await roomTypeApi.deleteRoomType(currentRoomTypeId);
        setDialogOpen(false); // Close the dialog

        // Fetch updated data for the current page
        const updatedData = await roomTypeApi.getRoomTypes(page, 3, filters);

        if (updatedData.roomTypes.length === 0) {
          // If current page is empty, navigate back to the first page
          handlePageChange(1);
        } else {
          // Otherwise, refetch data for the current page
          refetch();
        }
      } catch (error) {
        console.error("Error deleting room type:", error);
      }
    }
  };

  return (
    <>
      <PageHeading breadcrumb={breadcrumb.index} />
      <div className="container mx-auto">
        <Card className="bg-white rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
            <CardTitle className="uppercase">{breadcrumb.index.title}</CardTitle>
            <CardDescription className="text-xs">
              Hiển thị danh sách loại phòng, sử dụng các chức năng bên dưới để quản lý.
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
                Error fetching room types: {error.message}
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
              caption="Danh sách loại phòng"
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
          description="Điền vào đầy đủ thông tin vào các trường."
          isSheetOpen={isSheetOpen.open}
          closeSheet={closeSheet}
          className="w-[400px] sm:w-[400px]"
        >
          <RoomTypeStore
            closeSheet={closeSheet}
            roomTypeId={isSheetOpen.id}
            action={isSheetOpen.action}
            onSubmitSuccess={refetch}
          />
        </CustomSheet>
        <CustomDialog
          title="Xác nhận trước khi xóa "
          description="Bạn hãy chắc chắn trước khi xóa ? Thao tác này không được hoàn lại."
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

export default RoomTypes;

