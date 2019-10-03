import React from "react";
import DoctorData from "../../datastore/DoctorData/DoctorData";
import CityCard from "../../component/CityCard/CityCard";
import Grid from "@material-ui/core/Grid";

export default class Cities extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorData(),
      dataArr: []
    };
  }

  async componentDidMount() {
    this.setState({ dataArr: await this.state.dd.getCities() });
  }

  render() {
    let doctorCards = this.state.dataArr.map(data => {
      return <CityCard data={data} key={data.name} />;
    });
    return (
      <div style={{ padding: "0em 2em" }}>
        <h2>Cities Where Medical Assistance Is Attainable</h2>
        <Grid container spacing={2} justify="center">
          {doctorCards}
        </Grid>
      </div>
    );
  }
}
