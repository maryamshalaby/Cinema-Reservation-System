import React, { useState } from "react";
import { useFormFields } from "../libs/hooksLib";
import LoaderButton from "../components/LoaderButton";
import DatePicker from "react-16-bootstrap-date-picker";
import "./AddMovie.css";

export default function AddMovie(props) {
    const [fields, handleFieldChange] = useFormFields({
        title: "",
        genre: "",
        hourLength: "",
        minLength: "",
        screen: "",
        screenHour: "",
        screenMin: ""
    });
    const [screendate, setScreendate] = useState(new Date().toISOString())
    const [isLoading, setIsLoading] = useState(false);

    function onDateChange (value) {
        setScreendate(value);
    }

    function FormCheck() {
        return !(
            fields.title.length > 0 &&
            fields.genre.length > 0 &&
            fields.hourLength.length > 0 && fields.hourLength >= 0 &&
            fields.minLength.length > 0 && fields.minLength >= 0 &&
            fields.screen.length > 0 && fields.screen > 0 &&
            fields.screenHour.length > 0 && fields.screenMin.length > 0 &&
            fields.screenHour >= 0 && fields.screenHour < 24 && fields.screenMin >= 0 && fields.screenMin < 60
        );
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        var date = new Date (screendate);
        var month = date.getMonth() + 1;
        var screenDate = date.getFullYear() + '-' + month + '-' + date.getDate() + ' ' + fields.screenHour + ':' + fields.screenMin + ':00';

        const http= new XMLHttpRequest();
        const url="http://localhost/admin.php";
        http.open("POST", url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange
                                = function(){
                                    if(this.readyState == 4 && this.status == 200){
                                        if (this.responseText.includes("Error")){
                                            alert(this.responseText);
                                            setIsLoading(false);
                                        }
                                        else {
                                            alert("Movie added successfully!");
                                            props.history.push("/admin");
                                        }  
                                    }
                                };
        var op = "add_movie"
        var mov_length =  fields.hourLength + ":" + fields.minLength + ":00";
        
        var request = "op="+ op + "&movie_name=" + fields.title + "&genre=" + fields.genre + "&screen=" + fields.screen + "&length=" + mov_length + "&time=" + screenDate;

        http.send(request);
    }
    function renderForm() {
        return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" id = "title" autoFocus value={fields.title} onChange={handleFieldChange} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" id = "genre" value={fields.genre} onChange={handleFieldChange} className="form-control"/>
            </div>
            <div className="form-group">
                <label>Screen</label>
                <input type="number" id = "screen" value={fields.screen} onChange={handleFieldChange} className="form-control"/>
            </div>
            <div className="form-inline">
                <label>Length </label>       
                <div className="form-group mb-2">
                    <input type="number" id = "hourLength" value={fields.hourLength} onChange={handleFieldChange} className="form-control" placeholder = "HH"/>
                </div>
                <div className="form-group mb-2">
                    <input type="number" id = "minLength" value={fields.minLength} onChange={handleFieldChange} className="form-control" placeholder = "MM"/>
                </div>
            </div>
            <br/>
            <div className="form-inline">
                <label>Screening Time</label>       
                <div className="form-group mb-2">
                    <input type="number" id = "screenHour" value={fields.screenHour} onChange={handleFieldChange} className="form-control" placeholder = "HH"/>
                </div>
                <div className="form-group mb-2">
                    <input type="number" id = "screenMin" value={fields.screenMin} onChange={handleFieldChange} className="form-control" placeholder = "MM"/>
                </div>
                <br/>
            </div>
            <br/>
            <div className="form-group">
                <label>Screening Date</label>
                <DatePicker id="datepicker" value={screendate} onChange = {onDateChange} dateFormat = {"YYYY/MM/DD"} calendarPlacement = {"top"}/>        
            </div> 
            <br/>
            <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={FormCheck()}
            >
            Add Movie
            </LoaderButton>
        </form>
        );
    }
    return (
        <div className="AddMovie">
        {renderForm()}
        </div>
    );
}