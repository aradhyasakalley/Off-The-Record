import React, { useState, useEffect } from 'react';
import './ProductDetailsPage.css'; 
import Modal from './Modal';
import { useLocation } from 'react-router-dom';

const ProductDetailsPage = ({ match }) => {
  const location = useLocation();
  const [productData, setProductData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [trackingData, setTrackingData] = useState(null);
  const [passedLink, setPassedLink] = useState(null);
  useEffect(() => {
    console.log('URL:', location.state.link); // Log the value of passedLink before fetch request
    if (location.state && location.state.link) {
      console.log("Passed Link:", location.state.link);
      setPassedLink(location.state.link);
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/product/?url=${location.state.link}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    
    fetchData();
    
  }, [location]);

  const handleTrackHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8000/tracker/?url=${encodeURIComponent(passedLink)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tracking data');
      }
      const data = await response.json();
      setTrackingData(data);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching tracking data:', error);
    }
  };
  const redirectToFlipkart = () => {
    window.location.href = passedLink;
  };
  return (
    <div className="product-details-container">
      {productData && (
        <div className="product-details">
          <div className="product-page-image">
            <img style={{ borderRadius: 20 }} src={productData.image} alt="Product" />
          </div>
          
          <div className="product-info">
            <p style={{ marginLeft: 20 }}>{productData.category.join('> ')}</p>
            <div className="product-header">
              <h3 className="title">{productData.title}</h3>
              <p style={{ fontSize: 25, marginTop: -20 }} className="price">{productData.price} (Current Buying Price)</p>
              <p style={{ marginTop: -20 }} className="discount">at {productData.disc_perc}</p>
              <p className="description">{productData.description}</p>
            </div>
            
            <h4 style={{ marginLeft: 20 }} className="highlights">Highlights</h4>
            <ul style={{ marginTop: -20 }} className="highlights-list">
              {productData.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
            <h4 style={{ marginLeft: 20 }} className="offers">Offers</h4>
            <ul style={{ marginTop: -20 }} className="offers-list">
              {productData.offers.map((offer, index) => (
                <p key={index}>{offer}</p>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: 20 }}>
        <button onClick={redirectToFlipkart} style={{ background: 'black', color: 'white', width: 250, height: 70, borderRadius: 10, padding: '10px 20px', border: 'none', cursor: 'pointer', marginRight: 10 }}>Buy Now</button>
        <button onClick={handleTrackHistory} style={{ background: 'black', color: 'white', borderRadius: 10, padding: '10px 20px', border: 'none', cursor: 'pointer', width: 250, height: 70 }}>Track History</button>
      </div>
      {showModal && <Modal data={trackingData} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductDetailsPage;
