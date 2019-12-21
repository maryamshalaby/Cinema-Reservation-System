import React from "react";


const ViewMoviesTable = props => {
    const {movies, onSelect} = props;

    return (
        <table className="table">
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
                    <td onClick={() => onSelect(movie, movie[4])} style={{ cursor: "pointer" }}>{movie[4]}</td> 
                    <br/>
                    <br/>
                </tr>
                ))}
            </tbody>
        </table>
    );
};
export default ViewMoviesTable