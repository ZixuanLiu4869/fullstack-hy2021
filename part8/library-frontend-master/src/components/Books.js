import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import {ALL_BOOKS} from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState(null)

  const result = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }
  
  if (result.loading){
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  let genres = {}
  books.map(b => b.genres.map(g => genres[g]=1))
  genres = Object.keys(genres)

  if(filter){
    books.filter(b => b.genres.includes(filter))
  }

  return (
    <div>
      <h2>books</h2>
      {filter && <h4>in genre {filter}</h4>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {!filter ? books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ):
            books.filter(b => b.genres.includes(filter)).map(a=>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>)}
        </tbody>
      </table>
      <div>
        {genres.map(g=>
          <button key={g} onClick={() => setFilter(g)}>{g}</button>)}
        <button onClick={()=>setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books