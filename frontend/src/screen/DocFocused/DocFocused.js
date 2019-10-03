import React from "react";
import { withRouter } from "react-router-dom";

import Card from "@material-ui/core/Card";

function DocFocused(props) {
  let data = props.location.state.data;
  return (
    <div style={{ textAlign: "center", padding: "3em" }}>
      <Card style={{ backgroundColor: "#d9d9d9", color: "black" }}>
        <h1>{data.name}</h1>
        <img src={data.pic} style={{ maxWidth: "20em" }} alt="docimg" />
        <p style={{ maxWidth: "30em", margin: "0 auto", paddingTop: "1em" }}>{data.biography}</p>
        <p>
          {data.city}, {data.state}
        </p>
        <p>{data.phone}</p>
        <p>Specialty: {data.specialty}</p>
        <p>Rating: {data.rating}/5</p>
        <p>Website: <a target="_blank" rel="noopener noreferrer" href={data.website}>{data.website}</a></p>
        <p>Accepted Insurance Plans: {data.insurancePlans.join(", ")}</p>
      </Card>

      <h2>Location:</h2>
      <p>{data.hospitalOrPractice}<br/>{data.addressLine1}<br/>{data.addressLine2}</p>
      <img src={data.locimg} style={{ maxWidth: "20em" }} alt="locimg" />
    </div>
  );
}

export default withRouter(DocFocused);
