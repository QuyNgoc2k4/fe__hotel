import React from "react";
import { IoCopyOutline } from "react-icons/io5";
import CustomDialog from "./ui/CustomDialog";
import { message } from "antd";

const ImageUrlDialog = ({ isOpen, imageUrl, onClose }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(imageUrl);
    message.success("URL đã được sao chép!");
  };

  return (
    <CustomDialog
      title="Thông tin URL ảnh"
      description={
        <div>
          <p className="mb-2">Đường dẫn URL:</p>
          <div className="relative">
            <input
              type="text"
              value={imageUrl}
              readOnly
              className="w-full p-2 border rounded pr-10 focus:outline-none"
              onClick={(e) => e.target.select()}
            />
            <IoCopyOutline
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={handleCopyToClipboard}
            />
          </div>
        </div>
      }
      isOpen={isOpen}
      onClose={onClose}
      cancelText="Đóng"
    />
  );
};

export default ImageUrlDialog;
