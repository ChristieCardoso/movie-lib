/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";
import { MovieCard } from "../../components/MovieCard/MovieCard";

import "./Movie.css";

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

// Componente Movie
export const Movie = () => {
  const { id } = useParams(); // Obtém o parâmetro 'id' da URL usando o hook useParams
  const [movie, setMovie] = useState(null); // Cria um estado 'movie' inicializado como nulo

  // Função assíncrona para obter os dados do filme da API
  const getMovie = async (url) => {
    const res = await fetch(url); // Faz uma solicitação à API usando a URL fornecida
    const data = await res.json(); // Converte a resposta em formato JSON
    setMovie(data); // Atualiza o estado 'movie' com os dados do filme retornados pela API
  };


  const formatCurrency = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`; // Constrói a URL para buscar os dados do filme com base no parâmetro 'id'
    getMovie(movieUrl); // Chama a função getMovie para obter os dados do filme da API
  }, []);


  return (
    <div className="movie-page">
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} />
          <p className="tagline">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 /> Orçamento:
            </h3>
            <p>{formatCurrency(movie.budget)}</p>
          </div>
          <div className="info">
            <h3>
              <BsGraphUp /> Receita:
            </h3>
            <p>{formatCurrency(movie.revenue)}</p>
          </div>
          <div className="info">
            <h3>
              <BsHourglassSplit /> Duração:
            </h3>
            <p>{movie.runtime} minutos</p>
          </div>
          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill /> Descrição:
            </h3>
            <p>{movie.overview}</p>
          </div>
        </>
      )}
    </div>
  );
};

