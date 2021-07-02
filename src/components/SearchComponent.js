import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import OptionComponent from "./OptionComponent"

const SearchComponent = () => {
	const history = useHistory()

	const [genres, setGenres] = useState([])
	const [languages, setLanguages] = useState([
		{ id: "", name: "All languages" },
		{ id: "en", name: "English" },
		{ id: "fr", name: "French" },
		{ id: "de", name: "German" },
		{ id: "es", name: "Spanish" },
		{ id: "it", name: "Italian" },
		{ id: "ru", name: "Russian" },
		{ id: "ja", name: "Japanese" }
	])

	useEffect(() => {
		fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=379499551351838f483ae37443d12e74")
			.then((res) => res.json())
			.then((data) => {
				let genresArr = [{ id: -1, name: "All genres" }]
				genresArr = genresArr.concat(data.genres)
				setGenres(genresArr)
			})
	}, [])

	const getKeywordsIds = async (keywords) => {
		let keywordIds = []
		keywords.forEach((k) => {
			fetch(`https://api.themoviedb.org/3/search/keyword?api_key=379499551351838f483ae37443d12e74&query=${k}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.results) {
						data.results.forEach((r) => {
							if (r.name === k) {
								// setKeywordIds([...keywordsIds, r.id])
								// console.log(r)
								keywordIds.push(r.id)
							}
						})
					}
				})
		})
		console.log(keywordIds)
		return keywordIds
	}

	const searchMovies = async (e) => {
		e.preventDefault()
		const genre = e.target.genre.value
		const language = e.target.language.value
		const keywords = e.target.keyword.value.split(" ").filter((word) => word !== "")

		let keywordIds = await getKeywordsIds(keywords)
		// keywords.forEach((k) => {
		// 	fetch(`https://api.themoviedb.org/3/search/keyword?api_key=379499551351838f483ae37443d12e74&query=${k}`)
		// 		// .then((res) => res.json())
		// 		.then((res) => {
		// 			if (res.data.results) {
		// 				res.data.results.forEach((r) => {
		// 					if (r.name === k) {
		// 						// setKeywordIds([...keywordsIds, r.id])
		// 						// console.log(r)
		// 						keywordIds.push(r.id)
		// 					}
		// 				})
		// 			}
		// 		})
		// })

		console.log(keywordIds)

		// window.location.search = `?keyword=${keywordIdsString}&genre=${genre}&language=${language}`
		// window.location.pathname = ""
	}

	return (
		<form id="search-form" className="search" onSubmit={(e) => searchMovies(e)}>
			<input className="search-input" placeholder="Movie title..." type="text" name="keyword" id="keyword" autoComplete="off" />

			<div className="search-group-select">
				<select className="search-select" name="genre" id="genre">
					{genres.map((genre) => (
						<OptionComponent key={genre.id} value={genre} />
					))}
				</select>
				<select className="search-select" name="language" id="language">
					{languages.map((language) => (
						<OptionComponent key={language.id} value={language} />
					))}
				</select>
			</div>
			<button type="submit">Search</button>
		</form>
	)
}

export default SearchComponent
