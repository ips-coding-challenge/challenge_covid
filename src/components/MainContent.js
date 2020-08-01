import React from "react";
import SearchCountry from "./SearchCountry";
import CustomMap from "./CustomMap";
import Graph from "./Graph";

const MainContent = () => {
  return (
    <div
      id="mainContent"
      className="flex flex-col md:flex-row min-h-content h-auto mt-8 p-3 md:p-6 bg-white rounded-xxl shadow-md overflow-hidden"
    >
      <SearchCountry />
      <div className="flex flex-col w-full max-h-content">
        {/* Map */}
        <CustomMap />
        {/* Graph */}
        <Graph />
      </div>
    </div>
  );
};

export default MainContent;
