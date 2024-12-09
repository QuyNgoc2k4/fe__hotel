import React from "react";
import CustomDialog from "../../../components/ui/CustomDialog";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

const BookingDetailsDialog = ({ isOpen, onClose, booking }) => {
  return (
    <CustomDialog
      title="Chi Tiết Đơn Đặt Phòng"
      description={booking ? (
        <div className="p-4 bg-gray-100 rounded-lg">
          <div className="space-y-2">
            <p className="text-sm">
              <strong className="text-gray-600">Người đặt:</strong> 
              <span className="ml-2">{booking.user?.name} ({booking.user?.email})</span>
            </p>
            <p className="text-sm">
              <strong className="text-gray-600">Số điện thoại:</strong> 
              <span className="ml-2">{booking.user?.phone}</span>
            </p>
            <p className="text-sm">
              <strong className="text-gray-600">Phòng:</strong> 
              <span className="ml-2">{booking.room?.room_number}</span>
            </p>
            <p className="text-sm">
              <strong className="text-gray-600">Ngày nhận phòng:</strong> 
              <span className="ml-2">{new Date(booking.start_date).toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <strong className="text-gray-600">Ngày trả phòng:</strong> 
              <span className="ml-2">{new Date(booking.end_date).toLocaleString()}</span>
            </p>
            <p className="text-sm">
              <strong className="text-gray-600">Trạng thái:</strong> 
              <span className="ml-2">{booking.status}</span>
            </p>
            <p className="text-sm">
              <strong className="text-gray-600">Yêu cầu đặc biệt:</strong> 
              <span className="ml-2">{booking.special_requests || "Không có"}</span>
            </p>
            <p className="text-sm">
              <strong className="text-gray-600">Mô tả:</strong> 
              <span className="ml-2">{booking.room?.description}</span>
            </p>
            {booking.services && booking.services.length > 0 && (
              <>
                <p className="text-sm font-semibold text-gray-800 mt-4">Dịch vụ:</p>
                <ul className="list-disc pl-6 space-y-1">
                  {booking.services.map((service) => (
                    <li key={service.id} className="text-sm text-gray-700">
                      {service.service.name} x {service.quantity} - Giá: {formatCurrency(service.price)}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-300">
            <p className="text-lg font-bold text-gray-800">
              Tổng giá: {formatCurrency(booking.total_price)}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Đang tải dữ liệu...</p>
      )}
      isOpen={isOpen}
      onClose={onClose}
      confirmText=""
      cancelText="Đóng"
    >
      
    </CustomDialog>
  );
};

export default BookingDetailsDialog;
