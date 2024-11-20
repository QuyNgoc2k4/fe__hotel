import { Hotel } from "../../types/Hotel";

export const validation = (data?: Hotel) => {
  const baseValidationData = [
    {
      label: "Tên khách sạn",
      id: "name",
      name: "name",
      type: "text",
      rules: {
        required: "Bạn chưa nhập tên khách sạn",
        minLength: { value: 3, message: "Tên khách sạn phải có ít nhất 3 ký tự" },
        maxLength: { value: 100, message: "Tên khách sạn không được vượt quá 100 ký tự" },
      },
      defaultValue: data?.name || "",
    },
    {
      label: "Địa chỉ",
      id: "address",
      name: "address",
      type: "text",
      rules: {
        required: "Bạn chưa nhập địa chỉ",
        maxLength: { value: 200, message: "Địa chỉ không được vượt quá 200 ký tự" },
      },
      defaultValue: data?.address || "",
    },
    {
      label: "Thành phố",
      id: "city",
      name: "city",
      type: "text",
      rules: {
        required: "Bạn chưa nhập thành phố",
        minLength: { value: 2, message: "Tên thành phố phải có ít nhất 2 ký tự" },
        maxLength: { value: 50, message: "Tên thành phố không được vượt quá 50 ký tự" },
      },
      defaultValue: data?.city || "",
    },
    {
      label: "Quốc gia",
      id: "country",
      name: "country",
      type: "text",
      rules: {
        required: "Bạn chưa nhập quốc gia",
        minLength: { value: 2, message: "Tên quốc gia phải có ít nhất 2 ký tự" },
        maxLength: { value: 50, message: "Tên quốc gia không được vượt quá 50 ký tự" },
      },
      defaultValue: data?.country || "",
    },
    {
      label: "Mã bưu chính",
      id: "postal_code",
      name: "postal_code",
      type: "text",
      rules: {
        required: "Bạn chưa nhập mã bưu chính",
        pattern: {
          value: /^[0-9]{4,6}$/,
          message: "Mã bưu chính phải là số từ 4 đến 6 chữ số",
        },
      },
      defaultValue: data?.postal_code || "",
    },
    {
      label: "Điện thoại",
      id: "phone",
      name: "phone",
      type: "text",
      rules: {
        required: "Bạn chưa nhập số điện thoại",
        pattern: {
          value: /^\+?[0-9]{10,15}$/,
          message: "Số điện thoại phải từ 10 đến 15 chữ số và có thể bao gồm mã quốc gia (+)",
        },
      },
      defaultValue: data?.phone || "",
    },
    {
      label: "Email(*)",
      id: "email",
      name: "email",
      type: "text",
      rules: {
        required: "Bạn chưa nhập địa chỉ email",
        pattern: { value: /^\S+@\S+\.\S+$/, message: "Địa chỉ email không đúng định dạng" },
      },
      defaultValue: data?.email || "",
    },
    {
      label: "Số sao",
      id: "stars",
      name: "stars",
      type: "number",
      rules: {
        required: "Bạn chưa nhập số sao",
        min: { value: 1, message: "Số sao tối thiểu là 1" },
        max: { value: 5, message: "Số sao tối đa là 5" },
      },
      defaultValue: data.stars || 0, // Giá trị mặc định
    },
    {
      label: "Mã số thuế",
      id: "tax_code",
      name: "tax_code",
      type: "text",
      rules: {
        required: "Bạn chưa nhập mã số thuế",
        pattern: { value: /^[0-9]{10,15}$/, message: "Mã số thuế phải là số từ 10 đến 15 ký tự" },
      },
      defaultValue: data?.tax_code || "",
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
      label: "Giờ check-in",
      id: "check_in_time",
      name: "check_in_time",
      type: "text",
      rules: {
        required: "Bạn chưa nhập giờ check-in",
        pattern: {
          value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          message: "Giờ check-in phải theo định dạng HH:mm (24 giờ)",
        },
      },
      defaultValue: data?.check_in_time || "",
    },
    {
      label: "Giờ check-out",
      id: "check_out_time",
      name: "check_out_time",
      type: "text",
      rules: {
        required: "Bạn chưa nhập giờ check-out",
        pattern: {
          value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          message: "Giờ check-out phải theo định dạng HH:mm (24 giờ)",
        },
      },
      defaultValue: data?.check_out_time || "",
    },
    {
      label: "Tổng số phòng",
      id: "total_rooms",
      name: "total_rooms",
      type: "number",
      rules: {
        required: "Bạn chưa nhập tổng số phòng",
        min: { value: 1, message: "Tổng số phòng phải ít nhất là 1" },
        max: { value: 1000, message: "Tổng số phòng không được vượt quá 1000" },
      },
      defaultValue: data?.total_rooms || 0,
    },
    {
      label: "Loại khách sạn",
      id: "hotel_type",
      name: "hotel_type",
      type: "text",
      rules: {
        required: "Bạn chưa nhập loại khách sạn",
        maxLength: { value: 50, message: "Loại khách sạn không được vượt quá 50 ký tự" },
      },
      defaultValue: data?.hotel_type || "",
    },
    {
      label: "Đánh giá",
      id: "rating",
      name: "rating",
      type: "number",
      rules: {
        required: "Bạn chưa nhập đánh giá",
        min: { value: 0, message: "Đánh giá phải lớn hơn hoặc bằng 0" },
        max: { value: 5, message: "Đánh giá phải nhỏ hơn hoặc bằng 5" },
      },
      defaultValue: data?.rating || 0,
    },
    {
      label: "Vĩ độ",
      id: "latitude",
      name: "latitude",
      type: "number",
      rules: {
        required: "Bạn chưa nhập vĩ độ",
        min: { value: -90, message: "Vĩ độ phải nằm trong khoảng -90 đến 90" },
        max: { value: 90, message: "Vĩ độ phải nằm trong khoảng -90 đến 90" },
      },
      defaultValue: data?.latitude || 0,
    },
    {
      label: "Kinh độ",
      id: "longitude",
      name: "longitude",
      type: "number",
      rules: {
        required: "Bạn chưa nhập kinh độ",
        min: { value: -180, message: "Kinh độ phải nằm trong khoảng -180 đến 180" },
        max: { value: 180, message: "Kinh độ phải nằm trong khoảng -180 đến 180" },
      },
      defaultValue: data?.longitude || 0,
    },
  ];
  return baseValidationData;
};
