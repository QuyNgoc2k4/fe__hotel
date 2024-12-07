export const validation = (data = {}, role = "admin") => {
  // Trường chung cho tất cả vai trò
  const commonFields = [
    {
      label: "Họ tên",
      id: "name",
      name: "name",
      type: "text",
      rules: { required: "Bạn chưa nhập Họ tên" },
      defaultValue: data.name || "", // Giá trị mặc định
    },
    {
      label: "Email(*)",
      id: "email",
      name: "email",
      type: "text",
      rules: {
        required: "Bạn chưa nhập địa chỉ email",
        pattern: { value: /^\S+@\S+$/i, message: "Địa chỉ mail không đúng định dạng" },
      },
      defaultValue: data.email || "", // Giá trị mặc định
    },
    {
      label: "Điện thoại",
      id: "phone",
      name: "phone",
      type: "number",
      rules: {
        required: "Bạn chưa nhập số điện thoại",
        pattern: { value: /^[0-9]{10,11}$/, message: "Số điện thoại không đúng định dạng" },
      },
      defaultValue: data.phone || "", // Giá trị mặc định
    },
  ];
    // Trường đặc biệt cho `customer`
    if (role === "admin") {
      return [
        ...commonFields,
        {
          label: "Chức vụ quản lý",
          id: "management_level",
          name: "management_level",
          type: "select",
          options: [
            { value: "Senior Manager", label: "Senior Manager" },
            { value: "Senior Manager 1", label: "Senior Manager 1" },
          ],
          rules: { required: "Bạn chưa chọn chức vụ" },
          defaultValue: data.management_level || "",
        }
      ];
    }
  

  // Trường đặc biệt cho `customer`
  if (role === "customer") {
    return [
      ...commonFields,
      {
        label: "Giới tính",
        id: "gender",
        name: "gender",
        type: "select",
        options: [
          { value: "Male", label: "Nam" },
          { value: "Female", label: "Nữ" },
        ],
        rules: { required: "Bạn chưa chọn giới tính" },
        defaultValue: data.gender || "",
      },
      {
        label: "Ngày sinh",
        id: "date_of_birth",
        name: "date_of_birth",
        type: "date",
        rules: { required: "Bạn chưa nhập ngày sinh" },
        defaultValue: data.date_of_birth || "",
      },
      {
        label: "Số CMND/CCCD",
        id: "identity_number",
        name: "identity_number",
        type: "text",
        rules: { required: "Bạn chưa nhập số CMND/CCCD" },
        defaultValue: data.identity_number || "",
      },
      {
        label: "Địa chỉ",
        id: "address",
        name: "address",
        type: "text",
        rules: { required: "Bạn chưa nhập địa chỉ" },
        defaultValue: data.address || "",
      },
      {
        label: "Quốc tịch",
        id: "nationality",
        name: "nationality",
        type: "text",
        rules: { required: "Bạn chưa nhập quốc tịch" },
        defaultValue: data.nationality || "",
      },
    ];
  }

  // Trường đặc biệt cho `staff`
  if (role === "staff") {
    return [
      ...commonFields,
   
      {
        label: "Vai trò",
        id: "role",
        name: "role",
        type: "text",
        rules: { required: "Bạn chưa nhập vai trò" },
        defaultValue: data.role || "",
      },
      {
        label: "Mức lương",
        id: "salary",
        name: "salary",
        type: "number",
        rules: { required: "Bạn chưa nhập mức lương" },
        defaultValue: data.salary || "",
      },
      {
        label: "Ngày bắt đầu",
        id: "start_date",
        name: "start_date",
        type: "date",
        rules: { required: "Bạn chưa nhập ngày bắt đầu" },
        defaultValue: data.start_date || "",
      },
      {
        label: "Ngày kết thúc",
        id: "end_date",
        name: "end_date",
        type: "date",
        rules: { required: "Bạn chưa nhập ngày kết thúc" },
        defaultValue: data.end_date || "",
      },
      {
        label: "Số CMND/CCCD",
        id: "id_card_number",
        name: "id_card_number",
        type: "text",
        rules: { required: "Bạn chưa nhập số CMND/CCCD" },
        defaultValue: data.id_card_number || "",
      },
      {
        label: "Trình độ học vấn",
        id: "education_level",
        name: "education_level",
        type: "text",
        defaultValue: data.education_level || "",
      },
      {
        label: "Chứng chỉ",
        id: "certifications",
        name: "certifications",
        type: "text",
        defaultValue: data.certifications || "",
      },
      {
        label: "Địa chỉ",
        id: "address",
        name: "address",
        type: "text",
        rules: { required: "Bạn chưa nhập địa chỉ" },
        defaultValue: data.address || "",
      },
      {
        label: "Tên liên hệ khẩn cấp",
        id: "emergency_contact_name",
        name: "emergency_contact_name",
        type: "text",
        rules: { required: "Bạn chưa nhập tên liên hệ khẩn cấp" },
        defaultValue: data.emergency_contact_name || "",
      },
      {
        label: "SĐT liên hệ khẩn cấp",
        id: "emergency_contact_phone",
        name: "emergency_contact_phone",
        type: "text",
        rules: { required: "Bạn chưa nhập SĐT liên hệ khẩn cấp" },
        defaultValue: data.emergency_contact_phone || "",
      },
    ];
  }

  // Mặc định trả về trường của admin
  return commonFields;
};

  
  export const options = [
    { value: "Senior Manager", label: "Senior Manager" },
    { value: "Senior Manager 1", label: "Senior Manager 1" },
    { value: "Administrator 2", label: "Administrator 2" },
  ];
  