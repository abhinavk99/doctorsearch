import React from "react";
import { memberInfo } from "./assets";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import UserBio from "../../component/UserBio/UserBio";

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
    const bioCards = this.state.data.map(person => (
      <UserBio data={person} key={person.username} />
    ));
    return (
      <div style={{ margin: "1em 2em" }}>
        <Paper>
          <div style={{ padding: "1em" }}>
            <h1>About </h1>
            <p>We help people find doctors around the United States.</p>
            <br />
            <h1>Results</h1>
            <p>
              We're aggregating data about cities and the specialties of doctors
              and providing a centralized source of information.
            </p>
            <br />
            <h1>Developers</h1>

            <Grid container spacing={2} justify="center">
              {bioCards}
            </Grid>
            <br />
            <br />
            <h1>Contributions</h1>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Commits</TableCell>
                  <TableCell>Issues</TableCell>
                  <TableCell>Tests</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map(person => {
                  return (
                    <TableRow>
                      <TableCell>{person.name}</TableCell>
                      <TableCell>{person.commits}</TableCell>
                      <TableCell>{person.issues}</TableCell>
                      <TableCell>{person.tests}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}
