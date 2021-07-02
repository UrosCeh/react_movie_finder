import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const Movie = ({ movie }) => {
	let backImagePath = movie.poster_path
		? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
		: "http://www.newdesignfile.com/postpic/2015/02/no-icon-available_68024.png"

	const imageStyle = {
		backgroundImage: `url(${backImagePath})`,
		backgroundRepeat: "no-repeat",
		backgroundSize: movie.poster_path ? "cover" : "100% 100%"
	}

	return (
		<div className={"single-movie"}>
			<div className="single-movie-image" style={imageStyle}></div>
			<div className={"single-movie-text"}>
				<h3>{movie.title}</h3>
				<p>{movie.release_date ? movie.release_date.substring(0, 4) : "Unknown"}</p>
			</div>
			<div className="single-movie-overview">
				<div className="single-movie-overview-cover"></div>
				<Link to={`/movie/${movie.id}`}>View Details</Link>
				{/* <Link onClick={openMoviePage}>View Details</Link> */}
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
