import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';

function DocCard(props) {
  let format = require('../../screen/Doctors/DoctorFormat');
  return (
    <Grid item xs={12} md={4} style={{ maxWidth: '20em' }}>
      <div style={{ padding: '1em' }}>
        <Card onClick={() => props.history.push('/doctors/' + props.data.id)}>
          <CardActionArea>
            <CardMedia
              style={{ minHeight: 200 }}
              image={props.data.image_url}
              title={props.data.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                {props.data.name}, {' ' + props.data.title}
              </Typography>
              <Typography variant="body2" component="p">
                {props.data.city.name}, {' ' + props.data.city.region}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Specialty: </b>
                {format.specialty(props.data)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Phone: </b>
                {format.phone(props.data)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Rating: </b>
                {format.rating(props.data)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <b>Gender: </b>
                {format.gender(props.data)}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </Grid>
  );
}

export default withRouter(DocCard);
