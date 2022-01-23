export function userLoginReducer(state={}, action){
    switch (action.type) {
        case "USER_LOGIN_REQUEST":
            return { loading: true}
        case "USER_LOGIN_SUCCESS":
            return { loading: false, userAuth: action.payload }
        case "USER_LOGIN_FAIL":
            return { loading: false, error: action.payload}
        case "USER_LOGOUT":
            return {}
        default:
            return state;
    }
}

export function userRegisterReducer(state = {}, action) {
    switch (action.type) {
        case "USER_REGISTER_REQUEST":
            return { loading: true }
        case "USER_REGISTER_SUCCESS":
            return { loading: false }
        case "USER_REGISTER_FAIL":
            return { loading: false, error: action.payload }
        case "USER_REGISTER_RESET":
            return {}
        default:
            return state;
    }
}

export function googleLoginReducer(state={}, action){
    switch (action.type) {
        case "GOOGLE_LOGIN_REQUEST":
            return { loading: true}
        case "GOOGLE_LOGIN_SUCCESS":
            return { loading: false, googleAuth: action.payload }
        case "GOOGLE_LOGIN_FAIL":
            return { loading: true, error: action.payload}
        case "GOOGLE_LOGOUT":
            return {}
        default:
            return state;
    }
}