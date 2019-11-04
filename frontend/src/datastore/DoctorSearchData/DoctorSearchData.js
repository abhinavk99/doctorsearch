import IllegalArgumentError from '../../utils/IllegalArgumentError';

export default class DoctorSearchData {
  /**
   * Helper method to get model instances from the API
   * @param {number} offset page of the result to get
   * @param {string} name name of the model to get instances from
   * @param {Object<string, string | number>=} filters dict of filters mapping from attribute to value
   * @param {Object<string, string>=} sorts dict of sorts mapping from attribute to asc or desc
   * @example <caption>Getting cities in California sorted by population ascending.</caption>
   * // returns 8 cities in California sorted by population ascending
   * const filters = {'region': 'California'};
   * const sorts = {'population': 'asc'};
   * const cities = await _getModelInstances(1, 'city', filters, sorts);
   * @returns {Object<string, any>} response from API containing model instances
   */
  async _getModelInstances(offset, name, filters={}, sorts={}) {
    const filterString = this._constructFilterString(filters);
    const sortString = this._constructSortString(sorts);
    let url = `https://api.doctorsearch.me/api/${name}?q={"filters":${filterString}, "order_by":${sortString}}&page=${offset}`;
    const data = await fetch(url);
    return await data.json();
  }

  _constructFilterString(filters={}) {
    return JSON.stringify(Object.entries(filters).map(([attr, val]) => {return {name: attr, op: 'eq', val: val}}));
  }

  _constructSortString(sorts={}) {
    return JSON.stringify(Object.entries(sorts).map(([attr, dir]) => {return {field: attr, direction: dir}}));
  }

  async getDoctors(offset, filters={}, sorts={}) {
    this._assertFiltersAreValid(filters, ['address_city', 'college', 'degree', 'gender', 'name', 'state', 'title', 'zip_code']);
    this._assertSortsAreValid(sorts, ['latitude', 'longitude', 'rating']);
    return this._getModelInstances(offset, 'doctor', filters, sorts);
  }

  async getCities(offset, filters={}, sorts={}) {
    this._assertFiltersAreValid(filters, ['country', 'country_code', 'name', 'region', 'region_code', 'timezone']);
    this._assertSortsAreValid(sorts, ['elevation_meters', 'latitude', 'longitude', 'num_doctors', 'num_specialties', 'population']);
    return this._getModelInstances(offset, 'city', filters, sorts);
  }

  async getSpecialties(offset, filters={}, sorts={}) {
    this._assertFiltersAreValid(filters, ['category', 'name']);
    this._assertSortsAreValid(sorts, ['num_cities', 'num_doctors']);
    return this._getModelInstances(offset, 'specialty', filters, sorts);
  }

  _assertFiltersAreValid(filters, possibleAttributes) {
    if (!Object.keys(filters).every(attr => possibleAttributes.includes(attr))) {
      throw new IllegalArgumentError('One or more of the filter attributes are invalid.');
    }
    return true;
  }

  _assertSortsAreValid(sorts, possibleAttributes) {
    if (!Object.keys(sorts).every(attr => possibleAttributes.includes(attr))) {
      throw new IllegalArgumentError('One or more of the sort attributes are invalid.');
    }
    if (!Object.values(sorts).every(dir => ['asc', 'desc'].includes(dir))) {
      throw new IllegalArgumentError("All attributes in `sorts` must have direction 'asc' or 'desc'.");
    }
    return true;
  }
}
