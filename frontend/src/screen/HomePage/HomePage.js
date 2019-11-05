import React from 'react';
import logo from './doctor1.jpg';
import Grid from '@material-ui/core/Grid';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <h2>Welcome to DoctorSearch! Find your doctor here.</h2>
            <img src={logo} alt="logo" />
          </Grid>
        </Grid>
      </div>
    );
  }
}
