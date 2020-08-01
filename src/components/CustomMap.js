import React, { useCallback, useEffect, useState, useContext } from "react";
import { Map, Marker, TileLayer, Popup, CircleMarker } from "react-leaflet";
import countries from "../countries.json";
import axios from "axios";
import { LatLngBounds, latLng } from "leaflet";
import { store, SET_SELECTED_COUNTRY } from "../store";
import { fetchHistoricalData } from "./helpers";

function CustomMap() {
  const { state, dispatch } = useContext(store);
  const URL = "https://api.covid19api.com/summary";
  const france = countries.filter((c) => c.name === "France");
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState([51.505, -0.09]);

  const [maxDeaths, setMaxDeaths] = useState(0);
  const originalTest = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const test = "//{s}.tile.stamen.com/toner/{z}/{x}/{y}.png";
  console.log(`France`, france);

  useEffect(() => {
    parseData();
  }, [state.data]);

  useEffect(() => {
    if (state.selectedCountry) {
      const country = countries.filter(
        (c) => c.country_code === state.selectedCountry.CountryCode
      );
      setCenter(() => country[0].latlng);
      setZoom(4);
    }
  }, [state.selectedCountry]);

  const parseData = () => {
    // Get the country with maxDeaths
    console.log(`State.data`, state.data);
    if (Object.keys(state.data).length === 0) return;
    // console.log(`Data`, data);
    // console.log(`In Here`);
    const maxCountry = state.data.Countries.reduce((acc, current) => {
      // console.log(`Acc ${acc.TotalDeaths}`);
      // console.log(`current ${current.TotalDeaths}`);
      return acc.TotalDeaths > current.TotalDeaths ? acc : current;
    });
    console.log(`MaxDeaths`, maxCountry.TotalDeaths);
    setMaxDeaths(maxCountry.TotalDeaths);
    // Calcul the radius based on maxDeaths
  };

  const onZoomChange = (e) => {
    // console.log(`E`, e.target._zoom);
    // if (e.target._zoom > 0) {
    //   setZoom(e.target._zoom);
    // }
  };

  const clamp = (a, b, c) => {
    return Math.max(b, Math.min(c, a));
  };

  // const position = [state.lat, state.lng];
  return (
    <Map
      className="rounded-lg"
      style={{ maxHeight: "350px", height: "300px", width: "100%" }}
      center={center}
      zoom={zoom}
      maxBounds={[latLng(-90, -180), latLng(90, 180)]}
      // onzoomlevelschange={onZoomChange}
      onzoomend={onZoomChange}
    >
      <TileLayer
        // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url={test}
      />
      {state.data &&
        state.data.Countries &&
        state.data.Countries.map((c, i) => {
          const country = countries.filter(
            (country) => country.country_code === c.CountryCode
          );
          // console.log(`Radius`, (c.TotalDeaths / maxDeaths) * 50);
          // if (i === 88) {
          //   console.log("Radius", (c.TotalDeaths / maxDeaths) * 50 * zoom);
          // }
          const radius = (c.TotalDeaths / maxDeaths) * 80;
          return (
            <CircleMarker
              color="#ffac48"
              stroke={false}
              fillColor={
                state.selectedCountry && state.selectedCountry === c
                  ? "red"
                  : "#ffac48"
              }
              fillOpacity={0.75}
              key={i}
              radius={clamp(radius, (20 * zoom) / 10, 60)}
              center={country[0].latlng}
              onclick={() => {
                dispatch({ type: SET_SELECTED_COUNTRY, payload: c });
                fetchHistoricalData(dispatch, c);
              }}
            >
              <Popup>
                <div className="flex flex-col">
                  <div>{i}</div>
                  <div>{c.Country}</div>
                  <div>{c.TotalDeaths}</div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
    </Map>
  );
}

export default CustomMap;
