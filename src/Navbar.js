import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Movie Explorer</h1>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="navbar-search-input"
        />
        <button onClick={handleSearch} className="navbar-search-button">
          Search
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
