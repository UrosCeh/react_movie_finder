import { useState, useEffect } from 'react';
import './App.css';
import Button from "./components/Button"
import Movies from './components/Movies';
import SearchComponent from './components/SearchComponent';

function App() {

  const [movies, setMovies] = useState([])

  const [showSearch, setShowSearch] = useState(false)
  // const recommendedMovies = [100, 101, 500, 550]

  useEffect(() => {


  })

  // const fetchAllMovies = async() => {
  //   recommendedMovies.forEach((movie) => {
  //     // console.log("running" + movie)
  //     const data = fetchMovie(movie)

  //     setMovies([...movies, data])
  //   })
    
  // }

  const fetchMovie = async() => {
    // fetch(`https://api.themoviedb.org/3/movie/2121212121?api_key=379499551351838f483ae37443d12e74`)
    //   .then((res) => {
    //     if (!res.ok) {
    //       console.log("error")
    //       return
    //     }
    //     res.json()
    //   })
    //   .then((data) => {
    //     console.log("data: " + data)
    //   })
    // const data = await res.json()

    // console.log(data)

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=379499551351838f483ae37443d12e74&query=locked`)
    const data = await res.json()

    const pageNumber = data.total_pages

    let allMovies = []

    for (let page = 1; page <= pageNumber; page++) {
      let resPage = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=379499551351838f483ae37443d12e74&query=locked&page=${page}`)
      let dataPage = await resPage.json()

      // console.log( page, dataPage.results )
      
      // allMovies.concat(dataPage.results)

      // allMovies = dataPage.results

      dataPage.results.forEach((result) => {
        allMovies.push(result)
      })
      // console.log(allMovies) radi
    }
    // console.log(allMovies) radi
    return allMovies
    // setMovies(allMovies)
  }

  const setFetchedMovies = async() => {
    const fetchedMovies = await fetchMovie()

    console.log(fetchedMovies)

    setMovies(fetchedMovies)

  }

  // const displayMovies = () => {
  //   if (movies.length === 0) {
  //     console.log("no")
  //   }
  //   movies.forEach((movie) => {
  //     console.log(movie)
  //   })
  // }

  // document.addEventListener("onload", fetchAllMovies)
  // document.addEventListener("onload", displayMovies())

  return (
    <div>
      <Button text={'search'} onClick={() => setShowSearch(!showSearch)} />
      {/* <Button text={'clg'} onClick={displayMovies} /> */}
      <Button text={'fetch'} onClick={setFetchedMovies} />
      { showSearch && <SearchComponent /> }
      { movies.length > 0 ? <Movies movies={movies} /> : "No movies" }
      {/* { movies.length > 0 ? "has movies" : "No movies" } */}
    </div>
  );
}

export default App;
