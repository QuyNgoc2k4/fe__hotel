//src/hook/useCheckBocState.js
import { useEffect, useState } from "react";

const useCheckBoxState = (data = []) => {
  const [checkedState, setCheckedState] = useState({});
  const [checkedAllState, setCheckedAllState] = useState(false);

  // Cập nhật trạng thái của một checkbox cụ thể
  const handleCheckedChange = (id) => {
    setCheckedState((prevCheckedState) => {
      const updatedCheckedState = { ...prevCheckedState, [id]: !prevCheckedState[id] };

      // Kiểm tra nếu tất cả các checkbox đều được chọn
      const totalItems = data.length;
      const selectedItems = Object.values(updatedCheckedState).filter(Boolean).length;
      const allChecked = selectedItems === totalItems;

      setCheckedAllState(allChecked);

     

      return updatedCheckedState;
    });
  };

  // Xử lý trạng thái "Chọn Tất Cả"
  const handleCheckAllChange = () => {
    setCheckedState((prevCheckedState) => {
      const newCheckedState = Object.fromEntries(
        data.map((item) => [item.id, !checkedAllState])
      );

      setCheckedAllState(!checkedAllState);
      return newCheckedState;
    });
  };
    
  const isAnyChecked = () => Object.values(checkedState).some(value => value)

  // Khởi tạo trạng thái checkbox khi `data` thay đổi
  useEffect(() => {
    if (data.length > 0) {
      const initialCheckBoxState = data.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
      }, {});

      setCheckedState(initialCheckBoxState);
      setCheckedAllState(false); // Đặt lại `checkedAllState` ban đầu thành `false`
    }
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
