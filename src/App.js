import React, { Fragment, useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movieData, setMovieDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://academind-react-215-default-rtdb.europe-west1.firebasedatabase.app/movie.json"
      );

      if (!response.ok) {
        const data = await response.json()
        throw new Error(`${response.status}: ${data.error}`);
      }
      const data = await response.json();
         console.log(data);
      const fetchedMovie = [];
      for (let key in data) {
        const singleMovie = {
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
          title: data[key].title,
        };
        fetchedMovie.push(singleMovie);
      }
      setMovieDatas(fetchedMovie);
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

  const handleAddMovie = async (movie) => {
    const response = await fetch(
      "https://academind-react-215-default-rtdb.europe-west1.firebasedatabase.app/movie.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        header: "Content-Type: application/json",
      }
    );
    const data = await response.json();
    console.log(data);

  };

  let indicatorUI = null;
  if (movieData.length === 0 && !isLoading && !error) {
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
      <section>{indicatorUI || <MoviesList movies={movieData} />}</section>
    </Fragment>
  );
}

export default App;
