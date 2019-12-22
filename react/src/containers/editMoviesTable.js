import React, { useState } from "react";
import DatePicker from "react-16-bootstrap-date-picker";


const EditMoviesTable = props => {
    const {movies, screenings} = props;
    if (screenings.length == 0)
        return ( <div/> )
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
                <td>{screenings[index].map((screening , screeningIndex) => (
                        <div key = {screeningIndex}>
                            <div>
                                {screening}
                            </div>
                            <hr/>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary btn-sm addButton"> Add Screening </button>
                </td>
                <br/>
            </tr>
            ))}
        </tbody>
        </table>
    );
};
export default EditMoviesTable