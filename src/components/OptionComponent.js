import React from "react"

const OptionComponent = ({ value }) => {
	return <option value={value.id}>{value.name}</option>
}

export default OptionComponent
