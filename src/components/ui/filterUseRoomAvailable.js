import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Button } from "./button";
import { Input } from "./input";
import { is_smoking, status } from "../../constant/general";
import useFilterAction from "../../hook/useFilterAction";
import useDebounce from "../../hook/useDebounce";
import { roomTypeApi } from "../../api/roomTypeApi";


const Filter = ({ isAnyChecked, checkedState, openSheet, handleQueryString }) => {
  const { actionSwitch } = useFilterAction();
  const [filters, setFilters] = useState({
    room_type_id: "",
    is_smoking: "",

  });
  const [search, setSearch] = useState("");
  const { debounce } = useDebounce();
  const debounceInputSearch = debounce((value) => setSearch(value), 300);
  const [roomTypes, setRoomTypes] = useState([]);

  const fetchRoomTypes = async () => {
    try {
      const response = await roomTypeApi.getRoomTypes(1, 100);
      setRoomTypes(response.roomTypes || []);
    } catch (error) {
      console.error("Failed to fetch room types:", error);
      setRoomTypes([]);
    }
  };

  useEffect(() => {
    fetchRoomTypes();
  }, []);

  useEffect(() => {
    handleQueryString({ search, ...filters });
  }, [search, filters]);

  const handleFilter = (value, field) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleStatus = (value) => {
    const [action, SelectedValue] = value.split("|");
    actionSwitch(action, SelectedValue, checkedState);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      room_type_id: "",
      is_smoking: "",
      status: "",
    });
    setSearch("");
    handleQueryString({}); // Cập nhật bộ lọc rỗng
  };

  return (
    <div className="flex justify-between mb-[15px] items-center">
      <div className="flex items-center">
      <Button
          className="mr-2 bg-gray-400 text-white hover:bg-gray-500"
          onClick={resetFilters}
        >
          Hiện tất cả
        </Button>
        <div className="mr-[10px]">
          <Select
            value={filters.room_type_id} // Điều khiển bằng state
            onValueChange={(value) => handleFilter(value, "room_type_id")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Room Type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {roomTypes.length > 0 ? (
                roomTypes.map((roomType) => (
                  <SelectItem
                    key={roomType.id}
                    value={roomType.id}
                    className="cursor-pointer hover:bg-[#a3aed17c]"
                  >
                    {roomType.name}
                  </SelectItem>
                ))
              ) : (
                <div className="text-gray-500 p-2">Không có loại phòng</div>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="mr-[10px]">
          <Select
            value={filters.is_smoking} // Điều khiển bằng state
            onValueChange={(value) => handleFilter(value, "is_smoking")}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sử dụng thuốc lá" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {is_smoking.map((item, index) => (
                <SelectItem
                  key={index}
                  className="cursor-pointer hover:bg-[#a3aed17c]"
                  value={item.value}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      
        <div className="mr-[10px]">
          <Input
            type="text"
            value={search} // Điều khiển bằng state
            placeholder="Search..."
            onChange={(e) => debounceInputSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center">
       <Link to="/list-booking">
        <Button
          className="bg-[--primary-color] text-white hover:bg-[--hover-btn-color]"      
        >         
          Xem quản lý đặt phòng
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default Filter;
