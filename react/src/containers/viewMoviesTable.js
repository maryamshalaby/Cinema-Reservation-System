import React from "react";


const ViewMoviesTable = props => {
    const {movies, screenings, onSelect} = props;
    //console.log(screenings.length);
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
                    <td> {
                        screenings[index].map((screening , screeningIndex) => (
                        <div key = {screeningIndex} onClick={() => onSelect(movie, screening)} style={{ cursor: "pointer" }}>
                            <div>
                                {screening}
                            </div>
                            <hr/>
                        </div>
                        ))}
                    </td>
                    <br/>
                    <br/>
                </tr>
                ))}
            </tbody>
        </table>
    );
};
export default ViewMoviesTable