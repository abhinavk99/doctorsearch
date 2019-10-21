import React from "react";
import Pagination from "material-ui-flat-pagination";

class MyPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0,
                   total: 0 };
  }

  handleClick(offset) {
    this.setState({ offset });
    this.props.setPage(offset);
  }

  componentDidMount(){
    
  }
  

  render() {
    
    return (
      <Pagination
        limit={1}
        offset={this.state.offset}
        total={100}
        onClick={(e, offset) => this.handleClick(offset)}
      />
    );
  }
}

export default MyPagination;
