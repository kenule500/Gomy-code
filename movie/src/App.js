import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import Filter from './components/Filter';
import MovieDescription from './components/MovieDescription';

const App = () => {
  const [movies, setMovies] = useState([
    { 
      title: "Inception", 
      description: "A thief who steals corporate secrets through use of dream-sharing technology.", 
      posterURL: "https://via.placeholder.com/150", 
      rating: 9,
      trailerLink: "https://www.youtube.com/embed/YoHD9XEInc0" 
    },
    { 
      title: "Interstellar", 
      description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", 
      posterURL: "https://via.placeholder.com/150", 
      rating: 8,
      trailerLink: "https://www.youtube.com/embed/zSWdZVtXT7E"
    }
  ]);

  const [titleFilter, setTitleFilter] = useState("");
  const [rateFilter, setRateFilter] = useState(0);

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
    movie.rating >= rateFilter
  );

  return (
    <Router>
      <div className="App" style={{ textAlign: 'center' }}>
        <h1>🎬 My Favorite Movie Stable</h1>
        
        <Routes>
          {/* Home Route: Shows Filter and List */}
          <Route path="/" element={
            <>
              <Filter setTitleFilter={setTitleFilter} setRateFilter={setRateFilter} />
              <MovieList movies={filteredMovies} />
            </>
          } />

          {/* Description Route: Shows details and trailer */}
          <Route path="/movie/:title" element={<MovieDescription movies={movies} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;