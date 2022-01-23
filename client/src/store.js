import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { userLoginReducer, userRegisterReducer, googleLoginReducer } from './reducers/userReducers';
import { movieListReducer, movieDetailsReducer} from './reducers/movieReducers'

const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    moviesList: movieListReducer,
    movieDetails: movieDetailsReducer,
    googleLogin: googleLoginReducer,
})

const userAuth = localStorage.getItem("userAuth") ?
    JSON.parse(localStorage.getItem("userAuth"))
    :
    null

const initialState = {
    userLogin: { userAuth: userAuth},
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middleware)
)

export default store