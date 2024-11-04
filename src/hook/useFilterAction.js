// src/hook/useFlterAction.js
import {CheckStateInterface} from '../interfaces/BaseServiceInterface';

const useFilterAction = () => {
  
    const actionSwitch = (action: string, selectedValue: string, checkedState: CheckStateInterface) => {
        switch (action) {
            case 'deleteAll':
                break;
            case 'publish':
                break;
            
            default:
                break;
          }
          
        
    }
    return {actionSwitch}
}

export default useFilterAction;