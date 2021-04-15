import React from 'react'
import Movie from './Movie'

const Movies = ({ movies }) => {
    const moviesStyle = {
        display: "flex",
        width: "80vw",
        // justifyContent: "center",
        margin: "0 auto",
        height: "100vh",
        flexFlow: "row wrap"
    }

    return (
        <div style={moviesStyle}>
            {
                movies.map((movie) => 
                    <Movie key={movie.id} movie={movie} />
                )
            }
        </div>
    )
}

export default Movies
