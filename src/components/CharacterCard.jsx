import React, { useEffect, useState } from 'react';
import '../css/CharacterCard.css';

function CharacterCard({ name, url, uid }) {
  const [details, setDetails] = useState(null);
  const [planet, setPlanet] = useState('');
  const [films, setFilms] = useState([]);
  const [species, setSpecies] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [starships, setStarships] = useState([]);

  const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/characters/${uid}.jpg`;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();

        const info = data.result.properties;
        if (!info) throw new Error('No se encontraron propiedades');

        setDetails(info);

        // Cargar planeta natal
        if (info.homeworld) {
          const planetRes = await fetch(info.homeworld);
          const planetData = await planetRes.json();
          setPlanet(planetData.result.properties.name);
        }

        // Función genérica para arrays de URLs
        const fetchMultiple = async (urls, setter) => {
          const results = await Promise.all(
            urls.map(async (itemUrl) => {
              const res = await fetch(itemUrl);
              const data = await res.json();
              return data.result.properties.name || data.result.properties.title;
            })
          );
          setter(results);
        };

        if (Array.isArray(info.films)) await fetchMultiple(info.films, setFilms);
        if (Array.isArray(info.species)) await fetchMultiple(info.species, setSpecies);
        if (Array.isArray(info.vehicles)) await fetchMultiple(info.vehicles, setVehicles);
        if (Array.isArray(info.starships)) await fetchMultiple(info.starships, setStarships);

      } catch (err) {
        console.error('Error al cargar detalles del personaje:', err);
      }
    };

    fetchDetails();
  }, [url]);

  return (
    <div className="character-card fade-in">
      <img
        className="character-image"
        src={imageUrl}
        alt={name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';
        }}
      />
      <h2 className="character-name">{name}</h2>

      {details ? (
        <div className="character-details">
          <p><strong>Altura:</strong> {details.height} cm</p>
          <p><strong>Peso:</strong> {details.mass} kg</p>
          <p><strong>Cabello:</strong> {details.hair_color}</p>
          <p><strong>Piel:</strong> {details.skin_color}</p>
          <p><strong>Ojos:</strong> {details.eye_color}</p>
          <p><strong>Nacimiento:</strong> {details.birth_year}</p>
          <p><strong>Género:</strong> {details.gender}</p>
          <p><strong>Planeta natal:</strong> {planet}</p>

          {films.length > 0 && <p><strong>Películas:</strong> {films.join(', ')}</p>}
          {species.length > 0 && <p><strong>Especies:</strong> {species.join(', ')}</p>}
          {vehicles.length > 0 && <p><strong>Vehículos:</strong> {vehicles.join(', ')}</p>}
          {starships.length > 0 && <p><strong>Naves:</strong> {starships.join(', ')}</p>}
        </div>
      ) : (
        <p className="character-loading">Cargando detalles...</p>
      )}
    </div>
  );
}

export default CharacterCard;
