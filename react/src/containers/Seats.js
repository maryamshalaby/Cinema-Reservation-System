import React, { useState, useEffect } from 'react';

// Login component render contact form
export default function Seats(props) {
    var index = 1;
    var rows, cols ; 
    var screenInfo = [];
    const [AllSeats, setAllSeats] = useState([]);
    const [reservedSeats, setReservedSeats] = useState([[]]);
    const [mySeats, setMySeats] = useState([]);

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
                                        screenInfo = JSON.parse(this.responseText);
                                        if (AllSeats.length == 0)
                                            prepareSeats(screenInfo);
                                    } 
                                }
                            };
    var op = "get_screen";
    //console.log(props.selectedMovie[2])
    http.send("op="+ op + "&screen=" + props.selectedMovie[2]);

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
                                        setReservedSeats(JSON.parse(this.responseText));
                                    }  
                                }
                            };
    var op = "get_res";
    // console.log(props.selectedMovie[0] +  props.selectedMovieDateTime)
    httpres.send("op=" + op + "&movie_name=" + props.selectedMovie[0] + "&movie_time=" + props.selectedMovieDateTime);

    useEffect(() => {
        if (reservedSeats.length > 0 && reservedSeats[0].length > 0){
            prepareReservedSeats();
        }
    }, [reservedSeats]);

    useEffect(() => {
        if(mySeats.length > 5 ){
            var seats = mySeats.slice();
            let last = seats.splice(0,1);
            setMySeats(seats)
            console.log('last', last);
            seats = AllSeats.slice();
            seats[last[0][0]-1][last[0][1]-1] = 'btn-primary';
            setAllSeats(seats);
        }
    }, [mySeats]);

    function prepareSeats(screen_info){
        rows = screen_info[0][1];
        cols = screen_info[0][2];
        // console.log(rows + " " +  cols)
        var seats = []
        for( let i = 0 ;i<rows;i++){
            var seatRow = new Array(parseInt(cols)).fill('btn-primary');
            seats.push(seatRow);
        }
        setAllSeats(seats);
        index = 1;
    }
    function prepareReservedSeats(){
        if (reservedSeats.length > 0 && AllSeats.length > 0){
            var seats = AllSeats.slice();
            for(let i = 0; i<reservedSeats.length; i++){
                //console.log(this.reservedSeats.length)
                let resrvedRow = reservedSeats[i][0]
                let resrvedCol = reservedSeats[i][1]
                seats[resrvedRow-1][resrvedCol-1] ='btn-danger';
            }
            setAllSeats(seats);
            index = 1;
        }
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
        var seats = mySeats.slice();
        if( seats.find(seat => (seat[0] === RowIndex && seat[1] === colIndex))){
            console.log('alreaady exists so change color to primary');
            seats = AllSeats.slice();
            seats[RowIndex-1][colIndex-1] = 'btn-primary';
            setAllSeats(seats);

            let indexOfSeat = mySeats.indexOf(mySeats.find(seat =>
                 (seat[0] === RowIndex && seat[1] === colIndex)));
            
            seats = mySeats.slice();
            seats.splice(indexOfSeat,1);
            setMySeats(seats);
            return true;
        } else {
            seats = mySeats.slice();
            seats.push([RowIndex,colIndex])
            console.log(seats)
            setMySeats(seats);
            //console.log(mySeats)
            seats = AllSeats.slice();
            seats[RowIndex-1][colIndex-1] = 'btn-dark';
            setAllSeats(seats)
            //--------Allow max 5 to be booked---------//
            //----We remove the first added element-------//
            console.log(colIndex, RowIndex)
            console.log('mySeats', mySeats)
            return true;
        }

    }

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
        props.history.push("/movies");
    }
    return (
        <div className='container mt-5'>
            <div> {props.selectedMovie[0]} </div>
            <div> {props.selectedMovieDateTime}</div>
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
