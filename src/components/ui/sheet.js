// src/components/ui/sheet.js

"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

// Overlay with smoother transition settings
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/70 transition-opacity duration-500 ease-in-out data-[state=open]:opacity-100 data-[state=closed]:opacity-0 animate-fade-in-0 data-[state=closed]:animate-fade-out-0",
      className
    )}
    style={{ pointerEvents: props.disableInteraction ? "none" : "auto" }} // Add this line
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

// Variants for side slide-in effects with smoother transitions
const sheetVariants = cva(
  "fixed z-[102] gap-4 bg-white p-6 shadow-lg transition-transform duration-500 ease-[cubic-bezier(0.25, 0.8, 0.25, 1)]",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b transform data-[state=open]:translate-y-0 data-[state=closed]:-translate-y-full",
        bottom: "inset-x-0 bottom-0 border-t transform data-[state=open]:translate-y-0 data-[state=closed]:translate-y-full",
        left: "inset-y-0 left-0 h-full w-3/4 border-r transform data-[state=open]:translate-x-0 data-[state=closed]:-translate-x-full animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right",
        right: "inset-y-0 right-0 h-full w-3/4 border-l transform data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

// Sheet Content with close button and side slide animation
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(sheetVariants({ side }), className)}
      {...props}
    >
      {children}
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
    </SheetPrimitive.Content>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

// Header for the Sheet
const SheetHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
);
SheetHeader.displayName = "SheetHeader";

// Footer for the Sheet
const SheetFooter = ({ className, ...props }) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

// Sheet title
const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn("text-lg font-semibold text-foreground", className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

// Sheet description
const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

// Export all components
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
