import React from "react";
const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};
const Popup = ({ NAME, POP_EST, data, SELECTED_YEAR, TYPE }) => {
  const record = data?.find((item) => item.year === SELECTED_YEAR);
  switch (TYPE) {
    case "SELECT":
      return (
        <>
          <>
            <p>
              {NAME} — {rounded(POP_EST)}
            </p>
            <span>
              Year: <strong>{SELECTED_YEAR}</strong>
            </span>
            <hr />
            {record?.co2 ? <p> CO2: {record.co2} </p> : ""}
            {record?.cement_co2 ? <p> Cement: {record.cement_co2} </p> : ""}
            {record?.coal_co2 ? <p> Coal: {record.coal_co2} </p> : ""}
            {record?.oil_co2 ? <p> Oil: {record.oil_co2} </p> : ""}
            {record?.gas_co2 ? <p> Gas: {record.gas_co2} </p> : ""}
            {record?.flaring_co2 ? <p> Flaring: {record.flaring_co2} </p> : ""}
            <hr />
            {record?.co2_growth_prct ? (
              <p> CO2 Growth %: {record.co2_growth_prct} </p>
            ) : (
              ""
            )}
            {record?.co2_per_capita ? (
              <p> CO2 per Capita: {record.co2_per_capita} </p>
            ) : (
              ""
            )}
            {record?.co2_per_gdp ? (
              <p> CO2 per GDP: {record.co2_per_gdp} </p>
            ) : (
              ""
            )}
            {record?.share_global_co2 ? (
              <p> Global Share: {record.share_global_co2} </p>
            ) : (
              ""
            )}
            {record?.cumulative_co2 ? (
              <p> Commulative CO2: {record.cumulative_co2} </p>
            ) : (
              ""
            )}
            {record?.share_global_cumulative_co2 ? (
              <p>
                Commulative Global Share: {record.share_global_cumulative_co2}{" "}
              </p>
            ) : (
              ""
            )}
          </>
        </>
      );
    case "HOVER":
      return (
        <>
          <p>
            {NAME} — {rounded(POP_EST)}
          </p>
          <span>
            Year: <strong>{SELECTED_YEAR}</strong>
          </span>
          {record?.co2 ? <p> CO2: {record.co2} </p> : ""}
        </>
      );

    default:
      return `${NAME} — ${rounded(POP_EST)}`;
  }
};

export default Popup;
