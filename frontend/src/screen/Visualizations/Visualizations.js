import React from 'react';
import { withRouter } from 'react-router-dom';
import numDoctorsPerCity from '../../datastore/VisualizationsData/numDoctorsPerCity.json';
import numSpecialtiesPerType from '../../datastore/VisualizationsData/specialtiesPerType.json';
import populationVsNumDoctors from '../../datastore/VisualizationsData/populationVsNumDoctors.json';
import medWagevsPov from '../../datastore/VisualizationsData/medianWageVsPovertyRate.json';
import avgRentCity from '../../datastore/VisualizationsData/avgRentPerCity.json';
import commPerTransit from '../../datastore/VisualizationsData/avgMinsPerCommuteMode.json';
import BarChart from '../../component/Graphs/BarChart';
import PieChart from '../../component/Graphs/PieChart';
import Scatterplot from '../../component/Graphs/Scatterplot';

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len) throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function Visualizations(props) {
  return (
    <div style={{ textAlign: 'center', padding: '3em' }}>
      <h1>DoctorSearch Visualizations</h1>
      <br />
      <br />
      <h2>Number of Doctors Per City</h2>
      <BarChart data={numDoctorsPerCity} xAttr="name" yAttr="numDoctors" />
      <h2>Categories of Specialties</h2>numDoctorsPerCitynumDoctorsPerCitynumDoctorsPerCity
      <PieChart data={numSpecialtiesPerType} />
      <h2>Population vs Number of Doctors</h2>
      <Scatterplot
        data={populationVsNumDoctors}
        xAttr="population"
        yAttr="numDoctors"
        xMax={9000000}
        yMax={70}
        xLabel="Population"
        yLabel="Number of Doctors"
      />
      <h1>Developer Visualizations</h1>
      <h2>Median Wage vs Poverty Rate</h2>
      <Scatterplot
        data={medWagevsPov}
        xAttr="medianWage"
        yAttr="povertyRate"
        xMax={160000}
        yMax={1}
        xLabel="Median Wage"
        yLabel="Poverty Rate"
      />
      <h2>Average Rent Per City</h2>
      <BarChart data={getRandom(avgRentCity, 30)} xAttr="name" yAttr="avgRent" />
      <h2>Average Commute Per Mode of Transit</h2>
      <BarChart data={commPerTransit} xAttr="mode" yAttr="avgMins" />
    </div>
  );
}

export default withRouter(Visualizations);
