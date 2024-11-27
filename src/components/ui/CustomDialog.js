import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./dialog";

const CustomDialog = ({
  title,
  description,
  isOpen,
  onClose,
  onConfirm = null,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="flex justify-end space-x-2 mt-4">
          {/* Nút hủy chỉ hiển thị khi có cancelText */}
          {cancelText && (
            <button
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              {cancelText}
            </button>
          )}
          {/* Nút xác nhận chỉ hiển thị khi có onConfirm */}
          {onConfirm && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
