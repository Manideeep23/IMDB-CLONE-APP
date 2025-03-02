IMDb Clone App

This project is a mini IMDb clone app built using React, axios, and React Router. The app allows users to search for movies using the OMDB API, view movie details, and add/remove movies from their favorites list. The favorites list is persistent across browser refreshes and closures.

Features

- **Search Movies**: Search for movies by title using the OMDB API.
- **View Movie Details**: Click on a movie to view detailed information, including the poster, year, genre, director, actors, IMDb rating, and plot.
- **Favorites List**: Add and remove movies from the favorites list. The favorites list is stored in `localStorage` to persist across browser refreshes and closures.

Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **axios**: A promise-based HTTP client for making API requests.
- **OMDB API**: An API for accessing movie information.

Getting Started

To get started with the project, follow these steps:

Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.

Dependencies

- npm install
- REACT_APP_OMDB_API_KEY=your_omdb_api_key
- npm start

Usage
- Search for Movies: Enter a movie title in the search box and click the "Search" button to fetch movies from the OMDB API.
- View Movie Details: Click on a movie poster to view detailed information about the movie.
- Add to Favorites: Click the "Add to Favorites" button to add a movie to the favorites list.
- Remove from Favorites: Click the "Remove from Favorites" button to remove a movie from the favorites list.
- View Favorites: Click the "Favorites" link in the navigation bar to view all the movies added to the favorites list.

CODE
```
App.jsx:
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
          <h1 className="title">IMDB Clone</h1>
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
App.css:
/* General Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #1a1a1a;
  color: #fff;
  padding: 0;
  text-align: center;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 2.8em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #f5c518;
}

.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.search-box input {
  padding: 12px 20px;
  font-size: 1.2em;
  width: 50%;
  border-radius: 8px;
  border: 2px solid #f5c518;
  transition: border-color 0.3s;
  background-color: #333;
  color: #fff;
}

.search-box input:focus {
  border-color: #f5a623;
}

.search-button {
  padding: 12px 20px;
  font-size: 1.2em;
  background-color: #f5c518;
  color: #000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 10px;
}

.search-button:hover {
  background-color: #f5a623;
}

.error-message {
  color: red;
  text-align: center;
  font-size: 1.2em;
  margin-top: 20px;
}

.movie-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

.movie-card {
  background-color: #222;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 300px;
  text-align: center;
}

.movie-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(245, 197, 24, 0.4);
}

.movie-poster {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 10px;
}

.movie-title {
  font-size: 1.5em;
  margin-top: 10px;
  text-align: center;
  color: #f5c518;
}

.movie-card p {
  text-align: center;
  color: #bbb;
  margin-top: 5px;
}

.favorite-button,
.remove-favorite-button {
  background-color: #f5c518;
  color: #000;
  border: none;
  padding: 12px 0;
  margin-top: 15px;
  cursor: pointer;
  border-radius: 8px;
  width: 100%;
  font-size: 1.2em;
}

.favorite-button:hover,
.remove-favorite-button:hover {
  background-color: #f5a623;
}

/* Movie Details Page */
.movie-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.movie-details-content {
  display: flex;
  justify-content: center;
  gap: 50px;
  align-items: flex-start;
}

.details-poster {
  width: 350px;
  height: 500px;
  object-fit: cover;
  border-radius: 12px;
}

.movie-info {
  max-width: 500px;
}

.back-button {
  background-color: #f5c518;
  color: #000;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #f5a623;
}

h2 {
  font-size: 2em;
  margin-top: 20px;
  color: #f5c518;
}

p {
  margin: 10px 0;
  font-size: 1.1em;
}

strong {
  font-weight: bold;
}

.latest-title {
  font-size: 2em;
  text-align: center;
  margin-bottom: 20px;
  color: #f5c518;
}

.favorites-title {
  font-size: 2em;
  text-align: center;
  margin-top: 40px;
  color: #f5c518;
}
.movie-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  min-height: 100vh;
}

.movie-details-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
  max-width: 80%;
  margin: auto;
}
```





ScreenShots
![Home Page](https://github.com/user-attachments/assets/5f3e5d6c-fe50-4a70-bea9-24bee75afc36)

![Movie Page](https://github.com/user-attachments/assets/5022f999-2796-4a2d-a265-b98e129f4ba7)

![Favorite Page](https://github.com/user-attachments/assets/46dd4c62-81aa-460c-b2df-4aa80fcf4dab)

License
- This project is licensed under the MIT License. See the LICENSE file for more details.
