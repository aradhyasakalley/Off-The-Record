import React from 'react';
import './Modal.css';

const Modal = ({ data, onClose }) => {
  const response = "Exactly"; // You can replace this with the actual response from your data
  
  // Calculate marker position based on response
  let markerPosition;
  switch (response) {
    case "Exactly":
      markerPosition = "calc(25% - 5px)"; // Adjust as needed
      break;
    case "Indeed":
      markerPosition = "calc(50% - 5px)"; // Adjust as needed
      break;
    case "Maybe":
      markerPosition = "calc(75% - 5px)"; // Adjust as needed
      break;
    case "Nope":
      markerPosition = "calc(100% - 5px)"; // Adjust as needed
      break;
    default:
      markerPosition = "calc(25% - 5px)"; // Default to "Exactly"
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        {data && (
          <div>
            <p style={{ marginTop: 10,textAlign:'center',fontFamily:'monospace',fontWeight:'bold',fontSize:15 }}>Is this a good time to buy this product?</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: 300, position: 'relative', marginTop: 20 }}>
                <div style={{ flex: 1, height: 20, backgroundColor: 'green', borderRadius: '10px 0 0 10px' }}></div>
                <div style={{ flex: 1, height: 20, backgroundColor: 'yellow' }}></div>
                <div style={{ flex: 1, height: 20, backgroundColor: 'orange' }}></div>
                <div style={{ flex: 1, height: 20, backgroundColor: 'red', borderRadius: '0 10px 10px 0' }}></div>
                {/* Arrow pointer marker */}
                <div style={{ position: 'absolute', top: -15, left: markerPosition }}>
                  <div style={{ width: 0, height: 0, borderTop: '10px solid black', borderLeft: '5px solid transparent', borderRight: '5px solid transparent' }}></div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', width: 300, marginTop: 5 }}>
                <span style={{ flex: 1 }}>Exactly</span>
                <span style={{ flex: 1 }}>Indeed</span>
                <span style={{ flex: 1 }}>Maybe</span>
                <span style={{ flex: 1 }}>Nope</span>
              </div>
             
            </div>
            {data.buying_info && (
              <p>Buying Info: {data.buying_info}</p>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <button style={{ height:35,margin: '5px', fontFamily: 'monospace', fontWeight: 'bold' }}>Min Price: {data.prices.min}</button>
              <button style={{ height:35,margin: '5px', fontFamily: 'monospace', fontWeight: 'bold' }}>Average Price: {data.prices.average}</button>
              <button style={{ height:35,margin: '5px', fontFamily: 'monospace', fontWeight: 'bold' }}>Max Price: {data.prices.max}</button>
            </div>
            <div style={{ width: '100%', height: '700px', overflow: 'hidden', marginTop: '20px',borderRadius:20 }}>
              <div dangerouslySetInnerHTML={{ __html: data.embedded_iframe }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
