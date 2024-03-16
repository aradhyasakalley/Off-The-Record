// ProductDetailsPage.js
import React from 'react';

const ProductDetailsPage = ({ match }) => {
  const { url } = match.params;

  return (
    <div>
      <h2>Product Details Page</h2>
      <p>URL: {url}</p>
      {/* Add other content of the product details page */}
    </div>
  );
};

export default ProductDetailsPage;
