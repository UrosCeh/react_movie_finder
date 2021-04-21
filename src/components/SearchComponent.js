import React, { useCallback } from "react"
import OptionComponent from "./OptionComponent"

const SearchComponent = ({ query, onButtonClick, genres }) => {
	const handleInputChange = useCallback(
		(event) => {
			onButtonClick(event.target.value)
			// onButtonClick(document.getElementById("movie_keyword").value)
		},
		[onButtonClick]
	)

	return (
		<div>
			{/* <form action=""> */}
			<input type="text" name="movie_keyword" id="movie_keyword" onChange={handleInputChange} />
			<select name="genre" id="genre">
				{genres.map((genre) => (
					<OptionComponent key={genre.id} genre={genre} />
				))}
				{/* {genres.map((genre) => (
					<OptionComponent key={genre.id} value={genre} />
				))} */}
			</select>
			<p>Query is: {query}</p>
			{/* </form> */}
		</div>
	)
}

export default SearchComponent
