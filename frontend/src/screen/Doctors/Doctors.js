import React from 'react';
import DoctorSearchData from '../../datastore/DoctorSearchData/DoctorSearchData';
import DocCard from '../../component/DocCard/DocCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '../../component/Pagination/Pagination';
import './Doctor.css';
import CssTextField from '../../component/CssTextField/CssTextField';
import { withRouter } from 'react-router-dom';
class Doctors extends React.Component {
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
      dataArr: await this.state.dd.getDoctors(offset + 1),
      loaded: true
    });
  };

  handleChange = () => {};

  handleKey = e => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      console.log('searching for: ', e.target.value);
      this.props.history.push({
        pathname: '/search/' + e.target.value,
        state: { type: 'doctors' }
      });
    }
  };

  render() {
    let doctorCards = this.state.loaded
      ? this.state.dataArr.objects.map(data => {
          return <DocCard data={data} key={data.name} />;
        })
      : null;
    return (
      <div className="simple">
        <h2 style={{ textAlign: 'center' }}>Hot Doctors in Your Area</h2>
        <CssTextField
          id="outlined-basic"
          label="Search for a doctor"
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
        />
        <Grid container spacing={2} justify="center">
          {doctorCards}
        </Grid>
        <Pagination setPage={this.setPage} numPages={this.state.dataArr['total_pages']} />
      </div>
    );
  }
}

export default withRouter(Doctors);
