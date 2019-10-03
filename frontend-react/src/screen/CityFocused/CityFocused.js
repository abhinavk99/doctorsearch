import React from "react";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";

function CityFocused(props) {
  let data = props.location.state.data;
  return (
    <div style={{ textAlign: "center", padding: "3em" }}>
      <Card style={{ backgroundColor: "#d9d9d9", color: "black" }}>
        <h1>
          {data.name}, {data.state}
        </h1>
        <img style={{ maxWidth: "20em" }} src={data.pic} alt="docimg" />
        <p>{data.zip}</p>
        <p>Population {data.popcnt}</p>
        <p> Number of Doctors: {data.numDoc}</p>
      </Card>
      <h2>Location:</h2>
      <img src={data.locimg} style={{ maxWidth: "20em" }} alt="locimg" />
    </div>
  );
}

export default withRouter(CityFocused);
