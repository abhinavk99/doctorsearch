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

let stateDictionary = {
  AK: 'Alaska',
  AL: 'Alabama',
  AR: 'Arkansas',
  AS: 'American Samoa',
  AZ: 'Arizona',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DC: 'District of Columbia',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  IA: 'Iowa',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  MA: 'Massachusetts',
  MD: 'Maryland',
  ME: 'Maine',
  MI: 'Michigan',
  MN: 'Minnesota',
  MO: 'Missouri',
  MS: 'Mississippi',
  MT: 'Montana',
  NC: 'North Carolina',
  ND: ' North Dakota',
  NE: 'Nebraska',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NV: 'Nevada',
  NY: 'New York',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VA: 'Virginia',
  VI: 'Virgin Islands',
  VT: 'Vermont',
  WA: 'Washington',
  WI: 'Wisconsin',
  WV: 'West Virginia',
  WY: 'Wyoming'
};

let states = Object.keys(stateDictionary);

let titles = ['DDS', 'DMD', 'DO', 'DPT', 'MD', 'OD', 'OTR'];

class Doctors extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorSearchData(),
      dataArr: [],
      offset: 0,
      loaded: false,
      sort: -1,
      filterQuery: {},
      sortQuery: {},
      state: '',
      gender: ''
    };
  }

  async componentDidMount() {
    this.setPage(0);
  }

  setPage = async pageOffset => {
    await this.setState({
      dataArr: await this.state.dd.getDoctors(
        pageOffset + 1,
        this.state.filterQuery,
        this.state.sortQuery
      ),
      loaded: true,
      offset: pageOffset
    });
  };

  filterState = async e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === '-1') {
      delete this.state.filterQuery.state;
      await this.setState({
        offset: 0
      });
    } else {
      this.state.filterQuery.state = e.target.value;
      await this.setState({
        offset: 0
      });
    }
    await this.setState({
      dataArr: await this.state.dd.getDoctors(
        this.state.offset + 1,
        this.state.filterQuery,
        this.state.sortQuery
      ),
      loaded: true
    });
  };

  filterGender = async e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === '-1') {
      delete this.state.filterQuery.gender;
      await this.setState({
        gender: '',
        offset: 0
      });
    } else {
      this.state.filterQuery.gender = e.target.value;
      await this.setState({
        gender: e.target.value,
        offset: 0
      });
    }
    await this.setState({
      dataArr: await this.state.dd.getDoctors(
        this.state.offset + 1,
        this.state.filterQuery,
        this.state.sortQuery
      ),
      loaded: true
    });
  };

  filterTitle = async e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === '-1') {
      delete this.state.filterQuery.title;
      await this.setState({
        title: '',
        offset: 0
      });
    } else {
      this.state.filterQuery.title = e.target.value;
      await this.setState({
        title: e.target.value,
        offset: 0
      });
    }
    await this.setState({
      dataArr: await this.state.dd.getDoctors(
        this.state.offset + 1,
        this.state.filterQuery,
        this.state.sortQuery
      ),
      loaded: true
    });
  };

  sortRating = async e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.value === '-1') {
      delete this.state.sortQuery.rating;
      await this.setState({
        offset: 0
      });
    } else {
      this.state.sortQuery.rating = e.target.value;
      await this.setState({
        offset: 0
      });
    }
    await this.setState({
      dataArr: await this.state.dd.getDoctors(
        this.state.offset + 1,
        this.state.filterQuery,
        this.state.sortQuery
      ),
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
        <Grid container spacing={2} justify="center">
          <Grid item xs={9}>
            <CssTextField
              id="outlined-basic"
              label="Search for a doctor"
              margin="normal"
              variant="outlined"
              style={{ width: '60em' }}
              onChange={this.handleChange}
              onKeyDown={this.handleKey}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="center" style={{ marginTop: '1em' }}>
          <FormControl>
            <InputLabel htmlFor="sort">Sort by rating</InputLabel>
            <NativeSelect
              value={this.state.sort}
              onChange={this.sortRating}
              style={{ width: '15em' }}
              inputProps={{
                name: 'sort',
                id: 'sort'
              }}
            >
              <option value={'-1'}></option> />
              <option value={'asc'}>Ascending</option>
              <option value={'desc'}>Descending</option>
            </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="state">State</InputLabel>
            <NativeSelect
              value={this.state.state}
              onChange={this.filterState}
              style={{ width: '15em' }}
              inputProps={{
                name: 'state',
                id: 'state'
              }}
            >
              <option value={'-1'}></option> />
              {states.map((state, i) => (
                <option value={states[i]}>{stateDictionary[state]}</option>
              ))}
            </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="gender">Gender</InputLabel>
            <NativeSelect
              value={this.state.gender}
              onChange={this.filterGender}
              style={{ width: '15em' }}
              inputProps={{
                name: 'gender',
                id: 'gender'
              }}
            >
              <option value={'-1'}></option> />
              <option value={'male'}>Male</option> />
              <option value={'female'}>Female</option> />
            </NativeSelect>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="title">TItle</InputLabel>
            <NativeSelect
              value={this.state.title}
              onChange={this.filterTitle}
              style={{ width: '15em' }}
              inputProps={{
                name: 'title',
                id: 'title'
              }}
            >
              <option value={'-1'}></option> />
              {titles.map((title, i) => (
                <option value={titles[i]}>{titles[i]}</option>
              ))}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid container spacing={2} justify="center">
          {doctorCards}
        </Grid>
        <Pagination
          setPage={this.setPage}
          numPages={this.state.dataArr['total_pages']}
          offset={this.state.offset}
        />
      </div>
    );
  }
}

export default withRouter(Doctors);
