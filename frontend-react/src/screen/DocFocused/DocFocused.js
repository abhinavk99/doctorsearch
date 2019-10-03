import React from "react";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";

function DocFocused(props) {
  let data = props.location.state.data;
  return (
    <div style={{ textAlign: "center", padding: "3em" }}>
      <Card style={{ backgroundColor: "#d9d9d9", color: "black" }}>
        <h1>{data.name}</h1>
        <img src={data.pic} alt="docimg" />
        <p>
          {data.city}, {data.state}
        </p>
        <p>{data.phone}</p>
        <p> Specialty: {data.specialty}</p>
      </Card>

      <h2>Location:</h2>
      <img src={data.locimg} alt="locimg" />
    </div>
  );
}

export default withRouter(DocFocused);
