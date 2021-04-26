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
	}

	document.addEventListener("DOMContentLoaded", fetchMovie)

	return (
		<div>
			<h1></h1>
		</div>
	)
}

export default SingleMovieComponent
