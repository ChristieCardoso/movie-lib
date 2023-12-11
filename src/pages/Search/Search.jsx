import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MovieCard } from "../../components/MovieCard/MovieCard";

import "./Search.css";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

// Componente Search
export const Search = () => {
  const [searchParams] = useSearchParams(); // Obtém os parâmetros de pesquisa da URL usando o hook useSearchParams
  const [movies, setMovies] = useState([]); // Cria um estado 'movies' inicializado como um array vazio
  const query = searchParams.get("q"); // Obtém o valor do parâmetro 'q' da pesquisa

  // Função assíncrona para obter os filmes pesquisados da API
  const getSearchedMovies = async (url) => {
    const res = await fetch(url); // Faz uma solicitação à API usando a URL fornecida
    const data = await res.json(); // Converte a resposta em formato JSON
    setMovies(data.results); // Atualiza o estado 'movies' com os filmes retornados pela API
  };

  useEffect(() => {
    const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`; // Constrói a URL para buscar os filmes pesquisados com base no parâmetro 'query'
    getSearchedMovies(searchWithQueryURL); // Chama a função getSearchedMovies para obter os filmes da API
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length > 0 &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
};

