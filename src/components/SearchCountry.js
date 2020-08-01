import React, { useContext, useState, useEffect, createRef } from "react";
import {
  store,
  SET_SELECTED_COUNTRY,
  SET_LOADING_STATS,
  SET_COUNTRY_STATS,
} from "../store";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import formatISO from "date-fns/formatISO";
import axios from "axios";
import { fetchHistoricalData } from "./helpers";

const SearchCountry = () => {
  const { state, dispatch } = useContext(store);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const inputRef = createRef();

  useEffect(() => {
    // console.log("state",)
    if (state.data.Countries) {
      setFiltered(() =>
        state.data.Countries.sort((a, b) => b.TotalDeaths - a.TotalDeaths)
      );
      console.log(`Filtered`, filtered);
    }
  }, [state.data.Countries]);

  const handleClick = (country) => {
    fetchHistoricalData(dispatch, country);
    // fetchHistoricalData(country);
    // I should launch a request to fetch historical Data
    dispatch({ type: SET_SELECTED_COUNTRY, payload: country });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    console.log(`search`, search);
    const filtered = state.data.Countries.filter((c) =>
      c.Country.toLowerCase().startsWith(search.toLowerCase())
    );
    console.log(`Filtered`, filtered);
    setFiltered(() => filtered.sort((a, b) => b.TotalDeaths - a.TotalDeaths));
  };

  const handleSearch = (e, country) => {
    if (e.key === "Enter") {
      console.log(`Country `, country);
      if (country) {
        dispatch({ type: SET_SELECTED_COUNTRY, payload: country });
        return;
      }

      const c = filtered.find(
        (c) => c.Country.toLowerCase === search.toLowerCase
      );
      if (c) {
        dispatch({ type: SET_SELECTED_COUNTRY, payload: c });
      }
      setSearch("");
    }
  };

  return (
    <div
      style={{ maxHeight: "800px" }}
      className="flex flex-col mb-6 md:h-full md:w-2/5 overflow-hidden mr-4"
    >
      <div className="flex items-center h-12 bg-gray-200 rounded-xxl p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          ref={inputRef}
          value={search}
          onChange={handleChange}
          onKeyDown={(e) => handleSearch(e)}
          className="bg-transparent ml-3 outline-none"
          type="text"
          style={{ minWidth: 0 }}
          placeholder="Search..."
          tabIndex="1"
        />
      </div>
      <ul className="hidden md:block flex-auto p-4 overflow-y-auto mt-4">
        {state.data &&
          state.data.Countries &&
          filtered.map((country) => (
            <li
              onClick={(e) => handleClick(country)}
              tabIndex="1"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e, country);
                  setSearch("");
                  inputRef.current.focus();
                }
              }}
              key={country.CountryCode}
              className={`${
                state.selectedCountry &&
                state.selectedCountry.Country === country.Country
                  ? "bg-gray-400"
                  : ""
              }text-gray-700 text-md px-2 mb-2 hover:bg-gray-400 transition-colors duration-300 cursor-pointer`}
            >
              <span className="font-bold">
                {parseFloat(country.TotalDeaths).toLocaleString("en")}
              </span>{" "}
              - {country.Country}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchCountry;
