import React from 'react';
import { withRouter } from 'react-router-dom';
import numDoctorsPerCity from '../../datastore/VisualizationsData/numDoctorsPerCity.json';
import BarChart from '../../component/Graphs/BarChart';

function Visualizations(props) {
  return (
    <div style={{ textAlign: 'center', padding: '3em' }}>
      <h1>Visualizations</h1>
      <h2>Number of Doctors Per City</h2>
      <BarChart data={numDoctorsPerCity} xAttr="name" yAttr="numDoctors" />
    </div>
  );
}

export default withRouter(Visualizations);
