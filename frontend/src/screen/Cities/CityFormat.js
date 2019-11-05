module.exports = {
  population: function(props) {
    let rating = props.data.rating ? props.data.rating + '/5' : 'No rating';
    return rating;
  },
  doctors: function(data) {
    var doc_string = '';
    for (var i = 0; i < data.doctors.length - 1; i++) {
      doc_string += data.doctors[i]['name'] + ', ';
    }
    doc_string += data.doctors[data.doctors.length - 1]['name'];
    return doc_string;
  },
  specialties: function(data) {
    var spec_string = '';
    for (var i = 0; i < data.specialties.length - 1; i++) {
      spec_string += data.specialties[i]['name'] + ', ';
    }
    spec_string += data.specialties[data.specialties.length - 1]['name'];
    return spec_string;
  }
};
