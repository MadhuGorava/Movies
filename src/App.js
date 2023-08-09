import React, { useState } from "react";
import Navbar from "./Navbar";
import MoviePage from "./MoviePage";
import "./App.css";

function App() {
  const apiKey = process.env.REACT_APP_API_KEY; // Replace with your actual API key
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <Navbar onSearch={setSearchTerm} />
      <MoviePage apiKey={apiKey} searchTerm={searchTerm} />
    </div>
  );
}

export default App;
