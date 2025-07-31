import React, { useEffect, useState } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";

const API = import.meta.env.VITE_API_URL;
const BASE_URL = "https://api.themoviedb.org/3";
console.log(`API I S ${API}`);
const API_DATA = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API}`,
  },
};
const App = () => {
  const [searchinput, setsearchinput] = useState("");
  const [error, seterror] = useState("");
  const [movielist, setmovielist] = useState([]);
  const [isloading, setisloading] = useState(false);

  const fetchMovie = async (query = '') => {
    try {
      setisloading(true);
      seterror("");
      const endpoint = query ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${BASE_URL}/movie/popular?language=en-US&page=1`;
      const response = await fetch(endpoint, API_DATA);
      if(!response.ok){
        throw new Error("failed to fech movie movie you are unlucky");
      }
      const data = await response.json();
      console.log("oh boy");
      console.log(data)
      if(data.results == false){
        seterror(data.error || "Failed to fetch dude ");
        setmovielist([]);
        return;
      }
      setmovielist(data.results || []);
    } catch (error) {
      console.log(`the error is:= ${error}`);
      seterror(`fuckng Error ${error}`);
    }finally{
      setisloading(false)
    }
  };
  useEffect(() => {
    fetchMovie(searchinput);
  }, [searchinput]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="../public/hero-img.png" alt="image?" />
          <h1>
            Find <span className="text-gradient">Movies</span>whatever you you
            want i don't care
          </h1>
          <Search input={searchinput} setinput={setsearchinput} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[20px] text-center">All Movies</h2>
          {isloading?(
            <Spinner/>
          ):error ? (
            <p>{error}</p>
          ): (
            <ul>
              {movielist.map((card)=>(
                <MovieCard key={card.id} movie={card}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
