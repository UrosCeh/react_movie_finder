import React from "react"
import { useState } from "react"

const SingleMovieComponent = ({ match }) => {
	const id = match.params.id
	const [movie, setMovie] = useState([])

	const fetchMovie = async () => {
		console.log(id)
		const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=379499551351838f483ae37443d12e74`)
		const data = await res.json()

		setMovie(data)
		// console.log(data.genres)
		data.genres.forEach((g) => {
			console.log(g)
		})
	}

	const [genres, setGenres] = useState("")

	const getGenres = () => {
		console.log(movie.genres)
		let genresTemp = ""
		movie.genres.forEach((genre) => {
			genresTemp += genre.name + "/"
		})

		setGenres(genresTemp)
	}

	document.addEventListener("DOMContentLoaded", fetchMovie)
	// document.addEventListener("DOMContentLoaded", getGenres)

	return (
		<div className={"container"}>
			<div className="movie component">
				<div className="movie-poster"></div>

				<div className="movie-text">
					<h1>{movie.original_title}</h1>
					<h4>{movie.release_date}</h4>
					<h4>{genres}</h4>
				</div>
			</div>
		</div>
	)
}

export default SingleMovieComponent
