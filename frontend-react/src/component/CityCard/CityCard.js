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
              image={props.data.pic}
              title={props.data.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.data.name}, {props.data.state}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.data.zip}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Population: {props.data.popcnt}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Number of Doctors: {props.data.numDoc}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Grid>
  );
}

export default withRouter(CityCard);
