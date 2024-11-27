import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { hotelApi } from "../../../api/hotelApi";
import { breadcrumb } from "../../../setting/hotel";
import PageHeading from "../../../components/heading";
import { LoadingSpinner } from "../../../components/ui/loading";
import Paginate from "../../../components/Pagination";
import ImageUploader from "../../../components/ImageUploader";
import ImageGallery from "../../../components/ImageGallery";
import ImageDeleteDialog from "../../../components/ImageDeleteDialog";
import ImageUrlDialog from "../../../components/ImageUrlDialog";

const HotelImage = () => {
  const { hotelId } = useParams();
  const [page, setPage] = useState(1);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isUrlDialogOpen, setUrlDialogOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [errorUpload, setErrorUpload] = useState(null);

  const queryClient = useQueryClient();
  const limit = 8;

  // Fetch images
  const { data, isLoading, error } = useQuery(
    ["hotelImages", hotelId, page],
    () => hotelApi.getHotelImages(hotelId, page, limit),
    { enabled: !!hotelId, keepPreviousData: true }
  );

  const totalPages = data?.data?.totalPages || 0;

  // Delete mutation
  const deleteImageMutation = useMutation(hotelApi.deleteHotelImage, {
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
  });

  // Upload images
  const handleSaveUploadedImages = useCallback(async () => {
    try {
      if (!uploadedUrls.length) return;

      await hotelApi.uploadHotelImages({
        hotel_id: hotelId,
        image_urls: uploadedUrls,
      });

      queryClient.invalidateQueries(["hotelImages", hotelId, page]);
      setUploadedUrls([]);
      message.success("Ảnh đã được lưu!");
    } catch (err) {
      message.error("Lỗi khi lưu ảnh!");
    }
  }, [uploadedUrls, hotelId, queryClient, page]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleDeleteImage = () => {
    if (selectedImageId) {
      deleteImageMutation.mutate(selectedImageId);
      setDeleteDialogOpen(false);
      setSelectedImageId(null);
    }
  };

  if (!hotelId) {
    return <p className="text-center text-red-500">ID khách sạn không hợp lệ!</p>;
  }

  return (
    <>
      <PageHeading breadcrumb={breadcrumb.images} />
      <div className="container">

        <div className="bg-white rounded-[5px] mt-[15px] p-[15px]">
          <p className="uppercase text-2xl font-semibold">{breadcrumb.images.title}</p>
          <p className="text-xs">
            Hiển thị danh sách hình ảnh khách sạn, sử dụng các chức năng bên dưới để quản lý.
          </p>
          <ImageUploader
            uploadedUrls={uploadedUrls}
            setUploadedUrls={setUploadedUrls}
            setErrorUpload={setErrorUpload}
            errorUpload={errorUpload}
            onSave={handleSaveUploadedImages}
          />
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner /> Đang tải dữ liệu...
              </div>
            ) : error ? (
              <p className="text-red-500">Lỗi khi lấy ảnh: {error.message}</p>
            ) : (
              <ImageGallery
                images={data?.data?.images || []}
                onImageDelete={(imageId) => {
                  setSelectedImageId(imageId);
                  setDeleteDialogOpen(true);
                }}
                onImageSelect={(imageUrl) => {
                  setSelectedImageUrl(imageUrl);
                  setUrlDialogOpen(true);
                }}
              />
            )}
          </div>
          <Paginate page={page} totalPages={totalPages} handlePageChange={handlePageChange} />
        </div>

        <ImageDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteImage}
        />

        <ImageUrlDialog
          isOpen={isUrlDialogOpen}
          imageUrl={selectedImageUrl}
          onClose={() => setUrlDialogOpen(false)}
        />
      </div>
    </>
  );
};

export default HotelImage;
