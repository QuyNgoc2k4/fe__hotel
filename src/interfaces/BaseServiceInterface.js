import Sheet from "../hook/useSheet";


export interface CheckStateInterface {
    checkedState: Record<string, boolean>; 

}

export interface FilterProps extends CheckStateInterface {
    isAnychecked: Boolean;
    checkedAllState: boolean; 
    handleQueryString: any;
    openSheet: (sheet: Sheet)=> void;
}