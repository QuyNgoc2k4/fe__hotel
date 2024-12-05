import { Service } from "../../types/Service";

export const validation = (data?: Service) => {
  const baseValidationData = [
    {
      label: "Tên dịch vụ",
      id: "name",
      name: "name",
      type: "text",
      rules: {
        required: "Bạn chưa nhập tên dịch vụ",
        minLength: { value: 3, message: "Tên dịch vụ phải có ít nhất 3 ký tự" },
        maxLength: { value: 100, message: "Tên dịch vụ không được vượt quá 100 ký tự" },
      },
      defaultValue: data?.name || "",
    },
    {
      label: "Giá",
      id: "price",
      name: "price",
      type: "number",
      rules: {
        required: "Bạn chưa nhập giá",
        min: { value: 1, message: "Giá phải lớn hơn 0" },
        max: { value: 1000000, message: "Giá không được vượt quá 1,000,000" },
      },
      defaultValue: data?.price || 0,
    },
    {
      label: "Mô tả",
      id: "description",
      name: "description",
      type: "text",
      rules: {
        required: "Bạn chưa nhập mô tả dịch vụ",
        maxLength: { value: 500, message: "Mô tả không được vượt quá 500 ký tự" },
      },
      defaultValue: data?.description || "",
    },
    {
      label: "Loại dịch vụ",
      id: "service_type",
      name: "service_type",
      type: "text",
      rules: {
        required: "Bạn chưa nhập loại dịch vụ",
        maxLength: { value: 50, message: "Loại dịch vụ không được vượt quá 50 ký tự" },
      },
      defaultValue: data?.service_type || "",
    },
    {
      label: "Khả dụng",
      id: "available",
      name: "available",
      type: "checkbox",
      rules: {
        required: "Bạn chưa chọn trạng thái khả dụng",
      },
      defaultValue: data?.available || false,
    },

    {
      label: "Thời gian hoạt động (không bắt buộc)",
      id: "time_range",
      name: "time_range",
      type: "text",
      rules: {
        pattern: {
          value: /^([01]?[0-9]|2[0-3]):[0-5][0-9] - ([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
          message: "Thời gian hoạt động phải theo định dạng HH:mm - HH:mm",
        },
      },
      defaultValue: data?.time_range || "",
    },
  ];

  return baseValidationData;
};
