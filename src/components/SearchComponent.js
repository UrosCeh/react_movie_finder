import React, { useCallback } from "react"
import Button from "./Button"
import OptionComponent from "./OptionComponent"

const SearchComponent = ({ setQuery, setFetchedMovies, genres }) => {
	const handleInputChange = useCallback(
		(event) => {
			setQuery(event.target.value)
		},
		[setQuery]
	)

	return (
		<div className="search">
			{/* <label htmlFor=""></label> */}
			<div className="search-group">
				<input
					className="search-input"
					placeholder="movie name..."
					type="text"
					name="movie_keyword"
					id="movie_keyword"
					onChange={handleInputChange}
					autoComplete="off"
				/>

				<div className="search-group-select">
					<label htmlFor="genre">Genre</label>
					<select className="search-field" name="genre" id="genre">
						{genres.map((genre) => (
							<OptionComponent key={genre.id} genre={genre} />
						))}
					</select>
				</div>
			</div>

			<Button text={"Search"} onClick={setFetchedMovies} />

			{/* <p>Query is: {query}</p> */}
			{/* </form> */}
		</div>
	)
}

export default SearchComponent
