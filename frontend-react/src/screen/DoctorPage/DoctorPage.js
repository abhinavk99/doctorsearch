import React from 'react';
import DoctorData from '../../datastore/DoctorData/DoctorData'

export default class DoctorPage extends React.Component{
    constructor(){
        super();
        this.state = {
            dd: new DoctorData(),
            dataArr: []
        }
    }

    async componentDidMount(){

        console.log(await this.state.dd.getDoctors())
    }

    render(){
        return(

            <div>

                <p>hit doctor page</p>
            </div>
        )

    }

}