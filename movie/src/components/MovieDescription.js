import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDescription = ({ movies }) => {
  const { title } = useParams();
  const navigate = useNavigate();
  
  // Find the specific movie based on the URL parameter
  const movie = movies.find((m) => m.title === title);

  if (!movie) return <h2>Movie not found!</h2>;

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '20px', padding: '10px' }}>
        Back to Home
      </button>
      <h1>{movie.title}</h1>
      <p style={{ maxWidth: '600px', margin: '0 auto 20px' }}>{movie.description}</p>
      
      <div className="trailer">
        <iframe
          width="560"
          height="315"
          src={movie.trailerLink}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default MovieDescription;