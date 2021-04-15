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

    const movieStyle = {
        backgroundImage: `url("${backImagePath}")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        flexBasis: "20%"
        // background-repeat: no-repeat;
        // background-size: cover;
        // flex-grow: 1;
    }

    return (
        <div style={movieStyle}>
            <p>{movie.original_title}</p>
        </div>
    )

}



export default Movie
