import React, { useEffect, useState } from 'react';

function People() {

    const [characters, setCharacters] = useState(null);
    const API_URL = 'https://www.swapi.tech/api/people/';

    useEffect(() => {
        const savedCharacters = localStorage.getItem('myCharacters');

        if (savedCharacters) {
            setCharacters(JSON.parse(savedCharacters));
        } else {
            fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                setCharacters(data);
                localStorage.setItem('myCharacters', JSON.stringify(data));
            })
            .catch(error => {
                console.error('Error al obtener Characters;', error);
            });
        }

    }, []);

    if (!characters) return <p>Ajustando sable láser...</p>;

    return(
        <div>
            <h1>Datos desde API o localStorage:</h1>
            <pre>{JSON.stringify(characters, null, 2)}</pre>
        </div>
    )

}

export default People;
