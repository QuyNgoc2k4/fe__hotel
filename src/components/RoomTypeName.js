import React, { useState, useEffect } from "react";
import { roomTypeApi } from "../api/roomTypeApi";

// Bộ nhớ đệm cho loại phòng
const roomTypeCache = {};

const RoomTypeName = ({ roomTypeId }) => {
  const [roomTypeName, setRoomTypeName] = useState("Loading...");

  useEffect(() => {
    const fetchRoomTypeName = async () => {
      if (roomTypeCache[roomTypeId]) {
        // Lấy từ bộ nhớ đệm nếu có
        setRoomTypeName(roomTypeCache[roomTypeId]);
      } else {
        try {
          const roomTypeData = await roomTypeApi.getRoomTypeById(roomTypeId);
          const name = roomTypeData.name;
          roomTypeCache[roomTypeId] = name; // Lưu vào bộ nhớ đệm
          setRoomTypeName(name);
        } catch (error) {
          console.error("Error fetching room type:", error);
          setRoomTypeName("N/A");
        }
      }
    };

    if (roomTypeId) {
      fetchRoomTypeName();
    }
  }, [roomTypeId]);

  return <span>{roomTypeName}</span>;
};

export default RoomTypeName;
