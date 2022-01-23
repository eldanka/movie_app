import React from "react";
import styled from "styled-components/macro";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies, viewMore }) {
  return (
    <GridContainer>
      {viewMore >= 0 && movies.slice(0,10).map((movie) => {
        return <MovieCard key={movie._id} movie={movie} />;
      })}
      {viewMore > 0 && movies.slice(10,10 * (viewMore + 1)).map((movie) => {
        return <MovieCard key={movie._id} movie={movie} />;
      })}
    </GridContainer>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(auto, 375px));
  column-gap: 2rem;
  row-gap: 2rem;
  justify-items: center;
  align-items: center;
  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    grid-template-columns: repeat(3, minmax(auto, 375px));
  }
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
    grid-template-columns: repeat(1, minmax(auto, 375px));
  }
`;