//src/components/ui/Filter.js
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



const Filter = ({ isAnyChecked, checkedState, handleQueryString, openSheet }) => {
  const { actionSwitch } = useFilterAction();
  const location = useLocation(); // Lấy thông tin đường dẫn hiện tại

  const handleStatus = (value) => {
    const [action, SelectedValue] = value.split('|');
    actionSwitch(action, SelectedValue, checkedState);  
  };

  const [filters, setFilters] = useState({
    perpage: '',
    role: 'all',
    startDate: ''
  });

  const [searchTerm, setSearchTerm] = useState(''); 
  const { debounce } = useDebounce();
  const debounceInputSearch = debounce((value) => {
    setSearchTerm(value);
  }, 300);

  useEffect(() => {
    handleQueryString({ ...filters, searchTerm }); 
  }, [searchTerm]);

  const handleFilter = (value, field) => {
    setFilters(prevFilters => ({ ...prevFilters, [field]: value }));
  };

  useEffect(() => {
    handleQueryString({ ...filters, searchTerm });
  }, [filters]);

  // Kiểm tra URL hiện tại
  const isIndexPage = location.pathname.includes('/user/index'); // Chỉ kiểm tra xem có ở `/user/index` hay không
  const shouldShowAddButton = !isIndexPage;

  return (
    <div className="flex justify-between mb-[15px] items-center">
      <div className="flex items-center">
        <div className="mr-[10px]">
          {isAnyChecked && (
            <Select onValueChange={(value) => handleStatus(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="With selected" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="deleteAll">
                  <div className="flex items-center">
                    <MdDeleteForever />
                    Delete All
                  </div>
                </SelectItem>
                <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="publish|1">1</SelectItem>
                <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="publish|2">2</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="mr-[10px]">
          <Select onValueChange={(value) => handleFilter(value, 'startDate')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tất cả các ngày" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {startDates && startDates.map((startDate, index) => (
                <SelectItem key={index} className="cursor-pointer hover:bg-[#a3aed17c]" value={startDate}>
                  {startDate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isIndexPage && ( // Hiển thị lọc vai trò chỉ ở trang index
          <div className="mr-[10px]">
            <Select onValueChange={(value) => handleFilter(value, 'role')}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tất cả vai trò" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="all">Tất cả vai trò</SelectItem>
                <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="customer">Customer</SelectItem>
                <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="admin">Administrator</SelectItem>
                <SelectItem className="cursor-pointer hover:bg-[#a3aed17c]" value="staff">Employee</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="mr-[10px]">
          <Select onValueChange={(value) => handleFilter(value, 'sort')}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {sort && sort.map((item, index) => (
                <SelectItem key={index} className="cursor-pointer hover:bg-[#a3aed17c]" value={item.value}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mr-[10px]">
          <Input type="text" placeholder="Tìm kiếm trong bảng..." onChange={(e) => { debounceInputSearch(e.target.value); }} />
        </div>
      </div>
      {shouldShowAddButton && (
        <div className="p-0">
          <Link to="/user/create">
          <Button  className="bg-[--primary-color] text-white hover:bg-[--hover-btn-color]">
            <FaPlus />
            Thêm mới thành viên
          </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Filter;
