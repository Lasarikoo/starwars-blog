import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

export default function Navbar() {
  const { state } = useContext(StoreContext)
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Star Wars Blog</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/favorites">
                Favorites <span className="badge bg-secondary">{state.favorites.length}</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}