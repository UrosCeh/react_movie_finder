import React, { useEffect, useState } from "react"
import Button from "./Button"
import OptionComponent from "./OptionComponent"

const SearchComponent = () => {
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

	useEffect(() => {
		fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=379499551351838f483ae37443d12e74")
			.then((res) => res.json())
			.then((data) => {
				let genresArr = [{ id: -1, name: "Select Genre" }]
				genresArr = genresArr.concat(data.genres)
				setGenres(genresArr)
			})
	}, [])

	return (
		<form className="search">
			<input className="search-input" placeholder="movie name..." type="text" name="keyword" id="keyword" autoComplete="off" />

			<div className="search-group-select">
				<select className="search-field" name="genre" id="genre">
					{genres.map((genre) => (
						<OptionComponent key={genre.id} value={genre} />
					))}
				</select>
				<select className="search-field" name="language" id="language">
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
