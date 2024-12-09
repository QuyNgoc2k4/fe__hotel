import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { Checkbox } from "./checkbox";
import { Button } from "./button";

const CustomTable = ({
  data = [], // Dữ liệu hiển thị
  columns = [], // Cấu hình cột
  actions = [], // Hành động trên mỗi dòng
  caption = "Danh sách", // Tiêu đề bảng
  checkedState = {}, // Trạng thái checkbox
  checkedAllState = false, // Trạng thái checkbox "Chọn Tất Cả"
  handleCheckedChange, // Hàm xử lý khi thay đổi checkbox của hàng
  handleCheckAllChange, // Hàm xử lý khi thay đổi checkbox "Chọn Tất Cả"
  openSheet,
}) => {
  const renderHeader = () => (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[50px] text-center">
          <Checkbox
            checked={checkedAllState}
            onCheckedChange={handleCheckAllChange}
          />
        </TableHead>
        {columns.map((column, index) => (
          <TableHead key={index}>{column.name}</TableHead>
        ))}
        <TableHead className="text-center">Hành động</TableHead>
      </TableRow>
    </TableHeader>
  );

  const renderRows = () =>
    data.length > 0 ? (
      data.map((item, rowIndex) => (
        <TableRow
          key={rowIndex}
          className={checkedState[item.id] ? "bg-[#ffc]" : ""}
        >
          <TableCell className="font-medium text-center">
            <Checkbox
              checked={checkedState[item.id] || false}
              onCheckedChange={() => handleCheckedChange(item.id)}
            />
          </TableCell>
          {columns.map((col, colIndex) => (
            <TableCell key={colIndex}>{col.render(item)}</TableCell>
          ))}
          {actions.length > 0 && (
            <TableCell className="flex justify-center">
              {actions.map((action, actionIndex) =>
                action.method === "viewImages" ? (
                  <Link
                    key={actionIndex}
                    to={action.path(item)}
                    className={`${
                      action.className || ""
                    } p-[5px] flex items-center justify-center border border-solid border-gray-300 rounded`}
                  >
                    {action.icon}
                  </Link>
                ) : (
                  <Button
                    key={actionIndex}
                    variant="outline"
                    className={`${action.className || ""} p-[5px]`}
                    onClick={
                      action.onClick
                        ? (e) => action.onClick(item.id, openSheet)
                        : undefined
                    }
                  >
                    {action.icon}
                  </Button>
                )
              )}
            </TableCell>
          )}
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={(columns.length || 0) + 2} className="text-center">
          Không có dữ liệu
        </TableCell>
      </TableRow>
    );

  return (
    <div className="relative w-full overflow-x-auto sm:rounded-lg"> {/* Thêm overflow-x-auto và sm:rounded-lg */}
      <Table className="border border-solid border-gray-300 text-xs sm:text-sm"> {/* text-xs trên mobile */}
        <TableCaption>{caption}</TableCaption>
        {renderHeader()}
        <TableBody>{renderRows()}</TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;

