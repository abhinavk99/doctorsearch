import React from "react";
import DoctorSearchData from "../../datastore/DoctorSearchData/DoctorSearchData";
import SpecCard from "../../component/SpecCard/SpecCard";
import Grid from "@material-ui/core/Grid";

export default class Specialties extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorSearchData(),
      dataArr: []
    };
  }

  async componentDidMount() {
    this.setState({ dataArr: await this.state.dd.getSpecialties() });
  }

  render() {
    let specialtyCards = this.state.dataArr.map(data => {
      return <SpecCard data={data} key={data.name} />;
    });
    return (
      <div style={{ padding: "0em 2em" }}>
        <h2>Specialties that Doctors Practice</h2>
        <Grid container spacing={2} justify="center">
          {specialtyCards}
        </Grid>
      </div>
    );
  }
}
