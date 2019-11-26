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

async function generateOurData() {
  const numDoctorsPerCityData = [];
  const populationVsNumDoctorsData = [];
  const specialtiesPerTypeData = {};

  for await (let city of getInstances('city')) {
    numDoctorsPerCityData.push({ name: city.name, numDoctors: city.num_doctors });
    populationVsNumDoctorsData.push({
      population: city.population,
      numDoctors: city.num_doctors
    });
  }
  numDoctorsPerCityData.sort((a, b) => b.numDoctors - a.numDoctors);

  for await (let specialty of getInstances('specialty')) {
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

function generateDeveloperData() {
  console.log('Not implemented yet.');
}

async function* getInstances(model) {
  let page = 1;
  let data;
  do {
    const rawData = await fetch(`https://api.doctorsearch.me/api/${model}?page=${page}`);
    data = await rawData.json();
    for (let obj of data.objects) {
      yield obj;
    }
    ++page;
  } while (page <= data.total_pages);
}
