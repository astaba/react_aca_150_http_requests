import React, { Fragment, useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      // const response = await fetch("https://academind-react-215-default-rtdb.europe-west1.firebasedatabase.app/movie.json");
      if (!response.ok) {
        throw new Error(`${response.status}: Somthing went wrong!`);
      }
      const data = await response.json();
      const transformedMovies = data.results.map(
        ({
          episode_id: id,
          opening_crawl: openingText,
          release_date: releaseDate,
          title,
        }) => ({ id, title, releaseDate, openingText })
      );
      setMovies(transformedMovies);
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddMovie = (movie) => {
    console.log(movie);
  };

  let indicatorUI = null;
  if (movies.length === 0 && !isLoading && !error) {
    indicatorUI = <h4>No movies yet</h4>;
  } else if (isLoading) {
    indicatorUI = <h4>Loading movies...</h4>;
  } else if (!isLoading && error) {
    indicatorUI = <h4>{error}</h4>;
  }

  return (
    <Fragment>
      <section>
        <AddMovie onAddMovie={handleAddMovie} />
      </section>
      <section>
        <button onClick={fetchData}>Fetch Movies</button>
      </section>
      <section>
        {indicatorUI || <MoviesList movies={movies} />}
      </section>
    </Fragment>
  );
}

export default App;
