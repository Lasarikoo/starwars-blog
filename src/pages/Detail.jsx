// src/pages/Detail.jsx
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import Spinner from '../components/Spinner'
import { StoreContext } from '../context/StoreContext'

export default function Detail() {
  const { type, uid } = useParams()
  const { data: result, loading, error } = useFetch(`https://www.swapi.tech/api/${type}/${uid}`)
  const { state, dispatch } = useContext(StoreContext)

  if (loading) return <Spinner />
  if (error)   return <div className="alert alert-danger">{error.message}</div>
  if (!result) return null

  const props = result.properties
  const isFav = state.favorites.some(f => f.uid === uid)

  const BASE_IMG_URL =
    'https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img'
  const folder = type === 'people' ? 'characters' : type
  const imgUrl = `${BASE_IMG_URL}/${folder}/${uid}.jpg`

  return (
    <div className="card mb-4">
      <img
        src={imgUrl}
        className="card-img-top"
        alt={props.name}
        onError={e => (e.target.src = '/placeholder.jpg')}
      />
      <div className="card-body">
        <h3 className="card-title">{props.name}</h3>
        <button
          className={`btn ${isFav ? 'btn-danger' : 'btn-outline-success'} mb-3`}
          onClick={() =>
            dispatch({
              type: isFav ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE',
              payload: { uid, name: props.name, type }
            })
          }
        >
          {isFav ? 'Remove Favorite' : 'Add to Favorites'}
        </button>
        <ul className="list-group list-group-flush">
          {Object.entries(props).map(([key, value]) => (
            <li key={key} className="list-group-item">
              <strong>{key.replace(/_/g, ' ')}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
