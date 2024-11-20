// src/hook/useFilterAction.js
import { CheckStateInterface } from '../interfaces/BaseServiceInterface';

const useFilterAction = () => {
    const actionSwitch = (action, selectedValue, checkedState) => {
        // Mở rộng case 'deleteAll' để thực hiện hành động xóa
        switch (action) {
            case 'deleteAll':
                // Gọi API hoặc thực hiện hành động xóa dựa trên checkedState
                console.log("Deleting selected items:", checkedState);
                break;
                
            case 'publish':
                // Thực hiện hành động publish (public/unpublic) với giá trị selectedValue và checkedState
                console.log(`Setting publish status to ${selectedValue} for items:`, checkedState);
                break;

            default:
                console.log("No action matched.");
                break;
        }
    };

    return { actionSwitch };
};

export default useFilterAction;
