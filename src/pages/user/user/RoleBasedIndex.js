import React, { useState } from "react";
import { userApi } from "../../../api/userApi";
import PageHeading from "../../../components/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Filter from "../../../components/ui/filter";
import { LoadingSpinner } from "../../../components/ui/loading";
import CustomTable from "../../../components/ui/customTable";
import Paginate from "../../../components/Pagination";
import CustomSheet from "../../../components/ui/CustomSheet";
import CustomDialog from "../../../components/ui/CustomDialog";
import useTable from "../../../hook/useTable";
import useCheckBoxState from "../../../hook/useCheckBoxState";
import useSheet from "../../../hook/useSheet";
import UserStore from "./Store";
import { getTableColumns, buttonAction, breadcrumb } from "../../../setting/user";

const RoleBasedIndex = ({ role = "", title, breadcrumbKey }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  const {
    data,
    totalPages,
    error,
    isLoading,
    page,
    limit,
    filters,
    refetch,
    handlePageChange,
    handleQueryString,
  } = useTable({ role }); // Lấy data và các hàm xử lý từ useTable

  const { checkedState, checkedAllState, handleCheckedChange, handleCheckAllChange, isAnyChecked } =
    useCheckBoxState(data || []);

  const { isSheetOpen, openSheet, closeSheet } = useSheet();

  const openDialog = (userId) => {
    setCurrentUserId(userId);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentUserId) {
      try {
        await userApi.deleteUser(currentUserId); // Xóa user
        setDialogOpen(false); // Đóng dialog sau khi xóa

        const updatedData = await userApi.getUsers(page, limit, { ...filters, role });

        if (updatedData.users.length === 0 && page > 1) {
          handlePageChange(page - 1); // Chuyển về trang trước nếu trang hiện tại không còn dữ liệu
        } else {
          refetch(); // Làm mới trang hiện tại nếu còn dữ liệu
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const currentBreadcrumb = breadcrumb[breadcrumbKey]?.index || breadcrumb.index.index;

  const tableColumns = getTableColumns(role);

  return (
    <>
      <PageHeading breadcrumb={currentBreadcrumb} />
      <div className="container mx-auto">
        <Card className="bg-white rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
            <CardTitle className="uppercase">{title}</CardTitle>
            <CardDescription className="text-xs">
              Hiển thị danh sách {title.toLowerCase()}, sử dụng các chức năng bên dưới để quản lý.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            <Filter
              isAnyChecked={isAnyChecked()}
              checkedState={checkedState}
              openSheet={openSheet}
              handleQueryString={handleQueryString}
            />
            {isLoading ? (
              <p className="flex text-center items-center justify-center">
                <LoadingSpinner /> Đang tải dữ liệu...
              </p>
            ) : error ? (
              <p className="text-red-500">Lỗi khi lấy danh sách {title.toLowerCase()}: {error.message}</p>
            ) : (
              <CustomTable
                data={data}
                columns={tableColumns}
                actions={buttonAction.map((action) => ({
                  ...action,
                  onClick: action.onClick
                    ? (id) => action.onClick(id, action.method === "update" ? openSheet : openDialog)
                    : undefined,
                }))}
                caption={`Danh sách ${title.toLowerCase()}`}
                checkedState={checkedState}
                checkedAllState={checkedAllState}
                handleCheckedChange={handleCheckedChange}
                handleCheckAllChange={handleCheckAllChange}
              />
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Paginate page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
          </CardFooter>
        </Card>
        <CustomSheet
          title={isSheetOpen.action === "update" ? currentBreadcrumb.update?.title : currentBreadcrumb.create?.title}
          description="Nhập đầy đủ các thông tin dưới đây. Các mục có dấu (*) là bắt buộc"
          isSheetOpen={isSheetOpen.open}
          closeSheet={closeSheet}
          className="w-[1000px] sm:w-[1000px]"
        >
          <UserStore
            closeSheet={closeSheet}
            userId={isSheetOpen.id}
            action={isSheetOpen.action}
            role={role}
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

export default RoleBasedIndex;
