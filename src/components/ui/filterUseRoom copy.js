import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Input } from "./input";

const Filter = ({ handleQueryString }) => {
  const handleFilterChange = (field, value) => {
    handleQueryString({ [field]: value });
  };

  return (
    <div className="flex justify-between mb-[15px] items-center">
      <div className="flex items-center">
        <Select onValueChange={(value) => handleFilterChange("room_type", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Loại phòng" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="type1">Deluxe</SelectItem>
            <SelectItem value="type2">Standard</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("is_smoking", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Hút thuốc" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="true">Cho phép</SelectItem>
            <SelectItem value="false">Không cho phép</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="true">Đang hoạt động</SelectItem>
            <SelectItem value="false">Ngừng hoạt động</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="text"
          placeholder="Tìm kiếm phòng..."
          onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          className="w-[300px] ml-4"
        />
      </div>
    </div>
  );
};

export default Filter;
