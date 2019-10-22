import React from "react";
import { withRouter } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import SimpleExpansionFunction from "../../component/TextCollapse/TextCollapse";

function DocFocused(props) {
  let format = require("../Doctors/DoctorFormat");
  let format_data = props.location.state;
  let data = props.location.state.data;
  
  console.log("Rendering focused", data);
  return (
    <div style={{ textAlign: "center", padding: "3em" }}>
      <Card
        style={{
          backgroundColor: "#d9d9d9",
          color: "black",
          paddingBottom: "2em"
        }}
      >
        <h1>{data.name}</h1>
        <img src={data.image_url} style={{ maxWidth: "20em" }} alt="docimg" />
        <Grid container style={{ maxWidth: "65% ", margin: "auto" }}>
          <p>{data.bio}</p>
          <Grid item xs={6}>
            <h2>Information</h2>
            <p>
              {data.city.name}, {data.city.region}
            </p>
            <p>{format.phone(format_data)}</p>
            <p>Specialty: {format.specialty(format_data)}</p>
            <p>Rating: {format.rating(format_data)}</p>
          </Grid>
          <Grid item xs={6}>
            <h2>Location</h2>
            <p>
              {data.hospitalOrPractice}
              <br />
              {format.address1(format_data)}
              <br />
              {format.address2(format_data)}
            </p>
            <img src={data.city.image_url} style={{ maxWidth: "20em" }} alt="locimg" />
          </Grid>          
          <p>{SimpleExpansionFunction(data.insurance_plans)}</p>
        </Grid>
      </Card>
    </div>
  );
}

export default withRouter(DocFocused);
