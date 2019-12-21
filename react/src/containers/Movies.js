import React, { useState, useEffect } from 'react';
import ViewMoviesTable from "./viewMoviesTable";
import { getMovies } from "./movieService";
import './Movies.css';

export default function Movies(props) {

    // instead of getMovies http request should return movies list
    const [currentMovies, setMovies] = useState([[]]);    

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
		setMovies(currentMovies);
    }, [currentMovies]);

    function handleSelection(movie, screeninglist) {
        props.setSelectedMovie(movie);
        var screening = screeninglist.split('/')[0];
        props.setSelectedMovieDateTime(screening);
        props.history.push("/seatstest");
    };
    
    const { length: count } = currentMovies;

    if (count === 0) return <p>No movies in the database!</p>;
    return ( 
        <div className="row">
        <div className="col">
          <p>Showing {count} movies in the database.</p>

          <ViewMoviesTable className = "mtable"
            movies={currentMovies}
            onSelect = {handleSelection}
          />
        </div>
      </div>
    );
}
