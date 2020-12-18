import React, { useState } from "react";
import ReactTooltip from "react-tooltip";

import "./App.css";
import MapChart from "./containers/map/MapChart";
import Year from "./components/year/Year";

function App() {
  const [content, setContent] = useState("");
  const [selectedYear, setSelectedYear] = useState(1990);

  return (
    <div className="App">
      <Year setSelectedYear={setSelectedYear}/>
      <MapChart setTooltipContent={setContent} SELECTED_YEAR={selectedYear} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
