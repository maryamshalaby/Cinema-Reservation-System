import React, { useState, useEffect } from 'react';
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";

// Login component render contact form
export default function Seatstest(props) {
    var index = 1;
    var rows, cols ; 

    const [screenInfo, setScreenInfo] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([[]]);
    const [mySeats, setMySeats] = useState([]);


    var AllSeats = [[]]
    const http= new XMLHttpRequest();
    const url="http://localhost/retrieve.php";
    http.open("POST", url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange
                            = function(){
                                if(this.readyState == 4 && this.status == 200){
                                    if (this.responseText.includes("Error")){
                                        alert(this.responseText);
                                    }
                                    else {
                                        setScreenInfo(JSON.parse(this.responseText));
                                        console.log(screenInfo)
                                        //prepareSeats(screenInfo);
                                        //getReservedSeats();
                                    } 
                                }
                            };
    var op = "get_screen";
    console.log(props.selectedMovie[2])
    http.send("op="+ op + "&screen=" + props.selectedMovie[2]);

    useEffect(() => {
        //alert("hi")
        if (screenInfo.length != 0){
            setScreenInfo(screenInfo);
            prepareSeats(screenInfo);
            getReservedSeats();
        }
    }, [screenInfo]);

    function getReservedSeats(){
        const httpres= new XMLHttpRequest();
        const urlres="http://localhost/retrieve.php";
        httpres.open("POST", urlres, true);
        httpres.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        httpres.onreadystatechange
                                = function(){
                                    if(this.readyState == 4 && this.status == 200){
                                        if (this.responseText.includes("Error")){
                                            alert(this.responseText);
                                        }
                                        else {
                                            //setReservedSeats(JSON.parse(this.responseText));
                                            console.log(reservedSeats)
                                            //prepareReservedSeats();
                                        }  
                                    }
                                };
        var op = "get_res";
        console.log(props.selectedMovie[0] +  props.selectedMovieDateTime)
        httpres.send("op=" + op + "&movie_name=" + props.selectedMovie[0] + "&movie_time=" + props.selectedMovieDateTime);
    }

    useEffect(() => {
        if (reservedSeats[0].length != 0){
            setReservedSeats(reservedSeats);
            prepareSeats(reservedSeats);
            prepareReservedSeats();
        }
    }, [reservedSeats]);

    function prepareSeats(screen_info){
        rows = screen_info[0][1];
        cols = screen_info[0][2];
        console.log(rows + " " +  cols)
        for( let i = 0 ;i<rows;i++){
            var seatRow = new Array(parseInt(cols)).fill('btn-primary');
            AllSeats.push(seatRow);
        }
        index = 1;
    }
    function prepareReservedSeats(){
        if (reservedSeats.length > 0)
            for(let i = 0; i<reservedSeats.length; i++){
                //console.log(this.reservedSeats.length)
                let resrvedRow = reservedSeats[i][0]
                let resrvedCol = reservedSeats[i][1]

                AllSeats[resrvedRow-1][resrvedCol-1] ='btn-danger';
            }
            index = 1;
    }
    
    // when user clicks a button we take his col and row info and reserve it in database
    function Reserve(e, colIndex, RowIndex) {

        index = 1;
        //1.1---------check if reserved before-------//
        if(reservedSeats.find(seat => (seat[0] == RowIndex && seat[1] == colIndex))){
            alert('It is reserved select anothe seat')
            return true;
        }


        //1.2---------check if seat exists in my reservation----if yes change color to primary 
        //--------------------and delete element from reservation--------------------//
        if( mySeats.find(seat => (seat[0] === RowIndex && seat[1] === colIndex))){
            console.log('alreaady exists so change color to primary');
            AllSeats[RowIndex-1][colIndex-1] = 'btn-primary';

            let indexOfSeat = mySeats.indexOf(mySeats.find(seat =>
                 (seat[0] === RowIndex && seat[1] === colIndex)));

            setMySeats(mySeats.splice(indexOfSeat,1));
            return true;
        } else {

            setMySeats(mySeats.push([RowIndex,colIndex]));
            AllSeats[RowIndex-1][colIndex-1] = 'btn-dark';

            //--------Allow max 5 to be booked---------//
            //----We remove the first added element-------//
            if(mySeats.length > 5 ){
                console.log(mySeats)
               let last = mySeats.splice(0,1);
                console.log('last', last);
                AllSeats[last[0][0]-1][last[0][1]-1] = 'btn-primary';
                //console.log(this.state)
                return true;
            }
            console.log(colIndex, RowIndex)
            console.log('mySeats', mySeats)
            return true;
        }

    }

    //-----------TODO---------//
    function SubmitReservation(e){
        const http= new XMLHttpRequest();
        const url="http://localhost/res_seats.php";
        http.open("POST", url, true);
        http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        http.onreadystatechange
                                = function(){
                                    if(this.readyState == 4 && this.status == 200){
                                        if (this.responseText.includes("Error")){
                                            alert(this.responseText);
                                        }
                                        else {
                                            alert("Tickets purchase is complete!");
                                        } 
                                    }
                                };
        console.log(mySeats);
        console.log(props.selectedMovie[0])
        http.send("movie_name=" + props.selectedMovie[0] + "&movie_time=" + props.selectedMovieDateTime + "&seats=" + JSON.stringify(mySeats));
        // alert(ticketNum)
        props.history.push("/movies");
    }
    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6'>
                    <h4 className='badge badge-info p-2 col-md-4'>Max seats: {5 - mySeats.length}</h4>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-12'>
                    <table className="table">
                        <thead></thead>
                        {/* -----convert each array element into ------- */}
                        {/* ----------map throw each element in 2d array we created--------*/}
                        <tbody>
                            {AllSeats.map((row, RowIndex) => {
                                return (<tr key={RowIndex}>
                                    {row.map((col, ColIndex) =>
                                        // storing our seatNumber With indxes I don not understand binding
                                        <td key={ColIndex}><button onClick={(e) =>
                                            Reserve(e, ColIndex + 1, RowIndex + 1)}
                                            /* ------check if our seat is reserved or not----- */
                                            /* ----------TODO convert bt-danger && btn-primary into variable string */
                                            className={"btn  btn-block " + AllSeats[RowIndex][ColIndex]} 
                                            value={index}>
                                            {index++}</button></td>
                                    )}
                                </tr>);
                            }
                            )}
                        </tbody>

                    </table>
                    <div className='text-center mb-5'>
                        <button className='btn btn-success btn-lg' onClick={ (e) => SubmitReservation(e)}>Get your ticket</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
