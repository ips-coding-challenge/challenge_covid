import React, { useContext, useEffect, useCallback } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { store, SET_DATA, SET_HISTORICAL } from "./store";

// const SUMMARY_URL = "https://api.covid19api.com/summary";
const DATA_URL = "https://api.covid19api.com/summary";

function App() {
  // Fetch data
  const { dispatch } = useContext(store);
  const ONE_DAY = 1000 * 60 * 60 * 24;

  const expired = () => {
    const expires_in = localStorage.getItem("expires_in");
    if (!expires_in) return true;
    return expires_in < Date.now();
  };

  const fetchData = useCallback(async (url, key, type) => {
    try {
      console.log(`Expired`, expired());
      if (expired()) {
        const response = await axios.get(url);
        localStorage.setItem(key, JSON.stringify(response.data));
        localStorage.setItem("expires_in", Date.now() + ONE_DAY);
        // setData(response.data);
        dispatch({ type: type, payload: response.data });
        console.log("Expired", response.data);
      } else {
        if (localStorage.getItem(key)) {
          console.log(`Load from cache`, JSON.parse(localStorage.getItem(key)));
          // parseData(JSON.parse(localStorage.getItem(key)));
          // setData(JSON.parse(localStorage.getItem(key)));
          dispatch({
            type: type,
            payload: JSON.parse(localStorage.getItem(key)),
          });
        } else {
          const response = await axios.get(url);
          localStorage.setItem(key, JSON.stringify(response.data));
          localStorage.setItem("expires_in", Date.now() + ONE_DAY);
          // setData(response.data);
          dispatch({ type: type, payload: response.data });
        }
      }
    } catch (e) {
      console.log(`Error`, e);
    }
  }, []);

  useEffect(() => {
    fetchData(DATA_URL, "data", SET_DATA);
  }, []);

  return (
    <div className="flex w-full bg-secondary">
      {/* <Sidebar /> */}
      <Main />
    </div>
  );
}

export default App;
