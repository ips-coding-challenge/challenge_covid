import React from "react";
import Header from "./Header";
import MainStats from "./MainStats";
import MainContent from "./MainContent";
import InfosPanel from "./InfosPanel";

const Main = () => {
  return (
    <div className="flex flex-col md:flex-row p-2 md:p-8 md:my-4 w-full min-h-screen bg-primary max-w-container mx-auto">
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
