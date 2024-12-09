import React from "react";

const InfoCard = ({ title, value, color }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className={`text-2xl font-semibold ${color}`}>{value}</p>
    </div>
  );
};

export default InfoCard;
