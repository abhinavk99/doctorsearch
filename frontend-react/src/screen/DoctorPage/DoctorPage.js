import React from "react";
import DoctorData from "../../datastore/DoctorData/DoctorData";
import DocCard from "../../component/DocCard/DocCard";

export default class DoctorPage extends React.Component {
  constructor() {
    super();
    this.state = {
      dd: new DoctorData(),
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
    return <div>{doctorCards}</div>;
  }
}
