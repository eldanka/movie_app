import axios from "axios";

export function listMovies( patch, keyword= ''){
    return async function(dispatch){
        try {
            dispatch({
                type: "MOVIE_LIST_REQUEST"
            })

            
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            const { data } = await axios.get(`/api/movies${patch}?keyword=${keyword}`, config)
            const { movies, tvShows } = data
            dispatch({ 
                type: "MOVIE_LIST_SUCCESS",
                payload: { movies, tvShows}
            })
        } catch (error) {
            dispatch({
                type: "ITEM_LIST_FAIL",
                payload: error.response.data.message
            })
        }
    }
}

export function getMovieDetails(movieId){
    return async function(dispatch){
        try {
            dispatch({
                type: "MOVIE_DETAILS_REQUEST"
            })

            const { data } = await axios.get(`/api/movies/${movieId}`)

            dispatch({
                type: "MOVIE_DETAILS_SUCCESS",
                payload: data
            })
        } catch (error) {
            dispatch({
                type: "MOVIE_DETAILS_FAIL",
                payload: error.response.data.message
            })
        }
    }
}
