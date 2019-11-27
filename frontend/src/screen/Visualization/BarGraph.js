import React from 'react';
import * as d3 from "d3";

var data = require("../../datastore/VisualizationsData/numDoctorsPerCity.json");
class BarGraph extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cities: [],
            numDoctors: [],
        };
    }
    componentDidMount() {
        this.createBarChart();
    }

    

    createBarChart(){
        var myChart = d3.select('#chart').append('svg')
                        .attr('width', 500)
                        .attr('height', 500)
                        .data(data)

    }
}

export default BarGraph;