import React from "react";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";

function SpecFocused(props) {
  let data = props.location.state.data;
  return (
    <div style={{ textAlign: "center", padding: "3em" }}>
      <Card style={{ backgroundColor: "#d9d9d9", color: "black" }}>
        <h1>{data.name}</h1>
        <img style={{ maxWidth: "20em" }} src={data.pic} alt="docimg" />
        <p>{data.description}</p>
        <p>Category: {data.category}</p>
        <p>Number of Doctors: {data.numDoc}</p>
        <p>Doctors Practicing: {data.doctorsPracticing.join(", ")}</p>
        <p>Cities: {data.cities.join(", ")}</p>
      </Card>
      <h2>Location:</h2>
      <img src={data.locimg} style={{ maxWidth: "20em" }} alt="locimg" />
    </div>
  );
}

export default withRouter(SpecFocused);
