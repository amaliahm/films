import { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

const API_URL = "http://www.omdbapi.com?apikey=136a7ae0"

const App = () => {

  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')

  const search_movies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
  }

  useEffect(() => {
    search_movies('Spiderman')
  }, [])  
  
  return (
    <div className='app'>
      <h1>MovieLand</h1>
      <div className='search'>
        <input 
          placeholder='search for movies'
          value={search}
          onChange={(e) => setSearch(e.target.value)}/>
        <img 
          src={SearchIcon}
          alt='search'
          onClick={() => search_movies(search)}/>
      </div>
      {movies.length > 0 ?
        (<div className='container'>
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
          </div>)
        : (<div className='empty'>
          <h2>no movies found</h2>
        </div>)}
    </div>
  );
}

export default App;
