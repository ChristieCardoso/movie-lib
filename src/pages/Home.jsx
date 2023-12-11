import { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard/MovieCard";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

export const Home = () => {
  const [topMovies, setTopMovies] = useState([]); // Cria um estado 'topMovies' inicializado como um array vazio

  // Função assíncrona para obter os filmes mais bem avaliados da API
  const getTopRatedMovies = async (url) => {
    const res = await fetch(url); // Faz uma solicitação à API usando a URL fornecida
    const data = await res.json(); // Converte a resposta em formato JSON
    setTopMovies(data.results); // Atualiza o estado 'topMovies' com os filmes retornados pela API
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`; // Constrói a URL para buscar os filmes mais bem avaliados
    getTopRatedMovies(topRatedUrl); // Chama a função getTopRatedMovies para obter os filmes da API
  }, []);

  return (
    <div className="container">
      <h2 className="title">Melhores filmes:</h2>
      <div className="movies-container">
        {topMovies.length > 0 && // Verifica se há filmes no estado 'topMovies' 
          topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  )
}
