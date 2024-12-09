import React, { useEffect, useState } from "react";
import Select from "react-select";
import { hotelApi } from "../../api/hotelApi";

const SelectHotel = ({ selectedHotel, onSelectHotel }) => {
  const [hotelOptions, setHotelOptions] = useState([]);

  const fetchHotels = async () => {
    try {
      const response = await hotelApi.getHotels(1, 100); // API lấy danh sách khách sạn
      const options = response.hotels.map((hotel) => ({
        value: hotel.id,
        label: hotel.name,
      }));
      setHotelOptions(options);
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleChange = (selectedOption) => {
    onSelectHotel(selectedOption ? selectedOption.value : null);
  };

  return (
    <div className="mr-5 mt-5">
        <span className="text-red-600 text-sm">*Hãy chọn khách sạn xem thống kê</span>
      <Select
        options={hotelOptions}
        value={hotelOptions.find((option) => option.value === selectedHotel)}
        onChange={handleChange}
        placeholder="Chọn tên khách sạn"
        isClearable
        className="w-[280px]"
      />
    </div>
  );
};

export default SelectHotel;
