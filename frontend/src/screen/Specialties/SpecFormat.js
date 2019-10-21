module.exports = {
    description: function(props) {
        var string = props.data.description;
        var length = 100;
        return string.length > length ? 
                    string.substring(0, length - 3) + "..." : 
                    string;
    },
    capitalize: function(string){
        return string[0].toUpperCase()+string.slice(1);
    },
    cities: function(data){
        var city_string = "";
        for(var i = 0; i<data.cities.length-1; i++){
            city_string += data.cities[i]["name"]+ ", ";
        }
        city_string += data.cities[data.cities.length-1]["name"];
        return city_string;
    },
    doctors: function(data){
        var doc_string = "";
        for(var i = 0; i<data.doctors.length-1; i++){
            doc_string += data.doctors[i]["name"]+ ", ";
        }
        doc_string += data.doctors[data.doctors.length-1]["name"];
        return doc_string;
    }
    
}