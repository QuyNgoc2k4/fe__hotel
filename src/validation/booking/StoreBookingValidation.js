export const validation = () => {
  // Các trường cần validate
  const baseValidationData = [
    {
      label: "Ngày bắt đầu",
      id: "start_date",
      name: "start_date",
      type: "date",
      rules: {
        required: "Bạn chưa chọn ngày bắt đầu",
        validate: (value) =>
          new Date(value) > new Date() || "Ngày bắt đầu phải sau thời điểm hiện tại",
      },
    },
    {
      label: "Ngày kết thúc",
      id: "end_date",
      name: "end_date",
      type: "date",
      rules: {
        required: "Bạn chưa chọn ngày kết thúc",
        validate: {
          afterStart: (value, formValues) =>
            new Date(value) > new Date(formValues.start_date) ||
            "Ngày kết thúc phải sau ngày bắt đầu",
        },
      },
    },
    {
      label: "Yêu cầu đặc biệt",
      id: "special_requests",
      name: "special_requests",
      type: "textarea",
      rules: {
        required: "Bạn chưa nhập yêu cầu đặc biệt",
        maxLength: {
          value: 500,
          message: "Yêu cầu đặc biệt không được vượt quá 500 ký tự",
        },
      },
    },
  ];

  // Trả về các trường cần validate
  return { baseValidationData };
};
