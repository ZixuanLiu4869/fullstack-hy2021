const notificationReducer = (state=null, action) => {
    switch (action.type) {
        case 'INIT':{
            return null
        }
        case 'NEW_NOTIFICATION': {
            return action.data
        }
        case 'CLEAR_NOTIFICATION': {
            return null
        }
        default:
            return state
    }
}

let time

export const notification = (msg, s) => {
    return async dispatch => {
        clearTimeout(time)

        dispatch({
            type: 'NEW_NOTIFICATION',
            data: msg
        })

        time = setTimeout(() => dispatch({type: 'CLEAR_NOTIFICATION'}), 1000*5)
    }
}

export default notificationReducer