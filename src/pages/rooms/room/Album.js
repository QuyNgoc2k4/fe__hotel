import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { roomApi } from "../../../api/roomApi";
import { breadcrumb } from "../../../setting/room";
import PageHeading from "../../../components/heading";
import { LoadingSpinner } from "../../../components/ui/loading";
import Paginate from "../../../components/Pagination";
import ImageUploader from "../../../components/ImageUploader";
import ImageGallery from "../../../components/ImageGallery";
import ImageDeleteDialog from "../../../components/ImageDeleteDialog";
import ImageUrlDialog from "../../../components/ImageUrlDialog";

const RoomImage = () => {
  const { roomId } = useParams();
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
    ["roomImages", roomId, page],
    () => roomApi.getRoomImages(roomId, page, limit),
    { enabled: !!roomId, keepPreviousData: true }
  );

  const totalPages = data?.data?.totalPages || 0;

  // Delete mutation
  const deleteImageMutation = useMutation(roomApi.deleteRoomImage, {
    onSuccess: () => {
      queryClient.invalidateQueries(["roomImages", roomId, page]);
      queryClient.fetchQuery(["roomImages", roomId, page]).then((res) => {
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

      await roomApi.uploadRoomImages({
        room_id: roomId,
        image_urls: uploadedUrls,
      });

      queryClient.invalidateQueries(["roomImages", roomId, page]);
      setUploadedUrls([]);
      message.success("Ảnh đã được lưu!");
    } catch (err) {
      message.error("Lỗi khi lưu ảnh!");
    }
  }, [uploadedUrls, roomId, queryClient, page]);

  const handlePageChange = (newPage) => setPage(newPage);

  const handleDeleteImage = () => {
    if (selectedImageId) {
      deleteImageMutation.mutate(selectedImageId);
      setDeleteDialogOpen(false);
      setSelectedImageId(null);
    }
  };

  if (!roomId) {
    return <p className="text-center text-red-500">ID phòng không hợp lệ!</p>;
  }

  return (
    <>
      <PageHeading breadcrumb={breadcrumb.images} />
      <div className="container mx-auto">

        <div className="bg-white rounded-[5px] mt-[15px] p-[15px]">
          <p className="uppercase text-2xl font-semibold">{breadcrumb.images.title}</p>
          <p className="text-xs">
            Hiển thị danh sách hình ảnh phòng, sử dụng các chức năng bên dưới để quản lý.
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

export default RoomImage;
