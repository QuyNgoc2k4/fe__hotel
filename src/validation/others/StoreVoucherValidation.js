import { Voucher } from "../../types/Voucher";
import { formatDateForInput } from "../../lib/dateUtils";

export const validation = (data?: Voucher) => {
  const baseValidationData = [
    {
      label: "Mã Voucher",
      id: "code",
      name: "code",
      type: "text",
      rules: {
        required: "Bạn chưa nhập mã voucher",
        maxLength: { value: 50, message: "Mã voucher không được vượt quá 50 ký tự" },
      },
      defaultValue: data?.code || "",
    },
    {
      label: "Mô tả",
      id: "description",
      name: "description",
      type: "text",
      rules: {
        required: "Bạn chưa nhập mô tả",
        maxLength: { value: 500, message: "Mô tả không được vượt quá 500 ký tự" },
      },
      defaultValue: data?.description || "",
    },
    {
      label: "Phần trăm giảm giá",
      id: "discount_percentage",
      name: "discount_percentage",
      type: "number",
      rules: {
        required: "Bạn chưa nhập phần trăm giảm giá",
        min: { value: 0, message: "Phần trăm giảm giá phải lớn hơn hoặc bằng 0" },
        max: { value: 100, message: "Phần trăm giảm giá không được vượt quá 100" },
      },
      defaultValue: data?.discount_percentage || 0,
    },
    {
      label: "Số tiền giảm giá",
      id: "discount_amount",
      name: "discount_amount",
      type: "number",
      rules: {
        required: "Bạn chưa nhập số tiền giảm giá",
        min: { value: 0, message: "Số tiền giảm giá phải lớn hơn hoặc bằng 0" },
        max: { value: 1000000, message: "Số tiền giảm giá không được vượt quá 1,000,000" },
      },
      defaultValue: data?.discount_amount || 0,
    },
    {
      label: "Giá trị giảm tối đa",
      id: "max_discount_amount",
      name: "max_discount_amount",
      type: "number",
      rules: {
        required: "Bạn chưa nhập giá trị giảm tối đa",
        min: { value: 0, message: "Giá trị giảm tối đa phải lớn hơn hoặc bằng 0" },
        max: { value: 1000000, message: "Giá trị giảm tối đa không được vượt quá 1,000,000" },
      },
      defaultValue: data?.max_discount_amount || 0,
    },
    {
      label: "Số tiền tối thiểu",
      id: "min_spend_amount",
      name: "min_spend_amount",
      type: "number",
      rules: {
        required: "Bạn chưa nhập số tiền tối thiểu",
        min: { value: 0, message: "Số tiền tối thiểu phải lớn hơn hoặc bằng 0" },
        max: { value: 1000000, message: "Số tiền tối thiểu không được vượt quá 1,000,000" },
      },
      defaultValue: data?.min_spend_amount || 0,
    },
    {
      label: "Ngày bắt đầu",
      id: "start_date",
      name: "start_date",
      type: "date",
      rules: {
        required: "Bạn chưa nhập ngày bắt đầu",
      },
      defaultValue: data?.start_date ? formatDateForInput(data.start_date) : "",
    },
    {
      label: "Ngày kết thúc",
      id: "end_date",
      name: "end_date",
      type: "date",
      rules: {
        required: "Bạn chưa nhập ngày kết thúc",
      },
      defaultValue: data?.end_date ? formatDateForInput(data.end_date) : "",
    },
    {
      label: "Giới hạn sử dụng",
      id: "usage_limit",
      name: "usage_limit",
      type: "number",
      rules: {
        required: "Bạn chưa nhập giới hạn sử dụng",
        min: { value: 1, message: "Giới hạn sử dụng phải lớn hơn hoặc bằng 1" },
        max: { value: 1000, message: "Giới hạn sử dụng không được vượt quá 1,000" },
      },
      defaultValue: data?.usage_limit || 1,
    },
    {
      label: "Trạng thái",
      id: "status",
      name: "status",
      type: "text",
      rules: {
        required: "Bạn chưa nhập trạng thái",
        maxLength: { value: 50, message: "Trạng thái không được vượt quá 50 ký tự" },
      },
      defaultValue: data?.status || "active",
    },
  ];

  return baseValidationData;
};
