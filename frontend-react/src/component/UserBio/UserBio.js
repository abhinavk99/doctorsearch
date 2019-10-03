import React from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

function UserBio(props) {
  return (
    <Grid item xs={12} md={4} style={{ textAlign: "center" }}>
      <div style={{ padding: ".5em" }}>
        <Card
          style={{
            backgroundColor: "#2bc4ad",
            color: "white",
            borderRadius: "2%"
          }}
        >
          <div style={{ padding: "2em" }}>
            <img
              src={props.data.pic}
              style={{ maxWidth: "10em", borderRadius: "50%" }}
              alt={props.data.name}
            />
            <h2>{props.data.name}</h2>
            <p>{props.data.bio}</p>
            <p>Role: {props.data.responsibilities}</p>
          </div>
        </Card>
      </div>
    </Grid>
  );
}

export default UserBio;
