import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

function CityCard(props) {
  return (
    <Grid item xs={12} md={4} style={{ maxWidth: "20em" }}>
      <div style={{ padding: "1em" }}>
        <Card
          onClick={() =>
            props.history.push({
              pathname: "/cities/detail",
              search: "",
              state: { data: props.data }
            })
          }
        >
          <CardActionArea>
            <CardMedia
              style={{ minHeight: 200 }}
              image={props.data.image_url}
              title={props.data.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                align="center"
              >
                {props.data.name}, {props.data.region_code}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Population </b>
                {props.data.population.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Number of Doctors: </b>
                {props.data.num_doctors}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Number of Specialties: </b>
                {props.data.num_specialties}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Elevation: </b>
                {props.data.elevation_meters.toLocaleString()} meters
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Grid>
  );
}

export default withRouter(CityCard);
