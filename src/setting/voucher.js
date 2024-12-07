import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

// Table Columns
export const tableColumn = [
  { name: "Mã voucher", render: (voucher) => <span>{voucher.code}</span> },
  { name: "Mô tả", render: (voucher) => <span>{voucher.description}</span> },
  { name: "Số tiền giảm", render: (voucher) => <span>{voucher.discount_amount} VNĐ</span> },
  { name: "Phần trăm giảm", render: (voucher) => <span>{voucher.discount_percentage}%</span> },
  { name: "Số tiền giảm tối đa", render: (voucher) => <span>{voucher.max_discount_amount} VNĐ</span> },
  { name: "Số tiền tối thiểu", render: (voucher) => <span>{voucher.min_spend_amount} VNĐ</span> },
  { name: "Ngày bắt đầu", render: (voucher) => <span>{new Date(voucher.start_date).toLocaleDateString()}</span> },
  { name: "Ngày kết thúc", render: (voucher) => <span>{new Date(voucher.end_date).toLocaleDateString()}</span> },
  { name: "Giới hạn sử dụng", render: (voucher) => <span>{voucher.usage_limit}</span> },
  { name: "Đã sử dụng", render: (voucher) => <span>{voucher.used_count}</span> },
  {
    name: "Trạng thái",
    render: (voucher) => (
      <span className={`px-2 py-1 text-white rounded ${voucher.status === "active" ? "bg-green-500" : "bg-red-500"}`}>
        {voucher.status === "active" ? "Hoạt động" : "Không hoạt động"}
      </span>
    ),
  },
];

// Button Actions
export const buttonAction = [
  {
    path: (voucher) => `/vouchers/edit/${voucher.id}`,
    icon: <FaEdit className="text-white text-xl" />,
    className: "mr-[5px] bg-[#536485] hover:bg-[#39455c]",
    method: "update",
    onClick: (id, openSheet) => {
      if (openSheet) openSheet({ open: true, action: "update", id });
    },
  },
  {
    path: (voucher) => `/vouchers/delete/${voucher.id}`,
    icon: <MdDeleteForever className="text-white text-xl" />,
    className: "mr-[5px] bg-[#ec4758] hover:bg-[#d03f4d]",
    method: "delete",
    onClick: (id, openDialog) => {
      if (openDialog) openDialog(id); // Open confirmation dialog
    },
  },
];

// Breadcrumbs
export const breadcrumb = {
  index: {
    title: "Quản lý voucher",
    to: "/vouchers/index",
  },
  create: {
    title: "Thêm mới voucher",
    to: "/vouchers/create",
  },
  edit: {
    title: "Chỉnh sửa voucher",
    to: "/vouchers/edit",
  },
  update: {
    title: "Cập nhật thông tin voucher",
  },
};
