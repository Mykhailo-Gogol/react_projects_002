import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const debounce = require("debounce");

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=6fa36c8f`;
    const response = await fetch(url);
    const data = await response.json();

    data.Search && setMovies(data.Search);
  };

  useEffect(
    (searchValue) => {
      getMovieRequest(searchValue);
    },
    [searchValue]
  );
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="MG Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default App;
