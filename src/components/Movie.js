import React from 'react'


const Movie = ({ movie }) => {

    let backImagePath = movie.poster_path !== null ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"

    // const parentMovieStyle = {
    //     flexBasis: "20%",
    //     height: "350px",
    //     position: "relative",
    //     // textAlign: "center",
    //     marginBottom: "30px"
    // }

    const imageStyle = {
        backgroundImage: `url("${backImagePath}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
    }

    return (
        <div className={"single-movie"}>
            <div style={imageStyle} className="single-movie-image"></div>
            <div className={"single-movie-text"}>
                <h3>{movie.original_title.length > 15 ? movie.original_title.substring(0,15)+'...' : movie.original_title}</h3>
                <p>{movie.release_date.substring(0,4)}</p>
            </div>
        </div>
    )

}



export default Movie
