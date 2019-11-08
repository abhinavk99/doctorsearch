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

let titles = ["DDS", "DMD", "DO", "DPT", "MD", "OD", "OTR"]


class Doctors extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorSearchData(),
      dataArr: [],
      offset: 0,
      loaded: false,
      filterQuery: {},
      state:"",
      gender:"",
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

 
  filterState = async e =>{
    this.setState({[e.target.name]: e.target.value});
    if(e.target.value === "-1"){
      delete this.state.filterQuery.state
      await this.setState({
        offset: 0
      });
    }else{
      this.state.filterQuery.state = e.target.value;
      await this.setState({
        offset:  0,
      });
    }    
    await this.setState({
      dataArr: await this.state.dd.getDoctors(this.state.offset+1, this.state.filterQuery),
      loaded: true,
    });
  };


  filterGender = async e =>{
      this.setState({[e.target.name]: e.target.value});
      if(e.target.value === "-1"){
        delete this.state.filterQuery.gender;
        await this.setState({
          gender:"",
          offset: 0,
        });
      }else{
        this.state.filterQuery.gender=e.target.value;
        await this.setState({
          gender: e.target.value,
          offset:  0,
        });
      }
      await this.setState({
        dataArr: await this.state.dd.getDoctors(this.state.offset+1, this.state.filterQuery),
        loaded: true,
      });
  }

  filterTitle = async e =>{
    this.setState({[e.target.name]: e.target.value});
    if(e.target.value === "-1"){
      delete this.state.filterQuery.title;
      await this.setState({
        title:"",
        offset: 0,
      });
    }else{
      this.state.filterQuery.title=e.target.value;
      await this.setState({
        title: e.target.value,
        offset:  0,
      });
    }
    await this.setState({
      dataArr: await this.state.dd.getDoctors(this.state.offset+1, this.state.filterQuery),
      loaded: true,
    });
}

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
          <FormControl >
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <NativeSelect
              value={this.state.gender}
              onChange={this.filterGender}
              inputProps={{
                name: 'gender',
                id: 'gender',
              }}
            >
              <option value={"-1"}></option> />
              <option value={"male"}>Male</option> />
              <option value={"female"}>Female</option> />
            </NativeSelect>
          </FormControl>
          <FormControl >
            <InputLabel htmlFor="title">TItle</InputLabel>
            <NativeSelect
              value={this.state.title}
              onChange={this.filterTitle}
              inputProps={{
                name: 'title',
                id: 'title',
              }}
            >
              <option value={"-1"}></option> />
              {titles.map((title, i)=> <option value={titles[i]} >{titles[i]}</option>)}
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
