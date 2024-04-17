import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";
import Image from '../src/assets/logoShriya.png';
import NoResultsImage from '../src/assets/money.jpg'; // Import the image for no results

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    setLoading(true);
    fetch(`http://localhost:8000/search/?query=${query}`)
    // fetch(`https://off-the-record.onrender.com/search/?query=${query}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        console.log('hello');
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleView = (id, link) => {
    navigate(`/Product/${id}`, { state: { link } });
  };

  useEffect(() => {
    const resultsContainer = document.getElementById('results-container');
    if (resultsContainer) {
      resultsContainer.scrollIntoView({ behavior: 'smooth' });
    }
  }, [results]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="logo-container">
            <img src={Image} alt="Logo" className="logo-image" />
          </div>
        </div>
      </header>
      <div className="search-container" style={{ marginLeft: 200 }}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products..." />
        <button onClick={handleSearch}>Search</button>
      </div>

      

      <div className="results-container" id="results-container">
        {loading && <div className="loading">Loading...</div>}
        {results.map(product => (
          <div className="product-card" key={product.link}>
            <img className="product-image" src={product.image_url} alt={product.name} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button onClick={() => handleView(product.id, product.link)}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
