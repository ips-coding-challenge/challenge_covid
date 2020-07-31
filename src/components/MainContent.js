import React from "react";
import SearchCountry from "./SearchCountry";
import CustomMap from "./CustomMap";

const MainContent = () => {
  return (
    <div className="flex mt-8 p-6 h-full bg-white rounded-xxl shadow-md overflow-hidden">
      <SearchCountry />
      {/* Map */}
      <CustomMap />
      {/* Graph */}
    </div>
  );
};

export default MainContent;
