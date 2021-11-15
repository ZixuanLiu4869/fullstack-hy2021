import React from 'react'
import {useSelector} from 'react-redux'
import {Alert} from '@material-ui/lab'

const Notification = ({message}) => {
    const notification = useSelector(store => store.notification)
    const style = {
        display: "inline"
    }
    return(
        <div style={notification.toShow ? style : {display: 'none'}}>
            <Alert severity={notification.notitype ? "success" : "error"}>
                {notification.message}
            </Alert>
        </div>
    )
}

export default Notification