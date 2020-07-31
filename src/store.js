import React, { createContext, useState, useReducer } from "react";

export const SET_DATA = "SET_DATA";
export const SET_SELECTED_COUNTRY = "SET_SELECTED_COUNTRY";

const initialState = {
  data: {},
  selectedCountry: null,
};

const store = createContext(initialState);

const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case SET_DATA:
        return { ...state, data: action.payload };
      case SET_SELECTED_COUNTRY:
        return { ...state, selectedCountry: action.payload };
      default:
        return state;
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
