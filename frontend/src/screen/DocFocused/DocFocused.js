import React from "react";
import { withRouter, useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import SimpleExpansionFunction from "../../component/TextCollapse/TextCollapse";

function DocFocused(props) {
  let format = require("../Doctors/DoctorFormat");
  let { id } = useParams();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("https://api.doctorsearch.me/api/doctor/" + id)
      .then(results => results.json())
      .then(d => setData(d));
  }, [id]);

  if (!data) {
    return <div></div>;
  }

  let url =
    "https://www.google.com/maps/embed/v1/place?key=" +
    process.env.REACT_APP_GOOGLE_API_KEY +
    "&q=" +
    format.address1(data) +
    "," +
    format.address2(data);

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
            <p
              onClick={() => props.history.push("/cities/" + data.city_id)}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {data.city.name}, {data.city.region}
            </p>
            <p>{format.phone(data)}</p>
            <div style={{display:"inline-flex", alignItems: "center", wordSpacing:"normal"}}>
              <strong>Specialty: </strong>
              <p
                onClick={() =>
                  props.history.push("/specialties/" + data.specialty_id)
                }
                style={{ color: "blue", cursor: "pointer" }}
              >
                &nbsp;{format.specialty(data)}
              </p>
            </div>
            <p><strong>Rating: </strong> {format.rating(data)}</p>
          </Grid>
          <Grid item xs={6}>
            <h2>Location</h2>
            <p>
              {format.address1(data)}
              <br />
              {format.address2(data)}
            </p>
            <img
              src={data.city.image_url}
              style={{ maxWidth: "20em" }}
              alt="locimg"
            />
          </Grid>
          <iframe
            title="docmap"
            style={{ width: "100%", height: "20em" }}
            src={url}
          />
          {SimpleExpansionFunction(
            "Insurance plans accepted",
            data.insurance_plans
          )}
        </Grid>
      </Card>
    </div>
  );
}

export default withRouter(DocFocused);
