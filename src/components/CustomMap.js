import React, { useCallback, useEffect, useState } from "react";
import { Map, Marker, TileLayer, Popup, CircleMarker } from "react-leaflet";
import countries from "../countries.json";
import axios from "axios";

function CustomMap() {
  const URL = "https://api.covid19api.com/summary";
  const france = countries.filter((c) => c.name === "France");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const ONE_DAY = 1000 * 60 * 60 * 24;
  const [maxDeaths, setMaxDeaths] = useState(0);
  const originalTest = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const test = "//{s}.tile.stamen.com/toner/{z}/{x}/{y}.png";
  console.log(`France`, france);

  const expired = () => {
    const expires_in = localStorage.getItem("expires_in");
    if (!expires_in) return true;
    return expires_in < Date.now();
  };

  const parseData = (data) => {
    // Get the country with maxDeaths
    console.log(`Data`, data);
    console.log(`In Here`);
    const maxCountry = data.Countries.reduce((acc, current) => {
      console.log(`Acc ${acc.TotalDeaths}`);
      console.log(`current ${current.TotalDeaths}`);
      return acc.TotalDeaths > current.TotalDeaths ? acc : current;
    });
    console.log(`MaxDeaths`, maxCountry);
    setMaxDeaths(maxCountry.TotalDeaths);
    // Calcul the radius based on maxDeaths
  };

  const fetchData = useCallback(async () => {
    try {
      console.log(`Expired`, expired());
      if (expired()) {
        const response = await axios.get(URL);
        localStorage.setItem("data", JSON.stringify(response.data));
        localStorage.setItem("expires_in", Date.now() + ONE_DAY);
        setData(response.data);
        console.log("Expired", response.data);
      } else {
        if (localStorage.getItem("data")) {
          console.log(
            `Load from cache`,
            JSON.parse(localStorage.getItem("data"))
          );
          parseData(JSON.parse(localStorage.getItem("data")));
          setData(JSON.parse(localStorage.getItem("data")));
        } else {
          const response = await axios.get(URL);
          localStorage.setItem("data", JSON.stringify(response.data));
          localStorage.setItem("expires_in", Date.now() + ONE_DAY);
          setData(response.data);
        }
      }
    } catch (e) {
      console.log(`Error`, e);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  // const position = [state.lat, state.lng];
  return (
    <div className="w-full h-full">
      <Map
        style={{ height: "100%", width: "100%" }}
        center={[51.505, -0.09]}
        zoom={2}
      >
        <TileLayer
          // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={test}
        />
        {data &&
          data.Countries &&
          data.Countries.map((c, i) => {
            const country = countries.filter(
              (country) => country.country_code === c.CountryCode
            );
            console.log(`Radius`, (c.TotalDeaths / maxDeaths) * 50);
            return (
              <CircleMarker
                color="#ffac48"
                stroke={false}
                fillColor="#ffac48"
                fillOpacity={0.75}
                key={i}
                radius={(c.TotalDeaths / maxDeaths) * 50}
                center={country[0].latlng}
              >
                <Popup>
                  <div className="flex flex-col">
                    <div>{c.Country}</div>
                    <div>{c.TotalDeaths}</div>
                  </div>
                </Popup>
              </CircleMarker>
              // <Marker key={i} position={country[0].latlng}>
              // <Popup>
              //   <div className="flex flex-col">
              //     <div>{c.Country}</div>
              //     <div>{c.TotalDeaths}</div>
              //   </div>
              // </Popup>
              // </Marker>
            );
          })}
      </Map>
    </div>
  );
}

export default CustomMap;
