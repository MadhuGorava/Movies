import React, { useState, useEffect } from "react";
import "./MoviePage.css";

const MoviePage = ({ apiKey, searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [orderBy, setOrderBy] = useState("popularity.desc");
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchMovies();
  }, [apiKey, currentPage, orderBy]);

  const fetchMovies = () => {
    const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=${orderBy}&page=${currentPage}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset current page when searching
    fetchMovies();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOrderByChange = (newOrderBy) => {
    setOrderBy(newOrderBy);
    setCurrentPage(1); // Reset current page when changing order
  };

  const handleFilterByRating = () => {
    fetchMovies();
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      movie.vote_average >= minRating
  );

  return (
    <div className="movie-page">
      <h1>Movie Page</h1>
      <div className="movie-search">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="movie-search-input"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="movie-filters">
        <label>Minimum Rating:</label>
        <input
          type="number"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="movie-rating-input"
        />
        <button onClick={handleFilterByRating}>Filter</button>
        <select
          value={orderBy}
          onChange={(e) => handleOrderByChange(e.target.value)}
        >
          <option value="popularity.desc">Popularity</option>
          <option value="vote_average.desc">Rating</option>
          <option value="release_date.desc">Release Date</option>
        </select>
      </div>
      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoviePage;
