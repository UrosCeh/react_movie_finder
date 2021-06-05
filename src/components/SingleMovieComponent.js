import React from "react"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useParams } from "react-router"

const SingleMovieComponent = () => {
	const id = useParams().id
	const [movie, setMovie] = useState({})
	const [video, setVideo] = useState()

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=379499551351838f483ae37443d12e74`)
			.then((res) => res.json())
			.then((data) => setMovieData(data))
	}, [])

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=379499551351838f483ae37443d12e74`)
			.then((res) => res.json())
			.then((data) => setVideo(`https://www.youtube.com/embed/${data.results.length > 0 ? data.results[0].key : "XMXEnMfDlzs"}`))
	}, [])

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=379499551351838f483ae37443d12e74`)
			.then((res) => res.json())
			.then((data) => setImagesComponent(data.backdrops.splice(0, 4)))
	}, [])
	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=379499551351838f483ae37443d12e74`)
			.then((res) => res.json())
			.then((data) => setCastComopnent(data.cast.splice(0, 10)))
	}, [])

	const setMovieData = (data) => {
		const movieObj = {
			title: data.title,
			original_title: data.original_title,
			tagline: data.tagline,
			genres: getGenres(data.genres),
			release_year: data.release_date.substring(0, 4),
			overview: data.overview,
			poster: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
			vote_average: data.vote_average,
			vote_count: data.vote_count,
			runtime: data.runtime
		}

		setMovie(movieObj)
	}

	const setImagesComponent = (images) => {
		if (images instanceof Array) {
			const imagesComponent = document.getElementById("images")
			imagesComponent.innerHTML = ""
			images.forEach((image, idx) => {
				const imageDiv = document.createElement("div")
				imageDiv.style = `background-image: url('https://image.tmdb.org/t/p/original${image.file_path}')`
				idx === 0 ? imageDiv.classList.add("img", "active") : imageDiv.classList.add("img")
				imageDiv.addEventListener("click", () => {
					removeAllActives()
					imageDiv.classList.add("active")
				})

				imagesComponent.appendChild(imageDiv)
			})
		}
	}

	const removeAllActives = () => {
		const imgs = document.querySelectorAll(".img")

		imgs.forEach((img) => {
			img.classList.remove("active")
		})
	}

	const setCastComopnent = (cast) => {
		if (cast instanceof Array) {
			const actors = document.getElementById("actors")
			cast.forEach((member) => {
				const actorImage = document.createElement("img")
				actorImage.classList.add("actor-image")
				actorImage.src = `https://image.tmdb.org/t/p/original${member.profile_path}`

				const actorName = document.createElement("span")
				actorName.innerText = `${member.name} as`
				const actorRole = document.createElement("p")
				actorRole.innerText = member.character

				const actorText = document.createElement("div")
				actorText.classList.add("actor-text")
				actorText.appendChild(actorName)
				actorText.appendChild(actorRole)

				const actor = document.createElement("div")
				actor.classList.add("actor")
				actor.appendChild(actorImage)
				actor.appendChild(actorText)

				actors.appendChild(actor)
			})
		}
	}

	const getGenres = (genres) => {
		if (genres instanceof Array) {
			let genresString = ""
			for (let i = 0; i < genres.length; i++) {
				genresString += genres[i].name
				if (i < genres.length - 1) {
					genresString += " / "
				}
			}
			return genresString
		} else {
			return "Unknown"
		}
	}

	return (
		<div className={"container"}>
			<div className="component" id="movie">
				<div className={"movie-image"}>
					<img src={movie.poster} alt="" />
				</div>

				<div className={"movie-text"}>
					<h1>{movie.original_title}</h1>
					<h4>{movie.release_year}</h4>
					<h4>{movie.genres}</h4>
					<p>{movie.overview}</p>

					<div className={"rating"}>
						<h4>
							<FontAwesomeIcon icon={["fas", "heart"]}></FontAwesomeIcon>
						</h4>
						<p>{movie.vote_average}</p>
					</div>
					<div className={"rating"}>
						<h4>
							<FontAwesomeIcon icon={["fas", "users"]}></FontAwesomeIcon>
						</h4>
						<p>{movie.vote_count}</p>
					</div>
				</div>
			</div>

			<div className="component" id="images"></div>

			<div className="component video-cast">
				<div id="video">
					<h4>Movie Trailer</h4>
					<iframe src={video} title={id}></iframe>
				</div>
				<div id="cast">
					<h4>Movie Cast</h4>
					<div id="actors"></div>
				</div>
			</div>
		</div>
	)
}

export default SingleMovieComponent
