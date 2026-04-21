import React from 'react';

const MovieCard = ({ movie }) => {
  const { title, description, posterURL, rating } = movie;
  return (
    <div className="movie-card" style={{ border: '1px solid #ddd', padding: '15px', margin: '10px', borderRadius: '8px', width: '250px' }}>
      <img src={posterURL} alt={title} style={{ width: '100%', borderRadius: '5px' }} />
      <h3>{title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#555' }}>{description}</p>
      <div style={{ fontWeight: 'bold', color: '#f39c12' }}>Rating: {rating}/10</div>
    </div>
  );
};

export default MovieCard;