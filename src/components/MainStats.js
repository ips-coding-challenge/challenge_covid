import React from "react";
import BlockStat from "./BlockStat";

const MainStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
      <BlockStat
        title="Aggregated Confirmed"
        value="272,314"
        previousValue=""
      />
      <BlockStat
        title="Aggregated Confirmed"
        value="272,314"
        previousValue=""
      />
      <BlockStat
        title="Aggregated Confirmed"
        value="272,314"
        previousValue=""
      />
      <BlockStat
        title="Aggregated Confirmed"
        value="272,314"
        previousValue=""
      />
    </div>
  );
};

export default MainStats;
