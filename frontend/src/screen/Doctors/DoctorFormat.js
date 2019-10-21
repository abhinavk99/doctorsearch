
module.exports = {
    rating: function(props) {
        let rating = props.data.rating ? props.data.rating + "/5" : "No rating"
        return rating;
    } ,
    specialty: function(props){
        let specialty = props.data.specialty.category[0].toUpperCase()+props.data.specialty.category.slice(1);
        return specialty;
    },
    phone: function(props){
        let phone = props.data.phone.slice(0,3)+"-"+props.data.phone.slice(3,6)+"-"+props.data.phone.slice(6);  
        return phone;
    },
    gender: function(props){
        return props.data.gender[0].toUpperCase()+props.data.gender.slice(1);
    }
}

