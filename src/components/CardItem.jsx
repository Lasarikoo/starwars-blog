// src/components/CardItem.jsx
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

export default function CardItem({ item, type }) {
  const { state, dispatch } = useContext(StoreContext)
  const isFav = state.favorites.some(f => f.uid === item.uid)

  const BASE_IMG_URL =
    'https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img'
  // En el repositorio las personas están en "characters", no en "people"
  const folder = type === 'people' ? 'characters' : type
  const imgUrl = `${BASE_IMG_URL}/${folder}/${item.uid}.jpg`

  return (
    <div className="card m-2" style={{ width: '18rem' }}>
      <img
        src={imgUrl}
        className="card-img-top"
        alt={item.name}
        onError={e => (e.target.src = '/placeholder.jpg')}
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <Link to={`/${type}/${item.uid}`} className="btn btn-primary me-2">
          Detalles
        </Link>
        <button
          className={`btn ${isFav ? 'btn-danger' : 'btn-outline-success'}`}
          onClick={() =>
            dispatch({
              type: isFav ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE',
              payload: { uid: item.uid, name: item.name, type }
            })
          }
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>
    </div>
  )
}
