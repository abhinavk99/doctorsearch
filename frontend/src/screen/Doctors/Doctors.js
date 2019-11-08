import React from 'react';
import DoctorSearchData from '../../datastore/DoctorSearchData/DoctorSearchData';
import DocCard from '../../component/DocCard/DocCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '../../component/Pagination/Pagination';
import './Doctor.css';
import CssTextField from '../../component/CssTextField/CssTextField';
import { withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';



let stateDictionary = { "AK" : "Alaska", "AL" : "Alabama", "AR" : "Arkansas", "AS" : "American Samoa", "AZ" : "Arizona", "CA" : "California", "CO" : "Colorado", "CT" : "Connecticut", "DC" : "District of Columbia", "DE" : "Delaware", "FL" : "Florida", "GA" : "Georgia", "GU" : "Guam", "HI" : "Hawaii", "IA" : "Iowa", "ID" : "Idaho", "IL" : "Illinois", "IN" : "Indiana", "KS" : "Kansas", "KY" : "Kentucky", "LA" : "Louisiana", "MA" : "Massachusetts", "MD" : "Maryland", "ME" : "Maine", "MI" : "Michigan", "MN" : "Minnesota", "MO" : "Missouri", "MS" : "Mississippi", "MT" : "Montana", "NC" : "North Carolina", "ND" : " North Dakota", "NE" : "Nebraska", "NH" : "New Hampshire", "NJ" : "New Jersey", "NM" : "New Mexico", "NV" : "Nevada", "NY" : "New York", "OH" : "Ohio", "OK" : "Oklahoma", "OR" : "Oregon", "PA" : "Pennsylvania", "PR" : "Puerto Rico", "RI" : "Rhode Island", "SC" : "South Carolina", "SD" : "South Dakota", "TN" : "Tennessee", "TX" : "Texas", "UT" : "Utah", "VA" : "Virginia", "VI" : "Virgin Islands", "VT" : "Vermont", "WA" : "Washington", "WI" : "Wisconsin", "WV" : "West Virginia", "WY" : "Wyoming"}

let states = Object.keys(stateDictionary);

class Doctors extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorSearchData(),
      dataArr: [],
      offset: 0,
      loaded: false,
      filterQuery: {},
      state:" ",
    };
  }

  async componentDidMount() {
    this.setPage(0);
  }

  setPage = async pageOffset => {
    await this.setState({
      dataArr: await this.state.dd.getDoctors(pageOffset + 1,this.state.filterQuery),
      loaded: true,
      offset: pageOffset
    });
  };

  filterState = async event =>{
    this.setState({[event.target.name]: event.target.value});
    if(event.target.value === "-1"){
      console.log(this.state.filterQuery.state)
      await this.setState({
        filterQuery: {},
        offset: 0
      });
      console.log(this.state.filterQuery)
    }else{
      await this.setState({
        filterQuery: {state: event.target.value},
        offset:  0,
      });
    }
    console.log("before render")
    
    await this.setState({
      dataArr: await this.state.dd.getDoctors(this.state.offset+1, this.state.filterQuery),
      loaded: true,
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
    console.log(this.state.dataArr)
    let doctorCards = this.state.loaded
      ? this.state.dataArr.objects.map(data => {
          return <DocCard data={data} key={data.name} />;
        })
      : null;
    return (
      <div className="simple">
        <h2 style={{ textAlign: 'center' }}>Hot Doctors in Your Area</h2>
        <Grid container spacing={2} justify="center">
          <CssTextField
            id="outlined-basic"
            label="Search for a doctor"
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
            onKeyDown={this.handleKey}
          />
          <FormControl >
            <InputLabel htmlFor="state">State</InputLabel>
            <NativeSelect
              value={this.state.state}
              onChange={this.filterState}
              inputProps={{
                name: 'state',
                id: 'state',
              }}
            >
              <option value={"-1"}></option> />
              {states.map((state, i)=> <option value={states[i]} >{stateDictionary[states[i]]}</option>)}
            </NativeSelect>
          </FormControl>
          </Grid>
        <Grid container spacing={2} justify="center">
          {doctorCards}
        </Grid>
        <Pagination setPage={this.setPage} numPages={this.state.dataArr['total_pages']} offset={this.state.offset} />
      </div>
    );
  }
}

export default withRouter(Doctors);
