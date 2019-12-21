import React, { useState } from "react";
import DatePicker from "react-16-bootstrap-date-picker";


const EditMoviesTable = props => {
    const {movies, onSelect} = props;
    const [screendate, setScreenDate] = useState(new Date().toISOString())
    function setIds(){
        var wrapperElements = document.querySelectorAll('wrapper');
        var AddButtons = document.querySelectorAll('addButton');
        // Set their ids
        for (var i = 0; i < wrapperElements.length; i++)
            wrapperElements[i].id = 'wrapper-' + i;
            AddButtons[i].id = 'addButton-' + i;
    }
    function addFields(index){
        var dummy = '<div className="form-inline">\n<label>Screening Time</label>\n<div className="form-group mb-2">\n<input type="number" id = "screenHour" value={fields.screenHour} onChange={handleFieldChange} className="form-control" placeholder = "HH"/>\n</div>\n<div className="form-group mb-2">\n<input type="number" id = "screenMin" value={fields.screenMin} onChange={handleFieldChange} className="form-control" placeholder = "MM"/>\n</div>\n<br/>\n</div>'
                     + '<br/> \n <div className="form-group"> \n <label>Screening Date</label> \n <DatePicker id="datepicker" value={screendate} onChange = {onDateChange} dateFormat = {"YYYY/MM/DD"} calendarPlacement = {"top"}/> \n </div> \r\n';
        //document.getElementById('wrapper-' + index).innerHTML += dummy;  
        alert(index);
        document.getElementById(index).style.visibility = 'hidden';    
    }
    function print(movie){
        console.log(movie[4].split("/"))
    }
    return (
        <table className="table" onLoad = {setIds}>
        <thead>
            <tr>
            <th> Title </th>
            <th> Genre </th>
            <th> Screen </th>
            <th> Length </th>
            <th> Screenings </th>
            </tr>
        </thead>
        <tbody>
            {movies.map((movie, index) => (
            <tr key={index}>
                <td>{movie[0]}</td>
                <td>{movie[1]}</td>
                <td>{movie[2]}</td>
                <td>{movie[3]}</td>
                <td>{movie[4]}</td> 
                <button type="button" className="btn btn-primary btn-sm addButton"> Add Screening </button>
                <br/>
                <br/>
            </tr>
            ))}
        </tbody>
        </table>
    );
};
export default EditMoviesTable