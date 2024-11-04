// src/components/ui/customTable.js

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
import { buttonAction } from "../../api/userApi";

interface TableColumn<T> {
  name: string;
  render: (item: T) => JSX.Element | string;
}

interface CustomTableProps<T> {
  data: T[] | undefined;
  columns: TableColumn<T>[] | undefined;
  caption?: string;
  checkedState: Record<string, boolean>; // Trạng thái checkbox cho từng hàng
  checkedAllState: boolean; // Trạng thái checkbox "Chọn Tất Cả"
  handleCheckedChange: (id: string) => void; // Hàm xử lý khi thay đổi checkbox của hàng
  handleCheckAllChange: () => void; // Hàm xử lý khi thay đổi checkbox "Chọn Tất Cả"
}

const CustomTable = <T,>({
  data = [],
  columns = [],
  caption = "Danh sách",
  checkedState,
  checkedAllState,
  handleCheckedChange,
  handleCheckAllChange,
}: CustomTableProps<T>) => {
  
  // Render phần tiêu đề bảng
  const renderHeader = () => (
    <TableHeader>
      <TableRow>
        <TableHead className="w-[100px]">
          <Checkbox
            checked={checkedAllState}
            onCheckedChange={handleCheckAllChange}
          />
        </TableHead>
        {columns.map((column, index) => (
          <TableHead key={index}>{column.name}</TableHead>
        ))}
        <TableHead className="text-center">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );

  // Render các hàng trong bảng
  const renderRows = () =>
    data.map((item, rowIndex) => (
      <TableRow key={rowIndex} className={checkedState[item.id] ? 'bg-[#ffc]' : ''}>
        <TableCell className="font-medium">
          <Checkbox
            checked={checkedState[item.id] || false}
            onCheckedChange={() => handleCheckedChange(item.id)}
          />
        </TableCell>
        {columns.map((column, colIndex) => (
          <TableCell key={colIndex}>{column.render(item)}</TableCell>
        ))}
        <TableCell className="flex justify-center">
          {buttonAction.map((action, actionIndex) => (
            <Button
              key={actionIndex}
              variant="outline"
              className={`${action.className} p-0`}
            >
              <Link to={`${action.path}/${item.id}`} className="block p-[10px]">
                {action.icon}
              </Link>
            </Button>
          ))}
        </TableCell>
      </TableRow>
    ));

  return (
    <Table className="border border-solid border-[#f3f3f3]">
      <TableCaption>{caption}</TableCaption>
      {renderHeader()}
      <TableBody>{renderRows()}</TableBody>
    </Table>
  );
};

export default CustomTable;
