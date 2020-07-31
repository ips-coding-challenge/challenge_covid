import React from "react";

const BlockStat = ({ title, value, previousValue, color }) => {
  const calculProgression = () => {
    return "25%";
  };
  return (
    <div
      style={{ minWidth: "150px" }}
      className="bg-white rounded-xxl p-4 shadow-md"
    >
      <div className="flex flex-col items-center">
        <div className={`text-secondary text-lg font-bold`}>{title}</div>
        <div className={`text-red-500 text-3xl font-bold ${color}`}>
          {parseFloat(value).toLocaleString("en")}
        </div>
        <div className={`text-green-400 text-sm`}>{calculProgression()}</div>
      </div>
    </div>
  );
};

export default BlockStat;
