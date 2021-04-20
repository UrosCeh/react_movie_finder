import React, { useCallback } from 'react'
import Button from './Button'

const SearchComponent = ({ query, onButtonClick }) => {

    const handleInputChange = useCallback(event => {
        onButtonClick(document.getElementById('movie_keyword').value)
      }, [onButtonClick])
    

    return (
        <div>
            <form action="">
                <input type="text" name="movie_keyword" id="movie_keyword"/>
                <Button text={'search'} onClick={handleInputChange} /> 
                <p>Query is: { query }</p>
            </form>
        </div>
    )
}

export default SearchComponent
