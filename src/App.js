import React, { useContext, useEffect, useCallback } from "react";
import axios from "axios";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { store, SET_DATA } from "./store";

function App() {
  // Fetch data
  const { dispatch } = useContext(store);
  const ONE_DAY = 1000 * 60 * 60 * 24;

  const expired = () => {
    const expires_in = localStorage.getItem("expires_in");
    if (!expires_in) return true;
    return expires_in < Date.now();
  };

  const fetchData = useCallback(async () => {
    try {
      console.log(`Expired`, expired());
      if (expired()) {
        const response = await axios.get(URL);
        localStorage.setItem("data", JSON.stringify(response.data));
        localStorage.setItem("expires_in", Date.now() + ONE_DAY);
        // setData(response.data);
        dispatch({ type: SET_DATA, payload: response.data });
        console.log("Expired", response.data);
      } else {
        if (localStorage.getItem("data")) {
          console.log(
            `Load from cache`,
            JSON.parse(localStorage.getItem("data"))
          );
          // parseData(JSON.parse(localStorage.getItem("data")));
          // setData(JSON.parse(localStorage.getItem("data")));
          dispatch({
            type: SET_DATA,
            payload: JSON.parse(localStorage.getItem("data")),
          });
        } else {
          const response = await axios.get(URL);
          localStorage.setItem("data", JSON.stringify(response.data));
          localStorage.setItem("expires_in", Date.now() + ONE_DAY);
          // setData(response.data);
          dispatch({ type: SET_DATA, payload: response.data });
        }
      }
    } catch (e) {
      console.log(`Error`, e);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex h-screen w-full bg-secondary">
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
