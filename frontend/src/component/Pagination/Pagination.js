import React from 'react';
import Pagination from 'material-ui-flat-pagination';

class MyPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: this.props.offset };
  }

  handleClick(offset) {
    this.setState({ offset });
    this.props.setPage(offset);
  }

  render() {
    return (
      <Pagination
        limit={1}
        offset={this.props.offset}
        total={this.props.numPages}
        onClick={(e, offset) => this.handleClick(offset)}
      />
    );
  }
}

export default MyPagination;
