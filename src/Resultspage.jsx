import './Resultspage.css'
function Results({ movies,movieName,back,addToWatchlist}) {
    return (
        <div>
             <div className="nav-bar">
            <button className="back-btn" onClick={back}>
                 Back
            </button>
             </div>
            <h1 className="title">Search Results for"{movieName}"</h1>
            <div className="container">
            {movies.map((movie) => (
                <div className="movie-card" key={movie.imdbID}>
                    <img src={movie.Poster} alt={movie.Title} />
                    <h2>{movie.Title}</h2>
                    <p>{movie.Year}</p>
                    <button className="watchlist" onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
                </div>
            ))}
        </div>
        </div>
    );
}

export default Results;