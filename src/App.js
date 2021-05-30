import { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import Movies from "./components/Movies"
import SingleMovieComponent from "./components/SingleMovieComponent"
import SearchComponent from "./components/SearchComponent"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faHeart, faUsers, faSearch, faStar } from "@fortawesome/free-solid-svg-icons"

library.add(faHeart, faUsers, faSearch, faStar)

function App() {
	const [query, setQuery] = useState()
	const [movies, setMovies] = useState([])
	const [genres, setGenres] = useState([])
	const [languages, setLanguages] = useState([
		{ id: "", name: "All Languages" },
		{ id: "en", name: "English" },
		{ id: "fr", name: "French" },
		{ id: "de", name: "German" },
		{ id: "es", name: "Spanish" },
		{ id: "it", name: "Italian" },
		{ id: "ru", name: "Russian" },
		{ id: "ja", name: "Japanese" }
	])
	const [page, setPage] = useState(1)

	useEffect(() => {
		fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=379499551351838f483ae37443d12e74")
			.then((res) => res.json())
			.then((data) => {
				let genresArr = [{ id: -1, name: "Select Genre" }]
				genresArr = genresArr.concat(data.genres)
				setGenres(genresArr)
			})
		console.log(query)
	}, [])

	useEffect(() => {
		if (query === undefined || query === "") {
			fetch("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=379499551351838f483ae37443d12e74")
				.then((res) => res.json())
				.then((data) => setMovies(data.results))
		} else {
			fetch(`https://api.themoviedb.org/3/search/movie?api_key=379499551351838f483ae37443d12e74&query=${query}&page=${page}`)
				.then((res) => res.json())
				.then((data) => setFetchedMovies(data))
		}
	}, [query])

	const setFetchedMovies = async (data) => {
		const pageNumber = data.total_pages

		let allMovies = []

		for (let page = 1; page <= pageNumber; page++) {
			let resPage = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=379499551351838f483ae37443d12e74&query=${query}&page=${page}`
			)
			let dataPage = await resPage.json()

			dataPage.results.forEach((result) => {
				allMovies.push(result)
			})
		}
		filterMovies(allMovies)
	}

	const filterMovies = (movies) => {
		let filteredMovies = []

		movies.forEach((movie) => {
			if (movie.release_date != null && movie.poster_path != null && movie.popularity > 2 && movie.overview !== "") {
				// let sg = document.getElementById("genre").value
				// let sl = document.getElementById("language").value
				// let bg, bl

				// const genreIds = movie.genres.map((genre) => genre.id)

				// console.log(movie.production_countries)
				// bg = sg === -1 ||
				// bl = sl === "" || sl === movie.original_language
				// console.log(bl)

				filteredMovies.push(movie)
			}
		})

		setMovies(filteredMovies)
	}

	return (
		<div>
			<SearchComponent setQuery={setQuery} genres={genres} languages={languages} />

			<Router>
				<Switch>
					<Route path="/" exact>
						{movies.length > 0 ? <Movies movies={movies} /> : "No movies"}
					</Route>
				</Switch>
				<Switch>
					<Route path={`/:id`} exact>
						<SingleMovieComponent />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
