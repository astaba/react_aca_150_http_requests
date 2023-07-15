import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

// const dummyMovies = [
//   {
//     id: 1,
//     title: 'Some Dummy Movie',
//     openingText: 'This is the opening text of the movie',
//     releaseDate: '2021-05-18',
//   },
//   {
//     id: 2,
//     title: 'Some Dummy Movie 2',
//     openingText: 'This is the second opening text of the movie',
//     releaseDate: '2021-05-19',
//   },
// ];

function App() {
  const [movies, setMovies] = useState([]);

  const fetchData = () => {
    fetch("https://swapi.dev/api/films/")
      .then((response) => response.json())
      .then((data) => {
        const transformedMovies = data.results.map(
          ({
            episode_id: id,
            opening_crawl: openingText,
            release_date: releaseDate,
            title,
          }) => ({ id, title, releaseDate, openingText })
        );
        setMovies(transformedMovies);
      });
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchData}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
