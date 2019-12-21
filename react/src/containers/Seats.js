import React, { Component } from "react";

export default class Seats extends Component {

    index = 1;
    AllSeats = [];

    rows ; 
    cols ;
    reservedSeats = [[]];

    constructor(props) {

        super(props);
        var screen_info = [[]]
        var instance = this;
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
                                            screen_info = JSON.parse(this.responseText);
                                            console.log(screen_info)
                                            instance.prepareSeats(screen_info);
                                            instance.getReservedSeats(instance);
                                        } 
                                    }
                                };
        var op = "get_screen";
        console.log(this.props.selectedMovie[2])
        http.send("op="+ op + "&screen=" + this.props.selectedMovie[2]);
    
        this.state = {
            AllSeats : this.AllSeats,
            reservedSeats : this.reservedSeats,
            Myseats : []
        }
    }
    getReservedSeats(instance){
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
                                            instance.reservedSeats = JSON.parse(this.responseText);
                                            console.log(instance.reservedSeats)
                                            instance.prepareReservedSeats();
                                        }  
                                    }
                                };
        var op = "get_res";
        console.log(this.props.selectedMovie[0] +  this.props.selectedMovieDateTime)
        httpres.send("op=" + op + "&movie_name=" + this.props.selectedMovie[0] + "&movie_time=" + this.props.selectedMovieDateTime);
    }
    prepareSeats(screen_info){
        this.rows = screen_info[0][1];
        this.cols = screen_info[0][2];
        console.log(this.rows + " " +  this.cols)
        for( let i = 0 ;i<this.rows;i++){
            var seatRow = new Array(parseInt(this.cols)).fill('btn-primary');
            this.AllSeats.push(seatRow);
        }
        this.index = 1;
        this.setState({
            AllSeats : this.AllSeats,
        });
    }
    prepareReservedSeats(){
        if (this.reservedSeats.length > 0)
            for(let i = 0; i<this.reservedSeats.length; i++){
                //console.log(this.reservedSeats.length)
                let resrvedRow = this.reservedSeats[i][0]
                let resrvedCol = this.reservedSeats[i][1]

                this.AllSeats[resrvedRow-1][resrvedCol-1] ='btn-danger';
            }
            this.index = 1;
            this.setState({
                AllSeats : this.AllSeats,
                reservedSeats : this.reservedSeats
            });
    }
    
    // when user clicks a button we take his col and row info and reserve it in database
    Reserve(e, colIndex, RowIndex) {

        this.index = 1;
        //1.1---------check if reserved before-------//
        if(this.state.reservedSeats.find(seat => (seat[0] == RowIndex && seat[1] == colIndex))){
            alert('It is reserved select anothe seat')
            return true;
        }


        //1.2---------check if seat exists in my reservation----if yes change color to primary 
        //--------------------and delete element from reservation--------------------//
        if(  this.state.Myseats.find(seat => (seat[0] === RowIndex && seat[1] === colIndex))){
            console.log('alreaady exists so change color to primary');
            this.AllSeats[RowIndex-1][colIndex-1] = 'btn-primary';

            let indexOfSeat = this.state.Myseats.indexOf(this.state.Myseats.find(seat =>
                 (seat[0] === RowIndex && seat[1] === colIndex)));

            this.state.Myseats.splice(indexOfSeat,1);
            this.setState({
                AllSeats : this.AllSeats
            });
            return true;
        } else {

            this.state.Myseats.push([RowIndex,colIndex]);
            this.AllSeats[RowIndex-1][colIndex-1] = 'btn-dark';

            //--------Allow max 5 to be booked---------//
            //----We remove the first added element-------//
            if(this.state.Myseats.length > 5 ){
                console.log(this.state.Myseats)
               let last = this.state.Myseats.splice(0,1);
                console.log('last', last);
                this.AllSeats[last[0][0]-1][last[0][1]-1] = 'btn-primary';
                this.setState({
                    AllSeats : this.AllSeats
                });
                console.log(this.state)
                return true;
            }
            this.setState({
                AllSeats : this.AllSeats,
                Myseats : this.state.Myseats
            });
            console.log(colIndex, RowIndex)
            console.log('MySeats', this.state.Myseats)
            return true;
        }

    }

    //-----------TODO---------//
    SubmitReservation(e){
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
        console.log(this.state.Myseats);
        console.log(this.props.selectedMovie[0])
        http.send("movie_name=" + this.props.selectedMovie[0] + "&movie_time=" + this.props.selectedMovieDateTime + "&seats=" + JSON.stringify(this.state.Myseats));
        // alert(ticketNum)
        this.props.history.push("/movies");
    }


    render() {

        return (
            <div className='container mt-5'>
                <div> {this.props.selectedMovie[0]}</div>
                <div> {this.props.selectedMovieDateTime}</div>
                <div className='row'>
                    <div className='col-md-6'>
                        <h4 className='badge badge-info p-2 col-md-4'>Max seats: {5 - this.state.Myseats.length}</h4>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <table className="table">
                            <thead></thead>
                            {/* -----convert each array element into ------- */}
                            {/* ----------map throw each element in 2d array we created--------*/}
                            <tbody>
                                {this.state.AllSeats.map((row, RowIndex) => {
                                    return (<tr key={RowIndex}>
                                        {row.map((col, ColIndex) =>
                                            // storing our seatNumber With indxes I don not understand binding
                                            <td key={ColIndex}><button onClick={(e) =>
                                                this.Reserve(e, ColIndex + 1, RowIndex + 1)}
                                                /* ------check if our seat is reserved or not----- */
                                                /* ----------TODO convert bt-danger && btn-primary into variable string */
                                                className={"btn  btn-block " + this.state.AllSeats[RowIndex][ColIndex]} 
                                                value={this.index}>
                                                {this.index++}</button></td>
                                        )}
                                    </tr>);
                                }
                                )}
                            </tbody>

                        </table>
                        <div className='text-center mb-5'>
                            <button className='btn btn-success btn-lg' onClick={ (e) => this.SubmitReservation(e)}>Get your ticket</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
