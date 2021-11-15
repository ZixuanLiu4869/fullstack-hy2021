import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {AddLikes, DeleteBlog} from '../reducers/blogReducer'
import {setSuccessNotification, setErrorNotification} from '../reducers/notificationReducer'
import Blog from './Blog'


const Blogs = ({user}) => {

    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    const addLikes = (id) => {
        const blog = blogs.find(blog => blog.id === id)
        dispatch(AddLikes(blog))
    }

    const deleteBlog = (id) => {
        const blog = blogs.find(blog => blog.id === id)
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
            if(blog.user.username === user.username || blog.user.username === undefined){
                dispatch(DeleteBlog(blog))
                dispatch(setSuccessNotification(`blog '${blog.title}' by ${blog.author} deleted`, 5))
            }
        }
    }
    return(
        <div id='showblogs'>
            {blogs.sort((a,b) => b.likes-a.likes).map(blog=>
                <Blog key={blog.id} blog={blog} user={user.username} handleDelete={() => deleteBlog(blog.id)} handleUpdateBlog={() => addLikes(blog.id)} />)}
        </div>
    )
}

export default Blogs