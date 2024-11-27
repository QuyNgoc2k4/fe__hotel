import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { hotelApi } from "../../../api/hotelApi";
import { breadcrumb } from "../../../setting/hotel";
import PageHeading from "../../../components/heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import CustomDialog from "../../../components/ui/CustomDialog";
import { LoadingSpinner } from "../../../components/ui/loading";
import Paginate from "../../../components/Pagination";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { Button } from "../../../components/ui/button";
import UploadWidget from "../../../components/UploadWidget";
import { FaPlus } from "react-icons/fa6";
import useFormSubmit from "../../../hook/useFormSubmit";

const HotelImage = () => {
  const { hotelId } = useParams();
  const [page, setPage] = useState(1);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isUrlDialogOpen, setIsUrlDialogOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [urls, setUrls] = useState([]); // Lưu danh sách URL ảnh đã upload
  const [errorUpload, setErrorUpLoad] = useState(null);
  const queryClient = useQueryClient();
  const limit = 8;

  const { data, isLoading, error } = useQuery(
    ["hotelImages", hotelId, page],
    () => hotelApi.getHotelImages(hotelId, page, limit),
    {
      enabled: !!hotelId,
      keepPreviousData: true,
    }
  );

  const totalPages = data?.data?.totalPages || 0;

  const deleteImageMutation = useMutation(
    (imageId) => hotelApi.deleteHotelImage(imageId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["hotelImages", hotelId, page]);
        queryClient.fetchQuery(["hotelImages", hotelId, page]).then((res) => {
          const remainingImages = res?.data?.images || [];
          const totalPages = res?.data?.totalPages || 0;

          if (remainingImages.length === 0 && page > 1) {
            setPage(1);
          }

          if (totalPages === 0) {
            setPage(1);
          }
        });
      },
      onError: (error) => {
        console.error("Lỗi khi xóa ảnh:", error);
        message.error("Không thể xóa ảnh!");
      },
    }
  );

  const { handleSubmit, loading: isSaving } = useFormSubmit(async (data) => {
    return hotelApi.uploadHotelImages({
      hotel_id: hotelId,
      image_urls: urls,
    });
  });

  const handleOnUpload = (errorUpload, result, widget) => {
    if (errorUpload) {
      setErrorUpLoad("Lỗi khi upload ảnh. Vui lòng thử lại!");
      widget.close({ quiet: true });
      return;
    }
    const newUrl = result?.info?.secure_url;
    setUrls((prevUrls) => [...prevUrls, newUrl]);
  };

  const handleDelete = () => {
    if (selectedImageId) {
      deleteImageMutation.mutate(selectedImageId);
      setDialogOpen(false);
      setSelectedImageId(null);
    }
  };

  const handleSave = async () => {
    try {
      await handleSubmit({});
      setUrls([]);

      queryClient.setQueryData(["hotelImages", hotelId, page], (oldData) => {
        if (!oldData) return oldData;

        const totalImages = oldData.data.totalImages + urls.length;
        const newImages = urls.map((url) => ({
          id: Date.now() + Math.random(),
          image_url: url,
        }));

        const updatedImages = [...oldData.data.images, ...newImages];
        const updatedTotalPages = Math.ceil(totalImages / limit);

        return {
          ...oldData,
          data: {
            ...oldData.data,
            images: updatedImages,
            totalImages,
            totalPages: updatedTotalPages,
          },
        };
      });

      if (urls.length + data.data.images.length > page * limit) {
        setPage(totalPages + 1);
      }

      message.success("Ảnh đã được lưu!");
    } catch (err) {
      message.error("Lỗi khi lưu ảnh. Vui lòng thử lại!");
    }
  };
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    queryClient.invalidateQueries(["hotelImages", hotelId, page]);
  }, [page, hotelId, queryClient]);

  if (!hotelId) {
    return <p className="text-center text-red-500">ID khách sạn không hợp lệ!</p>;
  }

  return (
    <>
      <PageHeading breadcrumb={breadcrumb.images} />
      <div className="container">
        <Card className="bg-white rounded-[5px] mt-[15px]">
          <CardHeader className="border-b border-solid border-[#f3f3f3] p-[15px]">
            <div className="p-0">
              <CardTitle className="uppercase">{breadcrumb.images.title}</CardTitle>
              <CardDescription className="text-xs">
                Hiển thị danh sách hình ảnh khách sạn, sử dụng các chức năng bên dưới để quản lý.
              </CardDescription>
            </div>
            <div className="p-0 text-right">
              <UploadWidget onUpload={handleOnUpload}>
                {({ open }) => (
                  <>
                    <Button
                      className="bg-[--primary-color] text-white hover:bg-[--hover-btn-color]"
                      onClick={(e) => {
                        e.preventDefault();
                        open();
                      }}
                    >
                      <FaPlus />
                      Thêm mới ảnh cho khách sạn
                    </Button>
                  </>
                )}
              </UploadWidget>

              {errorUpload && <p className="text-red-500 mt-2">{errorUpload}</p>}

              {urls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {urls.map((url, index) => (
                    <div key={index} className="relative">
                      <IoMdClose
                        className="absolute top-0 right-0 text-black text-xl cursor-pointer"
                        onClick={() => setUrls(urls.filter((_, i) => i !== index))}
                      />
                      <img
                        src={url}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-40 object-cover rounded shadow-md"
                      />
                    </div>
                  ))}
                </div>
              )}

              {urls.length > 0 && (
                <Button
                  className="mt-4 bg-[--primary-color] text-white hover:bg-[--hover-btn-color]"
                  onClick={handleSave}
                  disabled={isSaving || urls.length === 0}
                >
                  {isSaving ? "Đang lưu..." : "Lưu tất cả ảnh"}
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-[15px]">
            {isLoading && (
              <div className="flex items-center justify-center">
                <LoadingSpinner /> Đang tải dữ liệu...
              </div>
            )}
            {error && <p className="text-red-500">Lỗi khi lấy ảnh: {error.message}</p>}

            {!isLoading && data?.data?.images?.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.data.images.map((image) => (
                  <div className="relative group" key={image.id}>
                    <div
                      className="absolute top-[-8px] right-[-8px] z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 cursor-pointer"
                      onClick={() => {
                        setSelectedImageId(image.id);
                        setDialogOpen(true);
                      }}
                    >
                      <IoCloseCircleOutline className="text-black text-xl" />
                    </div>
                    <div
                      className="border border-solid border-gray-200 rounded overflow-hidden shadow-sm"
                      onClick={() => {
                        setSelectedImageUrl(image.image_url);
                        setIsUrlDialogOpen(true);
                      }}
                    >
                      <img
                        src={image.image_url}
                        alt={image.alt || "Hotel Image"}
                        className="w-full h-40 object-cover cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              !isLoading && <p className="text-center">Không có ảnh nào.</p>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Paginate page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
          </CardFooter>
        </Card>

        <CustomDialog
          title="Xác nhận xóa"
          description="Bạn có chắc chắn muốn xóa ảnh này không? Hành động này không thể hoàn tác."
          isOpen={isDialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setSelectedImageId(null);
          }}
          onConfirm={handleDelete}
          confirmText="Xóa"
          cancelText="Hủy"
        />

        <CustomDialog
          title="Thông tin URL ảnh"
          description={
            <div>
              <p className="mb-2">Đường dẫn URL:</p>
              <div className="relative">
                <input
                  type="text"
                  value={selectedImageUrl}
                  readOnly
                  className="w-full p-2 border rounded pr-10 focus:outline-none"
                  onClick={(e) => e.target.select()}
                />
                <IoCopyOutline
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedImageUrl);
                    message.success("URL đã được sao chép!");
                  }}
                />
              </div>
            </div>
          }
          isOpen={isUrlDialogOpen}
          onClose={() => {
            setIsUrlDialogOpen(false);
            setSelectedImageUrl("");
          }}
          cancelText="Đóng"
        />
      </div>
    </>
  );
};

export default HotelImage;
