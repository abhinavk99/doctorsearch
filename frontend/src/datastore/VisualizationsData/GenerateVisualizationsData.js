/*
To generate data for our visualizations, run: node GenerateVisualizationsData.js -g our
To generate data for developer's visualizations, run: node GenerateVisualizationsData.js -g developer
*/
const fetch = require('node-fetch');
const fs = require('fs');

const args = process.argv;
if (args.length >= 4 && args[2] === '-g') {
  if (args[3] === 'our') generateOurData();
  else if (args[3] === 'developer') generateDeveloperData();
  else console.log('Invalid value given for -g flag.');
} else {
  console.log('You must provide -g flag with the value `our` or `developer`.');
}

const strSecsToIntMin = strSecs => Math.floor(parseInt(strSecs) / 60);

async function generateOurData() {
  const baseDomain = 'api.doctorsearch.me';

  const numDoctorsPerCityData = [];
  const populationVsNumDoctorsData = [];
  const specialtiesPerTypeData = {};

  for await (let city of getInstances(baseDomain, 'city')) {
    numDoctorsPerCityData.push({ name: city.name, numDoctors: city.num_doctors });
    populationVsNumDoctorsData.push({
      population: city.population,
      numDoctors: city.num_doctors
    });
  }
  numDoctorsPerCityData.sort((a, b) => b.numDoctors - a.numDoctors);

  for await (let specialty of getInstances(baseDomain, 'specialty')) {
    if (specialty.category in specialtiesPerTypeData) ++specialtiesPerTypeData[specialty.category];
    else specialtiesPerTypeData[specialty.category] = 1;
  }

  fs.writeFile('numDoctorsPerCity.json', JSON.stringify(numDoctorsPerCityData, null, 2), e => {});
  fs.writeFile(
    'populationVsNumDoctors.json',
    JSON.stringify(populationVsNumDoctorsData, null, 2),
    e => {}
  );
  fs.writeFile('specialtiesPerType.json', JSON.stringify(specialtiesPerTypeData, null, 2), e => {});
}

async function generateDeveloperData() {
  const baseDomain = 'api.costlycommute.me';

  const medianWageVsPovertyRateData = [];
  const avgRentPerCityData = [];
  const commuteTimesPerCommuteMode = {};

  for await (let city of getInstances(baseDomain, 'city')) {
    if (city.median_wage && city.poverty_rate) {
      medianWageVsPovertyRateData.push({
        medianWage: city.median_wage,
        povertyRate: city.poverty_rate
      });
    }
    if (city.housing.length > 0) {
      avgRentPerCityData.push({
        name: city.name,
        avgRent: city.housing.reduce((a, b) => a + b.rent, 0) / city.housing.length
      });
    }
  }

  for await (let commute of getInstances(baseDomain, 'commute')) {
    if (commute.timespan) {
      if (commute.mode in commuteTimesPerCommuteMode)
        commuteTimesPerCommuteMode[commute.mode].push(strSecsToIntMin(commute.timespan));
      else commuteTimesPerCommuteMode[commute.mode] = [strSecsToIntMin(commute.timespan)];
    }
  }
  const avgMinsPerCommuteModeData = Object.entries(commuteTimesPerCommuteMode).map(([k, v]) => ({
    mode: k,
    avgMins: v.reduce((a, b) => a + b) / v.length
  }));

  fs.writeFile(
    'medianWageVsPovertyRate.json',
    JSON.stringify(medianWageVsPovertyRateData, null, 2),
    e => {}
  );
  fs.writeFile('avgRentPerCity.json', JSON.stringify(avgRentPerCityData, null, 2), e => {});
  fs.writeFile(
    'avgMinsPerCommuteMode.json',
    JSON.stringify(avgMinsPerCommuteModeData, null, 2),
    e => {}
  );
}

async function* getInstances(baseDomain, model) {
  let page = 1;
  let data;
  do {
    const rawData = await fetch(`https://${baseDomain}/api/${model}?page=${page}`);
    data = await rawData.json();
    for (let obj of data.objects) {
      yield obj;
    }
    ++page;
  } while (page <= data.total_pages);
}
