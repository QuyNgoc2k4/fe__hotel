// src/hook/useSheet.js
import { useState } from 'react';

export interface Sheet{
  open: Boolean,
  action: String,
  id: String,
}
const useSheet = () => {
  const [isSheetOpen, setIsSheetOpen] = useState({open: false, action: '', id: null});

  const openSheet = ({action, id} : Sheet) => {
    setIsSheetOpen({open: true, action, id});
  };

  const closeSheet = () => {
    setIsSheetOpen({...isSheetOpen, open: false});
  };

  return { isSheetOpen, openSheet, closeSheet };
};

export default useSheet;
