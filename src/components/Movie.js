import React from 'react'


const Movie = ({ movie }) => {

    let backImagePath = movie.poster_path !== null ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
    // const backImage = async() => {
    //     fetch(backImagePath)
    //         .then((res) => {
    //             if(!res.ok) {
    //                 console.log("not ok")
    //                 backImagePath = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"
    //             } 
    //             else {
    //                 console.log("ok")
    //             }
    //         })
    // }

    // document.addEventListener("DOMContentLoaded", backImage())

    const parentMovieStyle = {
        flexBasis: "20%",
        height: "45vh",
        position: "relative",
        // textAlign: "center",
        marginBottom: "30px"
    }

    const movieStyle = {
        backgroundImage: `url("${backImagePath}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        margin: "0 auto",
        height: "90%",
        width: "85%",
        border: "3px solid #000",
        borderRadius: "20px",
    }

    const pMovieStyle = {
        width: "85%",
        margin: "0 auto",
        // position: "absolute",
        // bottom: "0",
    }

    const pMovieNameStyle = {
        fontSize: "20px",
        margin: "0"
    }

    const pMovieYearStyle = {
        fontSize: "14px",
        margin: "5px 0 0"
    }

    return (
        <div style={parentMovieStyle}>
            <div style={movieStyle}></div>
            <div style={pMovieStyle}>
                <p style={pMovieNameStyle}>{movie.original_title.length > 18 ? movie.original_title.substring(0,18)+'...' : movie.original_title}</p>
                <p style={pMovieYearStyle}>{movie.release_date.substring(0,4)}</p>
            </div>
        </div>
    )

}



export default Movie
