import { cityData, specialtyData } from "./Sample/SampleData.js";

export default class DoctorSearchData {
  getDoctors = async offset => {
    // Hit the api and get data
    const docData = await fetch(
      "https://api.doctorsearch.me/api/doctor?page=" + offset
    );
    return await docData.json();
  };
  getCities = async () => {
    return cityData;
  };
  getSpecialties = async offset => {
    const specialtyData = await fetch(
      "https://api.doctorsearch.me/api/specialty?page=" + offset
    );
    return await specialtyData.json();
  };
}
