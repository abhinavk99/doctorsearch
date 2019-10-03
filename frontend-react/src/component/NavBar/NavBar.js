import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    cursor: "pointer"
  }
}));

function NavBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#2bc4ad" }}>
        <Toolbar>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => {
              props.history.push("/");
            }}
          >
            Doctor Search
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              props.history.push("/doctors");
            }}
          >
            Doctors
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              props.history.push("/cities");
            }}
          >
            Cities
          </Button>

          <Button color="inherit">Specialties</Button>

          <Button color="inherit">About</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(NavBar);
