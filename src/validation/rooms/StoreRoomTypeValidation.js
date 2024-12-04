
export const validation = (data?: RoomType) => {
  const baseValidationData = [
    {
      label: "Tên loại phòng",
      id: "name",
      name: "name",
      type: "text",
      rules: {
        required: "Bạn chưa nhập tên loại phòng",
        minLength: { value: 3, message: "Tên loại phòng phải có ít nhất 3 ký tự" },
        maxLength: { value: 100, message: "Tên loại phòng không được vượt quá 100 ký tự" },
      },
      defaultValue: data?.name || "",
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
  return baseValidationData;
};
