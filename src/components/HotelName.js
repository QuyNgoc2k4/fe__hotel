import React, { useState, useEffect } from "react";
import { hotelApi } from "../api/hotelApi"; // Corrected to use hotelApi

// Cache for hotel names
const hotelNameCache = {};

const HotelName = ({ hotelId }) => {
  const [hotelName, setHotelName] = useState("Loading...");

  useEffect(() => {
    const fetchHotelName = async () => {
      if (hotelNameCache[hotelId]) {
        // Retrieve from cache if available
        setHotelName(hotelNameCache[hotelId]);
      } else {
        try {
          // Fetch hotel data from hotelApi
          const hotelData = await hotelApi.getHotelById(hotelId);
          const name = hotelData?.name || "Unknown Hotel";
          hotelNameCache[hotelId] = name; // Cache the result
          setHotelName(name);
        } catch (error) {
          console.error("Error fetching hotel name:", error);
          setHotelName("N/A");
        }
      }
    };

    if (hotelId) {
      fetchHotelName();
    }
  }, [hotelId]);

  return <span>{hotelName}</span>;
};

export default HotelName;
