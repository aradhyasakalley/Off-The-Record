import React, { useState, useEffect } from 'react';
import './ProductDetailsPage.css'; 
import Modal from './Modal';

const ProductDetailsPage = ({ match }) => {
  const [productData, setProductData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/product/?url=https://www.flipkart.com/apple-iphone-14-starlight-128-gb/p/itm3485a56f6e676?pid=MOBGHWFHABH3G73H&lid=LSTMOBGHWFHABH3G73H644UNJ&marketplace=FLIPKART&q=iphone+14&store=tyy%2F4io&spotlightTagId=BestsellerId_tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_2_3_na_na_ps&otracker1=AS_QueryStore_OrganicAutoSuggest_2_3_na_na_ps&fm=search-autosuggest&iid=11ee72c3-2f12-4708-8c8d-007ef0509d01.MOBGHWFHABH3G73H.SEARCH&ppt=sp&ppn=sp&ssid=4cfyldfyxc0000001710969590695&qH=860f3715b8db08cd');
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
  }, []);

  const handleTrackHistory = async () => {
    try {
      const response = await fetch('http://localhost:8000/tracker/?url=https://www.flipkart.com/apple-iphone-14-starlight-128-gb/p/itm3485a56f6e676?pid=MOBGHWFHABH3G73H&lid=LSTMOBGHWFHABH3G73H644UNJ&marketplace=FLIPKART&q=iphone+14&store=tyy%2F4io&spotlightTagId=BestsellerId_tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_2_3_na_na_ps&otracker1=AS_QueryStore_OrganicAutoSuggest_2_3_na_na_ps&fm=search-autosuggest&iid=11ee72c3-2f12-4708-8c8d-007ef0509d01.MOBGHWFHABH3G73H.SEARCH&ppt=sp&ppn=sp&ssid=4cfyldfyxc0000001710969590695&qH=860f3715b8db08cd');
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
    window.location.href = 'https://www.flipkart.com/nothing-phone-2a-5g-black-256-gb/p/itm85c6bca5edadc?pid=MOBGVMQSVVE7CEAB&lid=LSTMOBGVMQSVVE7CEABNFJTAI&marketplace=FLIPKART&q=nothing+phone+2a&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_4_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_4_na_na_na&fm=search-autosuggest&iid=2b4e1148-7b60-46ac-a76f-37b156e11d7e.MOBGVMQSVVE7CEAB.SEARCH&ppt=clp&ppn=gaming-store&ssid=wnogcf9d9s0000001710695654313&qH=83d66aff395f669f';
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
        <button onClick={redirectToFlipkart} style={{ background: 'black', color: 'white', width: 250, height: 70, borderRadius: 10, padding: '10px 20px', border: 'none', cursor: 'pointer', marginRight: 10 }}>Buy on Flipkart</button>
        <button onClick={handleTrackHistory} style={{ background: 'black', color: 'white', borderRadius: 10, padding: '10px 20px', border: 'none', cursor: 'pointer', width: 250, height: 70 }}>Track History</button>
      </div>
      {showModal && <Modal data={trackingData} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductDetailsPage;
