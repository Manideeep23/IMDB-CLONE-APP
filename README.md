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

ScreenShots






License
This project is licensed under the MIT License. See the LICENSE file for more details.
