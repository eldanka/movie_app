import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMovies } from "../actions/movieActions";
import MovieGrid from "./MovieGrid";
import SearchBox from "./SearchBox";
import { ReactComponent as Loader } from "../assets/spiner-color.svg";
import { Message, FullScreenContainer } from "../styles/userForms";
import { Button } from "../styles/buttons";

export default function Home({ location }) {
  const [keyword, setKeyword] = useState("");
  const [option, setOption] = useState(0);
  const [ viewMore, setViewMore ] = useState(0)

  const dispatch = useDispatch();

  const { loading, error, movies, tvShows } = useSelector((state) => state.moviesList);

  useEffect(() => {
    if( keyword.length > 1){
      dispatch(listMovies(location.pathname, keyword));
    }else if( keyword.length === 0 ){
      dispatch(listMovies(location.pathname, ''));
    }
  }, [dispatch, location, keyword]);



  return (
    <>
      <FullScreenContainer>
        <SearchBox setKeyword={setKeyword} />
        {error && <Message>${error}</Message>}
        <div>
          <Button style={{ width: "130px" }} onClick={() => setOption(0)}>
            Movies
          </Button>
          <Button style={{ width: "130px" }} onClick={() => setOption(1)}>
            TV Shows
          </Button>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {option === 0  && <MovieGrid movies={movies} viewMore={viewMore}/>}
            {option === 1  && <MovieGrid movies={tvShows}  viewMore={viewMore}/>}
          </>
        )}
        {viewMore < 9 && <Button onClick={() => setViewMore(prev => prev + 1)}>View more results</Button>}
      </FullScreenContainer>
    </>
  );
}