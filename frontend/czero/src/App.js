import React, { useState } from 'react';
import './App.css';
import { useNavigate } from "react-router-dom";
import Image from  '../src/assets/logo-shriya.jpeg';
import gif1 from '../src/assets/pc.gif';
import gif2 from '../src/assets/laptop.jpeg';
import gif3 from '../src/assets/camera.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faClock, faBell } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handleView = (id, link) => {
    navigate(`/Product/${id}`, { state: { link } });
  }

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
      {error && <p>{error}</p>}
      {results.length === 0 && (
        <div className="placeholder-gifs">
        <img src={gif1} alt="GIF 1" className="placeholder-gif2" />
        <div style={{flexDirection:'column'}}>
          <h2 style={{marginLeft:20}} className='placeholder-text'>
            Cutting-edge Tech Cutting-edge Savings
          </h2>
          <h2 style={{marginLeft:-270}} className='placeholder-text'>
             Shop Smart, Save More!
          </h2>
          <div style={{textAlign:'start',marginLeft:350}}>
          <h2 className='placeholder-text2'>
            <FontAwesomeIcon icon={faClock} /> Track Price History
          </h2>
          <h2 className='placeholder-text2'>
            <FontAwesomeIcon icon={faClock} /> Find out the Best Time to Buy
          </h2>
          <h2 className='placeholder-text2'>
            <FontAwesomeIcon icon={faBell} /> Price Drop Alerts
          </h2>
          <h2 className='placeholder-text2'>
           And much more....
          </h2>
          </div>
          
        </div>
      </div>
      )}
      <div className="results-container">
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
