import React, { memo, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { scaleQuantize } from "d3-scale";

import co2_emission_Data from "../../assets/owid-co2-data.json";
import Popup from "../../components/popup/Popup";
import "./MapChart.css";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const styles = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#000",
    outline: "none",
  },
  pressed: {
    fill: "#000",
    outline: "none",
  },
};

const MapChart = ({ setTooltipContent, SELECTED_YEAR }) => {
  const getDomain = () => {
    let domain = [];
    for (const key in co2_emission_Data) {
      const country = co2_emission_Data[key];
      let co2 = country?.data?.find((item) => item.year === SELECTED_YEAR)?.co2;
      domain.push(co2 ? co2 : 0);
    }
    return domain;
  };
  const colorScale = scaleQuantize()
    .domain(getDomain())
    .range([
      "#fff7f6",
      "#e5dedd",
      "#ccc5c4",
      "#b2acac",
      "#999493",
      "#7f7b7b",
      "#666262",
      "#4c4a49",
      "#333131",
      "#191818",
      "#000000",
    ]);
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((pos) => ({ ...pos, zoom: pos.zoom / 2 }));
  };

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  const getCountryColorByCO2Consumption = (geo) => {
    const { NAME_LONG, NAME } = geo.properties;
    const data =
      co2_emission_Data[NAME_LONG]?.data || co2_emission_Data[NAME]?.data;
    const record = data?.find((item) => item.year === SELECTED_YEAR);
    return record?.co2 ? colorScale(record?.co2) : "#fff";
  };

  return (
    <div>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getCountryColorByCO2Consumption(geo)}
                  onClick={() => {
                    const { NAME_LONG, NAME, POP_EST } = geo.properties;
                    const data =
                      co2_emission_Data[NAME_LONG]?.data ||
                      co2_emission_Data[NAME]?.data;
                    if (data) {
                      setTooltipContent(
                        <Popup
                          NAME={NAME}
                          POP_EST={POP_EST}
                          data={data}
                          SELECTED_YEAR={SELECTED_YEAR}
                          TYPE={"SELECT"}
                        />
                      );
                    } else {
                      setTooltipContent(
                        <Popup NAME={NAME} POP_EST={POP_EST} />
                      );
                    }
                  }}
                  onMouseEnter={() => {
                    const { NAME_LONG, NAME, POP_EST } = geo.properties;
                    const data =
                      co2_emission_Data[NAME_LONG]?.data ||
                      co2_emission_Data[NAME]?.data;
                    setTooltipContent(
                      <Popup
                        NAME={NAME}
                        POP_EST={POP_EST}
                        data={data}
                        SELECTED_YEAR={SELECTED_YEAR}
                        TYPE={"HOVER"}
                      />
                    );
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={styles}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      <div className="controls">
        <button onClick={handleZoomIn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button onClick={handleZoomOut}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default memo(MapChart);
