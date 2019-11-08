import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

class FilterMenu extends React.Component{
    constructor(props){
        super(props);
        this.state={filterFields: {}, label:this.props.label}
    }

    handleChange = age => event => {
        this.setState({age});
      };

    render(){
        return(
            <FormControl >
            <InputLabel htmlFor="filter">{this.state.label}</InputLabel>
            <NativeSelect
              value={this.state.label}
              onChange={this.handleChange('age')}
              inputProps={{
                name: 'filter',
                id: 'filter',
              }}
            >
              <option value="" />
              <option value={10}>Ten</option>
              <option value={20}>Twenty</option>
              <option value={30}>Thirty</option>
            </NativeSelect>
            <FormHelperText>Some important helper text</FormHelperText>
          </FormControl>
        );
    }
}
export default FilterMenu;