import { useState } from 'react';
import './App.css';
import Button from "./components/Button"

function App() {

  const [movies, setMovies] = useState(["Movie 1", "Movie 2"])

  const fetchAllMovies = () => {
    // for (let i = 100; i<= 110; i++) {
    //   fetchMovie(i)
    // }
    fetchMovie(100)
  }

  const fetchMovie = async(id) => {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=379499551351838f483ae37443d12e74`)
    const data = await res.json()
    setMovies([...movies, data.original_title])
  }

  const displayMovies = () => {
    movies.forEach((movie) => {
      console.log(movie)
    })
  }

  return (
    <div>
      <Button text={'fetch'} onClick={fetchAllMovies}></Button>
      <Button text={'clg'} onClick={displayMovies}></Button>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
