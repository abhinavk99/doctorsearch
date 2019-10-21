import React from "react";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

function CityFocused(props) {
  let format = require("../../screen/Cities/CityFormat");
  let data = props.location.state.data;
  return (
    <div style={{ textAlign: "center", padding: "3em" }}>
      <Card style={{ backgroundColor: "#d9d9d9", color: "black", paddingBottom: "2em" }}>
        <h1>
          {data.name}, {data.region_code}
        </h1>
        <img style={{ maxWidth: "50em" }} src={data.image_url} alt="docimg" />
        <Grid container style={{ maxWidth: "65% ", margin: "auto" }}>
          <Grid item xs={6}>
            <h2>Information</h2>
            <p>Population {data.population.toLocaleString()}</p>
            <p>Time Zone: {data.timezone}</p>
            <p>Coordinates: {data.latitude}, {data.longitude}</p>
            <p>Number of Doctors: {data.num_doctors}</p>
            <p>Number of Specialties: {data.num_specialties}</p>
            <p>Elevation: {data.elevation_meters.toLocaleString()}</p>
          </Grid>
          <Grid item xs={6}>
            <h2>Location</h2>
            <img src={data.locimg} style={{ maxWidth: "20em" }} alt="locimg" />
          </Grid>
        </Grid>
        <h2>Doctors: </h2>
        <p>{format.doctors(data)}</p>
        <h2>Specialties: </h2>
        <p>{format.specialties(data)}</p>
      </Card>
    </div>
  );
}

export default withRouter(CityFocused);
