import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export default function DocCard(props) {
  return (
    <Card style={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          style={{ height: 200 }}
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
            Specialty: {props.data.specialty}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Phone: {props.data.phone}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
