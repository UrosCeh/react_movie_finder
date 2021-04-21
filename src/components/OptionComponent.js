import React from "react"

const OptionComponent = ({ genre }) => {
	return <option value={genre.id}>{genre.name}</option>
}

export default OptionComponent
