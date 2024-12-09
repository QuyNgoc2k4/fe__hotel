import React from "react";
import { FaEdit } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";

export const bookingTableColumn = [
  { name: "Mã đặt phòng", render: (booking) => <span>{booking.id}</span> },
  {
    name: "Tên khách hàng",
    render: (booking) => <span>{booking.user?.name || "N/A"}</span>,
  },
  {
    name: "Email khách hàng",
    render: (booking) => <span>{booking.user?.email || "N/A"}</span>,
  },
  {
    name: "Số phòng",
    render: (booking) => <span>{booking.room?.room_number || "N/A"}</span>,
  },
  {
    name: "Giá hiện tại",
    render: (booking) =>
      booking.room?.current_price ? (
        <span>{booking.room.current_price.toLocaleString()} VND</span>
      ) : (
        "N/A"
      ),
  },
  {
    name: "Ngày bắt đầu",
    render: (booking) => (
      <span>{new Date(booking.start_date).toLocaleDateString()}</span>
    ),
  },
  {
    name: "Ngày kết thúc",
    render: (booking) => (
      <span>{new Date(booking.end_date).toLocaleDateString()}</span>
    ),
  },
  {
    name: "Tổng giá",
    render: (booking) => (
      <span>{booking.total_price.toLocaleString()} VND</span>
    ),
  },
  {
    name: "Phương thức thanh toán",
    render: (booking) => (
      <span
        className={`px-2 py-1 rounded ${
          booking.payment_method === "credit_card"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {booking.payment_method === "credit_card" ? "Thẻ tín dụng" : "Tiền mặt"}
      </span>
    ),
  },
  {
    name: "Trạng thái",
    render: (booking) => {
      const statusOptions = {
        Pending: { label: "Đang chờ", className: "bg-yellow-100 text-yellow-700" },
        Confirmed: { label: "Đã xác nhận", className: "bg-green-100 text-green-700" },
        Cancelled: { label: "Đã hủy", className: "bg-red-100 text-red-700" },
      };
  
      const status = statusOptions[booking.status] || {
        label: "Không xác định",
        className: "bg-gray-100 text-gray-700",
      };
  
      return (
        <span className={`px-2 py-1 rounded ${status.className}`}>
          {status.label}
        </span>
      );
    },
  },
  {
    name: "Yêu cầu đặc biệt",
    render: (booking) => (
      <span>{booking.special_requests || "Không có yêu cầu đặc biệt"}</span>
    ),
  },
];

export const bookingButtonAction = [
  {
    path: (booking) => `/bookings/edit/${booking.id}`,
    icon: <FaEdit className="text-white text-xl" />,
    className: "mr-[5px] bg-[#536485] hover:bg-[#39455c]",
    onClick: (id, openSheet) => {
      console.log("Booking ID:", id); // Log the booking ID
      if (openSheet) openSheet({ open: true, id });
    },
  },
  {
    path: (booking) => `/bookings/details/${booking.id}`,
    icon: <BsCardChecklist className="text-white text-xl" />,
    className: "mr-[5px] bg-[#0d9488] hover:bg-[#0a6c6a]",
    onClick: (id, openDialog) => {
      if (openDialog) openDialog(id);
    },
  },
];

export const bookingBreadcrumb = {
  index: {
    title: "Danh sách đặt phòng",
    to: "/bookings",
  },

  edit: {
    title: "Chỉnh sửa trạng thái đặt phòng",
    to: "/bookings/edit",
  },
 
};

export const BookingTable = ({ bookings, openSheet }) => (
  <table className="table-auto w-full border-collapse border border-gray-200">
    <thead>
      <tr>
        {bookingTableColumn.map((col, index) => (
          <th
            key={index}
            className="border border-gray-300 px-4 py-2 text-left text-gray-700"
          >
            {col.name}
          </th>
        ))}
        <th className="border border-gray-300 px-4 py-2 text-left text-gray-700">
          Actions
        </th>
      </tr>
    </thead>
    <tbody>
      {bookings.map((booking) => (
        <tr key={booking.id}>
          {bookingTableColumn.map((col, index) => (
            <td key={index} className="border border-gray-300 px-4 py-2">
              {col.render(booking)}
            </td>
          ))}
          <td className="border border-gray-300 px-4 py-2">
            {bookingButtonAction.map((action, index) => (
              <a
                key={index}
                href={action.path(booking)}
                className={`inline-block px-2 py-1 text-white ${action.className}`}
              >
                {action.icon}
              </a>
            ))}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
