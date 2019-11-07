import React from 'react';
import DoctorSearchData from '../../datastore/DoctorSearchData/DoctorSearchData';
import CityCard from '../../component/CityCard/CityCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '../../component/Pagination/Pagination';
import CssTextField from '../../component/CssTextField/CssTextField';
import { withRouter } from 'react-router-dom';
class Cities extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorSearchData(),
      dataArr: [],
      loaded: false
    };
  }

  async componentDidMount() {
    this.setPage(0);
  }

  setPage = async offset => {
    await this.setState({
      dataArr: await this.state.dd.getCities(offset + 1),
      loaded: true
    });
  };
  handleChange = () => {};

  handleKey = e => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      console.log('searching for: ', e.target.value);
      this.props.history.push({
        pathname: '/search/' + e.target.value,
        state: { type: 'cities' }
      });
    }
  };

  render() {
    let cityCards = this.state.loaded
      ? this.state.dataArr.objects.map(data => {
          return <CityCard data={data} key={data.name} />;
        })
      : null;
    return (
      <div style={{ padding: '0em 2em', textAlign: 'center' }}>
        <h2 style={{ textAlign: 'center' }}>Cities Where Medical Assistance is Attainable</h2>
        <CssTextField
          id="outlined-basic"
          label="Search for a city"
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
        />
        <Grid container spacing={2} justify="center">
          {cityCards}
        </Grid>
        <Pagination setPage={this.setPage} numPages={this.state.dataArr['total_pages']} />
      </div>
    );
  }
}

export default withRouter(Cities);
