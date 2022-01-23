import axios from 'axios';

export function login(email , password){
    return async function(dispatch){
        try {
            dispatch({
                type: "USER_LOGIN_REQUEST"
            })

            const config = {
                headers: { "Content-Type": "application/json"}
            }

            const { data } = await axios.post("/api/users/login",
                { email, password },
                config
            )

            dispatch({
                type: "USER_LOGIN_SUCCESS",
                payload: data
            })

            localStorage.setItem("userAuth", JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: "USER_LOGIN_FAIL",
                payload: error.response.data.message
            })
        }
    }
}

export function logout(){
    return function (dispatch){
        localStorage.removeItem("userAuth")
        dispatch({ type: "USER_LOGOUT"})
        dispatch({ type: "GOOGLE_LOGOUT"})
    }
}

export function register(username, email, password){
    return async function(dispatch){
        try {
            dispatch({
                type: "USER_REGISTER_REQUEST"
            })

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const { data } = await axios.post('/api/users', 
                { username, email, password},
                config
            )

            dispatch({
                type: "USER_REGITER_SUCCESS",
                payload: data.message
            })

            dispatch({
                type: "USER_REGISTER_RESET"
            })
        } catch (error) {
            dispatch({
                type: "USER_REGISTER_FAIL",
                payload: error.response.data.message
            })
        }
    }
}

export function googleLogin(res){
    return async function(dispatch){
        try {
            dispatch({
                type: "GOOGLE_LOGIN_REQUEST"
            })

            const { data } = await axios.post("/api/users/googleAuth",
                { googleRes: res }
            )
            const { token, userId} = data
            dispatch({
                type: "GOOGLE_LOGIN_SUCCESS",
                payload: {token, userId}
            })

            localStorage.setItem("userAuth", JSON.stringify(data.token))
        } catch (error) {
            dispatch({
                type: "GOOGLE_LOGIN_FAIL",
                payload: error.response.data.message
            })
        }
    }
}