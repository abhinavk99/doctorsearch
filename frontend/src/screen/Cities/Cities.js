import React from 'react';
import DoctorSearchData from '../../datastore/DoctorSearchData/DoctorSearchData';
import CityCard from '../../component/CityCard/CityCard';
import Grid from '@material-ui/core/Grid';
import Pagination from '../../component/Pagination/Pagination';
import CssTextField from '../../component/CssTextField/CssTextField';
import { withRouter } from 'react-router-dom';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

let states = ["Alaska", "Alabama", "Arkansas", "American Samoa", "Arizona", "California", "Colorado", "Connecticut", "District of Columbia", "Delaware", "Florida", "Georgia", "Guam", "Hawaii", "Iowa", "Idaho", "Illinois", "Indiana", "Kansas", "Kentucky", "Louisiana", "Massachusetts", "Maryland", "Maine", "Michigan", "Minnesota", "Missouri", "Mississippi", "Montana", "North Carolina", "North Dakota", "Nebraska", "New Hampshire", "New Jersey", "New Mexico", "Nevada", "New York", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Virginia", "Virgin Islands", "Vermont", "Washington", "Wisconsin", "West Virginia", "Wyoming"];

let cities = [ "New York City", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus", "San Francisco", "Charlotte", "Indianapolis", "Seattle", "Denver", "Washington, D.C.", "Boston", "El Paso", "Detroit", "Nashville", "Portland", "Memphis", "Oklahoma City", "Las Vegas", "Louisville", "Baltimore", "Milwaukee", "Albuquerque", "Tucson", "Fresno", "Mesa", "Sacramento", "Atlanta", "Kansas City", "Colorado Springs", "Miami", "Raleigh", "Omaha", "Long Beach", "Virginia Beach", "Oakland", "Minneapolis", "Tulsa", "Arlington", "Tampa", "New Orleans", ]

class Cities extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorSearchData(),
      dataArr: [],
      offset: 0,
      loaded: false,
      filterQuery: {},
      sortQuery: {}
    };
  }

  async componentDidMount() {
    this.setPage(0);
  }

  setPage = async pageOffset => {
    await this.setState({
      dataArr: await this.state.dd.getCities(pageOffset + 1, this.state.filterQuery, this.state.sortQuery),
      loaded: true,
      offset: pageOffset
    });
  };

  filterRegion = async e =>{
    this.setState({[e.target.name]: e.target.value});
    if(e.target.value === "-1"){
      delete this.state.filterQuery.region
      await this.setState({
        offset: 0
      });
    }else{
      this.state.filterQuery.region = e.target.value;
      await this.setState({
        offset:  0,
      });
    }    
    await this.setState({
      dataArr: await this.state.dd.getCities(this.state.offset+1, this.state.filterQuery, this.state.sortQuery),
      loaded: true,
    });
  };

  filterName = async e =>{
    this.setState({[e.target.name]: e.target.value});
    if(e.target.value === "-1"){
      delete this.state.filterQuery.name
      await this.setState({
        offset: 0
      });
    }else{
      this.state.filterQuery.name = e.target.value;
      await this.setState({
        offset:  0,
      });
    }    
    await this.setState({
      dataArr: await this.state.dd.getCities(this.state.offset+1, this.state.filterQuery, this.state.sortQuery),
      loaded: true,
    });
  };

  sortPopulation = async e => {
    this.setState({[e.target.name]: e.target.value});
    if(e.target.value === "-1"){
      delete this.state.sortQuery.population;
      await this.setState({
        offset: 0,
      });
    }else{
      this.state.sortQuery.population = e.target.value;
      await this.setState({
        offset: 0,
      });
    }
    await this.setState({
      dataArr: await this.state.dd.getCities(this.state.offset+1, this.state.filterQuery, this.state.sortQuery),
      loaded: true,
    });
  }

    sortNumDoc = async e => {
      this.setState({[e.target.name]: e.target.value});
      if(e.target.value === "-1"){
        delete this.state.sortQuery.num_doctors;
        await this.setState({
          offset: 0,
        });
      }else{
        this.state.sortQuery.num_doctors = e.target.value;
        await this.setState({
          offset: 0,
        });
      }
      await this.setState({
        dataArr: await this.state.dd.getCities(this.state.offset+1, this.state.filterQuery, this.state.sortQuery),
        loaded: true,
      });
    }

    sortNumSpec = async e => {
      this.setState({[e.target.name]: e.target.value});
      if(e.target.value === "-1"){
        delete this.state.sortQuery.num_specialties;
        await this.setState({
          offset: 0,
        });
      }else{
        this.state.sortQuery.num_specialties = e.target.value;
        await this.setState({
          offset: 0,
        });
      }
      await this.setState({
        dataArr: await this.state.dd.getCities(this.state.offset+1, this.state.filterQuery, this.state.sortQuery),
        loaded: true,
      });
  }

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
        <Grid container spacing={2} justify="center">
        <CssTextField
          id="outlined-basic"
          label="Search for a city"
          margin="normal"
          variant="outlined"
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
          style={{width: "60em"}}
        />
        </Grid>
        <Grid container spacing={2} justify="center" style={{marginTop:"1em"}}>
        <FormControl>
          <InputLabel htmlFor="sortPop">Sort by Population</InputLabel>
          <NativeSelect
            value={this.state.sort}
            onChange={this.sortPopulation}
            style={{width: "12em"}}
            inputProps={{
              name: 'sortPop',
              id: 'sortPop',
            }}
          >
            <option value={"-1"}></option> />
            <option value={"asc"}>Ascending</option>
            <option value={"desc"}>Descending</option>
          </NativeSelect>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="sortDoc">Sort by Number of Doctors</InputLabel>
          <NativeSelect
            value={this.state.sort}
            onChange={this.sortNumDoc}
            style={{width: "12em"}}
            inputProps={{
              name: 'sortDoc',
              id: 'sortDoc',
            }}
          >
            <option value={"-1"}></option> />
            <option value={"asc"}>Ascending</option>
            <option value={"desc"}>Descending</option>
          </NativeSelect>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="sortSpec">Sort by Number of Specialties</InputLabel>
          <NativeSelect
            value={this.state.sort}
            onChange={this.sortNumSpec}
            style={{width: "12em"}}
            inputProps={{
              name: 'sortSpec',
              id: 'sortSpec',
            }}
          >
            <option value={"-1"}></option> />
            <option value={"asc"}>Ascending</option>
            <option value={"desc"}>Descending</option>
          </NativeSelect>
        </FormControl>
        <FormControl >
            <InputLabel htmlFor="region">State</InputLabel>
            <NativeSelect
              value={this.state.state}
              onChange={this.filterRegion}
              style={{width: "12em"}}
              inputProps={{
                name: 'region',
                id: 'region',
              }}
            >
              <option value={"-1"}></option> />
              {states.map((state, i)=> <option value={states[i]} >{state}</option>)}
            </NativeSelect>
          </FormControl>
          <FormControl >
            <InputLabel htmlFor="name">City Name</InputLabel>
            <NativeSelect
              value={this.state.state}
              onChange={this.filterName}
              style={{width: "12em"}}
              inputProps={{
                name: 'name',
                id: 'name',
              }}
            >
              <option value={"-1"}></option> />
              {cities.map((city, i)=> <option value={cities[i]} >{city}</option>)}
            </NativeSelect>
          </FormControl>
          </Grid>
        <Grid container spacing={2} justify="center">
          {cityCards}
        </Grid>
        <Pagination setPage={this.setPage} numPages={this.state.dataArr['total_pages']} offset={this.state.offset}/>
      </div>
    );
  }
}

export default withRouter(Cities);
