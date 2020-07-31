import React from "react";
import Header from "./Header";
import MainStats from "./MainStats";
import MainContent from "./MainContent";
import InfosPanel from "./InfosPanel";

const Main = () => {
  return (
    <div className="flex p-8 w-full min-h-screen bg-primary rounded-tl-xxl rounded-bl-xxl">
      <div className="flex flex-col w-full">
        <Header />
        <MainStats />
        <MainContent />
      </div>
      <InfosPanel />
    </div>
  );
};

export default Main;
