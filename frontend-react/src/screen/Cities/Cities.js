import React from "react";
import DoctorSearchData from "../../datastore/DoctorSearchData/DoctorSearchData";
import CityCard from "../../component/CityCard/CityCard";
import Grid from "@material-ui/core/Grid";

export default class Cities extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorSearchData(),
      dataArr: []
    };
  }

  async componentDidMount() {
    this.setState({ dataArr: await this.state.dd.getCities() });
  }

  render() {
    let cityCards = this.state.dataArr.map(data => {
      return <CityCard data={data} key={data.name} />;
    });
    return (
      <div style={{ padding: "0em 2em" }}>
        <h2>Cities Where Medical Assistance is Attainable</h2>
        <Grid container spacing={2} justify="center">
          {cityCards}
        </Grid>
      </div>
    );
  }
}
