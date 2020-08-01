import React, { useContext, useEffect, useState } from "react";
import { store } from "../store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

const Graph = () => {
  const { state } = useContext(store);
  const [domain, setDomain] = useState([0, 10000]);
  const [data, setData] = useState([]);
  const [statSelected, setStatSelected] = useState("Deaths");

  useEffect(() => {
    if (state.countryStats && state.countryStats.length > 0) {
      parseStats("Deaths");
      parseData();
      const mainContent = document.getElementById("mainContent");
      window.scrollTo(0, mainContent.offsetTop, { behavior: "smooth" });
    }
  }, [state]);

  const parseStats = (type) => {
    if (state.countryStats && state.countryStats.length > 0) {
      const min = state.countryStats.reduce((acc, current) => {
        return current[type] < acc[type] ? current : acc;
      });
      const max = state.countryStats.reduce((acc, current) =>
        current[type] > acc[type] ? current : acc
      );
      setDomain([min[type] - 10, max[type] + 10]);
    }
  };

  const parseData = () => {
    if (state.countryStats) {
      const result = state.countryStats.map((stat) => {
        const formattedDate = format(new Date(stat.Date), "MM/dd");
        return { ...stat, Date: formattedDate };
      });
      // console.log(`Result`, );
      setData(() => result);
    }
  };

  const changeStats = (type) => {
    parseStats(type);
    setStatSelected(type);
  };

  // if (state.loadingStats) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="h-64 bg-white w-full">
      {!state.selectedCountry && (
        <div className="h-full flex justify-center items-center">
          <div>Select a country</div>
        </div>
      )}
      {state.loadingStats && (
        <div className="flex h-32 justify-center items-center ">Loading...</div>
      )}
      {state.countryStats.length > 0 && (
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-xl mt-6 font-bold">
            {state.selectedCountry.Country}
          </h2>
          <ResponsiveContainer width="95%" height={300}>
            <LineChart
              className="text-sm"
              data={data}
              margin={{
                top: 20,
                right: 0,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis dataKey="Date" padding={{ left: 10, right: 10 }} />
              <YAxis domain={domain} />
              <Tooltip />
              {/* <Legend margin={{ top: 20 }} /> */}
              {statSelected === "Deaths" && (
                <Line
                  type="monotone"
                  dataKey="Deaths"
                  stroke="#9f7aea"
                  strokeWidth={2}
                />
              )}
              {statSelected === "Recovered" && (
                <Line
                  type="monotone"
                  dataKey="Recovered"
                  stroke="#48bb78"
                  strokeWidth={2}
                />
              )}
              {statSelected === "Active" && (
                <Line
                  type="monotone"
                  dataKey="Active"
                  stroke="#ed8936"
                  strokeWidth={2}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center">
            <button
              className="btn btn-blue"
              onClick={() => changeStats("Deaths")}
            >
              Deaths
            </button>
            <button
              className="btn btn-green"
              onClick={() => changeStats("Recovered")}
            >
              Recovered
            </button>
            <button
              className="btn btn-orange"
              onClick={() => changeStats("Active")}
            >
              Active
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Graph;
