import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetFooter,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./sheet";

import useSheet from '../../hook/useSheet';

interface CustomSheetProps {
  title: string | undefined;
  isSheetOpen: boolean;
  closeSheet: () => void;
  children: any;
  className: string | undefined;
  description: string | undefined;
}

const CustomSheet = ({ children, isSheetOpen, closeSheet, title, className, description }: CustomSheetProps) => {

  return (
    <Sheet open={isSheetOpen} onOpenChange={closeSheet} >
      <SheetContent side="right" className={className ?? ''}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="text-[#f00000] text-xs">
            {description}
          </SheetDescription>
        </SheetHeader>
        {children}
       
      </SheetContent>
    </Sheet>
  )
}

export default CustomSheet;