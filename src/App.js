import React from "react";
import Header from "./components/Header";
import CustomMap from "./components/CustomMap";
import InfosPanel from "./components/InfosPanel";

function App() {
  return (
    <div className="">
      <Header />
      <div style={{ height: "calc(100vh - 3rem)" }} className="flex">
        <CustomMap />
        <InfosPanel />
      </div>
    </div>
  );
}

export default App;
