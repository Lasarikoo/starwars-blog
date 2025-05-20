import React, { useState } from 'react'
import CardItem from '../components/CardItem'
import Spinner from '../components/Spinner'
import { useFetch } from '../hooks/useFetch'

export default function Home() {
  const [type, setType] = useState('people')
  const { data, loading, error } = useFetch(`https://www.swapi.tech/api/${type}`)

  return (
    <>
      <div className="btn-group mb-4" role="group">
        <button
          type="button"
          className={`btn btn-outline-primary ${type === 'people' ? 'active' : ''}`}
          onClick={() => setType('people')}
        >
          People
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary ${type === 'planets' ? 'active' : ''}`}
          onClick={() => setType('planets')}
        >
          Planets
        </button>
        <button
          type="button"
          className={`btn btn-outline-primary ${type === 'vehicles' ? 'active' : ''}`}
          onClick={() => setType('vehicles')}
        >
          Vehicles
        </button>
      </div>
      {loading && <Spinner />}
      {error && <div className="alert alert-danger">{error.message}</div>}
      <div className="d-flex flex-wrap">
        {data && data.map(item => (
          <CardItem key={item.uid} item={item} type={type} />
        ))}
      </div>
    </>
  )
}