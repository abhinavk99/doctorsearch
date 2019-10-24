import React from "react";
import { withRouter, useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import LinkedExpander from "../../component/LinkedExpander/LinkedExpander";

function SpecFocused(props) {
  let format = require("../../screen/Specialties/SpecFormat");
  let { id } = useParams();
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    fetch("https://api.doctorsearch.me/api/specialty/" + id)
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
        <h1>{data.name}</h1>
        <p>{data.description}</p>
        <Grid container style={{ maxWidth: "65% ", margin: "auto" }}>
          <Grid item xs={12}>
            <h2>Information</h2>
            <p>Category: {format.capitalize(data.category)}</p>
            <p>Number of Doctors: {data.num_doctors}</p>
            <p>Number of Cities: {data.num_cities}</p>
            <LinkedExpander
          data={data.doctors}
          urlheader="/doctors/"
          title="Doctors"
        />
        <LinkedExpander
          data={data.cities}
          urlheader="/cities/"
          title="Cities"
        />
          </Grid>
        </Grid>
        {/* <iframe style={{width:"100%", height:"20em"}} src={url}/> */}
      </Card>
    </div>
  );
}

export default withRouter(SpecFocused);
