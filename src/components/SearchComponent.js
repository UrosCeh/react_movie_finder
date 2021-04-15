import React from 'react'
import Button from './Button'

const SearchComponent = () => {
    return (
        <div>
            <form action="">
                <input type="text" name="movie_keyword" id="movie_keyword"/>
                <Button text={'search'} /> 
            </form>
        </div>
    )
}

export default SearchComponent
