import React, { useContext } from "react";
import { store } from "../store";

const Header = () => {
  const { state } = useContext(store);
  return (
    <div className="h-12 flex flex-col justify-between">
      <div>
        <span className="font-bold text-logo text-3xl mr-4">Covid-19</span>{" "}
        <span className="text-secondary text-2xl">Global Trend</span>
      </div>
      {state.data.Date && (
        <div className="text-sm text-gray-700">
          Last updated on{" "}
          {new Date(state.data.Date).toLocaleDateString("en-EN")}
        </div>
      )}
    </div>
  );
};

export default Header;
