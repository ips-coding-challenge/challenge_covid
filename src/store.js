import React, { createContext, useState, useReducer } from "react";

export const SET_DATA = "SET_DATA";
export const SET_HISTORICAL = "SET_HISTORICAL";
export const SET_SELECTED_COUNTRY = "SET_SELECTED_COUNTRY";
export const SET_LOADING_STATS = "SET_LOADING_STATS";
export const SET_COUNTRY_STATS = "SET_COUNTRY_STATS";

const initialState = {
  data: {},
  historical: {},
  selectedCountry: null,
  loadingStats: false,
  countryStats: [],
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_DATA:
        return { ...state, data: action.payload };
      case SET_HISTORICAL:
        return { ...state, historical: action.payload };
      case SET_SELECTED_COUNTRY:
        return { ...state, selectedCountry: action.payload };
      case SET_LOADING_STATS:
        return { ...state, loadingStats: action.payload };
      case SET_COUNTRY_STATS:
        return { ...state, countryStats: action.payload };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
