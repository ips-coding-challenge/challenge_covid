import React, { useContext, useEffect } from "react";
import BlockStat from "./BlockStat";
import { store } from "../store";

const MainStats = () => {
  const { state } = useContext(store);

  // useEffect(() => {}, [state.data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
      {state.data && state.data.Global && (
        <>
          <BlockStat
            title="Total Confirmed"
            value={state.data.Global.TotalConfirmed ?? 0}
            color="text-red-500"
            previousValue=""
          />
          <BlockStat
            title="Active Confirmed"
            color="text-orange-500"
            value={state.data.Global.NewConfirmed ?? 0}
            previousValue=""
          />
          <BlockStat
            title="Recovered"
            color="text-green-500"
            value={state.data.Global.NewRecovered ?? 0}
            previousValue=""
          />
          <BlockStat
            title="Deaths"
            value={state.data.Global.NewDeaths ?? 0}
            color="text-purple-500"
            previousValue=""
          />
        </>
      )}
    </div>
  );
};

export default MainStats;
