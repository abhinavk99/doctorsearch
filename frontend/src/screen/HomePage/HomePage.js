import React from 'react';
import logo from './doctorsearch.png';
import Grid from '@material-ui/core/Grid';
import CssTextField from '../../component/CssTextField/CssTextField.js';
import { withRouter } from 'react-router-dom';

function HomePage(props) {
  const [search, setSearch] = React.useState('');
  const handleChange = e => {
    setSearch(e.target.value);
  };
  const handleKey = e => {
    if (e.keyCode === 13 && search.length > 0) {
      props.history.push('/search/' + search);
    }
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <h2>Welcome to DoctorSearch! Find your doctor here.</h2>
          <div>
            <CssTextField
              id="outlined-basic"
              label="Search..."
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              onKeyDown={handleKey}
            />
          </div>
          <br />
          <br />
          <img src={logo} alt="logo" style={{ maxHeight: '400px', maxWidth: '400px' }} />
        </Grid>
      </Grid>
    </div>
  );
}

export default withRouter(HomePage);
