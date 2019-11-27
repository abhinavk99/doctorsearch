import React from 'react';
import { withRouter } from 'react-router-dom';
import numDoctorsPerCity from '../../datastore/VisualizationsData/numDoctorsPerCity.json';
import numSpecialtiesPerType from '../../datastore/VisualizationsData/specialtiesPerType.json';
import BarChart from '../../component/Graphs/BarChart';
import PieChart from '../../component/Graphs/PieChart';

function Visualizations(props) {
  return (
    <div style={{ textAlign: 'center', padding: '3em' }}>
      <h1>Visualizations</h1>
      <br />
      <br />
      <h2>Number of Doctors Per City</h2>
      <BarChart data={numDoctorsPerCity} xAttr="name" yAttr="numDoctors" />
      <h2>Number of Specialties Per Type</h2>
      <PieChart data={numSpecialtiesPerType} />
    </div>
  );
}

export default withRouter(Visualizations);
