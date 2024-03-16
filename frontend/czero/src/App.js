import React, { useState } from 'react';
import './App.css';
// import ProductCard from './ProductCard';
import Image from  '../src/assets/logo.jpeg';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    fetch(`http://localhost:8000/search/?query=${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => {
        setResults(data);
        setError(null);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        setResults([]);
      });
  };

  const handleAnalyze = () => {
    // Handle the analysis action
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="logo-container">
            {/* <h1>Off The Record</h1> */}
            <img src={Image} alt="Logo" className="logo-image" />
          </div>
        </div>
      </header>
      <div className="search-container" style={{marginLeft:200}}>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products..." />
            <button onClick={handleSearch}>Search</button>
          </div>
      {error && <p>{error}</p>}
      <div className="results-container">
        {results.map(product => (
          <div className="product-card" key={product.link}>
            <img className="product-image" src={product.image_url} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button onClick={handleAnalyze}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
  
}

export default App;
