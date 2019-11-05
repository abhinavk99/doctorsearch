module.exports = {
  rating: function(props) {
    let rating = props.rating ? props.rating + '/5' : 'No rating';
    return rating;
  },
  specialty: function(props) {
    //let specialty = props.specialty.category[0].toUpperCase()+props.specialty.category.slice(1);
    return props.specialty.name;
  },
  phone: function(props) {
    let phone =
      props.phone.slice(0, 3) + '-' + props.phone.slice(3, 6) + '-' + props.phone.slice(6);
    return phone;
  },
  gender: function(props) {
    return props.gender ? props.gender[0].toUpperCase() + props.gender.slice(1) : 'No gender';
  },
  address1: function(props) {
    return props.street;
  },
  address2: function(props) {
    return props.address_city + ', ' + props.state + ' ' + props.zip_code;
  },
  textCollapse() {
    const TEXT_COLLAPSE_OPTIONS = {
      collapse: false,
      collapseText: '... show more',
      expandText: 'show less',
      minHeight: 70,
      maxHeight: 180,
      textStyle: {
        color: 'blue',
        fontSize: '20px'
      }
    };
    return TEXT_COLLAPSE_OPTIONS;
  }
};
