import React from "react";
import { Button } from "./ui/button";
import UploadWidget from "./UploadWidget";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

const ImageUploader = ({ uploadedUrls, setUploadedUrls, setErrorUpload, errorUpload, onSave }) => {
  const handleUpload = (error, result, widget) => {
    if (error) {
      setErrorUpload("Lỗi khi upload ảnh. Vui lòng thử lại!");
      widget.close({ quiet: true });
    } else {
      const newUrl = result?.info?.secure_url;
      setUploadedUrls((prev) => [...prev, newUrl]);
    }
  };

  const handleRemoveUrl = (index) => {
    setUploadedUrls((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4 text-right">
      <UploadWidget onUpload={handleUpload}>
        {({ open }) => (
          <Button
            className="bg-[--primary-color] text-white hover:bg-[--hover-btn-color]"
            onClick={(e) => {
              e.preventDefault();
              open();
            }}
          >
            <FaPlus /> Thêm ảnh
          </Button>
        )}
      </UploadWidget>
      {errorUpload && <p className="text-red-500 mt-2">{errorUpload}</p>}

      {uploadedUrls.length > 0 && (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {uploadedUrls.map((url, index) => (
              <div key={index} className="relative">
                {/* Icon xóa URL */}
                <IoMdClose
                  className="absolute top-0 right-0 text-black text-xl cursor-pointer"
                  onClick={() => handleRemoveUrl(index)}
                />
                <img
                  src={url}
                  alt={`Uploaded ${index}`}
                  className="w-full h-40 object-cover rounded shadow-md"
                />
              </div>
            ))}
          </div>
          <Button
            className="mt-4 bg-[--primary-color] text-white hover:bg-[--hover-btn-color]"
            onClick={onSave}
          >
            Lưu tất cả ảnh
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
