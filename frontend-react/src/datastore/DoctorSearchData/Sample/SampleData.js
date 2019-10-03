import d1 from "./doctor1.jpg";
import d2 from "./doctor2.png";
import d3 from "./doctor3.jpg";

import aus from "./austinmap.png";
import la from "./losangelesmap.PNG";
import sea from "./seattlemap.PNG";

import lapic from "./losangeles.jpg";
import auspic from "./austin.jpg";
import seapic from "./seattle.jpg";

import spe1 from "./specialty1.jpg";
import spe2 from "./specialty2.jpg";
import spe3 from "./specialty3.jpg";

export let docData = [
  {
    name: "James S Hahn",
    title: "MD",
    city: "Austin",
    state: "Texas",
    phone: "(512) 600-6189",
    specialty: "Family",
    hospitalOrPractice: "Hahn and Rhodes Mds",
    addressLine1: "631 West 38th Street Ste 2",
    addressLine2: "Austin, TX 78705",
    insurancePlans: ["Aetna", "CIGNA", "Kaiser", "BCBS"],
    rating: 4.6,
    biography: "Dr. James Hahn is a family medicine doctor in Austin, Texas and " +
      "is affiliated with multiple hospitals in the area, including Dell Seton " +
      "Medical Center at The University of Texas and St. David's Medical Center. " +
      "He received his medical degree from University of Texas Medical School and " +
      "has been in practice for more than 20 years.",
    website: "https://www.facebook.com/JamesHahnMD/",
    pic: d1,
    locimg: aus
  },
  {
    name: "Joseph Sciabbarrasi",
    title: "MD",
    city: "Los Angeles",
    state: "California",
    phone: "(310) 268-8466",
    specialty: "Holistic",
    hospitalOrPractice: "Holistic Doctor Los Angeles",
    addressLine1: "2001 S Barrington Ave #208",
    addressLine2: "Los Angeles, CA 90025",
    insurancePlans: ["Aetna", "Kaiser", "BCBS"],
    rating: 4.5,
    biography: "Dr. Joseph Sciabbarrasi is a practitioner of holistic, functional " +
      "and integrative medicine with over twenty five years of experience. His " +
      "exploration of traditional forms of healing began prior to entering medical " +
      "school, and have encompassed nutritional biochemistry, bioidentical hormone " +
      "replacement, acupuncture, herbal medicine, homeopathy, Shamanic healing, " +
      "meditation and spiritual training.",
    website: "https://holisticdoctorlosangeles.com",
    pic: d2,
    locimg: la
  },
  {
    name: "Jason G. Attaman",
    title: "DO, FAAPMR",
    city: "Seattle",
    state: "Washington",
    phone: "(425) 247-3359",
    specialty: "Pain Medicine",
    hospitalOrPractice: "Swedish Hospital",
    addressLine1: "93 South Jackson Street",
    addressLine2: "Seattle, WA 98104",
    insurancePlans: ["Aetna", "BCBS"],
    rating: 3.5,
    biography: "Dr. Jason Attaman and Dr. Cameron Cartier are double-board-certified " +
      "pain management and spine doctors with clinics in Bellevue, Seattle, and " +
      "Auburn, WA. Our physicians treat the full spectrum of pain, whether your " +
      "pain resides in your ankle, foot, elbow, wrist, hand, hip, knee, shoulder, " +
      "spine, or elsewhere. Our treatments include stem cell therapy , surgical, " +
      "and many non-surgical procedures.",
    website: "https://jasonattaman.com/",
    pic: d3,
    locimg: sea
  }
];

export let cityData = [
  {
    name: "Austin",
    state: "Texas",
    zip: "78705",
    popcnt: "950,715",
    numDoc: 20,
    county: "Travis",
    mayor: "Steve Adler",
    area: 305.1,
    website: "https://www.austintexas.gov",
    timeZone: "UTC-6",
    doctors: ["James S Hahn"],
    pic: auspic,
    locimg: aus
  },
  {
    name: "Los Angeles",
    state: "California",
    zip: "91308",
    popcnt: "3,792,621",
    numDoc: 20,
    county: "Los Angeles",
    mayor: "Eric Garcetti",
    area: 468.67,
    website: "https://www.lacity.org/",
    timeZone: "UTC-8",
    doctors: ["Joseph Sciabbarrasi"],
    pic: lapic,
    locimg: la
  },
  {
    name: "Seattle",
    state: "Washington",
    zip: "98139",
    popcnt: "724,745",
    numDoc: 20,
    county: "King",
    mayor: "Jenny Durkan",
    area: 142.07,
    website: "https://www.seattle.gov",
    doctors: ["Jason G. Attaman"],
    timeZone: "UTC-8",
    pic: seapic,
    locimg: sea
  }
];

export let specialtyData = [
  {
    name: "Sports Physical Therapy",
    description: "Specializes in sport injury related physical therapy.",
    category: "Medical",
    numDoc: 1,
    doctorsPracticing: ["Kelly Grosch, DC"],
    cities: ["Austin"],
    pic: spe1,
    locimg: aus
  },
  {
    name: "Sleep Medicine",
    description: "Specializes in sleep disorders.",
    category: "Medical",
    numDoc: 1,
    doctorsPracticing: ["Gowda Ashwin MD"],
    cities: ["Austin"],
    pic: spe2,
    locimg: aus
  },
  {
    name: "Therapeutic Radiology",
    description: "Specializes in the treatment of cancer and other diseases with radiation.",
    category: "Medical",
    numDoc: 1,
    doctorsPracticing: ["Catherine Wu MD"],
    cities: ["Austin"],
    pic: spe3,
    locimg: aus
  }
];
