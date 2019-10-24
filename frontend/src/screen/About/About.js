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
    this.state = { data: [], issues: 0, commits: 0 };
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

    let commits = 0;
    let issues = 0;
    let tests = 0;
    for (let item of completedData) {
      commits += item.commits;
      issues += item.issues;
      tests += item.tests;
    }

    this.setState({
      data: completedData,
      commits,
      issues,
      tests
    });
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
            <p>
              We help people find doctors around the United States. In 50 major
              cities around the US, we have information on doctors and specialties
              that are being practiced so that anyone can easily search for a
              doctor near them.
            </p>
            <br />
            <h1>Results</h1>
            <p>
              We're aggregating data about cities and the specialties of doctors
              and providing a centralized source of information. We integrated
              this data so that people can find out which doctors are closest to
              them and also which cities have a more diverse amount of doctors
              and specialties.
            </p>
            <br />
            <h1>Developers</h1>

            <Grid container spacing={2} justify="center">
              {bioCards}
            </Grid>
            <br />
            <br />
            <h1>Contributions</h1>
            {this.state.data.length > 0 ? (
              <div>
                <h4>Total commits: {this.state.commits}</h4>
                <h4>Total issues: {this.state.issues}</h4>
                <h4>Total unit tests: {this.state.tests}</h4>
              </div>
            ) : null}

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Commits</TableCell>
                  <TableCell>Issues</TableCell>
                  <TableCell>Unit Tests</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.data.map(person => {
                  return (
                    <TableRow key={person.username}>
                      <TableCell>{person.name}</TableCell>
                      <TableCell>{person.commits}</TableCell>
                      <TableCell>{person.issues}</TableCell>
                      <TableCell>{person.tests}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <br style={{ paddingTop: "20em" }} />
            <h1>Tools</h1>
            <p>
              We used React and JavaScript to write the frontend of Doctor Search.
              The frontend website is hosted using AWS Amplify.
              The backend, <a href="https://api.doctorsearch.me">api.doctorsearch.me</a>,
              is hosted using Elastic Beanstalk backed by a PostgreSQL database and
              a Flask Restless server.
            </p>

            <h1>Links</h1>
            <a href="https://gitlab.com/krysehun/doctorsearch">
              GitLab Repo
            </a>
            <br />
            <a href="https://documenter.getpostman.com/view/9000368/SVtbPkAt">
              Postman Docs
            </a>
          </div>
        </Paper>
      </div>
    );
  }
}
