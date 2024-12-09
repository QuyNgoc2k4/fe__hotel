import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import {   
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"; 
import { Button } from "./button"; 
import { Input } from "./input"; 
import { MdDeleteForever } from "react-icons/md";
import { sort, startDates } from "../../constant/general";
import { FaPlus } from "react-icons/fa6";
import useFilterAction from "../../hook/useFilterAction"; 
import useDebounce from "../../hook/useDebounce"; 
const Filter = ({ isAnyChecked, checkedState, openSheet, handleQueryString }) => {
  const { actionSwitch } = useFilterAction();
  const location = useLocation();

  const handleStatus = (value) => {
    const [action, SelectedValue] = value.split("|");
    actionSwitch(action, SelectedValue, checkedState);
  };

  const [filters, setFilters] = useState({
    sort: "",
  });

  const [search, setSearch] = useState("");
  const { debounce } = useDebounce();
  const debounceInputSearch = debounce((value) => {
    setSearch(value);
  }, 300);

  useEffect(() => {
    handleQueryString({ search, ...filters });
  }, [search]);

  const handleFilter = (value, field) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  useEffect(() => {
    handleQueryString({ search, ...filters });
    console.log(filters);
  }, [filters]);

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
      {/* Left Section */}
      <div className="flex flex-wrap items-center gap-4">
        {isAnyChecked && (
          <div className="w-full sm:w-auto">
            <Select onValueChange={(value) => handleStatus(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="With selected" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem
                  className="cursor-pointer hover:bg-gray-200"
                  value="deleteAll"
                >
                  <div className="flex items-center">
                    <MdDeleteForever />
                    Delete All
                  </div>
                </SelectItem>
                <SelectItem
                  className="cursor-pointer hover:bg-gray-200"
                  value="publish|1"
                >
                  1
                </SelectItem>
                <SelectItem
                  className="cursor-pointer hover:bg-gray-200"
                  value="publish|2"
                >
                  2
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="w-full sm:w-auto">
          <Select onValueChange={(value) => handleFilter(value, "sort")}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {sort &&
                sort.map((item, index) => (
                  <SelectItem
                    key={index}
                    className="cursor-pointer hover:bg-gray-200"
                    value={item.value}
                  >
                    {item.name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-auto">
          <Input
            type="text"
            placeholder="Tìm kiếm trong bảng..."
            className="w-full"
            onChange={(e) => {
              debounceInputSearch(e.target.value);
            }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full sm:w-auto justify-end">
        <Button
          className="bg-[--primary-color] text-white hover:bg-[--hover-btn-color] flex items-center gap-2"
          onClick={() => openSheet({ open: true, action: "", id: "34535" })}
        >
          <FaPlus />
          Thêm mới khách sạn
        </Button>
      </div>
    </div>
  );
};

export default Filter;
