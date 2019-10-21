import React from "react";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

function SpecFocused(props) {
  let data = props.location.state.data;
  let format = require("../../screen/Specialties/SpecFormat");
  return (
    <div style={{ textAlign: "center", padding: "3em" }}>
      <Card style={{ backgroundColor: "#d9d9d9", color: "black", paddingBottom: "2em" }}>
        <h1>{data.name}</h1>
        <img style={{ maxWidth: "20em" }} src={data.pic} alt="docimg" />
        <p>{data.description}</p>
        <Grid container style={{ maxWidth: "65% ", margin: "auto" }}>
          <Grid item xs={6}>
            <h2>Information</h2>
            <p>Category: {format.capitalize(data.category)}</p>
            <p>Number of Doctors: {data.num_doctors}</p>
            <p>Number of Cities: {data.num_cities}</p>
            {/* <p>Doctors Practicing: {format.doctors(data)}</p>
            <p>Cities In: {format.cities(data)}</p> */}
          </Grid>
          <Grid item xs={6}>
            <h2>Map of Cities In</h2>
            <img src={data.cities[0]["image_url"]} style={{ maxWidth: "20em" }} alt="locimg" />
          </Grid>
        </Grid>
        <h2>Doctors Practicing: </h2>
        <p>{format.doctors(data)}</p>
        <h2>Cities In: </h2>
        <p>{format.cities(data)}</p>
      </Card>
    </div>
  );
}

export default withRouter(SpecFocused);
