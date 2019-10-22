
module.exports = {
    rating: function(props) {
        let rating = props.data.rating ? props.data.rating + "/5" : "No rating"
        return rating;
    } ,
    specialty: function(props){
        //let specialty = props.data.specialty.category[0].toUpperCase()+props.data.specialty.category.slice(1);
        return props.data.specialty.name;
    },
    phone: function(props){
        let phone = props.data.phone.slice(0,3)+"-"+props.data.phone.slice(3,6)+"-"+props.data.phone.slice(6);  
        return phone;
    },
    gender: function(props){
        return props.data.gender ? props.data.gender[0].toUpperCase()+props.data.gender.slice(1) : "No gender";
    },
    address1: function(props){
        return props.data.street;
    },
    address2: function(props){
        return props.data.city.name+", "+props.data.state+" "+props.data.zip_code;
    },
    textCollapse(){
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
          }
        return TEXT_COLLAPSE_OPTIONS;
    }
}

