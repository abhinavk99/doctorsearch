import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router-dom";

function DocCard(props) {
  return (
    <Grid item xs={12} md={4} style={{ maxWidth: "20em" }}>
      <div style={{ padding: "1em" }}>
        <Card
          onClick={() =>
            props.history.push({
              pathname: "/doctors/detail",
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
                {props.data.name}, {" " + props.data.title}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data.city}, {" " + props.data.state}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Specialty: </b>
                {props.data.specialty}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Phone: </b>
                {props.data.phone}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Rating: </b>
                {props.data.rating}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Website: </b>
                {props.data.website}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Grid>
  );
}

export default withRouter(DocCard);
