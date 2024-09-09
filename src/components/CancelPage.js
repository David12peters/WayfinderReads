import React from 'react';
import ProductImage from '../assets/Payment-failed.jpg';

const CancelPage = () => {
  return (
    <div className="sc-container">
      <h1>Something went wrong!</h1>
      <p>We apologize for the inconvenience but an error occurred while processing your order request.</p>
      <p>
        For any Support Email:{' '}
        <a href="mailto:davidoluwaseun874@gmail.com">davidoluwaseun874@gmail.com</a>
      </p>
      <img src={ProductImage} alt="Product" />
      <a href="/" className="sc-btn">
        Back To Homepage
      </a>
    </div>
  );
};

export default CancelPage;
