// src/hook/useCheckBoxState.js
import { useEffect, useState } from "react";

const useCheckBoxState = (data = []) => {
  const [checkedState, setCheckedState] = useState({});
  const [checkedAllState, setCheckedAllState] = useState(false);

  // Cập nhật trạng thái của một checkbox cụ thể
  const handleCheckedChange = (id) => {
    setCheckedState((prevCheckedState) => {
      const updatedCheckedState = { ...prevCheckedState, [id]: !prevCheckedState[id] };

      // Kiểm tra nếu tất cả các checkbox trong `data` hiện tại đều được chọn
      const totalItems = data.length;
      const selectedItems = data.filter((item) => updatedCheckedState[item.id]).length;
      const allChecked = selectedItems === totalItems;

      setCheckedAllState(allChecked);
      return updatedCheckedState;
    });
  };

  // Xử lý trạng thái "Chọn Tất Cả" cho các mục trên trang hiện tại
  const handleCheckAllChange = () => {
    setCheckedState((prevCheckedState) => {
      const newCheckedState = { ...prevCheckedState };

      data.forEach((item) => {
        newCheckedState[item.id] = !checkedAllState;
      });

      setCheckedAllState(!checkedAllState);
      return newCheckedState;
    });
  };

  // Kiểm tra xem có checkbox nào được chọn không
  const isAnyChecked = () => Object.values(checkedState).some(value => value);

  // Khởi tạo trạng thái checkbox khi `data` thay đổi, nhưng giữ các lựa chọn trước đó
  useEffect(() => {
    setCheckedState((prevCheckedState) => {
      const newCheckedState = { ...prevCheckedState };
      let stateChanged = false;

      // Đảm bảo mỗi item trong `data` có trạng thái checked trong `checkedState`
      data.forEach((item) => {
        if (!(item.id in newCheckedState)) {
          newCheckedState[item.id] = false; // Thiết lập ban đầu cho item chưa có trong `checkedState`
          stateChanged = true; // Đánh dấu rằng chúng ta đã thay đổi trạng thái
        }
      });

      // Kiểm tra nếu tất cả các checkbox trên trang hiện tại đều được chọn
      const allChecked = data.every((item) => newCheckedState[item.id]);

      // Cập nhật `checkedAllState` nếu cần thiết
      if (allChecked !== checkedAllState) {
        setCheckedAllState(allChecked);
      }

      // Chỉ cập nhật trạng thái nếu thực sự có thay đổi
      return stateChanged ? newCheckedState : prevCheckedState;
    });
  }, [data]);

  return {
    checkedState,
    checkedAllState,
    handleCheckedChange,
    handleCheckAllChange,
    isAnyChecked,
  };
};

export default useCheckBoxState;
