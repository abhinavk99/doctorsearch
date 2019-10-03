import React from "react";
import DoctorData from "../../datastore/DoctorData/DoctorData";
import SpecCard from "../../component/SpecCard/SpecCard";
import Grid from "@material-ui/core/Grid";

export default class Specialties extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorData(),
      dataArr: []
    };
  }

  async componentDidMount() {
    this.setState({ dataArr: await this.state.dd.getSpecialties() });
  }

  render() {
    let doctorCards = this.state.dataArr.map(data => {
      console.log(data);
      return <SpecCard data={data} key={data.name} />;
    });
    return (
      <div style={{ padding: "0em 2em" }}>
        <h2>Doctors With Special Skills</h2>
        <Grid container spacing={2} justify="center">
          {doctorCards}
        </Grid>
      </div>
    );
  }
}
