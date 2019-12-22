import React, { useState, useEffect } from 'react';
import { getMovies } from "./movieService";
import './Admin.css';
import EditMoviesTable from './editMoviesTable';

export default function Admin(props) {

    // instead of getMovies http request should return movies list
    const [currentMovies, setMovies] = useState([[]]);    
    const [screenings, setScreenings] = useState([]);    

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
                                        setMovies(JSON.parse(this.responseText));
                                    }  
                                }
                              };
      var op = "get_movies"
      http.send("op="+ op);

    useEffect(() => {
        if(currentMovies[0].length != 0){
            var tempScreenings = []
            for (var i=0; i< currentMovies.length; i++)
                tempScreenings.push(currentMovies[i][4].split('/'));
            setScreenings(tempScreenings)
        }
    }, [currentMovies]);

    function AddMovie(){
        props.history.push("/addmovie");
    }
    
    const { length: count } = currentMovies;

    if (count === 0) return <p>No movies in the database!</p>;
    return ( 
        <div className="row">
            <div className="col">
                <button type="button" onClick = {AddMovie} className="btn btn-primary btn-lg btn-block addButton">Add Movie</button>
                <br/>
                <EditMoviesTable className = "mtable"
                    movies={currentMovies}
                    screenings = {screenings}
                />
            </div>
        </div>
    );
}
