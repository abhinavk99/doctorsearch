import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import fmat from '../../screen/Specialties/SpecFormat';
import './Spec.css';
import { withRouter } from 'react-router-dom';
import CssTextField from '../../component/CssTextField/CssTextField';
import DoctorSearchData from '../../datastore/DoctorSearchData/DoctorSearchData';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const columns = [
  {
    id: 'name',
    label: 'Specialty',
    minWidth: 170,
    format: value => {
      return <p style={{ color: 'blue', cursor: 'pointer' }}>{fmat.capitalize(value)}</p>;
    },
    className: ''
  },
  {
    id: 'description',
    label: 'Description',
    minWidth: 100,
    format: value => fmat.description(value),
    className: 'trucate'
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 170,
    align: 'right',
    format: value => fmat.capitalize(value),
    className: ''
  },
  {
    id: 'num_doctors',
    label: 'Number of Doctors',
    minWidth: 170,
    align: 'right',
    format: value => value,
    className: ''
  },
  {
    id: 'num_cities',
    label: 'Number of Cities',
    minWidth: 170,
    align: 'right',
    format: value => value,
    className: ''
  }
];

let categories = ["medical", "services", "therapy", "vision", "dental"];

class Specialties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dd: new DoctorSearchData(),
      loaded: false,
      rowsPerPage: 10,
      page: 0,
      filterQuery: {},
      sortQuery: {}
    };
  }

  async componentDidMount() {
    await this.setState({
      data: await this.state.dd.getSpecialties(this.state.page + 1),
      loaded: true
    });
    console.log(this.state.data);
  }

  setPage = async pg => {
    this.setState({
      page: pg,
      data: await this.state.dd.getSpecialties(pg + 1, this.state.filterQuery, this.state.sortQuery)
    });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  
  filterCategory = async e =>{
    this.setState({[e.target.name]: e.target.value});
    if(e.target.value === "-1"){
      delete this.state.filterQuery.category
      await this.setState({
        page: 0
      });
    }else{
      this.state.filterQuery.category = e.target.value;
      await this.setState({
        page:  0,
      });
    }    
    await this.setState({
      data: await this.state.dd.getSpecialties(this.state.page+1, this.state.filterQuery, this.state.sortQuery),
      loaded: true,
    });
  };
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
      data: await this.state.dd.getSpecialties(this.state.offset+1, this.state.filterQuery, this.state.sortQuery),
      loaded: true,
    });
  }

  sortNumCities = async e => {
    this.setState({[e.target.name]: e.target.value});
    if(e.target.value === "-1"){
      delete this.state.sortQuery.num_cities;
      await this.setState({
        offset: 0,
      });
    }else{
      this.state.sortQuery.num_cities = e.target.value;
      await this.setState({
        offset: 0,
      });
    }
    await this.setState({
      data: await this.state.dd.getSpecialties(this.state.offset+1, this.state.filterQuery, this.state.sortQuery),
      loaded: true,
    });
}

  handleChange = () => {};

  handleKey = e => {
    if (e.keyCode === 13 && e.target.value.length > 0) {
      console.log('searching for: ', e.target.value);
      this.props.history.push({
        pathname: '/search/' + e.target.value,
        state: { type: 'specialties' }
      });
    }
  };

  render() {
    if (!this.state.loaded) {
      return <div></div>;
    }
    return (
      <Paper style={{ margin: '5em' }}>
        <div>
          <div style={{ margin: '1em', textAlign: 'center' }}>
            <CssTextField
              id="outlined-basic"
              label="Search for a specialty"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
              onKeyDown={this.handleKey}
            />
            <FormControl >
              <InputLabel htmlFor="category">Category</InputLabel>
              <NativeSelect
                value={this.state.state}
                onChange={this.filterCategory}
                inputProps={{
                  name: 'category',
                  id: 'category',
                }}
              >
                <option value={"-1"}></option> />
                {categories.map((category, i)=> <option value={categories[i]} >{fmat.capitalize(category)}</option>)}
              </NativeSelect>
            </FormControl>
            <FormControl>
          <InputLabel htmlFor="sortCities">Sort by Number of Cities</InputLabel>
          <NativeSelect
            value={this.state.sort}
            onChange={this.sortNumCities}
            inputProps={{
              name: 'sortCities',
              id: 'sortCities',
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
          </div>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.objects.map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={column.className}
                          onClick={
                            column.id === 'name'
                              ? () =>
                                  this.props.history.push({
                                    pathname: '/specialties/' + row.id,
                                    search: '',
                                    state: { data: row }
                                  })
                              : null
                          }
                        >
                          {column.format(value)}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={this.state.data.num_results}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'previous page'
          }}
          nextIconButtonProps={{
            'aria-label': 'next page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

export default withRouter(Specialties);
