import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Movie = ({ movie }) => {
	let backImagePath =
		movie.poster_path !== null
			? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
			: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png"

	const imageStyle = {
		backgroundImage: `url(${backImagePath})`,
		backgroundRepeat: "no-repeat",
		backgroundSize: "100% 100%"
	}

	const openMoviePage = () => {
		window.location.pathname = `/${movie.id}`
	}

	return (
		<div className={"single-movie"}>
			<div className="single-movie-image" style={imageStyle}></div>
			<div className={"single-movie-text"}>
				<h3>{movie.title.length > 28 ? movie.title.substring(0, 26) + "..." : movie.original_title}</h3>
				<p>{movie.release_date.substring(0, 4)}</p>
			</div>
			<div className="single-movie-overview">
				<div className="single-movie-overview-cover"></div>
				<button onClick={openMoviePage}>View Details</button>
				<h5>
					<FontAwesomeIcon className="fas" icon={["fas", "star"]}></FontAwesomeIcon>
				</h5>
				<p>{movie.vote_average}/10</p>
				<h4>{movie.title}</h4>
			</div>
		</div>
	)
}

export default Movie
