import React from "react";
import { memberInfo, usernames } from "./assets";
import Paper from "@material-ui/core/Paper";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  async componentDidMount() {
    //   Grab contributor data
    const response = await fetch(
      "https://gitlab.com/api/v4/projects/14602314/repository/contributors"
    );
    const contributors = await response.json();

    // Loop contributors and get issues fixed
    const promisedData = contributors.map(async person => {
      // Get preloaded constant data from assets map
      const curData = memberInfo.get(person.email);

      //   Use username to get user id
      const userResp = await fetch(
        "https://gitlab.com/api/v4/users?username=" + curData.username
      );
      const userData = await userResp.json();

      //   Use user id to get issues
      const issuesResp = await fetch(
        "https://gitlab.com/api/v4/projects/14602314/issues?assignee_id=" +
          userData[0].id
      );
      const issues = await issuesResp.json();

      //   Set issues and return new combined object
      curData.issues = issues.length;
      return {
        ...person,
        ...curData
      };
    });

    const completedData = await Promise.all(promisedData);

    this.setState({
      data: completedData
    });
    console.log(this.state.data);
  }

  render() {
    return (
      <div style={{ margin: "1em 2em" }}>
        <Paper>
          <div style={{ padding: "1em" }}>
            <h1>About </h1>
            <p>We help people find doctors around US.</p>
            <h1>Results</h1>
            <p>
              We're aggregating data about cities and the specialties of doctors
              and providing a centralized source of information.
            </p>
          </div>
        </Paper>
      </div>
    );
  }
}
