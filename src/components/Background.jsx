import React, { useEffect } from 'react';
import '../css/Background.css';

function Background() {
  useEffect(() => {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;

    // Limpiar estrellas previas si recarga
    starsContainer.innerHTML = '';

    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = Math.random() * 100 + '%';
      star.style.left = Math.random() * 100 + '%';
      star.style.animationDelay = Math.random() * 10 + 's';
      starsContainer.appendChild(star);
    }
  }, []);

  return (
    <div className="background">
      <div className="stars" id="stars"></div>
    </div>
  );
}

export default Background;
