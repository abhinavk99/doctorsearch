import React from "react";
import DoctorSearchData from "../../datastore/DoctorSearchData/DoctorSearchData";
import DocCard from "../../component/DocCard/DocCard";
import Grid from "@material-ui/core/Grid";

export default class Doctors extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorSearchData(),
      dataArr: []
    };
  }

  async componentDidMount() {
    this.setState({ dataArr: await this.state.dd.getDoctors() });
  }

  render() {
    let doctorCards = this.state.dataArr.map(data => {
      return <DocCard data={data} key={data.name} />;
    });
    return (
      <div style={{ padding: "0em 2em" }}>
        <h2>Hot Doctors in Your Area</h2>
        <Grid container spacing={2} justify="center">
          {doctorCards}
        </Grid>
      </div>
    );
  }
}
