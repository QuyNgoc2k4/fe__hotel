import React, { useState } from "react";
import { voucherApi } from "../../../api/voucherApi";
import { tableColumn, buttonAction, breadcrumb } from "../../../setting/voucher";
import PageHeading from "../../../components/heading";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { LoadingSpinner } from "../../../components/ui/loading";
import CustomTable from "../../../components/ui/customTable";
import CustomSheet from "../../../components/ui/CustomSheet";
import CustomDialog from "../../../components/ui/CustomDialog";
import useTableV from "../../../hook/useTableV";
import useCheckBoxState from "../../../hook/useCheckBoxState";
import useSheet from "../../../hook/useSheet";
import VoucherStore from "./Store";
import { Button } from "../../../components/ui/button";
import { FaPlus } from "react-icons/fa6";

const VoucherIndex = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [currentVoucherId, setCurrentVoucherId] = useState(null);

  const { data, error, isLoading, refetch } = useTableV({ apiMethod: voucherApi.getVouchers });

  const {
    checkedState,
    checkedAllState,
    handleCheckedChange,
    handleCheckAllChange,
    isAnyChecked,
  } = useCheckBoxState(data || []);

  const somethingChecked = isAnyChecked();
  const { isSheetOpen, openSheet, closeSheet } = useSheet();

  const openDialog = (voucherId) => {
    setCurrentVoucherId(voucherId);
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (currentVoucherId) {
      try {
        await voucherApi.deleteVoucher(currentVoucherId);
        setDialogOpen(false);
        refetch();
      } catch (error) {
        console.error("Error deleting voucher:", error);
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
              Hiển thị danh sách voucher, sử dụng các chức năng bên dưới để quản lý.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-[15px]">
            <div className="w-full sm:w-auto p-0 flex justify-end mb-5">
              <Button
                className="bg-[--primary-color] text-white hover:bg-[--hover-btn-color]"
                onClick={() => openSheet({ open: true, action: "", id: "34535" })}
              >
                <FaPlus />
                Thêm mới voucher
              </Button>
            </div>
            {isLoading && (
              <p className="flex text-center items-center justify-center">
                <LoadingSpinner /> Đang tải dữ liệu...
              </p>
            )}
            {error && (
              <p className="text-red-500">
                Lỗi khi lấy danh sách voucher: {error.message}
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
              caption="Danh sách voucher"
              checkedState={checkedState}
              checkedAllState={checkedAllState}
              handleCheckedChange={handleCheckedChange}
              handleCheckAllChange={handleCheckAllChange}
              openSheet={openSheet}
            />
          </CardContent>
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
          <VoucherStore
            closeSheet={closeSheet}
            voucherId={isSheetOpen.id}
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

export default VoucherIndex;
