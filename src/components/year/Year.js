import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

import EventIcon from "@material-ui/icons/Event";

const Year = ({ setSelectedYear }) => {
  const [value, setValue] = useState(1990);
  useEffect(() => {
    setSelectedYear(value);
  }, [value]);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const valuetext = (value) => {
    return value;
  };

  return (
    <div>
      <Typography
        id="discrete-slider"
        variant="button"
        display="block"
        gutterBottom
      >
        CO2 Emissions by Year
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <EventIcon />
        </Grid>
        <Grid item xs lg md>
          <Slider
            style={{
              color: "#000",
            }}
            defaultValue={1990}
            value={typeof value === "number" ? value : 1990}
            onChange={handleSliderChange}
            getAriaValueText={valuetext}
            valueLabelDisplay="auto"
            aria-labelledby="discrete-slider"
            marks
            step={1}
            min={1990}
            max={2018}
          />
        </Grid>
        <Grid item>
          <Input
            fullWidth
            value={value}
            margin="dense"
            onChange={handleInputChange}
            inputProps={{
              step: 1,
              min: 1990,
              max: 2018,
              type: "number",
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Year;
