import React, { useEffect, useState } from "react"
import Movie from "./Movie"
import ReactLoading from "react-loading"

const Movies = () => {
	const query = () => {
		const q = window.location.search
		// q === "" ? console.log("prazan") : console.log("ima nesto")
		if (q === "")
			return {
				keyword: "",
				genre: "",
				language: ""
			}
		let k = q.split("?keyword=")
		k = k[1].split("&genre=")
		let key = k[0]
		let g = k[1].split("&language=")
		let gen = g[0] === "-1" ? "" : g[0]
		let lan = g[1]
		return {
			keyword: key,
			genre: gen,
			language: lan
		}
	}
	const [movies, setMovies] = useState([])

	const [page, setPage] = useState(1)
	const [done, setDone] = useState(false)
	const [lastPage, setLastPage] = useState(false)
	const keyword = query().keyword
	const genre = query().genre
	const language = query().language

	const [mp, setMp] = useState(1)
	const [mi, setMi] = useState(0)

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=${genre}&with_original_language=${language}&api_key=379499551351838f483ae37443d12e74`
		)
			.then((res) => res.json())
			.then((data) => getMovies(data.total_pages))
	}, [page])

	const getMovies = async (totalPages) => {
		let append = !(movies.length === 0)
		let added = 0

		for (let p = mp; p <= totalPages; p++) {
			const res = await fetch(
				`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres=${genre}&with_original_language=${language}&page=${p}&api_key=379499551351838f483ae37443d12e74`
			)
			const data = await res.json()

			for (let i = mi; i < data.results.length; i++) {
				let movie = data.results[i]
				if (movie.title.toLowerCase().includes(keyword) || movie.original_title.toLowerCase().includes(keyword)) {
					if (!append) {
						setMovies([movie])
						added++
						append = true
					} else {
						setMovies((prevMovies) => [...prevMovies, movie])
						added++
					}
				}
				if (added >= 20) {
					console.log("veca je")
					setDone(true)
					setMi(i === data.results.length - 1 ? 0 : i + 1)
					setMp(i === data.results.length - 1 ? p + 1 : p)
					setDone(true)
					return
				}
			}
		}
		setLastPage(true)
		setDone(true)
	}

	return (
		<div className="container">
			<div className={"all-movies"}>
				{movies.map((movie) => (
					<Movie key={movie.id} movie={movie} />
				))}
				{!done && <ReactLoading className="done" type={"spin"} color={"#fff"} height={"250px"} width={"250px"} />}
			</div>

			{!lastPage && ( //daj promenljivu nesto kao imaJosStranica...
				<div className="pagination">
					<button onClick={() => setPage(page + 1)}>Show More</button>
				</div>
			)}
		</div>
	)
}

export default Movies
