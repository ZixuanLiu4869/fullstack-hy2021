import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import Button from './components/Button'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.longin({username, password})

      window.localStorage.setItem('loggedBlogsAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception){
      setErrorMessage('Wrong username or password')
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreateBlog = (blogObj) => {
    blogService.create(blogObj).then(returnedBlog=>{
      setBlogs(blogs.concat(returnedBlog).sort((a, b)=>b.likes-a.likes))
    })
  }

  const handleUpdateBlog = async (blogObj) => {
    const newBlogObj = {...blogObj}
    newBlogObj.likes = newBlogObj.likes + 1

    console.log(newBlogObj)

    await blogService.update(newBlogObj)

    const newBlogs = blogs.map((b) => b.id === newBlogObj.id ? newBlogObj : b)

    setBlogs(newBlogs)
  }

  const handleDelete = async (id) => {
    const blogToDelete = blogs.find(b => b.id === id)
    if(window.confirm(`Remmove blog '${blogToDelete.title}' by '${blogToDelete.author}' ?`)){
      blogService.deleteBlog(id).then(()=>{
        setBlogs(blogs.filter(p => p.id !== id).sort((a, b) => b.likes - a.likes))
      })
    }
  }



  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input type="text" value={username} name="Username" onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type="password" value={password} name="Password" onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button> 
      </form>
    </div>
  )

  const newBlogForm = () => (
    <Togglable buttonLabel="Create">
      <NewBlogForm createBlog={handleCreateBlog} />
    </Togglable>
  )

  const blogsForm = () => (
    <Blogs user={user} blogs={blogs} setBlogs={setBlogs} handleUpdateBlog={handleUpdateBlog} handleDelete={handleDelete} />
  )

  return (
    <div>
      <Notification message={errorMessage} />
      <div>
        <div>
          {
            user === null ? loginForm(): 
            <div>
              <p>{user.name} logged-in <Button text='logout' onClick={(event) => handleLogout(event)} /></p>
              {newBlogForm()}
              {blogsForm()}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App