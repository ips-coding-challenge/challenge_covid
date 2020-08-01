import axios from "axios";
import subDays from "date-fns/subDays";
import format from "date-fns/format";
import { SET_LOADING_STATS, SET_COUNTRY_STATS } from "../store";

export const fetchHistoricalData = async (dispatch, country) => {
  const now = format(Date.now(), "yyyy-MM-dd");
  const weekAgo = format(subDays(Date.now(), 7), "yyyy-MM-dd");
  const url = `https://api.covid19api.com/country/${country.Slug}?from=${weekAgo}&to=${now}`;
  dispatch({ type: SET_LOADING_STATS, payload: true });
  try {
    const response = await axios.get(url);

    dispatch({
      type: SET_COUNTRY_STATS,
      payload: response.data.filter((item) => item.Province === ""),
    });
  } catch (e) {
    console.log(`Error`, e);
  } finally {
    dispatch({ type: SET_LOADING_STATS, payload: false });
  }
};
