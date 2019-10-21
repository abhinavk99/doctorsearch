import React from "react";
import DoctorSearchData from "../../datastore/DoctorSearchData/DoctorSearchData";
import SpecCard from "../../component/SpecCard/SpecCard";
import Grid from "@material-ui/core/Grid";
import Pagination from "../../component/Pagination/Pagination";

export default class Specialties extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorSearchData(),
      dataArr: [],
      loaded: false
    };
  }

  async componentDidMount() {
    this.setPage(0);
    //this.setState({ dataArr: await this.state.dd.getSpecialties() });
  }

  setPage = async offset => {
    console.log("called setpage from pagination object", offset);
    await this.setState({
      dataArr: await this.state.dd.getSpecialties(offset + 1),
      loaded: true
    });
    console.log(this.state.dataArr);
  };

  render() {
    let specialtyCards = this.state.loaded ? this.state.dataArr.objects.map(data => {
      return <SpecCard data={data} key={data.name} />;
    }) : null;
    return (
      <div style={{ padding: "0em 2em", textAlign: "center" }}>
        <h2 style={{ textAlign: "center" }}>Specialties that Doctors Practice</h2>
        <Grid container spacing={2} justify="center">
          {specialtyCards}
        </Grid>
        <Pagination setPage={this.setPage} />
      </div>
    );
  }
}
