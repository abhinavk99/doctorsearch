import { docData, cityData } from "./Sample/SampleData.js";

export default class DoctorData {
  getDoctors = async () => {
    return docData;
  };
  getCities = async () => {
    return cityData;
  };
}
