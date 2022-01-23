export function movieListReducer(state = { movies: [], tvShows: []}, action){
    switch (action.type) {
        case 'MOVIE_LIST_REQUEST':
            return { loading: true }
        case 'MOVIE_LIST_SUCCESS':
            return { loading: false, movies: action.payload.movies, tvShows: action.payload.tvShows }
        case 'MOVIE_LIST_FAIL':
            return { loading: false, error: action.payload }
        case 'MOVIE_LIST_RESET':
            return {}
        default:
            return state
    }
}

export function movieDetailsReducer(state = { loading: true }, action) {
    switch (action.type) {
        case 'MOVIE_DETAILS_REQUEST':
            return { loading: true }
        case 'MOVIE_DETAILS_SUCCESS':
            return { loading: false, movie: action.payload }
        case 'MOVIE_DETAILS_FAIL':
            return { loading: false, error: action.payload }
        case 'MOVIE_DETAILS_RESET':
            return {}
        default:
            return state
    }
}

