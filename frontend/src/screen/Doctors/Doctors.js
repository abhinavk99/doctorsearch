import React from "react";
import DoctorSearchData from "../../datastore/DoctorSearchData/DoctorSearchData";
import DocCard from "../../component/DocCard/DocCard";
import Grid from "@material-ui/core/Grid";
import Pagination from "../../component/Pagination/Pagination";
import "./Doctor.css";

export default class Doctors extends React.Component {
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
  }

  setPage = async offset => {
    console.log("called setpage from pagination object", offset);
    await this.setState({
      dataArr: await this.state.dd.getDoctors(offset + 1),
      loaded: true
    });
    console.log(this.state.dataArr);
  };

  render() {
    let doctorCards = this.state.loaded
      ? this.state.dataArr.objects.map(data => {
          return <DocCard data={data} key={data.name} />;
        })
      : null;
    console.log("CURRENT STATE", this.state);
    return (
      <div className="simple">
        <h2 style={{ textAlign: "center" }}>Hot Doctors in Your Area</h2>
        <Grid container spacing={2} justify="center">
          {doctorCards}
        </Grid>
        <Pagination setPage={this.setPage} numPages={this.state.dataArr["total_pages"]}/>
      </div>
    );
  }
}
