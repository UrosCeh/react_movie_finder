import { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
// import Button from "./components/Button"
import Movies from "./components/Movies"
import SingleMovieComponent from "./components/SingleMovieComponent"
import SearchComponent from "./components/SearchComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"
import { faHeart, faUsers, faSearch } from "@fortawesome/free-solid-svg-icons"

library.add(faHeart, faUsers, faSearch)

function App() {
	const [movies, setMovies] = useState([])
	const [genres, setGenres] = useState([{ id: -1, name: "Select Genre" }])
	const [query, setQuery] = useState("pearl")

	const fetchGenres = async () => {
		const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=379499551351838f483ae37443d12e74")
		const data = await res.json()

		var genresArr = [{ id: -1, name: "Select Genre" }]
		genresArr = genresArr.concat(data.genres)

		setGenres(genresArr)
		// return data.genres
	}

	document.addEventListener("DOMContentLoaded", fetchGenres)

	useEffect(() => {})

	const fetchMovie = async () => {
		const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=379499551351838f483ae37443d12e74&query=${query}`)
		const data = await res.json()

		const pageNumber = data.total_pages

		let allMovies = []

		for (let page = 1; page <= pageNumber; page++) {
			let resPage = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=379499551351838f483ae37443d12e74&query=${query}&page=${page}`
			)
			let dataPage = await resPage.json()

			// console.log( page, dataPage.results )

			// allMovies.concat(dataPage.results)

			// allMovies = dataPage.results

			dataPage.results.forEach((result) => {
				allMovies.push(result)
			})
			// console.log(allMovies) radi
		}
		// console.log(allMovies) radi
		return allMovies
		// setMovies(allMovies)
	}

	const setFetchedMovies = async () => {
		const fetchedMovies = await fetchMovie()
		// const languages = ["sr", "en", "fr", "es", "ca", "it", "de"]
		const languages = ["en"]
		let filteredMovies = []

		console.log(fetchedMovies)

		fetchedMovies.forEach((movie) => {
			if (
				!movie.adult &&
				movie.release_date != null &&
				movie.poster_path != null &&
				movie.popularity > 2 &&
				movie.overview !== "" &&
				languages.includes(movie.original_language)
			) {
				filteredMovies.push(movie)
			}
		})

		console.log(filteredMovies)

		setMovies(filteredMovies)
	}

	// const displayMovies = () => {
	//   if (movies.length === 0) {
	//     console.log("no")
	//   }
	//   movies.forEach((movie) => {
	//     console.log(movie)
	//   })
	// }

	// document.addEventListener("onload", fetchAllMovies)
	// document.addEventListener("onload", displayMovies())

	return (
		<div>
			<Router>
				{/* <Button text={'search'} onClick={() => setShowSearch(!showSearch)} /> */}
				{/* <Button text={"clg"} onClick={fetchGenres} /> */}
				{/* <Button text={"fetch"} onClick={setFetchedMovies} /> */}
				<Switch>
					<Route path="/" exact>
						<SearchComponent setQuery={setQuery} setFetchedMovies={setFetchedMovies} genres={genres} />
						{movies.length > 0 ? <Movies movies={movies} /> : "No movies"}
					</Route>
				</Switch>
				<Switch>
					<Route path={`/:id`} exact component={SingleMovieComponent}>
						{/* <SearchComponent setQuery={setQuery} setFetchedMovies={setFetchedMovies} genres={genres} /> */}
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
