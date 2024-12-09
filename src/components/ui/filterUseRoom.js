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
import { is_smoking, status } from "../../constant/general";
import { FaPlus } from "react-icons/fa6";
import useFilterAction from "../../hook/useFilterAction";
import useDebounce from "../../hook/useDebounce";
import { roomTypeApi } from "../../api/roomTypeApi";

const Filter = ({ isAnyChecked, checkedState, openSheet, handleQueryString }) => {
  const { actionSwitch } = useFilterAction();
  const [filters, setFilters] = useState({
    room_type_id: "",
    is_smoking: "",
    status: "",
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

  const resetFilters = () => {
    setFilters({
      room_type_id: "",
      is_smoking: "",
      status: "",
    });
    setSearch("");
    handleQueryString({});
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
      {/* Left Section */}
      <div className="flex flex-wrap items-center gap-4">
        <Button
          className="bg-gray-400 text-white hover:bg-gray-500"
          onClick={resetFilters}
        >
          Hiện tất cả
        </Button>
        <div className="w-[200px] sm:w-[180px]">
          <Select
            value={filters.room_type_id}
            onValueChange={(value) => handleFilter(value, "room_type_id")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Room Type" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {roomTypes.length > 0 ? (
                roomTypes.map((roomType) => (
                  <SelectItem
                    key={roomType.id}
                    value={roomType.id}
                    className="cursor-pointer hover:bg-gray-200"
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
        <div className="w-[200px] sm:w-[180px]">
          <Select
            value={filters.is_smoking}
            onValueChange={(value) => handleFilter(value, "is_smoking")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sử dụng thuốc lá" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {is_smoking.map((item, index) => (
                <SelectItem
                  key={index}
                  value={item.value}
                  className="cursor-pointer hover:bg-gray-200"
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-[200px] sm:w-[180px]">
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilter(value, "status")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Trạng thái phòng" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {status.map((item, index) => (
                <SelectItem
                  key={index}
                  value={item.value}
                  className="cursor-pointer hover:bg-gray-200"
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
            value={search}
            placeholder="Search..."
            onChange={(e) => debounceInputSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center">
        <Button
          className="bg-[--primary-color] text-white hover:bg-[--hover-btn-color] flex items-center gap-2"
          onClick={() => openSheet({ open: true, action: "", id: "34535" })}
        >
          <FaPlus />
          Thêm phòng mới
        </Button>
      </div>
    </div>
  );
};

export default Filter;

