import blogService from '../services/blogs'
import loginService from '../services/login'

const userReducer = (state={}, action) => {
    switch(action.type){
        case 'SET_TOKEN':
            return action.user
        case 'GET_TOKEN':
            return action.user
        case 'REMOVE_TOKEN':
            return null
        default:
            return state
    }
}

export const saveToken = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({username, password})
        window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
        blogService.setToken(user.token)
        dispatch({type: 'SET_TOKEN', user: user})
    }
}

export const getToken = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
        let user = null
        if (loggedUserJSON){
            user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
        }
        dispatch({type: 'GET_TOKEN', user: user})
    }
}

export const removeToken = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogsAppUser')
        blogService.setToken(null)
        dispatch({type: 'REMOVE_TOKEN'})
    }
}

export default userReducer