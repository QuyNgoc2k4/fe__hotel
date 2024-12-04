export const validation = (data) => {
  // Các trường cơ bản (ngoại trừ checkbox)
  const baseValidationData = [
    {
      label: "Số phòng",
      id: "room_number",
      name: "room_number",
      type: "text",
      rules: {
        required: "Bạn chưa nhập số phòng",
        pattern: {
          value: /^[0-9A-Za-z]+$/,
          message: "Số phòng chỉ được chứa chữ cái và số",
        },
        maxLength: {
          value: 10,
          message: "Số phòng không được vượt quá 10 ký tự",
        },
      },
      defaultValue: data?.room_number || "",
    },
    {
      label: "Giá hiện tại",
      id: "current_price",
      name: "current_price",
      type: "number",
      rules: {
        required: "Bạn chưa nhập giá hiện tại",
        min: { value: 1, message: "Giá hiện tại phải lớn hơn 0" },
      },
      defaultValue: data?.current_price || "",
    },
    {
      label: "Tầng",
      id: "floor",
      name: "floor",
      type: "number",
      rules: {
        required: "Bạn chưa nhập số tầng",
        min: { value: 1, message: "Số tầng phải lớn hơn hoặc bằng 1" },
      },
      defaultValue: data?.floor || "",
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
  ];

  // Các trường checkbox
  const checkboxValidationData = [
    {
      label: "Hút thuốc",
      id: "is_smoking",
      name: "is_smoking",
      type: "checkbox",
      rules: {
        required: false,
      },
      defaultValue: data?.is_smoking || false,
    },
    {
      label: "Trạng thái",
      id: "status",
      name: "status",
      type: "checkbox",
      rules: {
        required: false,
      },
      defaultValue: data?.status || false,
    },
  ];

  // Trả về kết hợp cả hai
  return { baseValidationData, checkboxValidationData };
};
