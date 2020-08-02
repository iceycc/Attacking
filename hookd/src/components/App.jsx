// eslint-disable-next-line
import React, { useState, useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
const myOMDkey = "ef28fe4c";
const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=" + myOMDkey;

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null,
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };

    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((res) => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: res.Search,
        });
      });
  }, []);
  const search = (searchValue) => {
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${myOMDkey}`)
      .then((respones) => respones.json())
      .then((res) => {
        if (res.Response === "True") {
          dispatch({
            type: "SEARCH_MOVIES_SUCCESS",
            payload: res.Search
        });
        } else {
          dispatch({
            type:"SEARCH_MOVIES_FAILURE",
            error:res.Error
          })
        }
      });
  };
  const { movies, errorMessage, loading } = state;
  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-info">分享一些喜欢的电影</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>加载中。。。</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => {
            return <Movie movie={movie} key={`${index}-${movie.Title}`} />;
          })
        )}
      </div>
    </div>
  );
}

export default App;
