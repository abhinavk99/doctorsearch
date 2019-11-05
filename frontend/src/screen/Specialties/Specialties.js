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

import DoctorSearchData from '../../datastore/DoctorSearchData/DoctorSearchData';

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

class Specialties extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      dd: new DoctorSearchData(),
      loaded: false,
      rowsPerPage: 10,
      page: 0
    };
  }

  async componentDidMount() {
    await this.setState({
      data: await this.state.dd.getSpecialties(this.state.page + 1),
      loaded: true
    });
  }

  async setPage(pg) {
    this.setState({
      page: pg,
      data: await this.state.dd.getSpecialties(pg + 1)
    });
  }

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    if (!this.state.loaded) {
      return <div></div>;
    }
    return (
      <Paper style={{ margin: '5em' }}>
        <div>
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
