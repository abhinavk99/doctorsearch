import React from "react";
import { withRouter, useParams } from "react-router-dom";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

function CityFocused() {
  let format = require("../../screen/Cities/CityFormat");
  let { id } = useParams();
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("https://api.doctorsearch.me/api/city/" + id)
      .then(results => results.json())
      .then(d => setData(d));
  }, [id]);
  if (!data) {
    return <div></div>;
  }
  return (
    <div style={{ textAlign: "center", padding: "3em" }}>
      <Card
        style={{
          backgroundColor: "#d9d9d9",
          color: "black",
          paddingBottom: "2em"
        }}
      >
        <h1>
          {data.name}, {data.region_code}
        </h1>
        <img style={{ maxWidth: "50em" }} src={data.image_url} alt="docimg" />
        <Grid container style={{ maxWidth: "65% ", margin: "auto" }}>
          <Grid item xs={12}>
            <h2>Information</h2>
            <p>Population {data.population.toLocaleString()}</p>
            <p>Time Zone: {data.timezone}</p>
            <p>
              Coordinates: {data.latitude}, {data.longitude}
            </p>
            <p>Number of Doctors: {data.num_doctors}</p>
            <p>Number of Specialties: {data.num_specialties}</p>
            <p>Elevation: {data.elevation_meters.toLocaleString()}</p>
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
