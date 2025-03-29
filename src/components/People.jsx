import React, { useEffect, useState } from 'react';
import CharacterCard from '../components/CharacterCard';

function People() {
  const [characters, setCharacters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'https://www.swapi.tech/api/people?page=1&limit=10';

  useEffect(() => {
    const fetchCharacters = async () => {
      const saved = localStorage.getItem('myCharacters');

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setCharacters(parsed);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error('Error al leer localStorage:', e);
        }
      }

      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        if (Array.isArray(data.results)) {
          setCharacters(data.results);
          localStorage.setItem('myCharacters', JSON.stringify(data.results));
        } else {
          throw new Error('Formato de datos inesperado');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error al obtener personajes:', err);
        setError('No se pudo cargar la información');
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % characters.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + characters.length) % characters.length);
  };

  if (loading) return <p>Ajustando sable láser...</p>;
  if (error) return <p>Error: {error}</p>;

  const currentCharacter = characters[currentIndex];

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Personaje {currentIndex + 1} de {characters.length}</h2>

      {currentCharacter && (
        <CharacterCard
          name={currentCharacter.name}
          url={currentCharacter.url}
          uid={currentCharacter.uid}
        />
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={prev}>⬅ Anterior</button>
        <button onClick={next} style={{ marginLeft: '10px' }}>Siguiente ➡</button>
      </div>
    </div>
  );
}

export default People;
