import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import CardItem from '../components/CardItem'

export default function Favorites() {
  const { state } = useContext(StoreContext)
  const { favorites } = state

  return (
    <>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No tienes favoritos todavía.</p>
      ) : (
        <div className="d-flex flex-wrap">
          {favorites.map(item => (
            <CardItem key={item.uid} item={{ uid: item.uid, name: item.name }} type={item.type} />
          ))}
        </div>
      )}
    </>
  )
}