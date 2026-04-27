import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    // Link to a dynamic path based on the title
    <Link to={`/movie/${movie.title}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="movie-card" style={{ border: '1px solid #ddd', padding: '15px', margin: '10px', borderRadius: '8px', width: '250px', cursor: 'pointer' }}>
        <img src={movie.posterURL} alt={movie.title} style={{ width: '100%', borderRadius: '5px' }} />
        <h3>{movie.title}</h3>
        <div style={{ fontWeight: 'bold', color: '#f39c12' }}>Rating: {movie.rating}/10</div>
      </div>
    </Link>
  );
};

export default MovieCard;