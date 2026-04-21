import React, { useState } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';

const App = () => {
  const [movies, setMovies] = useState([
    { title: "Inception", description: "A thief who steals corporate secrets.", posterURL: "https://via.placeholder.com/150", rating: 9 },
    { title: "Interstellar", description: "A team of explorers travel through a wormhole.", posterURL: "https://via.placeholder.com/150", rating: 8 }
  ]);

  const [titleFilter, setTitleFilter] = useState("");
  const [rateFilter, setRateFilter] = useState(0);

  // Logic: Filter movies based on both title and rating
  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(titleFilter.toLowerCase()) &&
    movie.rating >= rateFilter
  );

  const addMovie = () => {
    const newMovie = {
      title: prompt("Enter Title:"),
      description: prompt("Enter Description:"),
      posterURL: "https://via.placeholder.com/150",
      rating: Number(prompt("Enter Rating (1-10):"))
    };
    setMovies([...movies, newMovie]);
  };

  return (
    <div className="App" style={{ textAlign: 'center' }}>
      <h1>🎬 My Favorite Movie Stable</h1>
      <button onClick={addMovie} style={{ padding: '10px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px' }}>
        Add New Movie
      </button>
      
      <Filter setTitleFilter={setTitleFilter} setRateFilter={setRateFilter} />
      
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default App;