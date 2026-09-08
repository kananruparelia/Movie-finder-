import { useState } from 'react'
import './App.css'
import Results from "./Resultspage";
const API_KEY = import.meta.env.VITE_API_KEY;
function App() {
    const [showResults, setShowResults] = useState(false);
    const [movieName, setMovieName] = useState("");
    const [movies, setMovies] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const addToWatchlist = (movie) => {
  const alreadyExists = watchlist.some(
    (item) => item.imdbID === movie.imdbID
  );
  if (!alreadyExists) {
    setWatchlist([...watchlist, movie]);
  }
};
    const remove = (imdbID) => {const updated = watchlist.filter(
    (movie) => movie.imdbID !== imdbID
  );
setWatchlist(updated);
};
    const searchMovie = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&s=${movieName}`
    );
    
    const data = await response.json();
    console.log(data);
   setMovies(data.Search || []);
    setShowResults(true);
  };
    if (showResults) {
  return <Results movies={movies} movieName={movieName}
          back={() => setShowResults(false)} addToWatchlist={addToWatchlist}
          />;
    }
    return (
    <div className ="app">
      <div className="Hero">
        <h1>Movie <span>Finder</span></h1>
        <p className="p">Find your favorite movies instantly</p>
      </div>
      <div className="search">
          <input type="text"
           className="text" 
            value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
           placeholder="Search here to discover movies"
          />
         <button className="search-btn"
            onClick={searchMovie}
          >Search</button>
      </div>
      
      <div className="My-watchlist"><h2>My Watchlist</h2>
      <div className="watchlist-container">
      {watchlist.map((movie) => (
    <div className="movie-card" key={movie.imdbID}>
      <img src={movie.Poster} alt={movie.Title} />
      <h2>{movie.Title}</h2>
      <p>{movie.Year}</p>
      <button className="remove-btn"
  onClick={() => remove(movie.imdbID)}> Remove</button>
    </div>
    
  ))}
  </div>
  </div>
     </div>
  
      );
    
}
export default App
