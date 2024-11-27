import React from "react";
import CustomDialog from "./ui/CustomDialog";

const ImageDeleteDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <CustomDialog
      title="Xác nhận xóa"
      description="Bạn có chắc chắn muốn xóa ảnh này không? Hành động này không thể hoàn tác."
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmText="Xóa"
      cancelText="Hủy"
    />
  );
};

export default ImageDeleteDialog;
