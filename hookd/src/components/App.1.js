// eslint-disable-next-line
import React, { useState,useReducer,useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Movie from "./Movie";
import Search from './Search'
const myOMDkey = "ef28fe4c";
const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=" + myOMDkey;

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((res) => {
        setMovies(res.Search);
        setLoading(false)
      });
  }, []);
  const search = searchValue=>{
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=${myOMDkey}`)
      .then(respones=>respones.json())
      .then(res=>{
        if(res.Response === 'True'){
          setMovies(res.Search);
          setLoading(false);
        }else{
          setErrorMessage(res.Error);
          setLoading(false);
        }
      })
  };
  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search}/>
      <p className="App-info">分享一些喜欢的电影</p>
      <div className="movies">
      {
        loading && !errorMessage ?(
          <span>加载中。。。</span>
        ):errorMessage?(
          <div className="errorMessage">{errorMessage}</div>
        ):(
          movies.map((movie, index) => {
            return <Movie movie={movie} key={`${index}-${movie.Title}`} />;
          })
        )
      }
      </div>
    </div>
  );
}

export default App;
