import React from 'react'
import Movie from './Movie'

const Movies = ({ movies }) => {
    const moviesStyle = {
        display: "flex",
        // width: "85%",
        maxWidth: "1200px",
        // justifyContent: "center",
        // minHeight: "300vh",
        margin: "0 auto",
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
