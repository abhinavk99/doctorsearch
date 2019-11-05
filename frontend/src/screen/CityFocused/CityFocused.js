import React from 'react';
import { withRouter, useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import LinkedExpander from '../../component/LinkedExpander/LinkedExpander';

function CityFocused() {
  let { id } = useParams();
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch('https://api.doctorsearch.me/api/city/' + id)
      .then(results => results.json())
      .then(d => setData(d));
  }, [id]);
  if (!data) {
    return <div></div>;
  }
  let url =
    'https://www.google.com/maps/embed/v1/place?key=' +
    process.env.REACT_APP_GOOGLE_API_KEY +
    '&q=' +
    data.name +
    ',' +
    data.region_code;

  return (
    <div style={{ textAlign: 'center', padding: '3em' }}>
      <Card
        style={{
          backgroundColor: '#d9d9d9',
          color: 'black',
          paddingBottom: '2em'
        }}
      >
        <h1>
          {data.name}, {data.region_code}
        </h1>
        <img style={{ maxWidth: '40em', maxHeight: '20em' }} src={data.image_url} alt="docimg" />
        <Grid container style={{ maxWidth: '65% ', margin: 'auto' }}>
          <Grid item xs={12}>
            <h2>Information</h2>
            <div style={{ display: 'inline-block', textAlign: 'left' }}>
              <p>
                <strong>Population:</strong> {data.population.toLocaleString()}
              </p>
              <p>
                <strong>Time Zone:</strong> {data.timezone}
              </p>
              <p>
                <strong>Coordinates:</strong> {data.latitude}, {data.longitude}
              </p>
              <p>
                <strong>Number of Doctors:</strong> {data.num_doctors}
              </p>
              <p>
                <strong>Number of Specialties: </strong>
                {data.num_specialties}
              </p>
              <p>
                <strong>Elevation: </strong>
                {data.elevation_meters.toLocaleString()}
              </p>
            </div>
          </Grid>
          <Grid item xs={12}>
            <h2>Location</h2>
            <iframe title="map" style={{ width: '100%', height: '20em' }} src={url} />
            <LinkedExpander
              data={data.doctors}
              urlheader={'/doctors/'}
              title={'Doctors'}
            ></LinkedExpander>
            <LinkedExpander
              data={data.specialties}
              urlheader={'/specialties/'}
              title={'Specialties'}
            ></LinkedExpander>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default withRouter(CityFocused);
