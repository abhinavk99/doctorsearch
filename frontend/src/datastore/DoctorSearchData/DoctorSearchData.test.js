import { expect, use } from 'chai';
import DoctorSearchData from './DoctorSearchData';
import IllegalArgumentError from '../../utils/IllegalArgumentError';

use(require('chai-sorted'));

it('should get doctors', async () => {
  const dd = new DoctorSearchData();
  const doctors = await dd.getDoctors(2);
  expect(doctors.objects.length).to.equal(9);
  expect(doctors.page).to.equal(2);
  expect(doctors.total_pages).to.equal(252);
  expect(doctors.num_results).to.equal(2262);
});

it('should get cities', async () => {
  const dd = new DoctorSearchData();
  const cities = await dd.getCities(2);
  expect(cities.objects.length).to.equal(9);
  expect(cities.page).to.equal(2);
  expect(cities.total_pages).to.equal(6);
  expect(cities.num_results).to.equal(50);
});

it('should get specialties', async () => {
  const dd = new DoctorSearchData();
  const specialties = await dd.getSpecialties(2);
  expect(specialties.objects.length).to.equal(10);
  expect(specialties.page).to.equal(2);
  expect(specialties.total_pages).to.equal(16);
  expect(specialties.num_results).to.equal(154);
});

it('should construct filter string', () => {
  const dd = new DoctorSearchData();
  const filterStr = dd._constructFilterString({ region: 'California', country_code: 'US' });
  expect(filterStr).to.equal(
    '[{"name":"region","op":"eq","val":"California"},{"name":"country_code","op":"eq","val":"US"}]'
  );
});

it('should construct sort string', () => {
  const dd = new DoctorSearchData();
  const sortStr = dd._constructSortString({ population: 'asc', elevation_meters: 'desc' });
  expect(sortStr).to.equal(
    '[{"field":"population","direction":"asc"},{"field":"elevation_meters","direction":"desc"}]'
  );
});

it('should assert filters are valid', () => {
  const dd = new DoctorSearchData();
  expect(
    dd._assertFiltersAreValid({ region: 'California', country_code: 'US' }, [
      'region',
      'country_code',
      'name'
    ])
  ).to.equal(true);
});

it('should throw error for invalid filter attributes', () => {
  const dd = new DoctorSearchData();
  const lambda = () =>
    dd._assertFiltersAreValid({ a: 'x', b: 'y' }, ['region', 'country_code', 'name']);
  expect(lambda).to.throw(
    IllegalArgumentError,
    'One or more of the filter attributes are invalid.'
  );
});

it('should assert sorts are valid', () => {
  const dd = new DoctorSearchData();
  expect(
    dd._assertSortsAreValid({ elevation_meters: 'asc', latitude: 'desc' }, [
      'elevation_meters',
      'latitude',
      'longitude'
    ])
  ).to.equal(true);
});

it('should throw error for invalid sort attributes', () => {
  const dd = new DoctorSearchData();
  const lambda = () =>
    dd._assertSortsAreValid({ a: 'asc', b: 'desc' }, ['elevation_meters', 'latitude', 'longitude']);
  expect(lambda).to.throw(IllegalArgumentError, 'One or more of the sort attributes are invalid.');
});

it('should throw error for invalid sort directions', () => {
  const dd = new DoctorSearchData();
  const lambda = () =>
    dd._assertSortsAreValid({ elevation_meters: 'x', latitude: 'y' }, [
      'elevation_meters',
      'latitude',
      'longitude'
    ]);
  expect(lambda).to.throw(
    IllegalArgumentError,
    "All attributes in `sorts` must have direction 'asc' or 'desc'."
  );
});

it('should get 8 cities in california with population ascending', async () => {
  const dd = new DoctorSearchData();
  const cities = await dd.getCities(1, { region: 'California' }, { population: 'asc' });
  expect(cities.objects.length).to.equal(8);
  expect(cities.page).to.equal(1);
  expect(cities.total_pages).to.equal(1);
  expect(cities.num_results).to.equal(8);
  const cityNames = cities.objects.map(city => city.name);
  // Use eql for deep equality of arrays instead of equal
  expect(cityNames).to.eql([
    'Oakland',
    'Long Beach',
    'Sacramento',
    'Fresno',
    'San Francisco',
    'San Jose',
    'San Diego',
    'Los Angeles'
  ]);
  const states = new Set(cities.objects.map(city => city.region));
  expect(states).to.have.keys(['California']);
  const timezones = new Set(cities.objects.map(city => city.timezone));
  expect(timezones).to.have.keys(['America__Los_Angeles']);
  expect(cities.objects).to.be.ascendingBy('population');
});
