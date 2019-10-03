import d1 from "./doctor1.jpg";
import d2 from "./doctor2.png";
import aus from "./austinmap.png";
import la from "./losangelesmap.PNG";
import sea from "./seattlemap.PNG";
import lapic from "./losangeles.jpg";
import auspic from "./austin.jpg";
import seapic from "./seattle.jpg";
import spe1 from "./specialty1.jpg";

export let docData = [
  {
    name: "James S Hahn",
    title: "MD",
    city: "Austin",
    state: "Texas",
    phone: "(512) 600-6189",
    specialty: "Family",
    pic: d1,
    locimg: aus
  },
  {
    name: "Joseph",
    title: "MD",
    city: "Los Angeles",
    state: "California",
    phone: "(310) 268-8466",
    specialty: "Holistic",
    pic: d2,
    locimg: la
  }
];

export let cityData = [
  {
    name: "Austin",
    state: "Texas",
    zip: "78705",
    popcnt: "950,715",
    numDoc: "20",
    pic: auspic,
    locimg: aus
  },
  {
    name: "Los Angeles",
    state: "California",
    zip: "91308",
    popcnt: "3,792,621",
    numDoc: "20",
    pic: lapic,
    locimg: la
  },
  {
    name: "Seattle",
    state: "Washington",
    zip: "98139",
    popcnt: "724,745",
    numDoc: "20",
    pic: seapic,
    locimg: sea
  }
];

export let specialtyData = [
  {
    name: "Sports Physical Therapy",
    description: "Specializes in sport injury related physical therapy.",
    category: "medical",
    doctorsPracticing: "Kelly Grosch, DC",
    cities: "Austin",
    pic: spe1,
    locimg: aus
  }
];
