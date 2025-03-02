import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "a7757474"; // Replace with your OMDB API key
const API_URL = "https://www.omdbapi.com/";

const App = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    fetchMovies("2024");
  }, []);

  const fetchMovies = async (query) => {
    try {
      const { data } = await axios.get(`${API_URL}?s=${query}&apikey=${API_KEY}`);
      if (data.Search) {
        setMovies(data.Search);
        setErrorMessage("");
      } else {
        setMovies([]);
        setErrorMessage("No results found. Try another search!");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setErrorMessage("Failed to fetch movies. Please try again.");
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}?i=${id}&apikey=${API_KEY}`);
      setSelectedMovie(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleSearch = () => {
    if (search.trim()) fetchMovies(search);
  };

  const updateFavorites = (updatedFavorites) => {
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.imdbID === movie.imdbID)) {
      updateFavorites([...favorites, movie]);
    }
  };

  const removeFromFavorites = (id) => {
    updateFavorites(favorites.filter((movie) => movie.imdbID !== id));
  };

  const isFavorite = (id) => {
    return favorites.some((movie) => movie.imdbID === id);
  };

  return (
    <div className="container">
      {selectedMovie ? (
        <div className="movie-details">
          <button className="back-button" onClick={() => setSelectedMovie(null)}>
            🔙 Back
          </button>
          <div className="movie-details-content">
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} className="details-poster" />
            <div className="movie-info">
              <h2>{selectedMovie.Title}</h2>
              <p><strong>Year:</strong> {selectedMovie.Year}</p>
              <p><strong>Genre:</strong> {selectedMovie.Genre}</p>
              <p><strong>Director:</strong> {selectedMovie.Director}</p>
              <p><strong>Actors:</strong> {selectedMovie.Actors}</p>
              <p><strong>IMDB Rating:</strong> {selectedMovie.imdbRating}</p>
              <p><strong>Plot:</strong> {selectedMovie.Plot}</p>
              {isFavorite(selectedMovie.imdbID) ? (
                <button onClick={() => removeFromFavorites(selectedMovie.imdbID)} className="favorite-button">
                  Remove from Favorites
                </button>
              ) : (
                <button onClick={() => addToFavorites(selectedMovie)} className="favorite-button">
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <h1 className="title">IMDb Clone</h1>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch} className="search-button">Search</button>
          </div>

          {errorMessage ? (
            <p className="error-message">{errorMessage}</p>
          ) : (
            <>
              <h2 className="latest-title">Latest Movies</h2>
              <div className="movie-grid">
                {movies.map((movie) => (
                  <div key={movie.imdbID} className="movie-card">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="movie-poster"
                      onClick={() => fetchMovieDetails(movie.imdbID)}
                    />
                    <h2 className="movie-title">{movie.Title}</h2>
                    <p>{movie.Year}</p>
                    {isFavorite(movie.imdbID) ? (
                      <button onClick={(e) => { e.stopPropagation(); removeFromFavorites(movie.imdbID); }} className="favorite-button">
                        Remove from Favorites
                      </button>
                    ) : (
                      <button onClick={(e) => { e.stopPropagation(); addToFavorites(movie); }} className="favorite-button">
                        Add to Favorites
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      <h2 className="favorites-title">My Favorite Movies</h2>
      <div className="movie-grid">
        {favorites.length === 0 ? <p>No favorite movies added yet.</p> : favorites.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
            <h2 className="movie-title">{movie.Title}</h2>
            <p>{movie.Year}</p>
            <button onClick={() => removeFromFavorites(movie.imdbID)} className="remove-favorite-button">
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
