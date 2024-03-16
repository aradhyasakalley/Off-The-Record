import React, { useState } from 'react';
import './App.css';
import ProductCard from './ProductCard';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Here you can implement the logic to fetch search results based on the query.
    // For this example, I'm just setting some dummy data.
    const dummyResults = [
      { id: 1, name: 'Product 1', price: '$10', description: 'Description of Product 1' },
      { id: 2, name: 'Product 2', price: '$20', description: 'Description of Product 2' },
      { id: 3, name: 'Product 3', price: '$30', description: 'Description of Product 3' }
    ];
    setResults(dummyResults);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Crowd Zero</h1>
        <div className="search-container">
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for products..." />
          <button onClick={handleSearch}>Search</button>
        </div>
      </header>
      <div className="results-container">
        {results.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
