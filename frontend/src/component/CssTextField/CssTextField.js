import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'green'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green'
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#2bc4ad'
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2bc4ad'
      }
    }
  }
})(TextField);

export default CssTextField;
