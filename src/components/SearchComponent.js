import React, { useState, useCallback } from "react"
import Button from "./Button"
import OptionComponent from "./OptionComponent"

const SearchComponent = ({ setQuery, genres, languages }) => {
	// const [keyword, setKeyword] = useState("")

	// const handleInputChange = useCallback((event) => {
	// 	setKeyword(event.target.value)
	// }, [])

	const changeQuery = () => {
		let keyword = document.getElementById("movie_keyword").value
		// window.location.pathname = "/"
		setQuery(keyword)
	}

	// console.log(keyword)
	return (
		<div className="search">
			<input className="search-input" placeholder="movie name..." type="text" name="movie_keyword" id="movie_keyword" autoComplete="off" />

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
			<Button text={"Search"} onClick={changeQuery} />
		</div>
	)
}

export default SearchComponent
