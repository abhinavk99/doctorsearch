import { docData, cityData, specialtyData } from "./Sample/SampleData.js";

export default class DoctorData {
  getDoctors = async () => {
    return docData;
  };
  getCities = async () => {
    return cityData;
  };
  getSpecialties = async () => {
    return specialtyData;
  };
}
