import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withRouter } from "react-router-dom";

function LinkedExpander(props) {
  let links = props.data.map(item => (
    <p
      key={item.name}
      onClick={() => props.history.push(props.urlheader + item.id)}
      style={{ color: "blue", cursor: "pointer" }}
    >
      {" "}
      {item.name}{" "}
    </p>
  ));
  return (
    <div>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> {props.title} </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Typography>{links}</Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

export default withRouter(LinkedExpander);
